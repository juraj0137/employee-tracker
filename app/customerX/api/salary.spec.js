/**
 * Created by jkubala on 11/20/16.
 */

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
require('babel-register');

const Salary = require('../../base/model/salary').default;
const Employee = require('../../base/model/employee').default;
const config = require('../config').config;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../http-server');
const should = chai.should();

chai.use(chaiHttp);

var employee = null;

const generateSalary = () => {
    return {
        employeeId: employee._id,
        salary: Math.random() * 2500
    };
};

describe('Salaries', () => {

    beforeEach((done) => {

        /*
         *  Before each test we empty the database and we create one employee
         */

        const saveNewEmployee = () => new Promise((resolve, reject) => {

            employee = new Employee({
                name: "Lord of Rings",
                email: "lord@rings.com",
                address: "Some amazing address",
            })
            employee.save((err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });

        const removeSalaries = () => new Promise((resolve, reject) => {
            Salary.remove({}, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });

        const removeEmployees = () => new Promise((resolve, reject) => {
            Employee.remove({}, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });

        Promise
            .all([removeSalaries(), removeEmployees()])
            .then(saveNewEmployee)
            .then(done)
            .catch(e => console.log(e));
    });


    /*
     * Test the /GET/:employeeId route
     */
    describe('/GET/:employeeId salary', () => {

        const currentDate = new Date();

        const dayAgo = new Date(currentDate);
        dayAgo.setDate(currentDate.getDate() - 1);

        const twoDaysAgo = new Date(currentDate);
        twoDaysAgo.setDate(currentDate.getDate() - 2);

        const saveSallaryPromise = (date) => new Promise((resolve, reject) => {

            date = date || currentDate;

            const salary = generateSalary();
            salary.date = date.toISOString();

            new Salary(salary).save((err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            })
        });

        it('it should GET all salaries of employee - empty case', (done) => {
            chai.request(server)
                .get(`/${config.customer.ID}/api/salary/${employee.id}`)
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('it should GET all salaries of employee', (done) => {

            Promise
                .all([saveSallaryPromise(), saveSallaryPromise()])
                .then(() => {
                    chai.request(server)
                        .get(`/${config.customer.ID}/api/salary/${employee.id}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(2);
                            done();
                        });
                })
                .catch(e => console.log(e));
        });

        it('it should GET all salaries of employee - from date', (done) => {
            Promise
                .all([saveSallaryPromise(currentDate), saveSallaryPromise(dayAgo), saveSallaryPromise(twoDaysAgo)])
                .then(() => {
                    chai.request(server)
                        .get(`/${config.customer.ID}/api/salary/${employee.id}?dateFrom=${dayAgo.toISOString()}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(2);
                            done();
                        });
                })
                .catch(e => console.log(e));
        });

        it('it should GET all salaries of employee - until date', (done) => {
            Promise
                .all([saveSallaryPromise(currentDate), saveSallaryPromise(dayAgo), saveSallaryPromise(twoDaysAgo)])
                .then(() => {
                    chai.request(server)
                        .get(`/${config.customer.ID}/api/salary/${employee.id}?dateTo=${dayAgo.toISOString()}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(1);
                            done();
                        });
                })
                .catch(e => console.log(e));
        });

        it('it should GET all salaries of employee - date interval', (done) => {
            Promise
                .all([saveSallaryPromise(currentDate), saveSallaryPromise(dayAgo), saveSallaryPromise(twoDaysAgo)])
                .then(() => {
                    chai.request(server)
                        .get(`/${config.customer.ID}/api/salary/${employee.id}?dateFrom=${dayAgo.toISOString()}&dateTo=${currentDate.toISOString()}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(1);
                            done();
                        });
                })
                .catch(e => console.log(e));
        });
    });

    /*
     * Test the /POST/:employeeId route
     */
    describe('/POST/:employeeId salary', () => {
        it('it should not POST a salary without salary field', (done) => {

            const salary = {
                employeeId: employee.id
            };

            chai.request(server)
                .post(`/${config.customer.ID}/api/salary/${salary.employeeId}`)
                .send(salary)
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('salary');
                    res.body.errors.salary.should.have.property('message').eql("Path `salary` is required.");
                    done();
                });
        });

        it('it should POST a salary ', (done) => {

            const salary = generateSalary();

            chai.request(server)
                .post(`/${config.customer.ID}/api/salary/${salary.employeeId}`)
                .send(salary)
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Salary successfully added!');
                    res.body.salary.should.have.property('_id');
                    res.body.salary.should.have.property('employeeId');
                    res.body.salary.should.have.property('date');
                    res.body.salary.should.have.property('salary');
                    done();
                });
        });
    });

    /*
     * Test the /DELETE route
     */
    describe('/DELETE salary', () => {
        it('it should DELETE all passed salaries', (done) => {

            const saveSallary = () => new Promise((resolve, reject) => {
                const salary = new Salary(generateSalary());
                salary.save((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve(salary);
                })
            });

            Promise
                .all([saveSallary(), saveSallary()])
                .then((salaries) => {
                    chai.request(server)
                        .delete(`/${config.customer.ID}/api/salary`)
                        .send(salaries)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('Salaries successfully deleted!');
                            res.body.should.have.property('salaries');
                            res.body.salaries.length.should.be.eql(2);
                            done();
                        });
                })
                .catch(e => console.log(e));

        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST salary', () => {
        it('it should return all salaries by query', (done) => {

            const saveSallary = () => new Promise((resolve, reject) => {
                const salary = new Salary(generateSalary());
                salary.save((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve(salary);
                })
            });

            Promise
                .all([saveSallary(), saveSallary()])
                .then((salaries) => {

                    const query = {
                        employeeIds: salaries.map(t => t.employeeId)
                    };

                    chai.request(server)
                        .post(`/${config.customer.ID}/api/salary`)
                        .send(query)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(2);
                            done();
                        });
                })
                .catch(e => console.log(e));

        });
    });

    /*
     * Test the /PUT route
     */
    describe('/PUT salary', () => {
        it('it should UPDATE all passed salaries', (done) => {

            const saveSallary = () => new Promise((resolve, reject) => {
                const salary = new Salary(generateSalary());
                salary.save((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve(salary);
                })
            });

            Promise
                .all([saveSallary(), saveSallary()])
                .then((salaries) => {

                    salaries = salaries.map(sallary => {
                        sallary.salary = 0;
                        return sallary
                    });

                    chai.request(server)
                        .put(`/${config.customer.ID}/api/salary`)
                        .send(salaries)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('Salaries successfully updated!');
                            res.body.should.have.property('salaries');
                            res.body.salaries.length.should.be.eql(2);
                            res.body.salaries[0].salary.should.be.eql(0);
                            done();
                        });
                })
                .catch(e => console.log(e));

        });
    });
});
