'use strict'
var expect = require('chai').expect
var index = require('../dist/index.js')

describe('Javascript Testing...', () => {

    /*
    it('Should return Test', () => {
        var result = index.test()
        expect(result).to.equals('test')
    })
    */
   
})

require("../dist/example/TSExample.js").runTsExample()
.then(()=>{
    console.log("---Finsihed---")
})