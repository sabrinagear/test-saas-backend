const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/groupMemberDb");

router.get("/", (req, res) => {
  db.get()
    .then(r => {
      res.status(200).json({
        members: r
      });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/:id", (req, res) => {
  let id = req.params;
  db.get(id)
    .then(r => {
      res.status(200).json({
        members: r
      });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/", async (req, res) => {
  let gm = req.body;
  try {
    await db.add(gm);
    let arr = await db.get();
    return res.status(200).json({
      groupmembers: arr
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let changes = req.body;
  try {
    let member = await db.get(id);
    if (!member) {
      res
        .status(404)
        .json({
          message: "The groupmember with the specified ID does not exist."
        });
    }
    await db.update(id, changes);
    let updatedArray = await db.get();
    return res.status(200).json({
      members: updatedArray,
      message: "Successfully Updated"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let member = await db.get(id);
    if (!member) {
      res
        .status(404)
        .json({ message: "The member with the specified ID does not exist." });
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

module.exports = router;
