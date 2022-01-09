const request = require('supertest');
const app = require('../app');

//==================== user API test ====================

/**
 * Testing get all user endpoint
 */

 describe('api From web', function () {

describe('1.GET /users', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a user endpoint by giving an existing user
 */
describe('2.GET /user/:id', function () {
    it('respond with json containing a single user', function (done) {
        request(app)
            .get('/users/U001')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a user endpoint by giving a non-existing user
 */
describe('3.GET /user/:id', function () {
    it('respond with json user not found', function (done) {
        request(app)
            .get('/users/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('"user not found"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post user endpoint
 */
describe.skip('4.POST /users', function () {
    let data = {
        "id": "1",
        "name": "dummy",
        "contact": "dummy",
        "address": "dummy"
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post user endpoint
 */
describe.skip('5.POST /users', function () {
    let data = {
        //no id
        "name": "dummy",
        "contact": "dummy",
        "address": "dummy"
    }
    it('respond with 400 not created', function (done) {
        request(app)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"user not created"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

});

