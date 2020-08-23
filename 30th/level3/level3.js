function move(x, y, boardWidth, boardHeight, direction, amount) {
    if (direction === 0) {
        x += amount;
    }
    else if (direction === 1) {
        y += amount;
    }
    else if (direction === 2) {
        x -= amount;
    }
    else if (direction === 3) {
        y -= amount;
    }

    x = Math.min(x, boardWidth);
    x = Math.max(x, 0);

    y = Math.min(y, boardHeight);
    y = Math.max(y, 0);

    return [x, y];
}

function queryAlienPos(speed, spawnTime, startX, startY, boardWidth, boardHeight, commands, queryTick) {

    let xy = [startX, startY];
    let direction = 0; //0 = right, 1 down, 2 left, 3 up
    
    if (spawnTime >= queryTick) {
        return xy;
    }

    let visitedPoints = new Set();
    visitedPoints.add(JSON.stringify(xy));

    let commandIndex = 0;
    let c = commands[commandIndex];
    let num = parseInt(commands[commandIndex + 1]);

    let remainingMovementInTick = speed;

    for (let tick = spawnTime +1; tick <= queryTick; tick++) {
        while (remainingMovementInTick > 0) {
            //console.log(`tick: ${tick} command ${c} num ${num} xy ${xy} dir ${direction}`);

            if (c === undefined) {
                return xy;
            }
            
            if (c === "T") {
                direction = (direction + num) % 4;

                commandIndex += 2;
                c = commands[commandIndex];
                num = parseInt(commands[commandIndex + 1]);
            } else {
                if (num > 0) {
                    let moveAmount = Math.min(speed, num, remainingMovementInTick);
                    xy = move(xy[0], xy[1], boardWidth, boardHeight, direction, moveAmount);
                    remainingMovementInTick -= moveAmount;
                    num -= moveAmount;

                    visitedPoints.add(JSON.stringify(xy));
                }

                if (num <= 0) {
                    xy = xy.map(x => Math.floor(x));
                    commandIndex += 2;
                    c = commands[commandIndex];
                    num = parseInt(commands[commandIndex + 1]);
                }
            }
        }
        //console.log(`after tick: ${tick} xy ${xy} dir ${direction}`);

        remainingMovementInTick = speed;
    }

    return xy;

}


const fs = require("fs");

const input = fs.readFileSync("level3/level3_5.in", "utf-8");

let lines = input.split("\n");

let boardSize = lines[0].split(" ").map((x) => parseInt(x));

let startCoords = lines[1].split(" ").map((x) => parseInt(x));

let commands = lines[2].split(" ");

let speed = parseFloat(lines[3]);

let numAliens = parseInt(lines[4]);

let spawnTimes = [];

for (let i = 0; i < numAliens; i++) {
    spawnTimes.push(parseInt(lines[5+i]));
}

let numQueries = parseInt(lines[5 + numAliens]);

let queries = [];

for (let i = 0; i < numQueries; i++) {
    let query = lines[5 + numAliens + 1 +i].split(" ").map((x) => parseInt(x));
    queries.push({
        time : query[0],
        alienId : query[1]
    });
}

queries.forEach((q) => {
    let spawnTime = spawnTimes[q.alienId];
    let queryResult = queryAlienPos(speed, spawnTime, startCoords[0], startCoords[1], boardSize[0], boardSize[1], commands, q.time);
    queryResult = queryResult.map(x => Math.floor(x));
    console.log(q.time + " " + q.alienId + " " + queryResult[0] + " " + queryResult[1]);
});