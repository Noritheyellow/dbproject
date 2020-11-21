const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "dbproject",
  dateStrings: "date",
});

connection.connect();

const getCardPage = (req, res, next) => {
  res.render("pages/main", {
    user: "testUser",
    photo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    page: "card",
  });
};

// CREATE(ADD) 요청이 발생할 때, 요청자의 id와 accountid를 같이 insert 해주자.
const addCard = (req, res) => {
  console.log(req.body);
  let { card_id, card_limit, card_type, card_reqdate, card_payment } = req.body;
  console.log(card_id, card_limit, card_type, card_reqdate, card_payment);
  connection.query(
    'insert into Card values("' +
      card_id +
      '", "' +
      card_limit +
      '", "' +
      card_type +
      '", "' +
      card_reqdate +
      '", "' +
      card_payment +
      '")'
  );

  readCard(req, res);
};

// READ
const readCard = (req, res) => {
  console.log(req.body);
  connection.query("select * from Card", (error, results, fields) => {
    if (error) res.send(error);
    else {
      console.log(`${JSON.stringify(results)} data received!`);
      res.send(JSON.stringify(results));
    }
  });
};

// UPDATE
const updateCard = (req, res) => {
  console.log(req.body);
  let { card_id, card_limit, card_type, card_reqdate, card_payment } = req.body;

  // 특수한 함수를 사용하면 좀 덜 복잡하게 할 수 있을 거 같긴 한데...
  // 생년월일은 포맷을 맞추어줘야 할 듯 하다.
  connection.query(
    "update Card set " +
      'card_id = "' +
      card_id +
      '", ' +
      'card_limit = "' +
      card_limit +
      '", ' +
      'card_type = "' +
      card_type +
      '", ' +
      'card_reqdate = "' +
      card_reqdate +
      '", ' +
      'card_payment = "' +
      card_payment +
      '"'
  );
  readCard(req, res);
};

// DELETE
const deleteCard = (req, res) => {
  console.log(req.body);
  const { customer_id } = req.body;
  console.log("check" + customer_id);

  connection.query('delete from Customer where customer_id = "' + customer_id + '"');
  readCard(req, res);
};

module.exports = {
  getCardPage,
  addCard,
  readCard,
  updateCard,
  deleteCard,
};
