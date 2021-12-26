import BoxCollider from "./rectangle.js"
import Vector from "./vector.js";

const canvas = document.getElementById("game");
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext("2d");
document.addEventListener("keydown", down);
document.addEventListener("keyup",up);

const ballSize = new Vector(10,10);
const playerSize = new Vector(10, 200);
const serveSpeed = 1.5;
const playSpeed = 2;
const playerEffectOnDirection = 1;
const yReducton = 0.8;
const playerGapToBorder = 10;

const player1 = new BoxCollider(new Vector(playerGapToBorder,(canvas.height - playerSize.y)/2), playerSize,"#ffffff",ctx,0);
const player2 = new BoxCollider(new Vector(canvas.width-playerSize.x -playerGapToBorder,(canvas.height - playerSize.y)/2), playerSize,"#ffffff",ctx,0);
const ball = new BoxCollider(new Vector(canvas.width/2, Math.random() * canvas.height), ballSize,"#ffffff",ctx,0);

let ballDirection = new Vector(serveSpeed,0);

let serve = true;
let player1Direction = 0;
let player2Direction = 0;

let player1Score = 0;
let player2Score = 0;

let bounce = new Audio('./bounce.mp3');
let wall = new Audio('./wall.mp3');
let over = new Audio('./gameover.mp3');




setInterval(update);

logic();

function up(event) {
    keyToDir(event.keyCode, 0)
}

function down(event) {
   keyToDir(event.keyCode, 2)
}

function keyToDir(key, number) {
    //uparrow, downarrow = 38,40    w, s = 87, 83
    switch (key) {
        case 87:
            player1Direction = -number;
            break;
        case 83:
            player1Direction = number;
            break;
        case 38:
            player2Direction = -number;
            break;
        case 40:
            player2Direction = number;
            break;
    
        default:
            break;
    }
}


function update() {
    logic();
    clear();
    draw();
}



function logic() {
    if (player1.colidesWith(ball) ){
        bounce.play();
        ballDirection.x *= -1.01;
        ballDirection.y += player1Direction * playerEffectOnDirection;
        ballDirection.y *= yReducton;
        if (serve) {
            ballDirection.x *= playSpeed; 
            serve = false;
        }
    }

    if (player2.colidesWith(ball) ){
        bounce.play();
        ballDirection.x *= -1.01;
        ballDirection.y += player2Direction * playerEffectOnDirection;
        ballDirection.y *= yReducton;
        if (serve) {
            ballDirection.x *= playSpeed; 
            serve = false;
        }
    }
   

    player1.move(new Vector(0,player1Direction));
    player2.move(new Vector(0,player2Direction));
    ball.move(ballDirection);

    clampPlayer(player1);
    clampPlayer(player2);
    clampBall();
    
    
}

function clampBall(){
    
    if(ball.position.y <= 0  || ball.position.y > canvas.height - ballSize.y){
        ballDirection.y *= -1;  
        wall.play();
    }

    if (ball.position.x < 0 ){
        player2Score += 1;
        restart();
    }

    if (ball.position.x > canvas.width - ballSize.x ){
        player1Score += 1;
        restart();
    }

}

function restart() {
    over.play();
    ball.position = new Vector(canvas.width/2, Math.random() * canvas.height)
    player1.position.y = (canvas.height - playerSize.y)/2;
    player2.position.y = (canvas.height - playerSize.y)/2;
    
    ball.position = new Vector(canvas.width/2, Math.random() * canvas.height);
    if (!serve){
        ballDirection = new Vector(ones(ballDirection.x) * serveSpeed,0);
        serve = true;
    }
    
}

function clampPlayer(player){
    if (player.position.y <= 0 ){
        player.position.y = 1;
    }
    if( player.position.y > canvas.height - playerSize.y){
        player.position.y = canvas.height - playerSize.y -1;
    }
}

function draw() {
    
    player1.draw();
    player2.draw();
    ball.draw()
    ctx.font = '48px arial';
    ctx.fillText(player1Score + "       " + player2Score, canvas.width/2 -75 , 50);
    // Dashed line
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.setLineDash([20, 15]);
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();   

}

function clear(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function ones(x){
    if (x>0){
        return 1;
    }
    else{
        return -1;
    }
}




