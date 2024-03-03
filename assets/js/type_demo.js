let first_name = 'Lin';
let last_name = 'David';
let full_name = first_name + ' ' + last_name;

// console.log(full_name);

let n1 = 1;
let n2 = 1.25;
let m1 = n1 + n2;
let m2 = n1 - n2;
let m3 = n1 * n2;
let m4 = n1 / n2;
let m5 = n1 % n2; // 餘數

// console.log(m1, m2, m3, m4, m5);

let number_1 = 1;
let string_10 = '10';
let ns = number_1 + string_10 // '1' + '10' = '110' let ns = '110'

console.log(ns);

console.log(typeof number_1, typeof string_10, typeof ns);

let ns2 = number_1 + parseInt(string_10, 10);

console.log(ns2, typeof ns2);

let ns3 = number_1 + +string_10;

console.log(ns3, typeof ns3);

let string_a = 'A';
let number_a = parseInt(string_a, 10);

console.log(string_a, number_a, typeof number_a);


let string_1 = number_1.toString();

console.log(string_1, typeof string_1, number_1, typeof number_1)