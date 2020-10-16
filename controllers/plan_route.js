const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1q2w3e4r!@',
    database : 'test'
});

connection.connect();

const getPlanningUsers = (req, res, next) => {
    res.render('pages/main', {
        user: "testUser",
        photo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        page: 'plan'
    });
}

const createPlanningUser = (req, res) => {
    console.log(req.body);
    connection.query('select * from planning_dept', (error, results, fields) => {
        if (error) res.send(error);
        else {
            console.log(`${JSON.stringify(results)} data received!`);
            res.send(JSON.stringify(results));
        }
    })
}

module.exports = {
    getPlanningUsers,
    createPlanningUser
}