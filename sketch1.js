//Código Paso a Paso PRO C35 V2 Base de Datos en tiempo Real

//Aa T) Cambiamos de variable para trabajar con la ball con posiciones almacenadas en una DB remota
//var ball;
//Ab T) Define las variables para obtener referencia de la posición de la pelota
var hypnoticBall, database;



function setup(){
  //B T) Cargamos la base de datos 
  database = firebase.database();
  console.log(database);

    createCanvas(500,500);
 //C T) Ya no se necesita la ball
    //ball = createSprite(250,250,10,10);
    //ball.shapeColor = "red";

 //D T) Creamos la ball hipnótica
 hypnoticBall = createSprite(250,250,20,20);
 hypnoticBall.shapeColor = "red";

 //E T) .ref() se utiliza para hacer referencia a la ubicación del valor de la base de datos que nos interesa.  
 var hypnoticBallPosition = database.ref('ball/position');

 //Fa T) .on() crea un oyente, que sigue escuchando los cambios en la base de datos.
 //Fb T) Se llama a la función readPosition() cada vez que ocurre un cambio en los valores de la base de datos de posición (referencia).
 //Fc T) Si hay un error al leer los valores en la base de datos, se llama a la función showError().
 hypnoticBallPosition.on("value", readPosition, showError);
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



//Ga T) Lee la posición del valor de la base de datos
function readPosition(data){

 //Gb T) Lee la posición almacenada en los valores x,y de position e la DB
  position = data.val();
  console.log(position.x);
// Gc T) Asigna la posición x,y de position de la DB y la asigna a la hypnoticBall
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}
//H T) Se llamará en caso de error al obtener los datos de la DB
function showError(){
  console.log("Error al escribir en la base de datos");
}


