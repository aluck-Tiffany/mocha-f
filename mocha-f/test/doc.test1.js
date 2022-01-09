const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({1: 'john doe' ,2: ' anna boe' });
});

describe('GET /user', function() {

    it('API Test returns JSON with a list of users',function(done) {
      request(app)
        .get('/user')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({1: 'john doe' ,2: ' anna boe' },done)
    });
});