const fs = require("fs");

const input = fs.readFileSync("level2/level2_5.in", "utf-8");

let lines = input.split("\n");

let boardSize = lines[0].split(" ").map((x) => parseInt(x));

let startCoords = lines[1].split(" ").map((x) => parseInt(x));

let commands = lines[2].split(" ");

let currentX = startCoords[0];
let currentY = startCoords[1];

console.log(currentX + " " + currentY);

let direction = 0; //0 = right, 1 down, 2 left, 3 up

for (let i = 0; i < commands.length; i += 2) {
    let c = commands[i];
    let num = parseInt(commands[i+1]);

    if (c === "T") {
        direction = (direction + num) % 4;
    } else {
        if (direction === 0) {
            while(num > 0) {
                currentX++;
                console.log(currentX + " " + currentY);
                num--;
            }
        }
        else if (direction === 1) {
            while(num > 0) {
                currentY++;
                console.log(currentX + " " + currentY);
                num--;
            }
        }
        else if (direction === 2) {
            while(num > 0) {
                currentX--;
                console.log(currentX + " " + currentY);
                num--;
            }
        }
        else if (direction === 3) {
            while(num > 0) {
                currentY--;
                console.log(currentX + " " + currentY);
                num--;
            }
        }
    }
}