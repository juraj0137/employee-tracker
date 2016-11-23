/**
 * Created by jkubala on 11/20/16.
 */

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
require('babel-register');

const Employee = require('../../base/model/employee').default;
const config = require('../config').config;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../http-server');
const should = chai.should();

chai.use(chaiHttp);

describe('Employees', () => {

    beforeEach((done) => {

        //Before each test we empty the database
        Employee.remove({}, () => {
            done();
        });
    });


    /*
     * Test the /GET route
     */
    describe('/GET employee', () => {
        it('it should GET all employees', (done) => {
            chai.request(server)
                .get(`/${config.customer.ID}/api/employee`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    /*
     * Test the /POST route
     */
    describe('/POST employee', () => {
        it('it should not POST a employee without name field', (done) => {

            const employee = {
                email: "lord@rings.com",
                address: "Some amazing address",
            };

            chai.request(server)
                .post(`/${config.customer.ID}/api/employee`)
                .send(employee)
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('name');
                    res.body.errors.name.should.have.property('message').eql("Path `name` is required.");
                    done();
                });
        });

        it('it should POST a employee ', (done) => {
            const employee = {
                name: "Lord of Rings",
                email: "lord@rings.com",
                address: "Some amazing address",
            };

            chai.request(server)
                .post(`/${config.customer.ID}/api/employee`)
                .send(employee)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Employee successfully added!');
                    res.body.employee.should.have.property('name');
                    res.body.employee.should.have.property('email');
                    res.body.employee.should.have.property('phone');
                    res.body.employee.should.have.property('address');
                    done();
                });
        });
    });

    /*
     * Test the /DELETE route
     */
    describe('/DELETE employee', () => {
        it('it should DELETE all employees', (done) => {

            const employee1 = new Employee({
                name: "Lord of Rings",
                email: "lord@rings.com",
                address: "Some amazing address",
            });

            const employee2 = new Employee({
                name: "Lord of Rings",
                email: "lord@rings.com",
                address: "Some amazing address",
            });

            function deleteAll(done) {
                chai.request(server)
                    .delete(`/${config.customer.ID}/api/employee`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Employees successfully deleted!');
                        res.body.should.have.property('employees');
                        res.body.employees.should.be.a('array');
                        res.body.employees.length.should.be.eql(2);

                        done();
                    });
            }

            employee1.save(() => {
                employee2.save(() => {
                    chai.request(server)
                        .get(`/${config.customer.ID}/api/employee`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(2);

                            deleteAll(done);
                        });
                });
            });

        });
    });

    /*
     * Test the /PUT route
     */
    describe('/PUT employee', () => {
        it('it should UPDATE all employees', (done) => {

            const employee1 = new Employee({
                name: "Lord of Rings",
                email: "lord@rings.com",
                address: "Some amazing address",
            });

            const edited = employee1.toJSON();
            edited.name = "Edited name";

            employee1.save(() => {
                chai.request(server)
                    .put(`/${config.customer.ID}/api/employee`)
                    .send([edited])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Employees successfully updated!');
                        done();
                    });
            });

        });
    });


    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id employee', () => {
        it('it should GET an employee by the given id', (done) => {

            const employee = new Employee({
                name: "Lord of Rings",
                email: "lord@rings.com",
                address: "Some amazing address",
            });

            employee.save(() => {
                chai.request(server)
                    .get(`/${config.customer.ID}/api/employee/${employee.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('email');
                        res.body.should.have.property('address');
                        res.body.should.have.property('_id').eql(employee.id);
                        done();
                    });
            });

        });
    });


    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id employee', () => {

        it('it should not UPDATE an employee given the wrong id', (done) => {
            chai.request(server)
                .put(`/${config.customer.ID}/api/employee/randomWrongId`)
                .send({name: "Lord of Rings", email: "lord@rings.com", address: "Some amazing address"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('CastError');
                    done();
                });
        });

        it('it should not UPDATE an employee given the id if does not exist', (done) => {
            chai.request(server)
                .put(`/${config.customer.ID}/api/employee/583349ac22c6662e0a5845a0`)
                .send({name: "Lord of Rings", email: "lord@rings.com", address: "Some amazing address"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Employee does not exist!');
                    done();
                });
        });

        it('it should UPDATE an employee given the id', (done) => {

            const employee = new Employee({
                name: "Lord of Rings",
                email: "lord@rings.com",
                address: "Some amazing address",
            });

            const edited = employee.toJSON();
            edited.name = "Edited name";

            employee.save((err, employee) => {
                chai.request(server)
                    .put(`/${config.customer.ID}/api/employee/${employee.id}`)
                    .send(edited)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Employee successfully updated!');
                        done();
                    });
            });

        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id employee', () => {

        it('it should not DELETE an employee given the wrong id', (done) => {
            chai.request(server)
                .delete(`/${config.customer.ID}/api/employee/randomWrongId`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('CastError');
                    done();
                });
        });

        it('it should DELETE an employee given the id', (done) => {

            const employee = new Employee({
                name: "Lord of Rings",
                email: "lord@rings.com",
                address: "Some amazing address",
            });

            employee.save((err, employee) => {
                chai.request(server)
                    .delete(`/${config.customer.ID}/api/employee/${employee.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Employee successfully deleted!');
                        done();
                    });
            });

        });

    });
});
