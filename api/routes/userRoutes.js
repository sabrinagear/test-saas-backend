const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/userDb");

// POST A USER //

router.post("/", async (req, res) => {
  const user = req.body;
  try {
    await db.add(user);
    let updatedArray = await db.get();
    return res.status(200).json({
      users: updatedArray,
      message: "Successfully Posted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
  });

// GET ALL USERS //

router.get("/", (req, res) => {
  db
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err.message));
});

// 
// GET USER BY ID //

router.get("/:id", (req, res) => {
  const { id } = req.params;
 db
    .get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ error: "The user couldn't be retrieved" });
    });
});

// DELETE A USER //

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let user = await db.get(id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
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


// UPDATE A USER //

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let changes = req.body;
try {
  let user = await db.get(id)
  if (!user) {
    res
    .status(404)
    .json({ message: "The user with the specified ID does not exist." });
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

module.exports = router;
