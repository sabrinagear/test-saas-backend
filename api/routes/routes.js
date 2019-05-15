const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const groupRoutes = require("./groupRoutes");
const subscriptionRoutes = require("./subscriptionRoutes");
const taskRoutes = require("./taskRoutes");
const groupMemberRoutes = require("./groupMemberRoutes");
const listRoutes = require("./listRoutes");
const notificationRoutes = require("./notificationRoutes");
const inviteRoutes = require("./inviteRoutes");

router.get("/", (req, res) => {
  res.send("This is the API root endpoint.");
});

router.use("/user", userRoutes);
router.use("/group", groupRoutes);
router.use("/subscription", subscriptionRoutes);
router.use("/task", taskRoutes);
router.use("/groupmember", groupMemberRoutes);
router.use("/list", listRoutes);
router.use("/notification", notificationRoutes);
router.use("/invite", inviteRoutes);

module.exports = router;
