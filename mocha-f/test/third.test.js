const request = require('supertest');
const express = require('express');

const app = express();
const NEW_USER_NAME='John'

const err ='test failed'


app.get('/users', function(req, res) {
  res.status(200).json([]);
//   {1:'john boe',2:'anna boe'}]
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
     return res.status(200).json({message:`${NEW_USER_NAME} has been added to the users list`});
    
});

describe('third.test.js user API test', function() {

    describe('1.API Test returns JSON with a list of users', function() {
        
        it('should returns correct data',function(done) {
            request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(data => {
                if(! Array.isArray(data.body)){
                    throw new Error(err)
                }
                data.body.forEach(user=> {
                    if(user["name"]==='john doe'){
                        if (user["id"] !== 1)
                        {throw new Error(err)}
                    }
                    else if (user["name"]==='anna boe'){
                        if (user["id"] !== 2)
                        {throw new Error(err)}
                    }
                })
                done();
        })
            .catch(done)
    });
});

    describe('2.API Test endpoint /new returns expected text', function() {

        it('should returns correct JSON',function(done) {
            request(app)
                .get('/new')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(data=>{
                    if(data.body.text !== 'welcome to the new page'){
                        throw new Error(err)
                    }
                    done();
                })
                .catch(done)
        });

    });


    describe('3.respond with json user not found', function() {

        it('should properly handles nonexistent endpoints', function (done) {
        request(app)
            .get('/nonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            // .expect('"user not found"') // expecting content value
            .then(data => {
                done();
            })
            .catch(done)
        });
        
    });

    describe('4.API Test root path returns redirects', function() {

        it('should properly handles redirects on a root path', function (done) {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(301) //expecting HTTP status code
                // .expect('"user not found"') // expecting content value
                .then(data=>done())
                .catch(done)
            }); 

    });

    let USER_NAME= NEW_USER_NAME
    describe('5.API Test adding new user to the list', function() {
        // console.log("USER_NAME",USER_NAME)
        it('should sending a POST request to the endpoint', function (done) {
          request(app)
              .post('/users')
              .send({'username':NEW_USER_NAME})
              .expect(200)
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect({message:`${NEW_USER_NAME} has been added to the users list`})
              .then(data=>done())
              .catch(done)
        });
    });


});