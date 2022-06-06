// Import express
const express = require('express');

// Import functions from Controller
const questions = require("../controllers/questions.js");

// Init express router
const router = express.Router();

// Get All Qestions
router.get('/', questions.showQuestions);

// Get Single Question
router.get('/:id', questions.showQuestionById);

// Create new Question
router.post('/', questions.createQuestion);

// Delete Question
router.delete('/:id', questions.deleteQuestion);

// Export router
module.exports = router;
