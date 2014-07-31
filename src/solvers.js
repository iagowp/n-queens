/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  var b = new Board({n: n});
  for(var i = 0; i < b.attributes.n; i++){
    solution.push(b.attributes[i]);
  }
  for(i = 0; i < solution.length; i++){
    solution[i][i] = 1;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var count = function(rowIndex){
    if(rowIndex >= n){
      solutionCount ++;
      return;
    }
    var row = board.attributes[rowIndex];
    for(var i = 0; i < row.length; i++){
      row[i] = 1;
      if(!board.hasAnyColConflicts()){
        count(rowIndex+1);
      }
      row[i] = 0;
    }
  };

  count(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var board = new Board({n:n});
  console.log(n);

  var findSolution = function(rowIndex){
    if(rowIndex >= n){
      for(var i = 0; i < n; i++){
        solution.push(board.attributes[i]);
      }
      return true;
    }
    for(i = 0; i < board.attributes.n; i++){
      board.attributes[rowIndex][i] = 1;
      if(!board.hasColConflictAt(i)){
        var row = rowIndex;
        var column = i;
        while(row !== 0){
          row--;
          column--;
        }
        if(!board.hasMajorDiagonalConflictAt(column)){
          row = rowIndex;
          column = i;
          while(row !== 0){
            row--;
            column++;
          }
          if(!board.hasMinorDiagonalConflictAt(column)){
            if(findSolution(rowIndex + 1)){
              return true;
            }
          }
        }
      }
      board.attributes[rowIndex][i] = 0;
    }
  };
  findSolution(0);
  if(solution.length === 0){
    solution = board.attributes;
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Array(n);
  for(var i = 0; i < n; i++){
    board[i]= new Array(n);
  }
  var colConflict = {};
  var majorDiagConflict = {};
  var minorDiagConflict = {};

  var count = function(rowIndex){
    if(rowIndex >= n){
      solutionCount++;
      return;
    }
    for(var i = 0; i < n; i++){
      if(!colConflict[i]){
        var row1 = rowIndex;
        var column1 = i;
        while(row1 !== 0){
          row1--;
          column1--;
        }
        if(!majorDiagConflict[column1]){
          var row2 = rowIndex;
          var column2 = i;
          while(row2 !== 0){
            row2--;
            column2++;
          }
          if(!minorDiagConflict[column2]){
            board[rowIndex][i] = 1;
            colConflict[i] = true;
            majorDiagConflict[column1] = true;
            minorDiagConflict[column2] = true;

            count(rowIndex+1);

            colConflict[i] = false;
            majorDiagConflict[column1] = false;
            minorDiagConflict[column2] = false;
            board[rowIndex][i] = 0;
          }
        }
      }
    }

  };

  count(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
