const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/groupMemberDb");

// checkJwt middleware authenticates user tokens and ensures they are signed correctly in order to access our internal API

/****************************************************************************************************/
/** THIS ROUTER HANDLES ALL REQUESTS TO THE /api/groupmember ENDPOINT **/
/****************************************************************************************************/

/** ADD GROUP MEMBER TO DATABASE
 * @param groupMember = {userID: ID of user, groupID: ID of the group the user is in}, this is gathered from the
 * req.body
 * @return id = group member ID primary key in groupMembers table (e.g. 1, 3, 22, etc.);
 * ID is generated upon groupMember creation
 * @param groupMember.userID is the id of the user
 * @param groupMember.groupID is the id of the group that user belongs to
 * @param groupMember.moderator is to determine whether the person is a moderator for the group or not
 * @param groupMember.weeklyNotification is to determine if the user has opt-in/out for weekly notifications for a
 * particular group
 * @param groupMember.monthlyNotification is to determine if the user has opt-in/out for monthly notifications for a
 * particular group
 * @param groupMember.total is the total gross amount of items they have spent
 * @param groupMember.net is the total net gross amount of items they have spent
 *
 * ***********************************************/

/** ADD GROUP MEMBER
 * @TODO Add middleware to ensure user is logged in
 * **/
router.post("/", (req, res) => {
  const groupMem = req.body;

  if (!groupMem.groupId || typeof groupMem.groupId !== "number")
    return res
      .status(404)
      .json({ message: `groupId does not exist or is invalid.` });
  if (!groupMem.userId || typeof groupMem.userId !== "number")
    return res
      .status(404)
      .json({ message: `userId does not exist or is invalid.` });

  db.add(groupMem)
    .then(id => {
      return res
        .status(200)
        .json({ message: `Group member added.`, id: id[0] });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Adding Group Member`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

/** GET GROUP MEMBER BY GROUP ID
 * @TODO Add middleware to ensure user is logged in
 * **/

/**************************************************/
router.get("/group/:id", (req, res) => {
  const { id } = req.params;

  db.getByGroup(id)
    .then(mem => {
      if (mem.length >= 1) {
        return res.status(200).json(mem);
      }
      return res
        .status(404)
        .json({ message: "The requested group members do not exist." });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Getting Group Member`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

/** GET GROUP MEMBER BY USER ID
 * @TODO Add middleware to ensure user is logged in
 * **/

/**************************************************/
router.get("/user/:id", (req, res) => {
  const { id } = req.params;

  db.getByUser(id)
    .then(mem => {
      console.log("get user groups", mem);
      if (mem.length >= 1) {
        return res.status(200).json({ data: mem });
      }

      return res
        .status(404)
        .json({ message: "The requested group members do not exist." });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Getting Group Member`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

/** GET GROUP MEMBER BY USER && GROUP ID
 * @TODO Add middleware to ensure user is logged in
 * **/

/**************************************************/
router.get("/getmember", (req, res) => {
  let groupMem = req.body;

  if (!groupMem.groupId || typeof groupMem.groupId !== "number")
    return res
      .status(404)
      .json({ message: `groupId does not exist or is invalid.` });
  if (!groupMem.userId || typeof groupMem.userId !== "number")
    return res
      .status(404)
      .json({ message: `userId does not exist or is invalid.` });

  db.getById(groupMem.groupId, groupMem.userId)
    .then(mem => {
      if (mem.length >= 1) {
        return res.status(200).json({ data: mem });
      }

      return res
        .status(404)
        .json({ message: "The requested group members do not exist." });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Getting Group Member`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

// GET ALL GROUP MEMBERS
/** @TODO This should be set to sysadmin privileges for group privacy **/

/**************************************************/

router.get("/", (req, res) => {
  db.get()
    .then(mems => {
      if (mems) {
        return res.status(200).json({ data: mems });
      }

      return res.status(404).json({ error: `No groups exist.` });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Getting All Group Members`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/
/**
 * UPDATE GROUP MEMBER
 * @TODO Add middleware to ensure users can only change their own group information
 */

/**************************************************/
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(status => {
      if (status.length >= 1) {
        return res
          .status(200)
          .json({ message: "Member successfully updated.", id: Number(id) });
      }
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Updating Group Member`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

/** DELETE GROUP MEMBER
 * @TODO Add middleware to prevent unauthorized deletions
 * **/

/**************************************************/

router.delete("/remove/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(status => {
      if (status.length >= 1) {
        return res
          .status(200)
          .json({ message: "Member successfully removed.", id: Number(id) });
      }
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Removing Group Member`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

/** GET GROUP MEMBER IDs BY USER ID
 * @TODO Add middleware to prevent unauthorized deletions
 * **/

/**************************************************/

router.get("/groups/user/:id", (req, res) => {
  const { id } = req.params;

  db.returnUserGroups(id)
    .then(status => {
      if (status.length >= 1) {
        return res.status(200).json({
          message: "Member group ID's successfully acquired.",
          id: Number(id)
        });
      }
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Getting Group Member Group ID's`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

module.exports = router;

/**************************************************/

/** TOGGLE ADMIN STATUS **/

/**************************************************/
router.put("/update/:groupId/:userId", (req, res) => {
  const { groupId, userId } = req.params;

  db.getById(groupId, userId)
    .then(mem => {
      const { isAdmin } = mem[0];

      if (mem.length >= 1) {
        db.toggleAdmin(groupId, userId, isAdmin)
          .then(toggledMember => {
            return res
              .status(200)
              .json({
                message: isAdmin
                  ? "Admin privileges revoked"
                  : "Admin privileges granted.",
                data: toggledMember
              });
          })
          .catch(err => {
            const error = {
              message: `Internal Server Error - Toggling Admin Status`,
              data: {
                err: err
              }
            };
            return res.status(500).json(error);
          });
      }
    })
    .catch(err => {
      return res
        .status(404)
        .json({
          message:
            "This user does not belong in that group, or that group does not exist.",
          error: err
        });
    });
});
