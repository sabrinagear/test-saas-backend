# ListMonkey.net - Lambda Labs Project
Labs is a 5 week section of the program that is given to all students to go into a real life project simulation of what its like working in a team making a website for real world experience.

- 1st week is planning and reviewing the project.
- 2nd week is building the BackEnd API and to prepare for the FrontEnd
- 3rd week is building the FrontEnd to connect to the BackEnd make sure its passing info properly
- 4th week is styling the site to make it look professional.
- 5th week is debugging any bugs fix any leftover styling or add any additional functionality

## What is ListMonkey.net?
ListMonkey is an application that allows user to make a private group to invite other users and assign them task to do, whether is be for a family household to keep track of what needs to get done or roommates to make sure all task are fair and equal. 

## The Server is deployed at this Link:
https://chore-monkey.herokuapp.com/

## Dependencies

- @pusher/push-notifications-server : 
- body-parser : allows you to access req.body from within your routes
- cors : package for providing a Express middleware that can be used to enable CORS
- dotenv : a zero-dependency module that loads environment variables from a .env file into process.env
- express : Node.js framework
- express-jwt : lets you authenticate HTTP requests using JWT tokens in your Node.js applications. Used to protect API endpoints.
- faker : for generating fake data to build and test the application
- firebase : N/A
- firebase-admin : N/A
- helmet : a Node.js module that helps you secure HTTP headers returned by your Express apps
- jwks-rsa : A library to retrieve RSA signing keys from a JWKS (JSON Web Key Set) endpoint.
- knex.js : SQL query builder
- moment : used to Parse, validate, manipulate, and display dates and times in JavaScript.
- morgan : a logger on any requests being made,it generates logs automatically.
- nodemailer : a module for Node.js applications to allow easy as cake email sending.
- nodemon : a utility that will monitor for any changes in your source and automatically restart your server.
- pg : Non-blocking PostgreSQL client for Node.js.
- pusher : is a hosted service that makes it super-easy to add real-time data and functionality to web and mobile applications.
- sqlite3 :  Library that implements SQL database engine
- stripe : Its software allows individuals and businesses to make and receive payments over the Internet.

## All Routes
- Billing : x
- commment : x
- Group Members : X 
- Group : x
- Invitation : x
- List : x
- Notifaction : x
- Subscription : x
- Task : x
- User : x

# Users Routes

## Get Users
Method URL: /api/users
HTTP method:[GET]

Response
200 (ok)

[{
    "id":1,
    "email":"thor@avengers.com",
    "name":"Thor",
    "uid":"uidstring0",
    "profilePicture":"https://i.imgur.com/M8kRKQC.png",
    "location":"Boise, Idaho",
    "phone":null,
    "coverPhoto":"https://source.unsplash.com/random",
    "subscriptionType":1,
} ,

{
    "id":1,
    "email":"thor@avengers.com",
    "name":"Thor",
    "uid":"uidstring0",
    "profilePicture":"https://i.imgur.com/M8kRKQC.png",
    "location":"Boise, Idaho",
    "phone":null,
    "coverPhoto":"https://source.unsplash.com/random",
    "subscriptionType":1,
}]


## Get Users by ID
Method URL: /api/users/:id
HTTP method:[GET]

Response
200 (ok)

{
    "id":1,
    "email":"thor@avengers.com",
    "name":"Thor",
    "uid":"uidstring0",
    "profilePicture":"https://i.imgur.com/M8kRKQC.png",
    "location":"Boise, Idaho",
    "phone":null,
    "coverPhoto":"https://source.unsplash.com/random",
    "subscriptionType":1,
}

## Add a User
Method URL: /api/users
HTTP method:[POST]
## Delete a User
Method URL: /api/users
HTTP method:[DELETE]
## Update a User
Method URL: /api/users
HTTP method:[PUT]

# Groups Routes

## Get Groups
Method URL: /api/group
HTTP method:[GET]

Response
200 (ok)

[{
    "id":1,
    "creatorId":1,
    "name":"Asgard castle rooms"
},
{
    "id":2,
    "creatorId":1,
    "name":"Asgard gardens"
}]

## Get Groups by ID
Method URL: /api/group/:id
HTTP method:[GET]

Response
200 (ok)

{
    "id":1,
    "creatorId":1,
    "name":"Asgard castle rooms"
}

