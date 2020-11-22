const express = require('express');
const router = express.Router();
const homeFunctions = require('../controllers/route.js');
const fetch = require('node-fetch');


router.get("/",function(req,res){
  let countThisYearDeal;
  let countLastYearDeal;

  fetch('http://localhost:8080/dealing/year?year=2020')
  .then(res => res.json())
  .then(json => countThisYearDeal = json.length)
  .then(()=>{
    fetch('http://localhost:8080/dealing/year?year=2019')
    .then(res=> res.json())
    .then(json => countLastYearDeal = json.length)
    .then(()=>{
      res.render("pages/main",{
        user: "testUser",
        photo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        page: "home", 
        data: {
          countThisYearDeal: countThisYearDeal || 0,
          countLastYearDeal: countLastYearDeal || 0
        },
      })
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
});

router.post('/read', homeFunctions.postHomepage)

// connection.end();

module.exports = router;