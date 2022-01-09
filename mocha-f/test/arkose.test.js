const request = require("supertest");
const app = require(process.env.SERVER_PATH);
const NEW_USER_NAME = 'bob zoe';

describe("API Test", function () {
  this.timeout('6000000');

it("returns JSON with a list of users", function (done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect([{ name: 'john doe', id: 1 }, { name: 'anna boe', id: 2 }],done)

    });
  


  it("endpoint /new returns expected text", function (done) {

    request(app)
                .get('/new')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect({text: 'welcome to the new page'},done)
    
  });

  it("endpoint /nonexisting returns 404 status", function (done) {
    
    request(app)
            .get('/nonexisting')
            .expect(404) 
            .end((err) => {
                  if (err) return done(err);
                  done();
              });

  });

  it("root path returns redirects", function (done) {
    request(app)
                .get('/')
                .expect(301) //expecting HTTP status code
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
  });

  it("adding new user to the list", function (done) {
    request(app)
              .post('/users')
              .send({name:NEW_USER_NAME})
              .expect(`${NEW_USER_NAME} has been added to the users list`)
              .end((err) => {
                  if (err) return done(err);
                  done();
              });
  });
});