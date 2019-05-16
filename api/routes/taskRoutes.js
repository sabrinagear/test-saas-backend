const express = require('express')
const taskRouter = express.Router()
const taskDb = require('../../data/helpers/taskDb')

// const checkJwt = require('../../validators/checkJwt')
// const checkUser = require('../../validators/checkUser')
// checkJwt middleware authenticates user tokens and ensures they are signed correctly in order to access our internal API
const moment = require('moment')




// taskRouter.use(checkJwt)

// ADD Task //

taskRouter.post('/', (req, res) => {
  const task = req.body
  taskDb
    .add(task)
    .then(id => {
      res.status(200).json({ message: `Task successfully added`, id: id[0] })
    })
    .catch(err => {
      res.status(500).json({ message: `Task could not be added`, err })
    })
})


// GET TASK BY ID //

taskRouter.get('/:id', (req, res) => {
  const { id } = req.params
  taskDb
    .getById(id)
    .then(task => {
      if (task.length >= 1) {
<<<<<<< HEAD
        return res.status(200).json({ data: task });
      }

      return res
        .status(404)
        .json({ message: "The requested task does not exist." });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Retrieving task`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

/** GET task BY GROUP ID
 * @TODO Add middleware to ensure user is logged in
 * **/

/**************************************************/
router.get("/group/:id", (req, res) => {
  const { id } = req.params;
=======
        return res.status(200).json({ data: task })
      } else {
        return res.status(404).json({ message: 'The requested task does not exist.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Task could not be retrieved`, err })
    })
})


// GET TASK BY GROUP ID //

