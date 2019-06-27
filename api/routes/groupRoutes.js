const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/groupDb");
const memberDb = require("../../data/helpers/groupMemberDb");

// *** GET ALL ** //
router.get("/", (req, res) => {
  db.get()
    .then(groups => {
      res.status(200).json(groups);
    })
    .catch(err => res.status(500).json(err.message));
});

// *** GET BY ID ** //
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let group = await db.getById(id);
    console.log(group);
    // let membersArray = memberDb.getbyGroup(id);
    return res.status(200).json(group);
  } catch (err) {
    res.status(404).json({
      message: "The group with the specified ID does not exist."
    });
  }
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

// *** UPDATE ** //
//updates the group and returns the updated group

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let changes = req.body;
  db.getById(id)
    .then(group => {
      db.update(id, changes).then(status => {
        if (status.length >= 1) {
          return res
            .status(200)
            .json({ message: `Task successfully updated.` });
        } else {
          return res
            .status(404)
            .json({ message: "The requested task does not exist." });
        }
      });
    })

    .catch(err => {
      res.status(500).json({ message: `Task could not be `, err });
    });
});

router.post("/", (req, res) => {
  const group = req.body;
  db.add(group)
    .then(group => {
      res.status(200).json({ message: `group successfully added` });
    })
    .catch(err => {
      res.status(500).json({ message: `group could not be added`, err });
    });
});

module.exports = router;
