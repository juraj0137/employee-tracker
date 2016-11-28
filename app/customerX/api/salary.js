/**
 * Created by jkubala on 11/20/16.
 */

import Salary from '../../base/model/salary';
import express from 'express';

const router = express.Router();

const getAllSalaries = (req, res) => {

    const queryParams = {employeeId: req.params.employeeId};

    if (typeof req.query.dateFrom == "string") {
        queryParams.date = queryParams.date || {};
        queryParams.date['$gte'] = new Date(req.query.dateFrom).toISOString();
    }

    if (typeof req.query.dateTo == "string") {
        queryParams.date = queryParams.date || {};
        queryParams.date['$lt'] = new Date(req.query.dateTo).toISOString();
    }
    
    const query = Salary.find(queryParams);
    query.exec((err, salaries) => {

        if (err)
            res.send(err);

        res.json(salaries);
    });
};

const createSalary = (req, res) => {

    const salary = new Salary(req.body);

    salary.save((err, salary) => {
        if (err)
            res.send(err);
        else
            res.json({message: "Salary successfully added!", salary});
    });
};

const deleteSalaries = (req, res) => {
    if (!(req.body instanceof Array)) {
        res.json({message: "You must send array of salaries!"});
    } else {
        const salaryIds = req.body.map(salary => salary._id);
        const query = Salary.find({_id: {$in: salaryIds}});
        query.exec((err, salaries) => {

            if (err)
                res.send(err);

            query.remove((err) => {
                if (err)
                    res.send(err);
                else
                    res.json({message: "Salaries successfully deleted!", salaries: salaries});
            });
        });
    }
};

const updateSalaries = (req, res) => {
    if (!(req.body instanceof Array)) {
        res.json({message: "You must send array of salaries!"});
    } else {
        const promises = req.body.map(salary => new Promise((resolve, reject) => {
            delete salary.__v;
            Salary.update({'_id': salary._id}, salary, {}, (err) => {
                if (err)
                    reject(err);
                else
                    resolve(salary);
            });
        }));

        Promise
            .all(promises)
            .then((salaries) => {
                res.json({message: "Salaries successfully updated!", salaries: salaries});
            })
            .catch(e => res.send(e));
    }
};

const getSalariesByQuery = (req, res) => {

    const queryParams = {};

    if (typeof req.body.dateFrom == "string") {
        queryParams.date = queryParams.date || {};
        queryParams.date['$gte'] = new Date(req.body.dateFrom.toString()).toISOString();
    }

    if (typeof req.body.dateTo == "string") {
        queryParams.date = queryParams.date || {};
        queryParams.date['$lt'] = new Date(req.body.dateTo).toISOString();
    }

    if (typeof req.body.employeeIds == "object") {
        queryParams.employeeId = {$in: req.body.employeeIds};
    }
    
    const query = Salary.find(queryParams);
    query.exec((err, salaries) => {

        if (err)
            res.send(err);

        res.json(salaries);
    });

};

router.route('/:employeeId')
    .post(createSalary)
    .get(getAllSalaries);

router.route('/')
    .post(getSalariesByQuery)
    .delete(deleteSalaries)
    .put(updateSalaries);

export default router;