## Delete Group
Method URL: /api/group/:id
HTTP method:[DELETE]
## Add a Group
Method URL: /api/group
HTTP method:[POST]
## Update Group
Method URL: /api/group/:id
HTTP method:[PUT]

# Tasks Routes

## Get tasks
Method URL: /api/tasks
HTTP method:[GET]

Response
200 (ok)

[{
    "id":1,
    "title":"polish hammers",
    "assignedTo":1,
    "groupId":1,
    "isComplete":0,
    "description":"dust particles tend to turn into glass when struck, really hard to remove later",
    "dueDate":"2100-05-05",

},
{
    "id":2,
    "title":"insulate beds",
    "assignedTo":4,
    "groupId":1,
    "isComplete":0,
    "description":"he tosses and strikes when he's dreaming",
    "dueDate":"2100-05-05",
}]

## Get task by ID
Method URL: /api/tasks/:id
HTTP method:[GET]

Response
200 (ok)

{
    "id":1,
    "title":"polish hammers",
    "assignedTo":1,
    "groupId":1,
    "isComplete":0,
    "description":"dust particles tend to turn into glass when struck, really hard to remove later",
    "dueDate":"2100-05-05",

}

## Delete Task
Method URL: /api/tasks/:id
HTTP method:[DELETE]
## Add Task
Method URL: /api/tasks
HTTP method:[POST]
## Update Task
Method URL: /api/tasks/:id
HTTP method:[PUT]
## Get Task by Group ID
Method URL: /api/tasks/group/:id
HTTP method:[GET]

# Billing Routes

## Post Billing

Method URL: /api/charge
HTTP method:[POST]

# Comments Routes

## Get Comments 
Method URL: /api/comments
HTTP method:[GET]
## Get Comment by ID 
Method URL: /api/comments/:id
HTTP method:[GET]
## Add Comment
Method URL: /api/comments
HTTP method:[POST]
## Delete Comment
Method URL: /api/comments/:id
HTTP method:[DELETE]
## Update Comment
Method URL: /api/comments/:id
HTTP method:[PUT]

# Group Members Routes

## Get Group Memebers 
Method URL: /api/groupmembers
HTTP method:[GET]
## Get Group Memebers by ID 
Method URL: /api/groupmembers/:id
HTTP method:[GET]
## Add a Group Memebers 
Method URL: /api/groupmembers/
HTTP method:[POST]
## Update/Edit a Group Member
Method URL: /api/groupmembers/:id
HTTP method:[PUT]
## Delete a Group Member
Method URL: /api/groupmembers/:id
HTTP method:[DELETE]

# Lists Routes 

## Get List
Method URL: /api/list
HTTP method:[GET]
## Get List by ID
Method URL: /api/list/:id
HTTP method:[GET]
## Add List
Method URL: /api/list
HTTP method:[POST]
## Delte a List
Method URL: /api/list/:id
HTTP method:[DELETE]
## Update/Edit a List
Method URL: /api/list/:id
HTTP method:[PUT]

# Notifaction Routes 

## Get all Notifacations
Method URL: /api/notification
HTTP method:[GET]
## Get all Notifacations by ID 
Method URL: /api/notification/:id
HTTP method:[GET]
## Get all Notifacations by User ID 
Method URL: /api/notification/user/:id
HTTP method:[GET]
## Add a Notifacations
Method URL: /api/notification
HTTP method:[POST]
## Update/Edit a Notifacation
Method URL: /api/notification/:id
HTTP method:[PUT]
## Delete Notifacation
Method URL: /api/notification/:id
HTTP method:[DELETE]

# Invite Routes

## Create Invitation 
Method URL: /api/invite/create
HTTP method:[POST]
## Accept Invitation 
Method URL: /api/invite/join
HTTP method:[POST]

# Subscription Routes 

## Get Subscriptions
Method URL: /api/subscription
HTTP method:[GET]
## Get Subscription by ID 
Method URL: /api/subscription/:id
HTTP method:[GET]
## Add a Subscriptions
Method URL: /api/subscription
HTTP method:[POST]
## Update/Edit a Subscription
Method URL: /api/subscription/:id
HTTP method:[PUT]
## Delete Subscriptions
Method URL: /api/subscription/:id
HTTP method:[DELETE]
