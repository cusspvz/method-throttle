var throttle = require( '../lib/method-throttle.js' ),
    Promise = require( 'bluebird' ),
    chai = require( 'chai' ),
    expect = chai.expect,
    sinon = require( 'sinon' );

describe( "method-throttle", function () {

    it( "should run 2x with 300ms interval, 100ms calls interval", function () {
        var method = sinon.spy(),
            throttled = throttle( method, 300 );

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
            expect( method.callCount ).to.be.equal( 2 );
        });
    });

    it( "should call 1x if we call it without waiting", function () {
        var method = sinon.spy(),
            throttled = throttle( method, 200 );

        return Promise.cast()
        .then( throttled )
        .delay( 300 )

        .then(function () {
            expect( method.callCount ).to.be.equal( 1 );
        });
    });

    it( "should call 2x if we call it without waiting", function () {
        var method = sinon.spy(),
            throttled = throttle( method, 300 );

        return Promise.cast()
        .then( throttled )
        .then( throttled )
        .delay( 300 )

        .then(function () {
            expect( method.callCount ).to.be.equal( 2 );
        });
    });

    it( "should call same x we call if we call out of intervals", function () {
        var method = sinon.spy(),
            throttled = throttle( method, 300 );

        return Promise.cast()
        .then( throttled )
        .delay( 350 )
        .then( throttled )
        .delay( 350 )
        .then( throttled )

        .then(function () {
            expect( method.callCount ).to.be.equal( 3 );
        });
    });

});
