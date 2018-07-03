var obj = Object.create(
    { foo: 1 },
    {
        bar: {
            value: 2  // bar is a non-enumerable property.
        },
        baz: {
            value: 3,
            enumerable: true  // baz is an own enumerable property.
        }
    }
);

console.log(obj.__proto__.foo);

console.log(obj.bar);
console.log(obj.__proto__.bar);

var copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }