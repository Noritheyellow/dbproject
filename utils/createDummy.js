const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "dbproject",
  dateStrings: "date",
});
connection.connect();

const localList = ["서울", "경기", "강원", "경북", "경남", "전북", "전남", "충북", "충남", "제주"];
const jobList = ["교수", "학생", "웹개발자", "서버개발자", "앱개발자"];
const accountTypeList = ["정기예금", "장기적금", "일반", "보험", "단기적금"];
const cardTypeList = ["하이브리드", "체크", "신용"];

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const getRandomDate = (minYear, maxYear) => {
  const year = getRandomInt(minYear, maxYear);
  const month = getRandomInt(1, 12);
  const date = getRandomInt(1, 28);
  return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`;
};

const initDatabase = async () => {
  const accountList = [];

  await ["card", "dealing", "account", "customer"].forEach(async (item) => {
    await connection.query("SET foreign_key_checks = 0");
    await connection.query(`TRUNCATE ${item}`);
    await connection.query("SET foreign_key_checks = 1");
  });

  for (let i = 1; i <= 50; i++) {
    await connection.query(
      `INSERT INTO customer(customer_id, customer_name, customer_address, customer_birthday, customer_email, customer_phone, customer_job)
      VALUES(
        'test_id_${i}','test_name_${i}',
        '${localList[getRandomInt(1, 11) - 1]}','${getRandomDate(1988, 2005)}',
        'test_${i}@gmail.com',
        '010${getRandomInt(1000, 9999)}${getRandomInt(1000, 9999)}',
        '${jobList[getRandomInt(1, 6) - 1]}')`
    );
  }
  console.log("[RESET] customer success");

  for (let i = 1; i <= 100; i++) {
    let [account_date, account_balance, account_type, customer_idx, card_requested] = [
      getRandomDate(2010, 2015),
      getRandomInt(1000, 10001) * 100,
      accountTypeList[getRandomInt(1, 6) - 1],
      getRandomInt(1, 21),
      getRandomInt(0, 2),
    ];

    await connection.query(
      `INSERT INTO account( account_date, account_balance, account_type, customer_idx, card_requested) 
      VALUES("${account_date}","${account_balance}","${account_type}","${customer_idx}", "${card_requested}")`
    );

    accountList.push({
      account_idx: i,
      account_date,
      account_balance,
      account_type,
      customer_idx,
      card_requested,
    });
  }
  console.log("[RESET] account success");

  for (let i = 1; i <= 80; i++) {
    let [card_limit, card_type, card_reqdate, card_payment] = [
      getRandomInt(100, 5001) * 1000,
      cardTypeList[getRandomInt(1, 4) - 1],
      getRandomDate(2015, 2018),
      getRandomDate(2019, 2021),
    ];
    let result = accountList.filter((account) => account.card_requested === 1);
    let cardReqAccount = result[getRandomInt(1, result.length + 1) - 1];
    let { account_idx, customer_idx } = cardReqAccount;

    await connection.query(
      `INSERT INTO card(card_limit, card_type, card_reqdate, card_payment, account_idx, customer_idx)
      VALUES('${card_limit}','${card_type}','${card_reqdate}','${card_payment}','${account_idx}','${customer_idx}')`
    );
  }
  console.log("[RESET] card success");

  for (let i = 1; i <= 10000; i++) {
    let [withdrawl_date, deposit_date, account_detail] = [
      getRandomDate(2019, 2021),
      getRandomDate(2019, 2021),
      `사용내역${i}`,
    ];
    let index = getRandomInt(1, 101) - 1;
    let amount = getRandomInt(1, 100000);
    let balance, account_type;
    if (accountList[index].account_balance - amount > 0) {
      balance = accountList[index].account_balance - amount;
      account_type = "출금";
    } else {
      amount *= 10;
      balance = accountList[index].account_balance + amount;
      account_type = "입금";
    }
    accountList[index].account_balance = balance;

    await connection.query(
      `INSERT INTO dealing(amount, balance, withdrawl_date, deposit_date, account_idx, account_type, account_detail)
      VALUES('${amount}','${balance}','${withdrawl_date}','${deposit_date}','${accountList[index].account_idx}','${account_type}','${account_detail}')`
    );
  }
  console.log("[RESET] dealing success");

  return;
};
module.exports = initDatabase;
