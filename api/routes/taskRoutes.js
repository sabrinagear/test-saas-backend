const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/taskDb");
const gtb = require("../../data/helpers/groupTaskDb");

// GET TASK BY ID //
router.get("/", (req, res) => {
  db.get()
    .then(tasks => {
      return res.status(200).json({ data: tasks });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(task => {
      if (task.length >= 1) {
        return res.status(200).json({ data: task });
      } else {
        return res
          .status(404)
          .json({ message: "The requested task does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});
// ADD A TASK //
router.post("/", async (req, res) => {
  const task = req.body;
  try {
    await db.add(task);
    let arr = await db.get();
    let tid = arr[arr.length - 1].id;
    await gtb.add({
      taskId: tid,
      groupId: req.body.groupId
    });
    return res.status(200).json({
      taskId: tid,
      tasks: arr,
      message: "Successfully Done"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// UPDATE TASK //

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let changes = req.body;
  try {
    let task = await db.get(id);
    if (!task) {
      res
        .status(404)
        .json({ message: "The task with the specified ID does not exist." });
    }
    await db.update(id, changes);
    let updatedArray = await db.get();
    return res.status(200).json({
      tasks: updatedArray,
      message: "Successfully Updated"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// DELETE A TASK //

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let task = await db.get(id);
    if (!task) {
      res
        .status(404)
        .json({ message: "The task with the specified ID does not exist." });
    }
    await db.remove(id);
    let updatedArray = await db.get();
    return res.status(200).json({
      tasks: updatedArray,
      message: "successfully deleted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET TASK BY GROUP ID //

router.get("/group/:id", (req, res) => {
  const { id } = req.params;

  db.getByGroup(id)
    .then(task => {
      if (task.length >= 1) {
        return res.status(200).json({ data: task });
      }
      return res
        .status(404)
        .json({ message: "The requested task does not exist." });
    })
    .catch(err => {
      res.status(500).json({ message: `Task could not be retrived`, err });
    });
});
module.exports = router;
