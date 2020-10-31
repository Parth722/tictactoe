let game_state;

const Game = (player_1, player_2) => {
    // turn is 0 when it is player1's turn
    let turn  = [0];
    const state = [null, null, null, null, null, null, null, null, null];
    //mapping from dom classes to state array
    const mapping = {
        'box1': 0,
        'box2': 1,
        'box3': 2,
        'box4': 3,
        'box5': 4,
        'box6': 5,
        'box7': 6,
        'box8': 7,
        'box9': 8
    }
    
    const getState = () => state;

    const renderGame = () => {
        if (document.querySelector('.gameboard').classList.contains('hidden')){
            document.querySelector('.gameboard').classList.toggle('hidden');
            document.querySelector('#play').value = "RESET";
        }
        for (let i = 1; i < 10; i++) {    
            if (state[i-1] == null){
                document.querySelector(`#box${i}`).value = "";
            }
            else if (state[i-1] === "X"){
                document.querySelector(`#box${i}`).value = "X";
            }
            else if (state[i-1] === "O"){
                document.querySelector(`#box${i}`).value = "O";
            }
        }
    }

    const isTie = () => {
        for(let i = 0; i < 9; i++){
            if (state[i] == null){
                return false
            }
        }
        return true;
    }

    const isOver = () => {
        //checking rows:
        for(let i = 0; i < 9; i += 3){
            if (state[i] != null){
                if (state[i] == state[i+1] && state[i] == state[i+2]){
                    return true;
                }
            }
        }   
        //checking columns:
        for(let i = 0; i < 3; i++){
            if (state[i] != null){
                if (state[i] == state[i+3] && state[i] == state[i+6]){
                    return true;
                }
            }
        }  
        //checking diagonals
        if(state[4] != null){
            if (state[0] == state[4] && state[4] == state[8]){
                return true;
            }
            else if (state[2] == state[4] && state[4] == state[6]){
                return true;
            }
        }
        return false;
    }

    const makeMove = (id) => {
        let location = mapping[id];
        if (state[location] == null){
            if (turn[0] == 0){
                state[location] = "O";
            }
            else{
                state[location] = "X";
            }
            turn[0] = 1 - turn[0];
        }
    }

    const reset = () => {
        state = [null, null, null, null, null, null, null, null, null];
        turn[0] = 0;
    }
    return {getState, renderGame, makeMove, isOver, isTie, reset, turn, player_1, player_2}
}

function player(name, marker, number){
    const getName = () => name;
    const getMarker = () => marker;
    const getNumber = () => number; 

    return {getName, getMarker, getNumber}
}

function startGame(){
    //geting player1 and player2 names from input.
    document.querySelector('.winner').classList.add('hidden');
    let player1 = document.querySelector('#player1');
    let player2 = document.querySelector('#player2');

    player1 = player(player1.value, 'O', 1);
    player2 = player(player2.value, 'X', 2);
    game_state = Game(player1, player2);
    document.querySelector('.container').style.height = '100vh';
    game_state.renderGame();
}

function makeMove(id){
    if (!game_state.isOver()){
        game_state.makeMove(id);
        game_state.renderGame();
        if (game_state.isOver()){
            showWinner(game_state.turn);
            document.querySelector('.container').style.height = '110vh';
        }
        else if (game_state.isTie()){
            let winner = document.querySelector('.hidden');
            if (winner.classList.contains('hidden')){
                winner.classList.toggle('hidden');
            }
            let winner_text = document.querySelector('.winner_text');
            winner_text.innerHTML = "Its a tie!!";
            document.querySelector('.container').style.height = '110vh';
        }
    }
    
}

function showWinner(turn){
    let winner = document.querySelector('.hidden');
    if (winner.classList.contains('hidden')){
        winner.classList.toggle('hidden');
    }
    let winner_text = document.querySelector('.winner_text');
    let name;
    if (turn[0] == 1){
        name = game_state.player_1.getName();
    }
    else{
        name = game_state.player_2.getName();
    }
    winner_text.innerHTML = `Congratulations!! ${name}, you have won.`;
}


document.querySelector('#play').onclick = startGame;

