const express = require('express');
const router = express.Router();
const cardFunctions = require('../controllers/card_route.js');

// start with /plan
// uuid를 사용하면 고유한 ID를 만들 수 있다. DB ID로 사용하면 유용할 듯
// route middleware 함수는 controller에 보낸다.
router.get('/', cardFunctions.getCardPage);

router.post('/', cardFunctions.addCard);

router.post('/read', cardFunctions.readCard);

router.post('/update', cardFunctions.updateCard);

// delete
router.post('/delete', cardFunctions.deleteCard);

// put = 전체를 overwrite 한다. patch = 부분적으로 overwrite 한다.
// router.patch('/:id', (req, res) => {}));

module.exports = router;