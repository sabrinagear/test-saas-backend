const express = require("express");
const router = express.Router();
const listDb = require("../../data/helpers/listsDb");

// POST A LIST //

router.post('/', (req, res) => {
  const list = req.body
  listDb
    .add(list)
    .then(id => {
      res.status(200).json({ message: `list successfully added` })
    })
    .catch(err => {
      res.status(500).json({ message: `list could not be added`, err })
    })
})

// GET ALL LISTS //

router.get("/", (req, res) => {
  listDb.get()
  .then(lists => {
      res.status(200).json(lists);
    })
    .catch(err => res.status(500).json(err.message));
});

// GET LISTS BY ID //

router.get('/:id', (req, res) => {
  const { id } = req.params
  listDb
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

router.delete('/:id', (req, res) => {
  const { id } = req.params

  listDb
    .remove(id)
    .then(status => {
      if (status.length >= 1) {
        return res
          .status(200)
          .json({ message: `list successfully deleted.` })
      } else {
        return res
          .status(404)
          .json({ error: `The requested list does not exist.` })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `list could not be deleted`, err })
    })
})

// UPDATE A LIST//

router.put('/:id', (req, res) => {
  let { id } = req.params
  let changes = req.body
  listDb
    .getById(id)
    .then(list => {
      listDb.update(id, changes).then(status => {
        if (status.length >= 1) {
          return res
            .status(200)
            .json({ message: `list successfully updated.` })
        } else {
          return res
            .status(404)
            .json({ message: 'The requested list does not exist.' })
        }
      })
    })

    .catch(err => {
      res.status(500).json({ message: `list could not be updated`, err })
    })
})


module.exports = router;
