const express = require('express')
const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({ message: 'pong depuis l’API' });
});


module.exports = router;
