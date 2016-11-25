/**
 * Created by jkubala on 11/20/16.
 */
import express from 'express';
import Employee from '../../base/model/employee';

const router = express.Router();

/**
 * /api/employee
 */

const getEmployees = (req, res) => {

    const query = Employee.find({});
    query.exec((err, employees) => {

        if (err)
            res.send(err);

        res.json(employees);
    });
};

const postEmployee = (req, res) => {

    var employee = new Employee(req.body);

    employee.save((err, employee) => {
        if (err)
            res.send(err);
        else
            res.json({message: "Employee successfully added!", employee});
    });
};

const deleteEmployees = (req, res) => {
    const query = Employee.find({});
    query.exec((err, employees) => {

        if (err)
            res.send(err);

        query.remove((err) => {
            if (err)
                res.send(err);
            else
                res.json({message: "Employees successfully deleted!", employees: employees});
        });
    });
};

const updateEmployees = (req, res) => {

    let newEmployees = req.body;

    const update = () => {

        let newEmployee = newEmployees.pop();
        if (typeof newEmployee === "object") {

            delete newEmployee.__v;
            Employee.update({'_id': newEmployee._id}, newEmployee, {}, (err) => {
                if (err)
                    res.send(err);
                else
                    update();
            });
        } else {
            res.json({message: "Employees successfully updated!"});
        }
    };

    update();
};

router.route('/')
    .get(getEmployees)
    .post(postEmployee)
    .put(updateEmployees)
    .delete(deleteEmployees);

/**
 *
 * /api/employee/:id`
 */
const getEmployeeById = (req, res) => {
    Employee.findById(req.params.id, (err, employee) => {
        if (err)
            res.send(err);
        else
            res.json(employee);
    });
};

const updateEmployeeById = (req, res) => {
    Employee.update({'_id': req.params.id}, req.body, {}, (err, affectedDocs) => {
        if (err)
            res.send(err);
        else if (affectedDocs.n == 0)
            res.json({message: "Employee does not exist!"});
        else
            res.json({message: "Employee successfully updated!"});
    });
};
const deleteEmployeeById = (req, res) => {

    const query = Employee.find({'_id': req.params.id});

    query.remove((err) => {
        if (err)
            res.send(err);
        else
            res.json({message: "Employee successfully deleted!"});
    });
};

router.route('/:id')
    .put(updateEmployeeById)
    .delete(deleteEmployeeById)
    .get(getEmployeeById);


export default router;