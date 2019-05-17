const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const groupRoutes = require("./groupRoutes");
// const subscriptionRoutes = require("./subscriptionRoutes");
const taskRoutes = require("./taskRoutes");
const groupMemberRoutes = require("./groupMemberRoutes");
const listRoutes = require("./listRoutes");
const notificationRoutes = require("./notificationRoutes");
const inviteRoutes = require("./invitationRoutes");

// const validate = require("../auth/checkJwt");

// router.use(validate);

router.get("/", (req, res) => {
  res.status(200).json({ message: "This is the API root endpoint." });
});

router.use("/users", userRoutes);
router.use("/group", groupRoutes);
// router.use("/subscription", subscriptionRoutes);
router.use("/tasks", taskRoutes);
router.use("/groupmembers", groupMemberRoutes);
router.use("/list", listRoutes);
router.use("/notification", notificationRoutes);
router.use("/invite", inviteRoutes);

module.exports = router;
