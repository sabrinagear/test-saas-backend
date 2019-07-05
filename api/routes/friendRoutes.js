const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/friendDb");

// POST A friendship //

router.post("/", async (req, res) => {
  let fs = req.body;
  try {
    let check = await db.get();
    for (let i = 0; i < check.length; i++) {
      if (check[i].userId === fs.userId && check[i].friendId === fs.friendId) {
        return res.status(422).json({ message: "already friends, silly!" });
      }
    }

    await db.add(fs);
    let arr = await db.get();
    return res.status(200).json({
      friends: arr
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET ALL friendshipS //

router.get("/", (req, res) => {
  db.get()
    .then(friendships => {
      res.status(200).json(friendships);
    })
    .catch(err => res.status(500).json(err.message));
});

//
// GET friendship BY ID //

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(friendship => {
      if (friendship) {
        res.status(200).json(friendship);
      } else {
        res.status(404).json({
          message: "The friendship with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ error: "The friendship couldn't be retrieved" });
    });
});

// DELETE A friendship //

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let friendship = await db.get(id);
    if (!friendship) {
      res.status(404).json({
        message: "The friendship with the specified ID does not exist."
      });
    }
    await db.remove(id);
    let updatedArray = await db.get();
    return res.status(200).json({
      friends: updatedArray,
      message: "successfully deleted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// UPDATE A friendship //

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let changes = req.body;
  try {
    let friendship = await db.get(id);
    if (!friendship) {
      res.status(404).json({
        message: "The friendship with the specified ID does not exist."
      });
    }
    await db.update(id, changes);
    let updatedArray = await db.get();
    return res.status(200).json({
      friends: updatedArray,
      message: "Successfully Updated"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
