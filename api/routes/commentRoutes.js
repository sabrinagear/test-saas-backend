const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/commentDb");

// *** GET ALL ** //
router.get("/", (req, res) => {
  db.get()
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => res.status(500).json(err.message));
});

// *** GET BY ID ** //
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({
          message: "The comment with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

// *** DELETE ** //
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let comment = await db.get(id);
    if (!comment) {
      res
        .status(404)
        .json({ message: "The comment with the specified ID does not exist." });
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
//updates the comment and returns the updated comment

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let changes = req.body;
  db.getById(id)
    .then(comment => {
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
  const comment = req.body;
  db.add(comment)
    .then(comment => {
      res.status(200).json({ message: `comment successfully added` });
    })
    .catch(err => {
      res.status(500).json({ message: `comment could not be added`, err });
    });
});

module.exports = router;