const main = document.querySelector('#main');

const button = main.querySelector('.button');
const inputStr = main.querySelector('.input-str input');
const froms = Array.from(main.querySelectorAll('input.from'));
const tos = Array.from(main.querySelectorAll('input.to'));

const modal = document.querySelector('#modal');
const output = modal.querySelector('.message');
const escButton = modal.querySelector('.esc');

const convSystem = [2, 8, 10, 16];
const deConvDigits = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15,
}
const convDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

function convCheck(input, from) {
    // console.log(from);
    for (const i of input) {
        // console.log(i, deConvDigits[i]);
        console.log(i, deConvDigits[i], from, i in convDigits, convDigits[deConvDigits[i]] == i);
        if (((deConvDigits[i] >= from) || !convDigits.includes(i)) && (i != '.')) return false;
    }
    return true;
}

function convTo10(str, from) {
    if (from == 10) return Number(str);
    let [int, fl] = str.split('.');
    let res = 0, base = 1;
    for (i = int.length - 1; i >= 0; --i) {
        res += deConvDigits[int[i]] * base;
        base *= from;
    }
    if (fl) {
        base = 1 / from;
        for (i = 0; i < fl.length; ++i) {
            res += deConvDigits[fl[i]] * base;
            base /= from
        }
    }
    console.log(res);
    return res;
}

function conv(num, to) {
    let int = Math.floor(num), fl = num - int, res = '';
    while(int) {
        res = convDigits[int % to].toString() + res;
        int = Math.floor(int / to);
    }
    res = res + '.';
    for (i = 1; i <= 5; ++i) {
        fl *= to;
        const tmp = Math.floor(fl);
        res = res + tmp.toString();
        fl -= tmp;
    }
    while (res[res.length - 1] == '0') {
        res = res.substring(0, res.length - 1);
        // console.log(res);
    }
    if (res[res.length - 1] == '.') res = res.substring(0, res.length - 1);
    return 'Result: ' + res;
}

function convHandle(str, from, to) {
    if (!str.length) return 'Error: You did it well :)';
    if (!convCheck(str, from)) return 'Error: Number digit(s) unexpected';
    return conv(convTo10(str, from), to);
}

escButton.addEventListener('click', (event) => {
    modal.setAttribute('style', 'display: none');
})

modal.addEventListener('click', (event) => {
    if (modal != event.target) return;
    modal.setAttribute('style', 'display: none');
})

button.addEventListener('click', function() {
    const input = inputStr.value;
    const from = froms.findIndex((from) => {
        if (from.checked) return true;
    }); 
    const to = tos.findIndex((to) => {
        if (to.checked) return true;
    }); 
    const res = convHandle(input, convSystem[from], convSystem[to]);
    
    output.textContent = res;
    modal.setAttribute('style', 'display: flex;');
});