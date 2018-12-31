var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.locals.connection.query('SELECT * from users', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

/* Create new User. */
router.post('/create', function (req, res, next) {
    var insertSql = "insert into users(name,age,comment)" +
        " values('" + req.body.name + "','" +req.body.age + "','" +req.body.age+ "')";
    res.locals.connection.query(insertSql, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});


/* Edit User. */
router.post('/edit', function (req, res, next) {
    var sql = "update users" +
        " set name='" + req.body.name
        + "',age='"+ req.body.age
        + "',comment='"+ req.body.comment
        + "' where id = '" +req.body.id + "'";
    console.log('edit user sql:' + sql);
    res.locals.connection.query(sql,
        function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        }
    );
});

/* Delete User. */
router.post('/delete', function(req, res, next) {
    var deleteSql = "DELETE from users where id = '"+req.body.id + "'";
    res.locals.connection.query(deleteSql, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

module.exports = router;
