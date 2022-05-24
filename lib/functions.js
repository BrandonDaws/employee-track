const res = require('express/lib/response');
const db = require('../db/connection');
require('console.table');

const allDepartments = () => {
    const sql = 'SELECT * FROM department'

    db.query(sql, (err,res) => {
        if(err) throw err;
        console.table(res);
    });
};
