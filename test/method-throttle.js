var throttle = require( '../src/method-throttle' )
var Promise = require( 'bluebird' )
var chai = require( 'chai' )
var expect = chai.expect
var sinon = require( 'sinon' )

describe( "method-throttle", function () {

    it( "should run 2x with 300ms interval, 100ms calls interval", function () {
        var method = sinon.spy()
        var throttled = throttle( method, 300 )

        return Promise.cast()
        .then( throttled )
        .delay( 100 )
        .then( throttled )
        .delay( 100 )
        .then( throttled )
        .delay( 100 )
        .then( throttled )
        .delay( 100 )
        .then( throttled )
        .delay( 100 )

        .then(function () {
            expect( method.callCount ).to.be.equal( 2 )
        })
    })

    it( "should call 1x if we call it without waiting", function () {
        var method = sinon.spy()
        var throttled = throttle( method, 200 )

        return Promise.cast()
        .then( throttled )
        .delay( 300 )

        .then(function () {
            expect( method.callCount ).to.be.equal( 1 )
        })
    })

    it( "should call 2x if we call it without waiting", function () {
        var method = sinon.spy()
        var throttled = throttle( method, 300 )

        return Promise.cast()
        .then( throttled )
        .then( throttled )
        .delay( 300 )

        .then(function () {
            expect( method.callCount ).to.be.equal( 2 )
        })
    })

    it( "should call same x we call if we call out of intervals", function () {
        var method = sinon.spy()
        var throttled = throttle( method, 300 )

        return Promise.cast()
        .then( throttled )
        .delay( 350 )
        .then( throttled )
        .delay( 350 )
        .then( throttled )

        .then(function () {
            expect( method.callCount ).to.be.equal( 3 )
        })
    })

    it( "should expose a .destroy method", function () {
        var method = sinon.spy()
        var throttled = throttle( method, 300 )
        expect( typeof throttled.destroy ).to.be.equal( 'function' )
    })

    it( "should throw an error if called after a destroy", function () {
        var method = sinon.spy()
        var throttled = throttle( method, 300 )

        throttled.destroy()

        expect( throttled ).to.throw( /destroyed/ )
    })

    it( "should throw an error if called destroy twice", function () {
        var method = sinon.spy()
        var throttled = throttle( method, 300 )

        throttled.destroy()

        expect( throttled.destroy ).to.throw( /destroyed/ )
    })
})
