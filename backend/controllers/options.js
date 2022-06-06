// Import function from Options Model
const optionModel = require("../models/optionModel.js");

// Get All Options
exports.showOptions = (req, res) => {
  optionModel.getOptionsByQuestionId(req.params.question_id, (err, results) => {
      if (err) {
          res.status(500).send({ err: err});
      } else {
          res.json(results);
      }
  });
}

// Get Single Option
exports.showOptionById = (req, res) => {
  optionModel.getOptionById(req.params.id, (err, results) => {
      if (err) {
          res.status(500).send({ err: err});
      } else {
          res.json(results);
      }
  });
}

// Create Several New Options
exports.createOptions = (req, res) => {
  const question_id = req.body.question_id;
  const options = req.body.options_list;
  // Minimum and Maximum amount of Options for a Question
  if (options.length < 2 || options.length > 6) {
    res.status(500).send({ err: "Options minimum 2 and maximum 6"});
  } else {
    // Collect errors on Inserting
    const errs = [];
    // Attempt to Insert every Option
    options.forEach((option) => {
      const data = {question_id: question_id, text: option.text};
      // Check if Option's text is present
      if(data.text.length !== 0) {
        optionModel.insertOption(data, (err, results) => {
          if (err) {
            errs.push(err);
          }
        });
      } else {
        errs.push("Option text cannot be empty!");
      }
    });
    if (errs.length != 0) {
      res.status(500).send({ err: errs});
    } else {
      res.status(200);
    }
  }
}

// Create One New Option
exports.createOption = (req, res) => {
  const data = req.body;
  optionModel.insertOption(data, (err, results) => {
      if (err) {
          res.status(500).send({ err: err});
      } else {
          res.json(results);
      }
  });
}

// Update Option
exports.updateOption = (req, res) => {
  const data  = req.body;
  const id    = req.params.id;
  optionModel.updateOptionById(data, id, (err, results) => {
      if (err) {
          res.status(500).send({ err: err});
      } else {
          res.json(results);
      }
  });
}

//  Increase Option's vote_count by one
exports.updateOptionVoteCount = (req, res) => {
  optionModel.increaseOptionVoteCount(req.params.id, (err, results) => {
      if (err) {
          res.status(500).send({ err: err});
      } else {
          res.json(results);
      }
  });
}

// Delete Option
exports.deleteOption = (req, res) => {
  // First check how many options are in total
  optionModel.getOptionsByQuestionId(req.params.question_id, (err, results) => {
    if (err) {
        res.status(500).send({ err: err});
    } else {
        // Do not delete an option if there will be less than 2 after delete
        if (results.length <= 2) {
          res.status(500).send({ err: "Can't have less than two options!"});
        } else {
          optionModel.deleteOptionById(req.params.id, (err, results) => {
              if (err) {
                  res.status(500).send({ err: err});
              } else {
                  res.json(results);
              }
          });
        }
      }
  });
}
