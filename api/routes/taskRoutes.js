const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/taskDb");

// taskRouter.use(checkJwt)

// GET TASK BY ID //
router.get("/", (req, res) => {
  db.get()
    .then(tasks => {
      if (tasks.length >= 1) {
        return res.status(200).json({ data: tasks });
      }
      return res
        .status(404)
        .json({ message: `The requested tasks do not exist.` });
    })
    .catch(err => {
      res.status(500).json({ message: `Tasks could not be retrieved`, err });
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
      res.status(500).json({ message: `Task could not be retrieved`, err });
    });
});
// UPDATE TASK //

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let changes = req.body;
  db.getById(id)
    .then(task => {
      taskDb.update(id, changes).then(status => {
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

// DELETE A TASK //

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(status => {
      if (status.length >= 1) {
        return res.status(200).json({ message: `Task successfully deleted.` });
      } else {
        return res
          .status(404)
          .json({ error: `The requested task does not exist.` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Task could not be deleted`, err });
    });
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
