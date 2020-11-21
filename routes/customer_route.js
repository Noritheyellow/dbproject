const express = require('express');
const router = express.Router();
const planFunctions = require('../controllers/customer_route.js');

// start with /plan
// uuid를 사용하면 고유한 ID를 만들 수 있다. DB ID로 사용하면 유용할 듯
// route middleware 함수는 controller에 보낸다.
router.get('/', planFunctions.getCustomerPage);

router.post('/', planFunctions.addCustomer);

router.post('/read', planFunctions.readCustomer);

router.post('/update', planFunctions.updateCustomer);

// delete
router.post('/delete', planFunctions.deleteCustomer);

// put = 전체를 overwrite 한다. patch = 부분적으로 overwrite 한다.
// router.patch('/:id', (req, res) => {}));

module.exports = router;