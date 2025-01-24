"use strict";
const canvas = document.getElementById("projectCanvas");
canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "blue";
ctx.lineWidth = 1;
const CONNECTION_LIMIT = 300;
const DISTANCE = 100;
const points = [];
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.connections = 0;
    }
    connectTo(point) {
        // if(this.connections >= CONNECTION_LIMIT || point.connections >= CONNECTION_LIMIT){
        //     return;
        // }
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        this.connections++;
        point.connections++;
    }
}
const addConnections = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            if (Math.sqrt((points[i].x - points[j].x) ** 2 + (points[i].y - points[j].y) ** 2) < DISTANCE) {
                points[i].connectTo(points[j]);
            }
        }
    }
};
const addPoint = (x, y) => {
    points.push(new Point(x, y));
    addConnections();
};
canvas.addEventListener("click", (e) => {
    addPoint(e.clientX * devicePixelRatio, e.clientY * devicePixelRatio);
    console.log('Points added');
});
window.addEventListener("keypress", (e) => {
    if (e.key == "a") {
        points.pop();
        addConnections();
    }
    console.log('Points removed');
});
