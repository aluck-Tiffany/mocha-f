const request = require('supertest');
const express = require('express');

const app = express();

app.get('/users', function(req, res) {
  res.status(200).json({ 1: 'john doe' },{ 2: ' anna boe' });
});

request(app)
  .get('/users')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });