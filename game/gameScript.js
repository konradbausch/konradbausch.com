document.addEventListener("keydown", down);
document.addEventListener("keyup",up);

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasW = canvas.width;
const canvasH = canvas.height;
const ballSize = 40;
const paddleSpeed = 5;


console.log(canvasW);
console.log(canvasH);


//player scores 
var player1 = 0;
var player2 = 0;
//paddels
var paddleWidth = 20;
var paddleHeight = 120;

//paddle1
var paddle1X  = 0;
var paddle1Y  = canvasH/2-paddleHeight/2;
var paddle1Center;
var paddle1Vel = 0;

var paddle1Up = false;
var paddle1Down = false;

//paddle2
var paddle2X  = canvasW - paddleWidth;
var paddle2Y  = canvasH/2-paddleHeight/2;
var paddle2Center;
var paddle2Vel = 0;

var paddle2Up = false;
var paddle2Down = false;


//ball

var ballX = canvasW/2-ballSize/2;
var ballY = canvasH/2-ballSize/2;
var ballCenter;

var ballVelX = 2;
var ballVelY = 2;

var serveDir = -1;




setInterval(update,1000/60);

//Input
 // up, down = 38,40
    // w, s = 87, 83
function down(event){
    var key = event.keyCode;
    switch (key) {
        case 38:
            paddle2Up = true;
            break;
        case 40:
            paddle2Down = true
            break;
        case 87:
            paddle1Up = true;
            break;
        case 83:
            paddle1Down = true;
            break;
    
        default:
            break;
    }

}

function up(event){
    var key = event.keyCode;
    switch (key) {
        case 38:
            paddle2Up = false;
            break;
        case 40:
            paddle2Down = false
            brak;
        case 87:
            paddle1Up = false;
            break;
        case 83:
            paddle1Down = false;
            break;
    
        default:
            break;
    }

}


//main loop
function update(){
    getCenters();
    paddleMovement();
    ballMovement();
    clear();
    paddleRender();
    ballRender();
    console.log(paddle1Vel);
  
}

function getCenters(){
    ballCenter = calcCenter(ballY,ballSize);
    paddle1Center = calcCenter(paddle1Y,paddleHeight);
    paddle2Center = calcCenter(paddle2Y,paddleHeight);
}

function paddleRender(){
    ctx.fillStyle = "black";
    ctx.fillRect(paddle1X,paddle1Y,paddleWidth,paddleHeight);
    ctx.fillRect(paddle2X,paddle2Y,paddleWidth,paddleHeight);
}

function ballRender(){
    ctx.fillStyle = "black";
    ctx.fillRect(ballX,ballY,ballSize,ballSize);
    
}

//inpput to dir
function paddleMovement(){

    //paddle1
    if(paddle1Up && paddle1Down){
        paddle1Vel = 0;
    }
    else if(paddle1Up){
        paddle1Vel = -1 * paddleSpeed;
    }
    else if(paddle1Down){
        paddle1Vel = 1 * paddleSpeed;
    }
    else{
        paddle1Vel = 0;
    }

    //paddel2
    if(paddle2Up && paddle2Down){
        paddle2Vel = 0;
    }
    else if(paddle2Up){
        paddle2Vel = -1 * paddleSpeed;
    }
    else if(paddle2Down){
        paddle2Vel = 1 * paddleSpeed;
    }
    else{
        paddle2Vel = 0;
    }

    //appling dir
    paddle1Y += paddle1Vel;
    paddle2Y += paddle2Vel;

    //prevent brakeout

    if(paddle1Y < 0){
        paddle1Y = 0;
    }
    if(paddle2Y < 0){
        paddle2Y = 0;
    }
    if(paddle1Y+paddleHeight > canvasH){
        paddle1Y = canvasH - paddleHeight;
    }
    if(paddle2Y+paddleHeight > canvasH){
        paddle2Y = canvasH - paddleHeight;
    }
}

function ballMovement(){

    ballX += ballVelX;
    ballY += ballVelY;
    

    if ((ballX + ballSize > canvasW - paddleWidth)  && ballCanCollidePaddle2()) {
        ballVelX *= -1;
        addSpeed();
    }

    if (ballX < paddleWidth  && ballCanCollidePaddle1()){
        ballVelX *= -1;
        addSpeed();
    }
    
    if (ballY  < 0 ){
        ballVelY *= -1;
        
    }

    if(ballY + ballSize > canvasH){
        ballVelY *= -1;
      
    }

    //restart when not caught
    if(ballX < paddleWidth -10){
        player2 ++;
        restart();
    }
    if(ballX + ballSize > canvasW - paddleWidth +10){
        player1 ++;
        restart();
    }


    
}

function restart(){
    ballX = canvasW/2-ballSize/2;
    ballY = canvasH/2-ballSize/2;
    paddle1Y =canvasH/2-paddleHeight/2;
    paddle2Y =canvasH/2-paddleHeight/2;
    ballVelX = 2 * serveDir;
    ballVelY = 2;
    serveDir *= -1;
    p1.innerHTML = "Player1:    "+player1+" points";
    p2.innerHTML = "Player2:    "+player2+" points";

}
function addSpeed(){
    ballVelX *= 1.1;
    ballVelY *= 1.1;
}

function ballCanCollidePaddle1(){
    
    return amount(paddle1Center-ballCenter) < (paddleHeight+ballSize)/2;
}

function ballCanCollidePaddle2(){
    
    return amount(paddle2Center-ballCenter) < (paddleHeight+ballSize)/2;
}

function amount(num){
    if (num > 0){
        return num;
    }
    else{
        return num * -1;
    }

}

function calcCenter(pos, scale){
    return pos + scale/2;
}

function clear(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvasW,canvasH);
}