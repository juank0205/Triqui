const readline = require('readline-sync');

//TAKE USER INPUT AND VALIDATE THE POSITION
function input(question){
    var answer = readline.question(question);
    answer = parseInt(answer);
    if ((answer > 0) && (answer<4)){
        return answer;
    }
    return -1;
}

//SET ALL THE VALUES OF THE MATRIX TO ' '
function initBoard(board){
    aux=[];
    for (var i=0; i<3; i++){
        aux=[];
        for(var j=0; j<3; j++){
            aux.push(' ');
        }
        board.push(aux);
    }
}

//PRINT IN CONSOLE THE BOARD
function printBoard(board, turn){
    impresion = ""
    for (var i=0; i<3; i++){
        for (var j=0; j<3; j++){
            if(j!=2){
                impresion += board[i][j] + '|'
            } else{
                impresion += board[i][j] + '\n'
            }
        }
    }
    console.log("TURNO: " + (turn+1));
    console.log('--------------')
    console.log(impresion);
    console.log('--------------')
}

//SET THE MATRIX IN POSITION posX, posY TO A NEW CHARACTER
function setBoard(board, posX, posY, nuevo){
    if(board[posY-1][posX-1] == ' '){
        board[posY-1][posX-1] = nuevo;
        return 0;
    } else{
        return 1;
    }
}

//VALIDATE IF ANY PLAYER HAS WON
function checkWinner(board, caracter){
    var i = 0;
    for (i=0; i<3; i++){
        //HORIZONTAL
        if ((board[i][0] == board[i][1]) == board[i][2]){
            if ((board[i][0] != ' ') && (board[i][1] != ' ') && (board[i][2] != ' ')){
                return 0;
            }
        }
        
        //VERTICAL
        if ((board[0][i] == board[1][i]) == board[2][i]){
            if ((board[0][i] != ' ') && (board[1][i] != ' ') && (board[2][i] != ' ')){
                return 0;
            }
        }
    }
    
    //DIAGONAL 1
    if ((board[0][0] == board[1][1]) == board[2][2]){
        if ((board[0][0] != ' ') && (board[1][1] != ' ') && (board[2][2] != ' ')){
            return 0;
        }
    }

    //DIAGONAL 2
    if ((board[2][0] == board[1][1]) == board[0][2]){
        if ((board[2][0] != ' ') && (board[1][1] != ' ') && (board[0][2] != ' ')){
            return 0;
        }
    }

    return 1;
}

//MAIN FUNCTION
function triqui(board, turn){
    posX = 0;
    posY = 0;
    caracter=''
    while(turn < 9){
        console.clear();
        printBoard(board, turn);

        if ((turn % 2) ==  0){
            caracter = 'X'
            if (checkWinner(board, caracter) == 0){
                console.log("GANA JUGADOR 1");
                return 0;
            }
        } else{
            caracter = 'O'
            if (checkWinner(board, caracter) == 0){
                console.log("GANA JUGADOR 2");
                return 0;
            }
        }

        posX = input('Ingrese la posicion en X: ');
        posY = input('Ingrese la posicion en Y: ');
        if((posX == -1) || (posY == -1)){
            console.log("Ingrese una posicion valida")
            continue;
        }
        if (setBoard(board, posX, posY, caracter) == 1){
            console.log("Ingrese una jugada valida")
            continue;
        }
        turn += 1;
    }
    console.log('EMPATE');
    return 1;
}


board = [];
turn = 0;

initBoard(board);
triqui(board, turn);