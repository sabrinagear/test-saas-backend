const express = require('express')
const inviteRouter = express.Router()
const groupMembersDb = require('../../data/helpers/groupMemberDb')
const usersDb = require('../../data/helpers/userDb')
const groupDb = require('../../data/helpers/groupDb')
const inviteDb = require('../../data/helpers/invitationDb')

const crypto = require('crypto')
const moment = require('moment')

// const  = require('../data/validators/checkJwt')
// const checkSubscription = require('../data/validators/checkSubscription')


/****************************************************************************************************/
/** THIS ROUTER HANDLES ALL REQUESTS TO THE /api/invite ENDPOINT **/
/****************************************************************************************************/

// @TODO ensures only logged in users can create invitations
// inviteRouter.use(checkJwt); // ensures only logged in users can create invitations
// ^ only use on case-by-case basis, as invite acceptance needs to be public

/**
 * Create new invitation
 * @return inviteCode = returns the invite code for the created invitation
 * @param groupId = the group ID the code will invite to
 * @param groupName = the name of the group being invited to
 * @param userId = the ID of the user who created the invitation
 * @param userName = the name of the user who created the invitation
 * @param inviteCode = randomly generated string identifier
 */


 //  CREATE INVITATION //
inviteRouter.post('/create', (req, res) => {
  let info = req.body // req.body should contain groupID, groupName, userID, userName from the front-end.

  const subType = req.subscriptionType

  let newCode = crypto.randomBytes(14).toString('hex')

  info.inviteCode = newCode

  let expiration = moment()
  .add(7, 'days')
  .format()
  info.expiration = expiration


// @ TODO allow limited amount of users per subscription type
  // Likely easier to do on groupMemberRoutes, will decide as team
//   groupMembersDb
//   .getByGroup(info.groupID)
//   .then(rs => {
//       console.log('RS => ', rs)
//       console.log('3')
//       if (subType === 1 && rs.length >= 2) {
//           return res
//           .status(403)
//           .json({
//               warning: `You do not have permission to do that. Only premium members can add more than two members.`
//             })
//         } else if (
//         (subType === 1 && rs.length < 2) ||
//         (subType === 2 && rs.length < 6)
//         ) {
            inviteDb
            .add(info)
            .then(status => {
                if (status.length >= 0) {
                    console.log('success!')
              return res
                .status(201)
                .json({
                  message: `New invitation created with code ${
                    info.inviteCode
                  }.`,
                  inviteCode: info.inviteCode
                })
            } else {
              return res
                .status(404)
                .json({ error: `Could not create invitation.` })
            }
          })
          .catch(err => {
            console.log(err)
            return res
              .status(500)
              .json({ message: 'Internal server error', data: err })
          })
    })


inviteRouter.get('/:code', (req, res) => {
  let inviteCode = req.params.code
  inviteDb
    .getByCode(inviteCode)
    .then(info => {
      if (info) {
        groupDb
          .getById(info[0].groupID)
          .then(group => {
            info[0].groupName = group[0].name // add group name to info
            usersDb
              .getById(info[0].userID)
              .then(user => {
                info[0].userName = user[0].name
                return res.status(200).json(info[0])
              })
              .catch(err => {
                console.log(err)
                return res
                  .status(404)
                  .json({
                    error: `Could not find a user with the specified ID.`
                  })
              })
          })
          .catch(err => {
            console.log(err)
            return res
              .status(404)
              .json({ error: `Could not find a group with the specified ID.` })
          })
      } else {
        return res.status(404).json({ error: `No invite matches that code.` })
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ error: `Internal server error.` })
    })
})


// ACCEPT INVITATION //
// if invitation is accepted, add new user to groupMembers db
inviteRouter.post('/join', (req, res) => {
  // req.body must contain the invitation code and the user's ID
  const { userId, inviteCode } = req.body

  // var newID = userID

  // @TODO check if user exists. otherwise, create new user
  // usersDb
  //   .getIdByEmail(req.user.email)
  //   .then(id => {
  //     if (!id || id.length === 0) {
  //       console.log('no user found, creating new user')

  //       let newUser = {
  //         email: req.user.email,
  //         name: req.user.name,
  //         profilePicture: req.user.picture
  //       }

  //       usersDb.add(newUser).then(id => {
  //         console.log('newuser ID', id[0])
  //         newID = id[0].id
  //       })
  //     } else {
  //       newID = id[0].id
  //     }
      let newMember = {}
      newMember.userId = userId // start constructing the newMember
      inviteDb.getByCode(inviteCode).then(invite => {
        if (invite[0].usedBefore === 0 || invite[0].usedBefore === false) {
          newMember.groupId = invite[0].groupID // the group ID that is in the invitation
          let invite_to_update = invite[0]
          invite_to_update.usedBefore = true // mark the invitation as having been visited
          inviteDb.update(invite[0].id, invite_to_update).then(status => {
            // add the new user into the database as a member of the given group ID
            groupMembersDb
            .getById(newMember.groupId, newMember.userId)
            .then(response => {
              if (response.length > 0) {
                // ensure that the user is not already a member of the group
                return res
                .status(400)
                .json({
                  message: `User is already a member of that group.`
                })
              }
              else {
                groupMembersDb.add(newMember).then(newId => {
                  return res
                  .status(201)
                  .json({
                    message: `New group member added with ID ${newId[0]}.`
                  })
                })
              }
            })
          })
        }
        else {
          return res
        .status(400)
        .json({ error: `That invitation is no longer valid.` })
        }
      }).catch(err => {
        return res
          .status(500)
          .json({ error: `Internal server error.`, data: err })
      })
    })



module.exports = inviteRouter