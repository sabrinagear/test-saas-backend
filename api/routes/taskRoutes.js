const express = require("express");
const taskRouter = express.Router();
const db = require("../../data/helpers/taskDb");

// taskRouter.use(checkJwt)

// GET TASK BY ID //

taskRouter.get("/:id", (req, res) => {
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

module.exports = taskRouter;
