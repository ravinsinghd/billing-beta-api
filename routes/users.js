var express = require('express');
const { checkSchema, validationResult } = require('express-validator');

const dbo = require('../db/connection');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('users')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

router.post(
  '/',
  checkSchema({
    userName: { in: ['body'], errorMessage: 'Username is required', exists: true },
    email: { in: ['body'], errorMessage: 'Email is required', exists: true },
    password: { in: ['body'], errorMessage: 'Password is required', exists: true },
    role: { in: ['body'], errorMessage: 'Role is required', exists: true },
  }),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const dbConnect = db.getDb();
        const user = req.body;

        dbConnect.collection('users').insertOne(user, function (err, result) {
          if (err) {
            res.status(400).send('Error inserting matches!');
          } else {
            console.log(`Added a new match with id ${result}`);
            res.status(201).send(result.insertedId);
          }
        });
      } catch (exception) {
        console.log(exception.message);
        res.status(500).send(exception.message);
      }
    }
  }
);

module.exports = router;
