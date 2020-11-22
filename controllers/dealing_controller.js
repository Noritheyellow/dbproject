const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "dbproject",
  dateStrings: "date",
});

connection.connect();

const getDealingPage = (req, res, next) => {
  res.render("pages/main", {
    user: "testUser",
    photo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    page: "dealing",
  });
};

// CREATE(ADD) 요청이 발생할 때, 요청자의 id와 accountid를 같이 insert 해주자.
const addDealing = (req, res) => {
  let {
    dealing_idx,
    amount,
    balance,
    deposit_date,
    withdrawl_date,
    account_type,
    account_idx,
    account_detail,
  } = req.body;
  connection.query(
    `INSERT INTO dealing(dealing_idx, amount, balance, withdrawl_date, deposit_date, account_idx, account_type, account_detail) 
    VALUES("${dealing_idx}","${amount}","${balance}","${withdrawl_date}","${deposit_date}","${account_idx}","${account_type}","${account_detail}")`
  );

  readAllDealing(req, res);
};

// READ ALL
const readAllDealing = (req, res) => {
  connection.query("select * from dealing", (error, results, fields) => {
    if (error) res.send(error);
    else {
      console.log(`${JSON.stringify(results)} data received!`);
      res.send(JSON.stringify(results));
    }
  });
};

// READ
const readDealing = (req, res) => {
  const { idx } = req.params;
  console.log(req.body);
  connection.query(`select * from dealing WHERE dealing_idx=${idx}`, (error, results, fields) => {
    if (error) res.send(error);
    else {
      console.log(`${JSON.stringify(results)} data received!`);
      res.send(JSON.stringify(results));
    }
  });
};

// UPDATE
const updateDealing = (req, res) => {
  console.log(req.body);
  const { idx } = req.params;
  let {
    dealing_idx,
    amount,
    balance,
    deposit_date,
    withdrawl_date,
    account_type,
    account_idx,
    account_detail,
  } = req.body;

  connection.query(
    `UPDATE dealing 
    SET dealing_idx = "${dealing_idx}", amount = "${amount}", balance = "${balance}", withdrawl_date = "${withdrawl_date}", 
      deposit_date = "${deposit_date}", account_idx = "${account_idx}", account_type = "${account_type}", account_detail = "${account_detail}"
    WHERE dealing_idx = "${idx}"`
  );
  readAllDealing(req, res);
};

// DELETE
const deleteDealing = (req, res) => {
  const { idx } = req.params;

  connection.query(`DELETE FROM dealing WHERE dealing_idx = "${idx}"`);
  readAllDealing(req, res);
};

module.exports = {
  getDealingPage,
  addDealing,
  readAllDealing,
  readDealing,
  updateDealing,
  deleteDealing,
};
