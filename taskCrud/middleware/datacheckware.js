const allowedPriorities = ["low", "medium", "high"];

const validateTaskData = (req, res, next) => {
  const { title, description, priority } = req.body;

  // Check for presence
  if (!title || !description || !priority) {
    return res.status(400).json({ msg: "Incomplete Data Received" });
  }

  // Check types
  if (typeof title !== "string" || typeof description !== "string") {
    return res.status(400).json({ msg: "Title and Description must be strings" });
  }

  // Check priority validity
  if (!allowedPriorities.includes(priority.toLowerCase())) {
    return res.status(400).json({
      msg: `Priority must be one of ${allowedPriorities.join(", ")}`,
    });
  }

  next(); // All validations passed
};

module.exports = { validateTaskData };