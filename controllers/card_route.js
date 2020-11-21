const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "dbTest",
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
const addCard = async (req, res) => {
  console.log(req.body);
  let {
    card_idx,
    card_limit,
    card_type,
    card_reqdate,
    card_payment,
    customer_idx,
    account_idx
  } = req.body;

  console.log(card_idx, card_limit, card_type, card_reqdate, card_payment, customer_idx, account_idx);

  await connection.query(
    'insert into card values("' +
      card_idx +
      '", "' +
      card_reqdate +
      '", "' +
      card_limit +
      '", "' +
      card_payment +
      '", "' +
      card_type +
      '", "' +
      customer_idx +
      '", "' +
      account_idx +
      '")'
  );

  readCard(req, res);
};

// READ
const readCard = (req, res) => {
  console.log(req.body);
  connection.query("select * from card", (error, results, fields) => {
    if (error) res.send(error);
    else {
      console.log(`${JSON.stringify(results)} data received!`);
      res.send(JSON.stringify(results));
    }
  });
};

// UPDATE
const updateCard = (req, res) => {
  const { idx } = req.params;
  let {
    card_idx,
    card_limit,
    card_type,
    card_reqdate,
    card_payment,
    customer_idx,
    account_idx
  } = req.body;

  // 특수한 함수를 사용하면 좀 덜 복잡하게 할 수 있을 거 같긴 한데...
  // 생년월일은 포맷을 맞추어줘야 할 듯 하다.
  connection.query(
    "update card set " +
      'card_idx = "' +
      card_idx +
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
      '", ' +
      'customer_idx = "' +
      customer_idx +
      '", ' +
      'account_idx = "' +
      account_idx +
      '" where card_idx = "' + idx +'"'
  );
  readCard(req, res);
};

// DELETE
const deleteCard = (req, res) => {
  const { idx } = req.params;

  connection.query('delete from card where card_idx = "' + idx + '"');
  readCard(req, res);
};

module.exports = {
  getCardPage,
  addCard,
  readCard,
  updateCard,
  deleteCard,
};
