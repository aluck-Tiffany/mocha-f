var math= require('../math.js')
var assert=require("assert")

describe('测试 math.js',function(){
    describe('测试 add 方法',function(){
        it('2+3',function(){
            assert.equal(math.add(2,3),5)
        })
        it('4+3',function(){
            assert.equal(math.add(4,3),7)
        })
    })

    describe('测试 minus 方法',function(){
        it('4-3',function(){
            assert.equal(math.minus(4,2),1)
        })
        it('5-2',function(){
                assert.equal(math.minus(5,2),3)
        })
    })
})