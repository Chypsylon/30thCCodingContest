const fs = require("fs");

const input = fs.readFileSync("level1/level1_5.in", "utf-8");

let lines = input.split("\n");

let startCoords = lines[0].split(" ").map((x) => parseInt(x));

let commands = lines[1].split(" ");

let currentX = startCoords[0];
let currentY = startCoords[1];

let direction = 0; //0 = right, 1 down, 2 left, 3 up

for (let i = 0; i < commands.length; i += 2) {
    let c = commands[i];
    let num = parseInt(commands[i+1]);

    if (c === "T") {
        direction = (direction + num) % 4;
    } else {
        if (direction === 0) {
            currentX += num;
        }
        else if (direction === 1) {
            currentY += num;
        }
        else if (direction === 2) {
            currentX -= num;
        }
        else if (direction === 3) {
            currentY -= num;
        }
    }
}

console.log(currentX + " " + currentY);