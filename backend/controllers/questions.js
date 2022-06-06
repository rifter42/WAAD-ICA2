// Import functions from Question Model
const questionModel = require("../models/questionModel.js");

// Get All Questions
exports.showQuestions = (req, res) => {
  questionModel.getQuestions((err, results) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.json(results);
      }
  });
}

// Get Single Question
exports.showQuestionById = (req, res) => {
  questionModel.getQuestionById(req.params.id, (err, results) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.json(results);
      }
  });
}

// Create New Question
exports.createQuestion = (req, res) => {
  const data = req.body;
  // Check that Question title is not empty
  if (req.body.title.length === 0) {
    res.status(500).send({ err: "Question can't be empty"});
  }
  else {
    questionModel.insertQuestion(data, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
  }
}

// Update Question
exports.updateQuestion = (req, res) => {
  const data  = req.body;
  const id    = req.params.id;
  questionModel.updateQuestionById(data, id, (err, results) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.json(results);
      }
  });
}

// Delete Question
exports.deleteQuestion = (req, res) => {
  questionModel.deleteQuestionById(req.params.id, (err, results) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.json(results);
      }
  });
}
