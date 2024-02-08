console.log("Hello World!");

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
                console.log(allSquares);
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
            const squareClass = new SquareCl(square, null, null, rowNum, i);
            allSquares[rowNum].push(squareClass);      

            boardRowContainer.appendChild(square);
            boardSquareMatrix[rowNum].push(square);

            square.addEventListener("click", () =>
            {
                if (square.textContent === "P")
                {
                    console.log("Clicked: ", square);
                    newKnight.moveKnight(rowNum, i);
                }
                
            })
        }

        board.appendChild(boardRowContainer);

    }

    setGoal(rowNum, columnNum)
    {
        
        const goalSquare = boardSquareMatrix[rowNum][columnNum];
        console.log(goalSquare);
        goalSquare.classList.add("goal");
    }

}

class SquareCl
{
    constructor(val, next, possibleMove, row, column)
    {
        this.val = val;
        this.next = next;
        this.possibleMove = possibleMove;
        this.row = row;
        this.column = column;
    }
}

class Knight
{
    constructor()
    {
        this.knight = document.createElement("div");
        this.knight.classList.add("knight");
    }


    moveKnight(activeRow, activeColumn)
    {
        this.clearPreviousMove();

        const activeParentSquare = boardSquareMatrix[activeRow][activeColumn];
        console.log(activeParentSquare);
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
        
        generatePotentialMoves(activeRow, activeColumn, "P");


    }

    clearPreviousMove()
    {
        for (let i = 0; i < boardSquareMatrix.length; i++)
        {
            for (let j = 0; j <boardSquareMatrix[i].length; j++)
            {
                boardSquareMatrix[i][j].textContent = "";
                boardSquareMatrix[i][j].classList.remove("clickable-square");
            }
        }
    }

    
}

const newBoard = new Board();


const newKnight = new Knight();

newKnight.moveKnight(3,3);
newBoard.setGoal((Math.floor(Math.random() * boardSquareMatrix.length)) ,(Math.floor(Math.random() * boardSquareMatrix.length)));




