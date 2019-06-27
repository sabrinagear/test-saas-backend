const express = require("express");
const router = express.Router();
const userDb = require("../../data/helpers/userDb");

// POST A USER //

router.post("/", (req, res) => {
  const user = req.body;
  userDb
    .add(user)
    .then(id => {
      res.status(200).json({ message: `user successfully added` });
    })
    .catch(err => {
      res.status(500).json({ message: `user could not be added`, err });
    });
});

// GET ALL USERS //

router.get("/", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err.message));
});
//test//

router.get("/test/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .getGroupsByUser(id)
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
// GET USER BY ID //

router.get("/:id", (req, res) => {
  const { id } = req.params;
  userDb
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .remove(id)
    .then(status => {
      if (status.length >= 1) {
        return res.status(200).json({ message: `user successfully deleted.` });
      } else {
        return res
          .status(404)
          .json({ error: `The requested user does not exist.` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `user could not be deleted`, err });
    });
});

// UPDATE A USER //

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let changes = req.body;
  userDb
    .get(id)
    .then(user => {
      userDb.update(id, changes).then(status => {
        if (status.length >= 1) {
          return res
            .status(200)
            .json({ message: `user successfully updated.` });
        } else {
          return res
            .status(404)
            .json({ message: "The requested user does not exist." });
        }
      });
    })

    .catch(err => {
      res.status(500).json({ message: `user could not be updated`, err });
    });
});

module.exports = router;
