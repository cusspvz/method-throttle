
/**
 * throttle - throttles provided fn for a specific time
 *
 * @param  {Function} fn      method that you wish to throttle
 * @param  {Integer}  time    amount of time that you want to ignore calls
 * @param  {mixed}    context object that will context into provided fn
 * @return {Function}         returned method will check if it can recall your
 *                            first method
 */
function throttle ( fn, time, context ) {
    var lock, args, asyncKey, destroyed

    var later = function () {
        // reset lock and call if queued
        lock = false
        if ( args ) {
            throttled.apply( context, args )
            args = false
        }
    }

    var checkDestroyed = function () {
        if ( destroyed ) {
            throw new Error( "Method was already destroyed" )
        }
    }

    var throttled = function () {
        checkDestroyed()

        if ( lock ) {
            // called too soon, queue to call later
            args = arguments
            return
        }

        // call and lock until later
        fn.apply( context, arguments )
        asyncKey = setTimeout( later, time )
        lock = true
    }

    throttled.destroy = function () {
        checkDestroyed()

        if ( asyncKey ) {
            clearTimeout( asyncKey )
        }

        destroyed = true
    }

    return throttled
}

module.exports = throttle
