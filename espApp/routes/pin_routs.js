const { Router } = require('express');
const os = require('os');
const dateFormat = require('dateformat');
const on1 = require('../models/on1');
const userRules = require('../models/userRules');
const onTime = require('../models/onTime.js');
const router = Router();

// /api/current_pin

router.get('/current_pin', async(req, res) => {
    try {
        const filter = {};
        const all = await on1.find();
        res.status(201).json(all[0].name)

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        console.log(error)
    }
});

// /api/change_pin

async function change(param, res) {
    try {
        await on1.deleteMany();

        const userNameSystem = os.userInfo().username

        var now = new Date();
        const time = dateFormat(now, "h:MM:ss TT");

        const new_pin = new on1({
            name: param,
            userName: userNameSystem,
            onTime: time
        });

        await new_pin.save();

        res.status(201).json({ message: 'Pin is changed!' })

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        console.log(error)
    }
}

async function operationUserData(res, req) {
    try {
        const userName = os.userInfo().username
        const typeSystem = os.type()
        const hostName = os.hostname()

        var now = new Date();
        const timeAll = dateFormat(now, "h:MM:ss TT");

        console.log(userName);
        console.log(typeSystem);
        console.log(hostName);

        const userDate = new userRules({
            userNameOs: userName,
            nameTypeOs: typeSystem,
            NameOfHost: hostName,
            allTime: timeAll
        });

        await userDate.save();

        res.status(201).json({ message: 'Pin is changed!' })

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        console.log(error)
    }
}

async function setTime(param, res) {
    try {
        var now = new Date();
        const timeAll = dateFormat(now, "h:MM:ss TT");
        const timeOn = new onTime({
            time: timeAll,
            name: param
        });
        await timeOn.save();
        res.status(201).json({ message: 'Pin is changed!' })
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        console.log(error)
    }
}

router.post('/change_white', async(req, res) => {
    change('white', res)
    console.log("white")
    operationUserData(res);
    setTime('white', res);
});

router.post('/change_red', async(req, res) => {
    change('red', res)
    operationUserData(res);
    setTime('red', res);
});

module.exports = router;