//  Use db connection
const db = require("../config/db.js");

// Get All Options by Question id
exports.getOptionsByQuestionId = (question_id, result) => {
  db.query("SELECT * FROM options WHERE question_id = ?", [question_id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

// Get Single Option
exports.getOptionById = (id, result) => {
  db.query("SELECT * FROM options WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
}

// Insert Option
exports.insertOption = (data, result) => {
  db.query("INSERT INTO options SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

// Update Option Text
exports.updateOptionById = (data, id, result) => {
  db.query("UPDATE options SET text = ? WHERE id = ?", [data.text, id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

// Update Option's vote count by one
exports.increaseOptionVoteCount = (id, result) => {
  db.query("UPDATE options SET vote_count = vote_count + 1 WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

// Delete Option
exports.deleteOptionById = (id, result) => {
  db.query("DELETE FROM options WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}
