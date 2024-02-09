class BoardSquare
{
    constructor(row, column, val)
    {
        this.square = document.createElement("div");
        
        this.row = row;
        this.column = column;
        this.nextMoves = [
            [
                [row-2, column-1],
                [row-2, column+1]
            ],
            [
                [row-1, column-2],
                [row-1, column+2]
            ],
            [
                [row+1, column-2],
                [row+1, column+2]
            ],
            [
                [row+2, column-1],
                [row+2, column+1]
            ],
        ];

        this.square.addEventListener("click", () =>
        {

            if (this.square.textContent === "P")
            {

                
                for (let i = 0; i <boardSquares.length; i++)
                {
                    for (let j = 0; j < boardSquares[i].length; j++)
                    {
                        boardSquares[i][j].square.textContent = "";
                        boardSquares[i][j].square.classList.remove("knight");
                    }
                }

                this.setPossibleMoves();
                this.square.classList.add("knight");
                }
        });


    }

    

    setPossibleMoves()
    {
        console.log(this.nextMoves);
        console.log(this.nextMoves[0]);
        console.log(this.nextMoves[0][0]);

        for (let i = 0; i < this.nextMoves.length; i++)
        { 
            for (let j = 0; j < this.nextMoves[i].length; j++)
            { 
                
               
                if (this.nextMoves[i][j][0] >= 0 && this.nextMoves[i][j][0] < 8
                    &&
                    this.nextMoves[i][j][1] >= 0 && this.nextMoves[i][j][1] < 8)
                {

                    const nextMoveRow = this.nextMoves[i][j][0];
                    const nextMoveCol = this.nextMoves[i][j][1];

                    if (boardSquares[nextMoveRow][nextMoveCol])
                    {
                        const nextMovePos = boardSquares[nextMoveRow][nextMoveCol];
                        nextMovePos.square.textContent = "P";
                        nextMovePos.square.classList.add("clickable-square");
                    }
              
                   
                }
                

               
            }
        }

    }
    
}

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

        for (let i = 0; i < numOfColumns; i++)
        {
            const newSquare = new BoardSquare(rowNum, i);
            newSquare.square.classList.add("board-square");
            newSquare.square.classList.add(arrayOfColors[i]);
            boardRowContainer.appendChild(newSquare.square);
            boardSquares[rowNum].push(newSquare);
        }

        boardContainer.appendChild(boardRowContainer);
    }
}

const numOfRows = 8;
const numOfColumns = numOfRows;
const boardContainer = document.getElementById("board-container");
const boardSquares = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []       
];

const newBoard = new Board();




boardSquares[4][4].square.classList.add("knight");
boardSquares[4][4].setPossibleMoves();