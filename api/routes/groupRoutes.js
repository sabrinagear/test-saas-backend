const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/groupDb");
const memberDb = reqquire("../../data/helpers/groupMemberDb");

// *** GET ALL ** //
router.get("/", (req, res) => {
  db.get()
    .then(groups => {
      res.status(200).json(groups);
    })
    .catch(err => res.status(500).json(err.message));
});

// *** GET BY ID ** //
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(group => {
      if (group) {
        res.status(200).json(group);
      } else {
        res
          .status(404)
          .json({ message: "The group with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ error: "The group couldn't be retrieved" });
    });
});

// *** DELETE ** //
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let group = await db.get(id);
    if (!group) {
      res
        .status(404)
        .json({ message: "The group with the specified ID does not exist." });
    }
    await db.remove(id);
    let updatedArray = await db.get();
    return res.status(200).json({
      users: updatedArray,
      message: "successfully deleted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let changes = req.body;
  try {
    let group = await db.get(id);
    if (!group) {
      res
        .status(404)
        .json({ message: "The group with the specified ID does not exist." });
    }
    await db.update(id, changes);
    let updatedArray = await db.get();
    return res.status(200).json({
      users: updatedArray,
      message: "Successfully Updated"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/************* POST *************/

router.post("/", async (req, res) => {
  const group = req.body;
  try {
    await db.add(group);
    let arr = await db.get();
    let gid = await arr[arr.length - 1].id;
    await memberDb.add({
      groupId: gid,
      userId: req.body.creatorId,
      isAdmin: true
    });
    return res.status(200).json({
      groupId: gid,
      groups: arr,
      message: "Successfully Done"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
