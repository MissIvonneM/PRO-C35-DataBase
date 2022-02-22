var hypnoticBall, database;

function setup(){
    database = firebase.database();
    console.log(database)

    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,30,30);
    hypnoticBall.shapeColor = "red";

var hypnoticBallPosition = database.ref('ball/position');

hypnoticBallPosition.on("value", readPosition, showerror)

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data){
    position= data.val();
    console.log(position.x);
    hypnoticBall.x = position.x
    hypnoticBall.y = position.y

}

function showerror(){
    console.log("Error al escribir en la Dase de Datos")
}
