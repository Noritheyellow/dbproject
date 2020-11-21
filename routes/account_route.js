const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account_controller");

// start with /plan
// uuid를 사용하면 고유한 ID를 만들 수 있다. DB ID로 사용하면 유용할 듯
// route middleware 함수는 controller에 보낸다.
router.get("/", accountController.getAccountPage);

router.post("/", accountController.addAccount);

// 전체 조회
router.post("/readAll", accountController.readAllAccount);
// 1개 조회
router.get("/:idx", accountController.readAccount);

router.put("/:idx", accountController.updateAccount);

// delete
router.delete("/:idx", accountController.deleteAccount);

module.exports = router;
