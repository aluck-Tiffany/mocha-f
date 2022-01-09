const request = require('supertest');
const express = require('express');

const app = express();

const NEW_USER_NAME='John'

app.get('/users', function(req, res) {
  res.status(200).json({1: 'John',2:'Jane'});
});

app.get('/new', function(req, res) {
    res.status(200).json({text: 'welcome to the new page'});
  });

app.get('/nonexisting', function(req, res) {
    res.status(404).json('user not found');
  });

app.get('/', function(req, res) {
    res.status(301).json('Hello Home!');
  });

app.post('/users', function (req, res) {
     return res.status(201).json({message:`${NEW_USER_NAME} has been added to the users list`});
    
});


describe('first user API test', function() {

  it('1.API Test returns JSON with a list of users',function(done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect({1: 'John',2:'Jane'},done)
    });

  

  it('2.API Test endpoint /new returns expected text',function(done) {
      request(app)
        .get('/new')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({text: 'welcome to the new page'},done)
    });

    it('3.respond with json user not found', function (done) {
      request(app)
          .get('/nonexisting')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404) //expecting HTTP status code
          // .expect('"user not found"') // expecting content value
          .end((err) => {
              if (err) return done(err);
              done();
          });
      });    

    it('4.API Test root path returns redirects', function (done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(301) //expecting HTTP status code
            // .expect('"user not found"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
        }); 

        let USER_NAME = NEW_USER_NAME
        // console.log("USER_NAME",USER_NAME)
        it('5.API Test adding new user to the list', function (done) {
          request(app)
              .post('/users')
              .send({name:USER_NAME})
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect({message:`${USER_NAME} has been added to the users list`})
              .end((err) => {
                  if (err) return done(err);
                  done();
              });
        });

  });