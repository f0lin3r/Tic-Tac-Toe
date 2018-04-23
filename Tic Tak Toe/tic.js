jQuery(document).ready(function($) {
  $('.game').hide();
  $('#restart').hide();
  var x;
  var HUM,AI;
  var originalBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var bestPosition;
  $('#O').click(function(event) {
    HUM = "○";
    AI = "×";
    $('.choose').hide();
    $('.buttons').hide();
    $('.game').show();
    bestPosition = minimax(originalBoard, AI);
    originalBoard[bestPosition.index]=AI;
    $('#'+bestPosition.index).html(AI);
    $("#"+bestPosition.index).css({'pointer-events':'none'});
  });
  $('#X').click(function(event) {
    HUM = "×";
    AI = "○";
    $('.choose').hide();
    $('.buttons').hide();
    $('.game').show();
  });
  $('.col-2').click(function gogo() {
  x = $(this).attr('id');
  originalBoard[x]=HUM;
  $('#'+x).html(HUM);
  bestPosition = minimax(originalBoard, AI);
  originalBoard[bestPosition.index]=AI;
  $('#'+bestPosition.index).html(AI);
  $("#"+x).css({'pointer-events':'none'});
  $("#"+bestPosition.index).css({'pointer-events':'none'});
  setTimeout(whoWin,1500);
  });

function whoWin(){
  let end = emptyIndices(originalBoard);
  if(win(originalBoard, AI)){
    $('.game').hide();
    $('#end').html('COMPUTER WIN');
    $('#restart').show();
    }else if(win(originalBoard, HUM)){
    $('.game').hide();
    $('#end').html('YOU WIN');
    $('#restart').show();
    }else if(end.length==0){
    $('.game').hide();
    $('#end').html('DRAW');
    $('#restart').show();
    }
}

$('#restart').click(function() {
  document.location.reload();
});

// возвращает список индексов пустых клеток доски

// основная минимакс-функция
function minimax(newBoard, player){
  //доступные клетки
  var emptyCells = emptyIndices(newBoard);

  // проверка на терминальное состояние (победа / поражение / ничья)
  //and returning a value accordingly
  if (win(newBoard, HUM)){
    return {score:-10};
  }
  else if (win(newBoard, AI)){
    return {score:10};
  }
  else if (emptyCells.length === 0){
    return {score:0};
  }

// массив для хранения всех объектов
var moves = [];
// цикл по доступным клеткам
for (var i = 0; i < emptyCells.length; i++){
//create an object for each and store the index of that spot 
var move = {};
move.index = newBoard[emptyCells[i]];
// совершить ход за текущего игрока
newBoard[emptyCells[i]] = player;

//получить очки, заработанные после вызова минимакса от противника текущего игрока
if (player == AI){
  var result = minimax(newBoard, HUM);
  move.score = result.score;
}
else{
  var result = minimax(newBoard, AI);
  move.score = result.score;
}


// очистить клетку
newBoard[emptyCells[i]] = move.index;

// положить объект в массив
moves.push(move);
}

// если это ход ИИ, пройти циклом по ходам и выбрать ход с наибольшим количеством очков
  var bestMove;
  if(player === AI){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// иначе пройти циклом по ходам и выбрать ход с наименьшим количеством очков
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// вернуть выбранный ход (объект) из массива ходов
  return moves[bestMove];
};



function emptyIndices(board){
  return  board.filter(s => s != "○" && s != "×");
}
// победные комбинации с учётом индексов
function win(board, player){
  if(
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
      } else {
      return false;
      }
}

});