taskRouter.get('/group/:id', (req, res) => {
  const { id } = req.params
>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d

  taskDb
    .getByGroup(id)
    .then(task => {
      if (task.length >= 1) {
<<<<<<< HEAD
        return res.status(200).json({ data: task });
      }

      return res
        .status(404)
        .json({ message: "The requested task does not exist." });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Retrieving task`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

// GET ALL taskS
/** @TODO This should be set to sysadmin privileges for subscription privacy **/

/**************************************************/

router.get("/", (req, res) => {
=======
        return res.status(200).json({ data: task })
      }
      return res
        .status(404)
        .json({ message: 'The requested task does not exist.' })
    })
    .catch(err => {
      res.status(500).json({ message: `Task could not be retrived`, err })
    })
})


// GET ALL TASKS //

taskRouter.get('/', (req, res) => {
>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
  taskDb
    .get()
    .then(tasks => {
      if (tasks.length >= 1) {
<<<<<<< HEAD
        return res.status(200).json({ data: tasks });
      }

      return res
        .status(404)
        .json({ message: `The requested tasks do not exist.` });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Getting tasks`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/
/**
 * UPDATE task
 * @TODO Add middleware to ensure users can only change their own group information
 */

/**************************************************/
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let changes = req.body;
  // changes.price = parseFloat(changes.price);
  console.log("id, changes", id, changes);
  taskDb
    .getById(id)
    .then(task => {
      let oldtask = task[0];

      taskDb.update(id, changes).then(status => {
        console.log("task update", status);

        if (status.length >= 1 || status === 1) {
          let notification = {};
          userDb.getProfileByEmail(req.user.email).then(user => {
            notification.userID = user[0].id;
            notification.userName = user[0].name;

            taskDb.getById(id).then(newtask => {
              let { groupID } = newtask[0];

              groupDb.getById(groupID).then(group => {
                notification.groupID = group[0].id;
                notification.groupName = group[0].name;
                notification.action = "update-task";
                notification.content = `${notification.userName} updated ${
                  oldtask.name
                } to ${newtask[0].name} in the ${
                  notification.groupName
                } chores list.`;

                pusher.trigger(`group-${groupID}`, "update-task", {
                  message: `${notification.userName} updated ${
                    oldtask.name
                  } to ${newtask[0].name} in the ${
                    notification.groupName
                  } chores list.`,
                  timestamp: moment().format()
                });

                beamsClient
                  .publishToInterests([`group-${groupID}`], {
                    apns: {
                      aps: {
                        alert: notification.content
                      }
                    },
                    fcm: {
                      notification: {
                        title: `task Updated`,
                        body: notification.content
                      }
                    }
                  })
                  .then(publishResponse => {
                    console.log("task notification", publishResponse.publishId);
                  })
                  .catch(error => {
                    console.log("error", error);
                  });

                console.log("NOTIFICATION\n\n", notification);

                notificationDb.add(notification).then(response => {
                  console.log("notification added", response);
                  return res.status(200).json({
                    message: "task updated successfully",
                    id: status[0]
                  });
                });
              });
            });
          });
        } else {
          return res
            .status(404)
            .json({ message: "The requested task does not exist." });
        }
      });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Updating task`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

/** DELETE task
 * @TODO Add middleware to prevent unauthorized deletions
 * **/

/**************************************************/

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  taskDb
    .getById(id)
    .then(task => {
      let { groupID } = task[0];
      let oldtask = task[0];
      taskDb.remove(id).then(status => {
        console.log("remove status", status);
        if (status.length >= 1 || status === 1) {
          let notification = {};
          userDb.getProfileByEmail(req.user.email).then(user => {
            notification.userID = user[0].id;
            notification.userName = user[0].name;

            groupDb.getById(groupID).then(group => {
              notification.groupID = group[0].id;
              notification.groupName = group[0].name;
              notification.action = "delete-task";
              notification.content = `${notification.userName} removed ${
                oldtask.name
              } from the ${notification.groupName} chores list.`;

              pusher.trigger(`group-${groupID}`, "delete-task", {
                message: `${notification.userName} removed ${
                  oldtask.name
                } from the ${notification.groupName} chores list.`,
                timestamp: moment().format()
              });

              beamsClient
                .publishToInterests([`group-${groupID}`], {
                  apns: {
                    aps: {
                      alert: notification.content
                    }
                  },
                  fcm: {
                    notification: {
                      title: `task Deleted`,
                      body: notification.content
                    }
                  }
                })
                .then(publishResponse => {
                  console.log("task notification", publishResponse.publishId);
                })
                .catch(error => {
                  console.log("error", error);
                });

              console.log("NOTIFICATION\n\n", notification);

              notificationDb.add(notification).then(response => {
                console.log("notification added", response);
                return res
                  .status(200)
                  .json({
                    message: "task removed successfully",
                    id: status[0]
                  });
              });
            });
          });
        } else {
          return res
            .status(404)
            .json({ message: "The requested task does not exist." });
        }
      });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Removing task`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

module.exports = router;
=======
        return res.status(200).json({ data: tasks })
      }
      return res
        .status(404)
        .json({ message: `The requested tasks do not exist.` })
    })
    .catch(err => {
      res.status(500).json({ message: `Tasks could not be retrieved`, err })
    })
})





// UPDATE TASK //

taskRouter.put('/:id', (req, res) => {
  let { id } = req.params
  let changes = req.body
  taskDb
    .getById(id)
    .then(task => {
      taskDb.update(id, changes).then(status => {
        if (status.length >= 1) {
          return res
            .status(200)
            .json({ message: `Task successfully updated.` })
        } else {
          return res
            .status(404)
            .json({ message: 'The requested task does not exist.' })
        }
      })
    })

    .catch(err => {
      res.status(500).json({ message: `Task could not be `, err })
    })
})

// DELETE A TASK //

taskRouter.delete('/:id', (req, res) => {
  const { id } = req.params

  taskDb
    .remove(id)
    .then(status => {
      if (status.length >= 1) {
        return res
          .status(200)
          .json({ message: `Task successfully deleted.` })
      } else {
        return res
          .status(404)
          .json({ error: `The requested task does not exist.` })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Task could not be deleted`, err })
    })
})




module.exports = taskRouter











>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
