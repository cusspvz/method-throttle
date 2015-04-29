
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
    var lock, args, wrapperFn, later;

    later = function () {
        // reset lock and call if queued
        lock = false;
        if ( args ) {
            wrapperFn.apply( context, args );
            args = false;
        }
    };

    wrapperFn = function () {
        if ( lock ) {
            // called too soon, queue to call later
            args = arguments;

        } else {
            // call and lock until later
            fn.apply( context, arguments );
            setTimeout( later, time );
            lock = true;
        }
    };

    return wrapperFn;
}

module.exports = throttle;
