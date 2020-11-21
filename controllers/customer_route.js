const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "dbproject",
  dateStrings: "date",
});

connection.connect();

const getCustomerPage = (req, res, next) => {
  res.render("pages/main", {
    user: "testUser",
    photo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    page: "customer",
  });
};

// CREATE(ADD)
const addCustomer = (req, res) => {
  console.log(req.body);
  let {
    customer_id,
    customer_name,
    customer_address,
    customer_birthday,
    customer_email,
    customer_phone,
    customer_job,
  } = req.body;
  console.log(
    customer_id,
    customer_name,
    customer_address,
    customer_birthday,
    customer_email,
    customer_phone,
    customer_job
  );
  console.log('insert into Customer values("' +
  customer_id +
  '", "' +
  customer_name +
  '", "' +
  customer_address +
  '", "' +
  customer_birthday +
  '", "' +
  customer_email +
  '", "' +
  customer_phone +
  '", "' +
  customer_job +
  '")');
  connection.query(
    'insert into customer(customer_id, customer_name, customer_address, customer_birthday, customer_email, customer_phone, customer_job) values("' +
      customer_id +
      '", "' +
      customer_name +
      '", "' +
      customer_address +
      '", "' +
      customer_birthday +
      '", "' +
      customer_email +
      '", "' +
      customer_phone +
      '", "' +
      customer_job +
      '")'
  );

  readCustomer(req, res);
};

// READ
const readCustomer = (req, res) => {
  console.log(req.body);
  connection.query("select * from Customer", (error, results, fields) => {
    if (error) {
      res.send(error);
      console.log(error);
    }
    else {
      console.log(`${results[0]["customer_birthday"]}`);
      console.log(`${JSON.stringify(results)} data received!`);
      res.send(JSON.stringify(results));
    }
  });
};

// UPDATE
const updateCustomer = (req, res) => {
  console.log(req.body);
  let {
    customer_id,
    customer_name,
    customer_address,
    customer_birthday,
    customer_email,
    customer_phone,
    customer_job,
  } = req.body;

  // 특수한 함수를 사용하면 좀 덜 복잡하게 할 수 있을 거 같긴 한데...
  // 생년월일은 포맷을 맞추어줘야 할 듯 하다.
  connection.query(
    "update Customer set " +
      'customer_name = "' +
      customer_name +
      '", ' +
      'customer_address = "' +
      customer_address +
      '", ' +
      'customer_birthday = "' +
      customer_birthday +
      '", ' +
      'customer_email = "' +
      customer_email +
      '", ' +
      'customer_phone = "' +
      customer_phone +
      '", ' +
      'customer_job = "' +
      customer_job +
      '" ' +
      'where customer_id = "' +
      customer_id +
      '"'
  );
  readCustomer(req, res);
};

// DELETE
const deleteCustomer = (req, res) => {
  console.log(req.body);
  const { customer_id } = req.body;
  console.log("check" + customer_id);

  connection.query('delete from Customer where customer_id = "' + customer_id + '"');
  readCustomer(req, res);
};

module.exports = {
  getCustomerPage,
  addCustomer,
  readCustomer,
  updateCustomer,
  deleteCustomer,
};
