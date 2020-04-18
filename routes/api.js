const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/init764119', function(req, res) {
    let data = {
        basic: {
            basicWeb: {
                isActive: true,
                money: 6000000
            },
            reponsive: {
                isActive: true,
                money: 0
            }
        },
        language: {
            mainLanguage: {
                isActive: true,
                money: 0
            },
            multiLanguage: {
                count: 0,
                money: 1000000
            }
        },
        search: {
            basic: {
                isActive: false,
                money: 0
            },
            advanced: {
                isActive: false,
                money: 1000000
            }
        },
        map: {
            basic: {
                isActive: false,
                money: 0
            },
            advanced: {
                isActive: false,
                money: 500000
            }
        },
        admin: {
            basic: {
                isActive: false,
                money: 1000000
            },
            decentralized: {
                isActive: false,
                money: 500000
            },
            email: {
                isActive: false,
                money: 500000
            }
        }
    }
    fs.writeFile('../pricelist/db/db.json', JSON.stringify(data), () => {
        res.send(JSON.stringify(data))
    });
});

router.get('/', function(req, res, next) {
    fs.readFile('../pricelist/db/db.json', (err, fd) => {
        if (err) {
            console.log(err);
            return
        };
        res.send(fd.toString());
    });
});

router.post('/', function(req, res, next) {
    fs.writeFile('../pricelist/db/db.json', JSON.stringify(req.body), () => {
        res.send('OKI');
    });
});

module.exports = router;