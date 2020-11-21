/*
const cluster = require('cluster');
const os = require('os');
const uuid = require('uuid');
const port = process.env.PORT || 8080;
// 서버 확인용
const instanceID = uuid.v4();

// create Worker
const cpuCount = os.cpus().length; // Cpu 수
const workerCount = cpuCount/2; // 2개의 Container에 돌릴 예정, CPU 수 / 2

// Master
if(cluster.isMaster) {
    console.log(`Server ID : ${instanceID}`);
    console.log(`Server CPU no. : ${cpuCount}`);
    console.log(`Worker no. about to create : ${workerCount}`);
    console.log(`${workerCount}개의 워커가 생성됩니다.`);

    // Worker msg listener
    let workerMsgListener = msg => {
        let workerID = msg.worker_id;

        if (msg.cmd === 'MASTER_ID') {
            cluster.workers[workerID].send({cmd: 'MASTER_ID', master_id: instanceID});
        }
    }

    // CPU 수만큼 워커 생성
    for (let i = 0; i < workerCount; i++) {
        console.log(`create Worker [${i+1} / ${workerCount}]`);
        var worker = cluster.fork();

        // worker msg listener
        worker.on('message', workerMsgListener);
    }

    // Worker가 online 상태가 되었을 때
    cluster.on('online', worker => {
        console.log(`Worker online - Worker ID : [${worker.process.pid}]`);
    })

    // Worker가 죽었을 경우 다시 살림
    cluster.on('exit', worker => {
        console.log(`Worker dead - Dead Worker ID : [${worker.process.id}]`);
        console.log(`create Worker again`);
        var worker = cluster.fork();

        // worker msg listener
        worker.on('message', workerMsgListener);
    })
}
// Worker
else if(cluster.isWorker) {
    const express = require('express');
    const app = express();
    const route = require('./routes/route');
    let workerID = cluster.worker.id;
    let masterID;

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    // app.use('/', route);

    // Request masterID from master
    process.send({worker_id : workerID, cmd : 'MASTER_ID'});
    process.on('message', msg => {
        if (msg.cmd === 'MASTER_ID') {
            masterID = msg.master_id;
        }
    })

    app.get('/', (req, res, next) => {
        res.send(`Hello I'm Worker ${cluster.worker.id}
        running from ${masterID} server,
        Web Server in Ubuntu 20.04.1 LTS started!`);
    })

    app.get('/workerKiller', (req, res) => {
        cluster.worker.kill();
        res.send('Worker killer called');
    })

    let server = app.listen(port, () => {
        console.log(`Nodemon watching Web server in Ubuntu 20.04.1 LTS started at PORT:${server.address().port}`);
        console.log(`Hello I'm Worker ${cluster.worker.id} running from ${masterID} server`);
    });
}*/
require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes/route");
const customer_route = require("./routes/customer_route");
const card_route = require("./routes/card_route");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(express.static("node_modules"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", route);
app.use("/customer", customer_route);
app.use("/card", card_route);
// app.use('/account');
// app.use('/dealing');

const port = process.env.PORT || 8080;
let server = app.listen(port, () => {
  console.log(`Nodemon watching Web server in Ubuntu 20.04.1 LTS started at PORT:${port}`);
});
