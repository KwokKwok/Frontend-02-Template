export default function add(a, b) {
    debuggerTest();
    return a + b;
}

/**
 * 不使用，以用来测试行覆盖率
 */
export function mul(a, b) {
    return a * b;
}


/**
 * 断点测试用
 */
function debuggerTest() {
    let arrayLike = {
        '0': 'T',
        '1': 'h',
        '2': 'i',
        '3': 'n',
        '4': 'k',
        length: 5
    };

    let array = Array.from(arrayLike);
    return array;
}