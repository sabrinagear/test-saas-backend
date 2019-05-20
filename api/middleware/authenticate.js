/**
 * @function authenticate 
 * @param {obj} req
 * @param {obj} res
 * @param {function} next
 * @description Compares decoded Firebase ID Token with user DB creds
 * @request Send uid from localStorage as the value of req.headers.authorization
 * @response 400 - No request body sent
 * @response 404 - Unauthorized due to mismatched credentials
 * @response 200 - Calls next()
 */

//! IMPORTANT: The configuration object passed into admin.initializeApp has to be a Firebase service account, which can only be passed in as a json file.  Therefore, this file has not been included in the version control timeline. I'm not sure how to config them in json extensions and for now it was just easier to gitignore the entire file. Because of this, please look for a DM from me with this given file and make sure to add the entire file to the .gitignore when testing.  The DATABASE_URL in the second key of the initializeApp method can be added to the .env file and I will also send that out.

//! DEPLOYMENT:  Whenever this is going to be redeployed, let me know and we can take care of how the config.json will be provided for Heroku.

const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(require('./config.json')),
  databaseURL: process.env.DATABASE_URL
})

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'Missing auth credentials.' })
  }

  const getUser = await admin
    .database()
    .ref(`users/${req.headers.authorization}`)


  getUser.on('value', snapshot => {
    const user = snapshot.val()
    user ? next() : res.status(404).json({ message: 'Unauthorized.' })
  })
}

module.exports = authenticate
