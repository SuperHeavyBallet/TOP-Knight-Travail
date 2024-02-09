const boardMatrix = [
    [0,0,0,0,0,0,0,0], //0
    [0,0,0,0,0,0,0,0], //1
    [0,0,0,0,0,0,0,0], //2
    [0,0,0,0,0,0,0,0], //3
    [0,0,0,0,0,0,0,0], //4
    [0,0,0,0,0,0,0,0], //5
    [0,0,0,0,0,0,0,0], //6
    [0,0,0,0,0,0,0,0]  //7
];

const boardSquareMatrix = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

const board = document.getElementById("board-container");
const squareWhite = document.createElement("div");
const squareBlack = document.createElement("div");
let goalFound = false;

const allSquares =[
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

let possibleSquares = [];


class Board
{
    constructor()
    {
                this.generateRow(["white", "black", "white", "black", "white", "black", "white", "black"], 0);
                this.generateRow(["black", "white", "black", "white", "black", "white", "black", "white"], 1);
                this.generateRow(["white", "black", "white", "black", "white", "black", "white", "black"], 2);
                this.generateRow(["black", "white", "black", "white", "black", "white", "black", "white"], 3);
                this.generateRow(["white", "black", "white", "black", "white", "black", "white", "black"], 4);
                this.generateRow(["black", "white", "black", "white", "black", "white", "black", "white"], 5);
                this.generateRow(["white", "black", "white", "black", "white", "black", "white", "black"], 6);
                this.generateRow(["black", "white", "black", "white", "black", "white", "black", "white"], 7);   
    }

    generateRow(arrayOfColors, rowNum)
    {
        const boardRowContainer = document.createElement("div");
        boardRowContainer.classList.add("board-row-container")


        for (let i = 0; i < boardMatrix[0].length; i++)
        {
            const square = document.createElement("div");
            square.classList.add("board-square");
            square.classList.add(arrayOfColors[i]);
            const squareClass = new SquareCl(square, null, rowNum, i);
            allSquares[rowNum].push(squareClass);      

            boardRowContainer.appendChild(square);
            boardSquareMatrix[rowNum].push(square);

            square.addEventListener("click", () =>
            {
                if (square.textContent === "P")
                {
                    console.log("Clicked: ", square , "at" , allSquares[rowNum]);
                    newKnight.moveKnight(rowNum, i);
                }
                
            })

            generatePossibleMoves([squareClass.row,squareClass.column])
        }

        board.appendChild(boardRowContainer);
        //console.log( allSquares);

    }

    setGoal(rowNum, columnNum)
    {
        
        const goalSquare = boardSquareMatrix[rowNum][columnNum];
        goalSquare.classList.add("goal");
    }

}

function generatePossibleMoves(squarePosition)
{
    const squareRow = squarePosition[0];
    const squareColumn = squarePosition[1];
    
    const nextPossibleMoves = allSquares[squareRow][squareColumn].nextPossibleMoves;

    console.log("SqPos: ", squareRow, squareColumn);
    console.log("Sq: ", allSquares[squareRow][squareColumn]);
    console.log("Next: ", nextPossibleMoves);

    for (let i = 0; i < nextPossibleMoves.length; i++)
    {
        if (nextPossibleMoves[i].length > 0)
        {
            const nextMoveRow = nextPossibleMoves[i][0];
            const nextMoveColumns = nextPossibleMoves[i][1];
            console.log(`Row ${nextMoveRow}: ` ,nextMoveColumns);

            console.log(nextMoveRow , nextMoveColumns[0]);
            console.log(nextMoveRow , nextMoveColumns[1]);

            
      
            

        }

    }

    console.log("____________");

    
}


class SquareCl
{
    constructor(val, possibleMove, row, column)
    {
        this.val = val;
        this.row = row;
        this.column = column;
        this.nextPossibleMoves = [
            [],
            [[row-2], [column -1, column + 1]],
            [[row-1], [column -2, column + 2]],
            [],
            [[row+1], [column -2, column + 2]],
            [[row+2], [column -1, column + 1]],
            [],
            []
        ];
        this.possibleMove = possibleMove;
        
    }
}

class Knight
{
    constructor()
    {
        this.knight = document.createElement("div");

    }


    moveKnight(activeRow, activeColumn)
    {
        this.clearPreviousMove();

        const activeParentSquare = boardSquareMatrix[activeRow][activeColumn];
        activeParentSquare.classList.add("knight");
        activeParentSquare.appendChild(this.knight);

        if (activeParentSquare.classList.contains("goal"))
        {
            activeParentSquare.classList.remove("goal");
            newBoard.setGoal((Math.floor(Math.random() * boardSquareMatrix.length)) ,(Math.floor(Math.random() * boardSquareMatrix.length)));
        }

        function generatePotentialMoves(row, column, symbol)
        {

            possibleSquares = [];

            const knightMoveSet = [
                [row + 2, column + 1],
                [row + 1, column + 2],
                [row - 1, column + 2],
                [row - 2, column + 1],
                [row + 2, column - 1],
                [row - 1, column - 2],
                [row - 2, column - 1],
                [row + 1, column - 2],
                
            ];



            for (let i = 0; i < knightMoveSet.length; i++)
            {
                const move = knightMoveSet[i];
                const newRow = move[0];
                const newColumn = move[1];

                if (newRow >= 0 && newRow < boardSquareMatrix.length &&
                newColumn >= 0 && newColumn < boardSquareMatrix[newRow].length)
                {
                
                    const potentialMove = boardSquareMatrix[newRow][newColumn];
         
                    if (!potentialMove.classList.contains("knight"))
                    {
                        potentialMove.classList.add("clickable-square");
                        potentialMove.textContent = symbol;

                        if (potentialMove.textContent === symbol)
                        {
                            allSquares[newRow][newColumn].possibleMove = "possible";
                            possibleSquares.push(allSquares[newRow][newColumn]);
                        }

                        if (potentialMove.classList.contains("goal"))
                        {
                            console.log("GOAL FOUND!");
                            goalFound = true;
                        }


                    }
                   

                    
                    

                    
                    
                }


            }

            
            

          
        }
        
        generatePotentialMoves(activeRow, activeColumn, "P");
        


        for (let i = 0; i < allSquares.length; i++)
        {
            for (let j = 0; j <allSquares[i].length; j++)
            {

                const thisSquare = allSquares[i][j];

            }
        }
     




    }

    clearPreviousMove()
    {
        for (let i = 0; i < boardSquareMatrix.length; i++)
        {
            for (let j = 0; j <boardSquareMatrix[i].length; j++)
            {
                boardSquareMatrix[i][j].textContent = "";
                boardSquareMatrix[i][j].classList.remove("clickable-square");
                boardSquareMatrix[i][j].classList.remove("knight");
            }
        }
    }

    
}

const newBoard = new Board();


const newKnight = new Knight();

newKnight.moveKnight(3,3);
newBoard.setGoal((Math.floor(Math.random() * boardSquareMatrix.length)) ,(Math.floor(Math.random() * boardSquareMatrix.length)));




