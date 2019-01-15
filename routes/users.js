const {check, validationResult} = require("express-validator/check");
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const MAX_AGE = 999;
const LIMIT_DEFAULT = 10;
const session = require('express-session');
const TokenGenerator = require('uuid-token-generator');

let userValidator = [
    check('name').not().isEmpty().withMessage('Name field is required.'),
    check('name').isLength({max: 10}).withMessage('Name field cannot be longer than 10 characters.'),
    check('age').not().isEmpty().withMessage('Age field is required.'),
    check('age').isNumeric().withMessage('Age field is invalid number format.'),
    check('age').isLength({max: 3}).withMessage('Age field cannot be longer than 3 characters.'),
    check('comment').not().isEmpty().withMessage('Comment field is required.'),
];

/* GET users listing. */
router.get('/', checkAuth, function (req, res, next) {
    let limit = req.query.limit;
    if (!limit) {
        limit = LIMIT_DEFAULT;
    }

    res.locals.connection.query('SELECT count(id) totalUsers from users', function (error, results, fields) {
        if (error) throw error;
        let totalUsers = results[0].totalUsers;
        res.locals.connection.query('SELECT * from users order by createdate desc LIMIT ?', Number(limit), function (error, results, fields) {
            res.locals.connection.end();
            if (error) throw error;
            let response = {totalUsers: totalUsers, users: results};
            res.send(JSON.stringify(response));
        });
    });


});

/* Create new User. */
router.post('/create', checkAuth, userValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send(JSON.stringify({errors: errors.array()}));
    } else {
        const insertSql = 'insert into users(name,age,comment,createdate,updatedate) values(?,?,?,NOW(),NOW())';
        const values = [req.body.name, req.body.age, req.body.comment];
        res.locals.connection.query(insertSql, values, function (error, results, fields) {
            res.locals.connection.end();
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
    }
});


/* Age Plus. */
router.post('/agePlus', checkAuth, [check('id').not().isEmpty().withMessage('User Id is required.')],
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(JSON.stringify({errors: errors.array()}));
        } else {
            // Check current age user before adding.
            res.locals.connection.query('SELECT age from users where id = ?', req.body.id, function (error, results, fields) {
                if (error) throw error;
                let age = results[0].age;

                // In case age >= 999 return error.
                if (age >= MAX_AGE) {
                    res.locals.connection.end();
                    res.send(JSON.stringify({errors: [{'msg': 'Age field cannot be longer than 3 characters.'}]}));
                } else {
                    // In case age < 999, process adding age.
                    const sql = 'update users set age=(age + 1), updatedate=NOW() where id = ? ';
                    console.log('plus user age sql:' + sql);
                    res.locals.connection.query(sql, [req.body.id],
                        function (error, results, fields) {
                            res.locals.connection.end();
                            if (error) throw error;
                            res.send(JSON.stringify(results));
                        }
                    );
                }

            });
        }
    });

/* Delete User. */
router.post('/delete', checkAuth, [check('id').not().isEmpty().withMessage('User Id is required.')], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send(JSON.stringify({errors: errors.array()}));
    } else {
        const deleteSql = 'DELETE from users where id = ?';
        res.locals.connection.query(deleteSql, req.body.id, function (error, results, fields) {
            res.locals.connection.end();
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
    }
});

function checkAuth(req, res, next) {
    if (session.users && session.users[req.body.token]) {
        next();
    } else {
        next(createError(401));
    }
}

router.get('/my_secret_page', checkAuth, function (req, res) {
    res.send('if you are viewing this page it means you are logged in');
});

router.post('/login', function (req, res) {
    var post = req.body;
    if (post.user === 'admin' && post.password === 'admin') {
        const token = new TokenGenerator().generate(); // Default is a 128-bit token encoded in base58
        if (!session.users) {
            session.users = {};
        }
        session.users[token]= {user: 'admin'};
        res.send({loginResult:true, loginToken: token});
    } else {
        res.send({loginResult:false});
    }
});

module.exports = router;
