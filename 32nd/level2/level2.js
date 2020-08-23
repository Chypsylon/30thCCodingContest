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

const fs = require("fs");

const input = fs.readFileSync("level2/level2_5.in", "utf-8");

let lines = input.split("\n");

let worldSize = lines.shift();

let world = [];

lines.forEach((l) => {
    if (l.trim() === "") {
        return;
    }

    let elements = l.split(" ").map(x => parseInt(x));
    let row = [];
    for (let i = 0; i < elements.length; i+=2) {
        row.push({
            alt: elements[i],
            cId: elements[i+1]
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

let numBorderCells = new Array(numCountries);
numBorderCells.fill(0);

for (let y = 0; y < world.length; y++) {
    const row = world[y];
    for (let x = 0; x < row.length; x++) {
        const cId = row[x].cId;
        
        let isBorder = isBorderCell(world, x, y);

        if (isBorder) {
            numBorderCells[cId]++;
        }
    }
}

numBorderCells.forEach(x => console.log(x));
