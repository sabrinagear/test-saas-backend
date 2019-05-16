const express = require('express')
const commentRouter = express.Router()
const commentDb = require('../../data/helpers/commentDb')

// Create and Save a new Comment
exports.get = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Comment content can not be empty"
        });
    }

    // Create a Comment
    const comment = new Comment({
        title: req.body.title || "Untitled comment", 
        content: req.body.content
    });

    // Save Comment in the database
    comment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Comment."
        });
    });
};

// Retrieve and return all comments from the database.
exports.findAll = (req, res) => {
    Comment.find()
    .then(comments => {
        res.send(comments);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comments."
        });
    });
};

// Find a single comment with a commentId
exports.findOne = (req, res) => {
    Comment.findById(req.params.commentId)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });            
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving commment with id " + req.params.commentId
        });
    });
};

// Update a comment identified by the commentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Comment content can not be empty"
        });
    }

    // Find comment and update it with the request body
    Comment.findByIdAndUpdate(req.params.commentId, {
        title: req.body.title || "Untitled Comment",
        content: req.body.content
    }, {new: true})
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Error updating comment with id " + req.params.commentId
        });
    });
};

// Delete a comment with the specified commentId in the request
exports.delete = (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });
        }
        res.send({message: "Commnet deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete comment with id " + req.params.commentId
        });
    });
};

//testing