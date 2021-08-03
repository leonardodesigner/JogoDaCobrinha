let canvas = document.getElementById ("Snake");
let context = canvas.getContext("2d");
let box =32;
let Snake=[];
Snake [0] = {     

 x: 8 * box,
 y: 8 * box

            };

let direction = "right"; 

let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let poison ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


//Cria o Background
function CreateBG(){

    context. fillStyle = "lightgreen"; // cor do background
    context. fillRect (0,0,16 * box, 16*box); // tamanho e posicionamento do background
   
}


// cria a cobra
function CreateSnake(){

   for(i=0; i < Snake.length; i++){
     
    context. fillStyle ="green"; // cor da cobra
    context. fillRect (Snake[i].x , Snake[i].y, box , box ) ; // posição e tamanho da cobra

   }

} 

function CreateFood(){
    context.fillStyle = "blue";
    context.fillRect(food.x, food.y, box, box);
}

function CreatePoison(){
    context.fillStyle = "red";
    context.fillRect(poison.x, poison.y, box, box);
}




// Mudar a direção do movimento da cobra (Player)
document.addEventListener('keydown' , update);

function update(event){

    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}


function BeginGame(){

    for(i = 1; i < Snake.length; i++){
        if(Snake[0].x == Snake[i].x && Snake[0].y == Snake[i].y){
            clearInterval(game);
            alert('Game Over');
            document.location.reload(true);// Recarregar página
        }
    }

    // Caso a cobra chegue nas bordas do cenário, a mesma será posicionada na borda oposta do cenário
    if(Snake[0].x > 15*box && direction == "right") Snake[0].x = 0;
    if(Snake[0].x < 0 && direction == 'left') Snake[0].x = 16 * box;
    if(Snake[0].y > 15*box && direction == "down") Snake[0].y = 0;
    if(Snake[0].y < 0 && direction == 'up') Snake[0].y = 16 * box;

    // executa o background, cobra e comida
    CreateBG();
    CreateSnake();
    CreateFood();
    CreatePoison();

    // cria a posição da cobra 
    let SnakeX = Snake [0].x;
    let SnakeY = Snake [0].y;

    // modifica a posição da cobra em relação a escala dela em relação a direção onde a mesma se move
    if(direction == "right") SnakeX += box;
    if(direction == "left") SnakeX -= box;
    if(direction == "up") SnakeY -= box;
    if(direction == "down") SnakeY += box;
    
    // Função da Comida 
    if(SnakeX != food.x || SnakeY != food.y ){
        Snake.pop(); //Deleta a ultima posição da cobra
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        poison.x = Math.floor(Math.random() * 15 +1) * box;
        poison.y = Math.floor(Math.random() * 15 +1) * box;
    }

    // Função do Veneno
    if(SnakeX == poison.x && SnakeY == poison.y ){

        clearInterval(game);
            alert('Você foi envenenado ')
            alert('Game Over ')
            document.location.reload(true);// Recarregar página
       
    }
    

     // armazena a nova posição da cobra
     let newPostion = {

        x: SnakeX,
        y: SnakeY
                      }

    // utililiza a nova posição armazenada para atualizar a posição da cobra
    Snake.unshift (newPostion);

}

// cria um intervalo (semelhante ao Tick Event) para atualizar a posição da cobra a cada 100 ms
let game = setInterval(BeginGame, 100);