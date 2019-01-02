const {check, validationResult} = require("express-validator/check");
const express = require('express');
const router = express.Router();
const app = express();

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
    res.locals.connection.query('SELECT * from users', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

/* Create new User. */
router.post('/create', userValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // res.status(422);
        res.send(JSON.stringify({ errors: errors.array() }));
    } else {
        const insertSql = "insert into users(name,age,comment)" +
            " values('" + req.body.name + "','" + req.body.age + "','" + req.body.comment + "')";
        res.locals.connection.query(insertSql, function (error, results, fields) {
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
        const sql = "update users" +
            " set age=(age + 1)"
            + " where id = '" + req.body.id + "'";
        console.log('plus user age sql:' + sql);
        res.locals.connection.query(sql,
            function (error, results, fields) {
                if (error) throw error;
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
        const deleteSql = "DELETE from users where id = '" + req.body.id + "'";
        res.locals.connection.query(deleteSql, function (error, results, fields) {
                if (error) throw error;
                res.send(JSON.stringify(results));
            }
        );
    }
});

module.exports = router;
