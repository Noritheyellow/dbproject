const express = require("express");
const router = express.Router();
const dealingController = require("../controllers/dealing_controller");

// start with /plan
// uuid를 사용하면 고유한 ID를 만들 수 있다. DB ID로 사용하면 유용할 듯
// route middleware 함수는 controller에 보낸다.
router.get("/page", dealingController.getDealingPage);

router.post("/", dealingController.addDealing);

// 전체 조회
router.get("/", dealingController.readAllDealing);
// 1개 조회
router.get("/:idx", dealingController.readDealing);

router.put("/:idx", dealingController.updateDealing);

// delete
router.delete("/:idx", dealingController.deleteDealing);

module.exports = router;
