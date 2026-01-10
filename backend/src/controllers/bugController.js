const Bug = require("../models/Bug");

// VALID STATUS TRANSITIONS
const validTransitions = {
  Open: ["In Progress"],
  "In Progress": ["Resolved"],
  Resolved: ["Closed"],
  Closed: [],
};

// CREATE BUG (Tester/Admin)
exports.createBug = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const bug = await Bug.create({
      title,
      description,
      priority,
      createdBy: req.user.id,
    });

    res.status(201).json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BUGS (Filter + Pagination)
exports.getBugs = async (req, res) => {
  try {
    const { status, priority, assignedTo, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;

    const bugs = await Bug.find(query)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BUG STATUS (Developer/Admin)
exports.updateBugStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    const allowed = validTransitions[bug.status];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: `Invalid status transition from ${bug.status} to ${status}`,
      });
    }

    bug.status = status;
    await bug.save();

    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ASSIGN BUG (Admin only)
exports.assignBug = async (req, res) => {
  try {
    const { userId } = req.body;
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    bug.assignedTo = userId;
    await bug.save();

    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
