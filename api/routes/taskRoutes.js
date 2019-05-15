const express = require("express");
const router = express.Router();
const taskDb = require("../../data/helpers/taskDb");
const notificationDb = require("../../data/helpers/notificationDb");
const groupDb = require("../../data/helpers/groupDb");
const userDb = require("../../data/helpers/userDb");

const checkJwt = require("../auth/checkJwt");
const checkUser = require("../auth/checkUser");

const moment = require("moment");

var Pusher = require("pusher");

var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true
});

const PushNotifications = require("@pusher/push-notifications-server");

let beamsClient = new PushNotifications({
  instanceId: process.env.BEAMS_INSTANCE_ID,
  secretKey: process.env.BEAMS_SECRET_KEY
});

// /** ADD task TO DATABASE
//  * @param task = {name: "name of task", groupId: id of group it belongs to, "price": price of the task, "quantity": how much of the amount}, this is gathered from the @param req.body
//  * @return id = task ID primary key in tasks table (e.g. 1, 3, 22, etc.);
//  * ID is generated upon task creation
//  * @param task.name is the name of the task. Not nullable.
//  * @param task.groupId is the id of the group. Not nullable.
//  * @param task.purchasedBy is the user who purchased the task. Nullable.
//  * @param task.purchased is to show is this task purchased or not.
//  * @param task.price is the price of the task. Not nullable.
//  * @param task.quantity is the quantity of the task. Not nullable.
//  * @param task.measurement is the measurement/unit of the task. (e.g. lbs, bushels). Nullable.
//  * @param task.purchasedOn is the date that the task was purchased on. Nullable.
//  *
//  * ***********************************************/

router.use(checkJwt);

/** ADD task
 * @TODO Add middleware to ensure user is logged in
 * /** Each time an task is added to a group, a notification should fire for that group's channel
 * Additionally, the event should be stored into the notifications table for future review
 * The notifications table will need to contain a record of the:
 *      userID
 *      groupID
 *      time of action
 *      type of action
 *
 */
router.post("/", (req, res) => {
  const task = req.body;
  let { groupID } = task;

  taskDb
    .add(task)
    .then(id => {
      // get group and user information for notification
      // we can assume the user in req.user is performing this action via checkJwt
      let notification = {};
      // can we abstract this into a function?
      userDb.getProfileByEmail(req.user.email).then(user => {
        notification.userID = user[0].id;
        notification.userName = user[0].name;

        groupDb.getById(groupID).then(group => {
          notification.groupID = group[0].id;
          notification.groupName = group[0].name;
          notification.action = "add-task";
          notification.content = `${notification.userName} added ${
            task.name
          } to the ${notification.groupName} chores list.`;

          pusher.trigger(`group-${groupID}`, "add-task", {
            message: `${notification.userName} added ${task.name} to the ${
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
                  title: `New task Added`,
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
              .json({ message: `task successfully added`, id: id[0] });
          });
        });
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
});

/**************************************************/

/** GET task BY ID
 * @TODO Add middleware to ensure user is logged in
 * **/

/**************************************************/
router.get("/:id", (req, res) => {
  const { id } = req.params;

  taskDb
    .getById(id)
    .then(task => {
      if (task.length >= 1) {
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

  taskDb
    .getByGroup(id)
    .then(task => {
      if (task.length >= 1) {
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
  taskDb
    .get()
    .then(tasks => {
      if (tasks.length >= 1) {
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
