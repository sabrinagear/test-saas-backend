const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/listsDb");

// POST A LIST //

router.post("/", async (req, res) => {
  const list = req.body;
  try {
    await db.add(list);
    let updatedArray = await db.get();
    return res.status(200).json({
      lists: updatedArray,
      message: "Successfully Posted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
  });

// GET ALL LISTS //

router.get("/", (req, res) => {
  db.get()
  .then(lists => {
      res.status(200).json(lists);
    })
    .catch(err => res.status(500).json(err.message));
});

// GET LISTS BY ID //

router.get('/:id', (req, res) => {
  const { id } = req.params
  db
    .getById(id)
    .then(list => {
      if (list.length >= 1) {
        return res.status(200).json({ data: list })
      } else {
        return res.status(404).json({ message: 'The requested list does not exist.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `list could not be retrieved`, err })
    })
})

// DELETE A LIST //

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let list = await db.get(id);
    if (!list) {
      res
        .status(404)
        .json({ message: "The list with the specified ID does not exist." });
    }
    await db.remove(id);
    let updatedArray = await db.get();
    return res.status(200).json({
      lists: updatedArray,
      message: "successfully deleted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});




// UPDATE A LIST//

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let changes = req.body;
try {
  let list = await db.get(id)
  if (!list) {
    res
    .status(404)
    .json({ message: "The list with the specified ID does not exist." });
  }
  await db.update(id, changes);
  let updatedArray = await db.get();
  return res.status(200).json({
    lists: updatedArray,
    message: "Successfully Updated"
  });
} catch (err) {
  res.status(500).json(err.message);
}
});








module.exports = router;
