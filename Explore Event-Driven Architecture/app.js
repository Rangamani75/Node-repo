const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('userLoggedIn', (username) => {
  console.log(`> User ${username} logged in`);
});

eventEmitter.on('userLoggedIn', (username) => {
  console.log(`> Notification sent to ${username}`);
});

eventEmitter.on('messageReceived', (message) => {
  console.log(`> New message: ${message}`);
});

eventEmitter.on('dataSynced', () => {
  console.log(`> Data sync complete`);
});

setTimeout(() => {
  eventEmitter.emit('userLoggedIn', 'John');

  setTimeout(() => {
    eventEmitter.emit('messageReceived', 'Hello John! Welcome back.');

    console.log('> Syncing user data...');
    setTimeout(() => {
      eventEmitter.emit('dataSynced');
    }, 1500);

  }, 1000);

}, 1000);
