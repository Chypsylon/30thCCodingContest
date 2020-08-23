const fs = require("fs");

const input = fs.readFileSync("level1/level1/level1_3.in", "utf-8");

let lines = input.split("\n");

let worldSize = lines.shift();

let world = [];

lines.forEach((l) => {
    if (l.trim() === "") {
        return;
    }

    let row = [];
    l.split(" ")
        .forEach((c) => {
            row.push(parseInt(c));
        });
    world.push(row);
});


let maxPerRow = world.map((row) => {
    return Math.max(...row);
});

let minPerRow = world.map((row) => {
    return Math.min(...row);
});

let avgPerRow = world.map((row) => {
    return row.reduce((a, b) => a + b, 0)/row.length;
});

let max = Math.max(...maxPerRow);
let min = Math.min(...minPerRow);
let avg = avgPerRow.reduce((a, b) => a + b, 0)/avgPerRow.length;
let avgInt = Math.floor(avg);

console.log(`${min} ${max} ${avgInt}`);
