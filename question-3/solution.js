/**
 * Функция, которая из произвольного входящего массива выбирает все комбинации чисел,
 * сумма которых будет равна 10.
 *
 * @param {Array} A Произвольный входящий массив.
 * @return {Array} combinations Массив содержащий комбинации чисел, суммы которых равны 10.
 */
var solution = function (A) {
    
    /**
     * Рекурсивная функция, которая находит все комбинации чисел из list,
     * сумма которых будет равна sum.
     *
     * @param {Array} list Произвольный входящий массив.
     * @param {Number} sum Чему должна быть равна сумма чисел комбинации.
     * @return {Array} result Массив содержащий комбинации чисел, суммы которых равны sum.
     */
    var _findCombinationsRecursive = function (list, sum) {

        var result = [];
        
        list.forEach(function (current, index) {

            var tails = [];

            if (current === sum) {
                result.push(current);
            } else if (current < sum) {
                tails = _findCombinationsRecursive(
                    list.slice(index + 1),
                    sum - current
                );
                tails = tails.map(function (item) {
                    return [current].concat(item);
                });
                result = result.concat(tails);
            }

        });
 
        return result;

    };
    
    /**
     * Предфильтрация чисел
     */
    var list = A.filter(function (item) {
        return item <= 10;
    });
    
    var combinations = _findCombinationsRecursive(list, 10);

    /**
     * Постфильтрация чисел: удаляет дубли, сортирует числа внутри комбинаций.
     * Дубли возникают, если исходный массив содержит не уникальные элементы,
     * фильтрацию лучше провести здесь для экономии ресурсов (если обрабатывать
     * этот случай внутри _findCombinationsRecursive, прийдется фильтровать на
     * каждом шаге рекурсии).
     */
    var combinationsInString = [];
    combinations = combinations.map(function (item, index) {
        item = item.sort();
        combinationsInString[index] = item.toString();
        return item;
    }).filter(function (item, index) {
        item = item.toString();
        return combinationsInString.indexOf(item) === index;
    });
    
    return combinations;
    
};