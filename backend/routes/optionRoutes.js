// Import express
const express = require('express');

// Import functions from controller
const options = require("../controllers/options.js");

// Init express router
const router = express.Router({ mergeParams: true });

// Get All Options for a Question
router.get('/', options.showOptions);

// Create Options for a Question
router.post('/', options.createOptions);

// Delete a single Option
router.delete('/:id', options.deleteOption);

// Update Option's vote by one
router.put('/:id/vote', options.updateOptionVoteCount);

// Export router
module.exports = router;
