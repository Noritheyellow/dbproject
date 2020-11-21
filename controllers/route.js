const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "test",
});

connection.connect();

const getHomepage = (req, res, next) => {
  res.render("pages/main", {
    user: "testUser",
    photo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    page: "home",
  });
};

const postHomepage = (req, res) => {
  console.log(req.body);
  connection.query("select * from Customer", (error, results, fields) => {
    if (error) res.send(error);
    else {
      console.log(`${JSON.stringify(results)} data received!`);
      res.send(results);
    }
  });
};

module.exports = {
  getHomepage,
  postHomepage,
};
