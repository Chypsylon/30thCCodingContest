class XiaolinWu {

    static integerPart(v) {
        let isNeg = (v < 0) ? -1 : 1;
        let abs = Math.abs(v);
        let integerPart = Math.floor(abs);

        return integerPart * isNeg;
    }

    static fraction(v) {
        if (v < 0) {
            return 1 - (v - Math.floor(v));
        }

        return v - Math.floor(v);
    }

    static reverseFraction(v) {
        return 1 - XiaolinWu.fraction(v);
    }

    static round(v) {
        return XiaolinWu.integerPart(v + 0.5);
    }

    static plot(x0, y0, x1, y1) {
        if (x0 == x1 && y0 == y1) {
            return []
        }

        let fpart = XiaolinWu.fraction;
        let rfpart = XiaolinWu.reverseFraction;
        let ipart = XiaolinWu.integerPart;
        let round = XiaolinWu.round;

        let dots = [];
        let steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);

        if (steep) {
            [y0, x0] = [x0, y0];
            [y1, x1] = [x1, y1];
        }

        if (x0 > x1) {
            [x1, x0] = [x0, x1];
            [y1, y0] = [y0, y1];
        }

        let dx = x1 - x0;
        let dy = y1 - y0;
        let gradient = dy / dx;

        let xEnd = round(x0);
        let yEnd = y0 + gradient * (xEnd - x0);
        let xGap = rfpart(x0 + 0.5);
        let xPx1 = xEnd;
        let yPx1 = ipart(yEnd);

        if (steep) {
            dots.push({ x: yPx1, y: xPx1, b: rfpart(yEnd) * xGap });
            dots.push({ x: yPx1 + 1, y: xPx1, b: fpart(yEnd) * xGap });
        } else {
            dots.push({ x: xPx1, y: yPx1, b: rfpart(yEnd) * xGap });
            dots.push({ x: xPx1, y: yPx1 + 1, b: fpart(yEnd) * xGap });
        }

        let intery = yEnd + gradient;

        xEnd = round(x1);
        yEnd = y1 + gradient * (xEnd - x1);
        xGap = fpart(x1 + 0.5);

        let xPx2 = xEnd;
        let yPx2 = ipart(yEnd);

        if (steep) {
            dots.push({ x: yPx2, y: xPx2, b: rfpart(yEnd) * xGap });
            dots.push({ x: yPx2 + 1, y: xPx2, b: fpart(yEnd) * xGap });
        } else {
            dots.push({ x: xPx2, y: yPx2, b: rfpart(yEnd) * xGap });
            dots.push({ x: xPx2, y: yPx2 + 1, b: fpart(yEnd) * xGap });
        }

        if (steep) {
            for (let x = xPx1 + 1; x <= xPx2 - 1; x++) {
                dots.push({ x: ipart(intery), y: x, b: rfpart(intery) });
                dots.push({ x: ipart(intery) + 1, y: x, b: fpart(intery) });
                intery = intery + gradient;
            }
        } else {
            for (let x = xPx1 + 1; x <= xPx2 - 1; x++) {
                dots.push({ x: x, y: ipart(intery), b: rfpart(intery) });
                dots.push({ x: x, y: ipart(intery) + 1, b: fpart(intery) });
                intery = intery + gradient
            }
        }

        return dots;
    }
}

const fs = require("fs");

const input = fs.readFileSync("level4/level4_example.in", "utf-8");

let lines = input.split("\n").filter(l => l.trim() !== "");

let worldSize = lines.shift().split(" ").map(x => parseInt(x));
let worldX = worldSize[1];
let worldY = worldSize[0];

lines.shift(); // number of queries

let rays = lines.map(l => {
    let elements = l.split(" ").map(x => parseInt(x));
    return {
        ox: elements[0],
        oy: elements[1],
        dx: elements[2],
        dy: elements[3]
    };
});

function getRayEndpoint(ray, wX, wY) {
    let endX, endY, i = 0;
    do {
        endX = ray.ox + i * ray.dx;
        endY = ray.oy + i * ray.dy;
        i++;
    } while ((endX >= -1 && endX <= (wX +1)) || (endY >= -1 && endY <= (wY +1)));

    return [endX, endY];
}

function dda(ray, endX, endY) {
    let x1 = ray.ox;
    let y1 = ray.oy
    let dx = endX - x1;
    let dy = endY - y1;

    let step;

    if (Math.abs(dx) >= Math.abs(dy)) {
        step = Math.abs(dx);
    } else {
        step = Math.abs(dy);
    }

    dx = dx/step;
    dy = dy/step;

    let x = x1;
    let y = y1;

    let points = [];

    let i = 1;
    while (i <= step) {
        points.push({x: x, y: y});
        x += dx;
        y += dy;
        i++;
    }

    return points;
}

rays.forEach((ray) => {
    let end = getRayEndpoint(ray, worldX, worldY);
    let endX = end[0];
    let endY = end[1];

    let points = XiaolinWu.plot(ray.ox, ray.oy, endX, endY);
    points = points.filter(p => p.x >= 0 && p.x < worldX && p.y >= 0 && p.y < worldY);
    points = points.filter(p => p.b > 0)
    
   /*let points = dda(ray, endX, endY);
   points = points.map(p => {
       return {x: Math.round(p.x), y: Math.round(p.y)}
    });
   points = points.filter(p => p.x >= 0 && p.x < worldX && p.y >= 0 && p.y < worldY);
    */
});


