function transactionLogger(req, res, next) {
  const { id } = req.params;
  const { readerName } = req.body;
  const action = req.originalUrl.includes("borrow") ? "borrowed" : "returned";
  const timestamp = new Date().toISOString();

  const logMsg = `[${timestamp}] ${readerName || "Unknown"} ${action} book ID ${id}`;
  console.log(logMsg);

  next();
}

module.exports = transactionLogger;