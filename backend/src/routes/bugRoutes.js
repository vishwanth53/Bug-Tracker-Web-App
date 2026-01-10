const express = require("express");
const router = express.Router();
const {
  createBug,
  getBugs,
  updateBugStatus,
  assignBug,
} = require("../controllers/bugController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// CREATE BUG
router.post("/", protect, authorize("tester", "admin"), createBug);

// GET BUGS
router.get("/", protect, getBugs);

// UPDATE STATUS
router.patch(
  "/:id/status",
  protect,
  authorize("developer", "admin"),
  updateBugStatus
);

// ASSIGN BUG
router.patch("/:id/assign", protect, authorize("admin"), assignBug);

module.exports = router;
