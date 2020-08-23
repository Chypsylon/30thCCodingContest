function isBorderCell(w, x, y) {
    //look at neighbour cells
        //left neigbour
        if (x === 0 || x+1 === w[0].length || y === 0 || y+1 === w.length) {
            return true;
        }

        let currentCellCountry = w[y][x].cId;

        if (w[y][x-1].cId !== currentCellCountry) {
            return true;    
        }

        if (w[y][x+1].cId !== currentCellCountry) {
            return true;    
        }

        if (w[y+1][x].cId !== currentCellCountry) {
            return true;    
        }

        if (w[y-1][x].cId !== currentCellCountry) {
            return true;    
        }

        return false;
}

function euclidianDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

const fs = require("fs");

const input = fs.readFileSync("level3/level3_5.in", "utf-8");

let lines = input.split("\n");

let worldSize = lines.shift();

let world = [];

lines.forEach((l, y) => {
    if (l.trim() === "") {
        return;
    }

    let elements = l.split(" ").map(x => parseInt(x));
    let row = [];
    for (let i = 0; i < elements.length; i+=2) {
        row.push({
            alt: elements[i],
            cId: elements[i+1],
            y: y,
            x: i/2
        });
    }
    world.push(row);
});

let flatWorld = world.flat();
//let numCountries = Math.max(...(flatWorld.map(x => x.cId))) +1;
let max = 0;
flatWorld.map(x => x.cId).forEach((x) => {
    max = Math.max(max, x);
});
let numCountries = max +1;

let countryCenters = [];

for (let currentCID = 0; currentCID < numCountries; currentCID++) {
    let cellsOfCurrentCountry = flatWorld
        .filter((c) => c.cId === currentCID);

    let avgX = cellsOfCurrentCountry
        .map(c => c.x)
        .reduce((a, b) => a + b, 0)/cellsOfCurrentCountry.length;
    let avgY = cellsOfCurrentCountry
        .map(c => c.y)
        .reduce((a, b) => a + b, 0)/cellsOfCurrentCountry.length;
    
    avgX = Math.floor(avgX);
    avgY = Math.floor(avgY);

    //if is on border or outside country
    if (isBorderCell(world, avgX, avgY) || world[avgY][avgX].cId !== currentCID) {
        
        let minimumDistanceCell = undefined;
        
        cellsOfCurrentCountry
            .filter((c) => !isBorderCell(world, c.x, c.y))
            .forEach((c) => {
                let d = euclidianDistance(avgX, avgY, c.x, c.y);
                if (!minimumDistanceCell || minimumDistanceCell.d > d || 
                    (minimumDistanceCell.d === d && c.y < minimumDistanceCell.y) ||
                    (minimumDistanceCell.d === d && c.y === minimumDistanceCell.y && c.x < minimumDistanceCell.y)) {
                    minimumDistanceCell = c;
                    minimumDistanceCell.d = d;
                }
            });

        countryCenters.push(minimumDistanceCell);
    } else {
        countryCenters.push(world[avgY][avgX]);
    }
}

let centerStrings = countryCenters.map(c => c.x + " " + c.y);

centerStrings.forEach(s => console.log(s));
