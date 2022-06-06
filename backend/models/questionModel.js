// Use db connection
const db = require("../config/db.js");

// Get All Questions
exports.getQuestions = (result) => {
  db.query("SELECT * FROM questions", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

// Get Single Question
exports.getQuestionById = (id, result) => {
  db.query("SELECT * FROM questions WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
}

// Insert Question
exports.insertQuestion  = (data, result) =>  {
  db.query("INSERT INTO questions SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

// Update Question
exports.updateQuestionById = (data, id, result) => {
  db.query("UPDATE questions SET title = ? WHERE id = ?", [data.title, id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

// Delete Question
exports.deleteQuestionById = (id, result) => {
  db.query("DELETE FROM questions WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}
