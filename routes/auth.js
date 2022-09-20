var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
  const authDetails = req.body;
  if (authDetails) {
    if (authDetails.userName === 'admin' && authDetails.password === 'G3!C&idwju') {
      res.json({
        status: 'Success',
        token: 'WwsSuyieCXnKsRzwyCoKt29bavdFBSXGqZzRMYUJy4UqUiLqYEpwnF6fUxPhn3LBLP',
      });
    } else {
      res.status(403).send('Username or password wrong');
    }
  } else {
    res.status(400).send('Username and password missing');
  }
});

module.exports = router;
