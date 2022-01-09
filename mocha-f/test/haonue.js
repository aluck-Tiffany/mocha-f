var math= require('../math.js')
var assert=require("assert")

const express = require('express');

describe('API Tests',function(){
    // 1.API Test returns JSON with a list of users
    describe('API Test returns JSON with a list of users',function(){
        
        const app = express();
        app.get('/users', function(req, res) {
            res.status(200).json({ 1: 'john doe' },{ 2: ' anna boe' });
          });
        
        it('returns correct data',
        function(){
            return request(app).get('/users')
            .expect('Content-Type', /json/)
            .expect(200, done);
        })

    })

    // 2. API Test endpoint /new returns expected text
    describe('API Test endpoint /new returns expected text',function(){
        it('4-3',function(){
            assert.equal(math.minus(4,3),1)
        })
        it('5-2',function(){
                assert.equal(math.minus(5,2),3)
        })
    })

    // 3.API Test endpoint /nonexisting returns 404 status
    describe('API Test endpoint /nonexisting returns 404 status',function(){
        it('4-3',function(){
            assert.equal(math.minus(4,3),1)
        })
        it('5-2',function(){
                assert.equal(math.minus(5,2),3)
        })
    })

    // 4.API Test root path returns redirects
    describe('API Test root path returns redirects',function(){
        it('4-3',function(){
            assert.equal(math.minus(4,3),1)
        })
        it('5-2',function(){
                assert.equal(math.minus(5,2),3)
        })
    })

    // 5.API Test adding new user to the list
    describe('API Test adding new user to the list',function(){
        it('4-3',function(){
            assert.equal(math.minus(4,3),1)
        })
        it('5-2',function(){
                assert.equal(math.minus(5,2),3)
        })
    })

})


