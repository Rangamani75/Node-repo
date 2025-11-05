const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cron = require('node-cron');
const { MongoClient } = require('mongodb');
const { createClient: createRedisClient } = require('redis');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));

let useRedis = false;
let useMongo = false;
let redisClient;
let mongoClient;
let mongoCollection;

const CHAT_HISTORY_KEY = 'chat:history';

// in-memory fallback
const messages = [];
const onlineUsers = new Map();

async function tryInitRedis() {
  if (!process.env.REDIS_URL) return;
  try {
    redisClient = createRedisClient({ url: process.env.REDIS_URL });
    redisClient.on('error', (err) => console.error('Redis error', err));
    await redisClient.connect();
    useRedis = true;
    console.log('Connected to Redis');
  } catch (err) {
    console.warn('Redis not available:', err.message);
    useRedis = false;
  }
}

async function tryInitMongo() {
  if (!process.env.MONGO_URI) return;
  try {
    mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();
    const db = mongoClient.db(process.env.MONGO_DB || 'chatdb');
    mongoCollection = db.collection('chat_backups');
    useMongo = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.warn('MongoDB not available:', err.message);
    useMongo = false;
  }
}

async function appendMessageToStorage(msg) {
  if (useRedis) {
    try {
      await redisClient.rPush(CHAT_HISTORY_KEY, JSON.stringify(msg));
      return;
    } catch (e) {
      console.warn('Failed to push to Redis, using memory fallback', e.message);
    }
  }
  messages.push(msg);
}

async function getRecentHistory(limit = 50) {
  if (useRedis) {
    try {
      const arr = await redisClient.lRange(CHAT_HISTORY_KEY, -limit, -1);
      return arr.map((s) => JSON.parse(s));
    } catch (e) {
      console.warn('Failed to read from Redis, using memory fallback', e.message);
    }
  }
  return messages.slice(-limit);
}

// cron job: backup Redis (or in-memory) to MongoDB every 1 minute (if Mongo enabled)
cron.schedule('* * * * *', async () => {
  if (!useMongo) return;
  try {
    const recent = await getRecentHistory(1000);
    if (recent.length === 0) return;
    const doc = {
      backedAt: new Date(),
      count: recent.length,
      messages: recent
    };
    await mongoCollection.insertOne(doc);
    console.log(`Backed up ${recent.length} messages to Mongo at ${new Date().toISOString()}`);
  } catch (err) {
    console.warn('Backup to Mongo failed:', err.message);
  }
});

io.on('connection', (socket) => {
  let registeredName = null;

  socket.on('register', async (name) => {
    if (!name || typeof name !== 'string') return;
    registeredName = name.trim();
    onlineUsers.set(socket.id, registeredName);

    io.emit('onlineUsers', Array.from(onlineUsers.values()));

    const history = await getRecentHistory(50);
    socket.emit('chatHistory', history);

    const joinMsg = {
      from: 'system',
      text: `${registeredName} joined`,
      time: new Date().toISOString(),
      type: 'system'
    };
    await appendMessageToStorage(joinMsg);
    io.emit('message', joinMsg);
  });

  socket.on('sendMessage', async (payload) => {
    if (!registeredName) {
      socket.emit('errorMessage', 'You must register before sending messages.');
      return;
    }
    const msg = {
      from: registeredName,
      text: String(payload.text || ''),
      time: new Date().toISOString(),
      type: registeredName.toLowerCase() === 'admin' ? 'admin' : 'user',
      room: payload.room || 'global'
    };
    await appendMessageToStorage(msg);
    if (msg.room && msg.room !== 'global') {
      io.to(msg.room).emit('message', msg);
    } else {
      io.emit('message', msg);
    }
  });

  socket.on('createOrJoinRoom', (roomName) => {
    if (!registeredName) {
      socket.emit('errorMessage', 'Register first');
      return;
    }
    socket.join(roomName);
    socket.emit('joinedRoom', roomName);
  });

  socket.on('leaveRoom', (roomName) => {
    socket.leave(roomName);
    socket.emit('leftRoom', roomName);
  });

  socket.on('disconnect', async () => {
    if (registeredName) {
      onlineUsers.delete(socket.id);
      io.emit('onlineUsers', Array.from(onlineUsers.values()));
      const leftMsg = {
        from: 'system',
        text: `${registeredName} left`,
        time: new Date().toISOString(),
        type: 'system'
      };
      await appendMessageToStorage(leftMsg);
      io.emit('message', leftMsg);
    }
  });
});

async function start() {
  await tryInitRedis();
  await tryInitMongo();
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Startup error:', err);
  process.exit(1);
});
