const {check, validationResult} = require("express-validator/check");
const express = require('express');
const router = express.Router();
const app = express();

const MAX_AGE = 999;
const LIMIT_DEFAULT = 10;

let userValidator = [
    check('name').not().isEmpty().withMessage('Name field is required.'),
    check('name').isLength({ max: 10 }).withMessage('Name field cannot be longer than 10 characters.'),
    check('age').not().isEmpty().withMessage('Age field is required.'),
    check('age').isNumeric().withMessage('Age field is invalid number format.'),
    check('age').isLength({ max: 3 }).withMessage('Age field cannot be longer than 3 characters.'),
    check('comment').not().isEmpty().withMessage('Comment field is required.'),
];

/* GET users listing. */
router.get('/', function (req, res, next) {
    let limit = req.query.limit;
    if (!limit) {
        limit = LIMIT_DEFAULT;
    }

    res.locals.connection.query('SELECT count(id) totalUsers from users', function (error, results, fields) {
        if (error) throw error;
        let totalUsers = results[0].totalUsers;
        res.locals.connection.query('SELECT * from users order by updatedate desc LIMIT ?', Number(limit), function (error, results, fields) {
            if (error) throw error;
            let response = {totalUsers: totalUsers, users: results};
            res.send(JSON.stringify(response));
        });
    });


});

/* Create new User. */
router.post('/create', userValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // res.status(422);
        res.send(JSON.stringify({ errors: errors.array() }));
    } else {
        const insertSql = 'insert into users(name,age,comment,createdate,updatedate) values(?,?,?,NOW(),NOW())';
        const values = [req.body.name, req.body.age, req.body.comment];
        res.locals.connection.query(insertSql, values, function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
    }
});


/* Age Plus. */
router.post('/agePlus', [check('id').not().isEmpty().withMessage('User Id is required.')],
    function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send(JSON.stringify({ errors: errors.array() }));
    } else {
        const sql = 'update users set age=(age + 1), updatedate=NOW() where id = ? and age < ? ';
        console.log('plus user age sql:' + sql);
        res.locals.connection.query(sql, [req.body.id, MAX_AGE],
            function (error, results, fields) {
                if (error) throw error;
                // if (results.message['Rows matched'] === '0') {
                //     res.send(JSON.stringify({ errors: [''] }));
                // }
                res.send(JSON.stringify(results));
            }
        );
    }
});

/* Delete User. */
router.post('/delete', [check('id').not().isEmpty().withMessage('User Id is required.')], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // res.status(422);
        res.send(JSON.stringify({errors: errors.array()}));
    } else {
        const deleteSql = 'DELETE from users where id = ?';
        res.locals.connection.query(deleteSql, req.body.id, function (error, results, fields) {
                if (error) throw error;
                res.send(JSON.stringify(results));
            }
        );
    }
});

module.exports = router;
