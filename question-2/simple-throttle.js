/**
 * Декоратор, который гарантирует исполнение callback'а не чаще, чем раз 
 * в timeLimit милисекунд.
 *
 * @param {Function} callback Произвольная функция, которую необходимо задекорировать.
 * @return {Number} timeLimit Количество милисекунд - минимальный интервал между
 * исполнением callback'ов.
 */
var throttle = function (callback, timeLimit) {

    var wait = false;

    return function () {

        if (!wait) {
            callback.apply(this, arguments);

            wait = true;
            setTimeout(function () {
                wait = false;
            }, timeLimit);
        }

    };

};