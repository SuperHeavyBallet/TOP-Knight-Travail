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
        const thisRoundPosMoves = [];

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
                        thisRoundPosMoves.push(nextMovePos);
                        nextMovePos.square.textContent = "P";
                        nextMovePos.square.classList.add("clickable-square");

                        if (nextMovePos.square.classList.contains("goal"))
                        {
                            console.log("Found Goal!");
                        }
                        else
                        {

                        }
                    }
              
                   
                }
                

               
            }
        }

        console.log(thisRoundPosMoves);

        for (let i = 0; i < thisRoundPosMoves.length; i++)
        {
           // thisRoundPosMoves[i].setPossibleMoves();
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




//boardSquares[4][4].square.classList.add("knight");
//boardSquares[4][4].setPossibleMoves();

//const goalPosition = boardSquares[7][7];
//goalPosition.square.classList.add("goal");

function findShortestPath(start, goal)
{
    let queue = [[start]]; // Queue of paths
    let visited = new Set(); //Set of visited nodes

    while (queue.length > 0)
    {
        let path = queue.shift(); // Get the first path from the queue
        let node = path[path.length - 1]; // Get the last node on the path

        if (node.row === goal.row && node.column === goal.column)
        {
            return path; //Return path if the goal is reached
        }

        if (!visited.has(node)) // Check if th enode has not been visited yet
        {
            visited.add(node);

        }

        let neighbors = getKnightsMoves(node); // Get all possible moves

        for (let neighbor of neighbors)
        {
            if (!visited.has(neighbor))
            {
                let newPath = path.slice(); // Create a new path
                newPath.push(neighbor); // Add neighbor to the new path
                queue.push(newPath); // Add the new path to the queue
            }
        }
    }

    return null;
}

function getKnightsMoves(square)
{
    // Calculate potential moves based on knight's movement rules
    // and filter out moves that are outside the board or have been visited

    let moves = [];
    let potentialMoves = [
            [square.row-2, square.column-1],
            [square.row-2, square.column+1],
            [square.row-1, square.column-2],
            [square.row-1, square.column+2],
            [square.row+1, square.column-2],
            [square.row+1, square.column+2],
            [square.row+2, square.column-1],
            [square.row+2, square.column+1]
    ];

    for (let [row, col] of potentialMoves)
    {
        if (row >= 0 && row < 8
            && col >= 0 && col < 8)
            {
                moves.push(boardSquares[row][col]);
            }
    }

    return moves.filter(move => !move.visited); // Filter out visited moves
}

const start = boardSquares[0][0]; // Starting Square
start.square.classList.add("knight");
const goal = boardSquares[7][7]; // Goal square
goal.square.classList.add("goal");
const shortestPath = findShortestPath(start, goal);

for (let i = 0; i < shortestPath.length; i++)
{
    shortestPath[i].square.classList.add("short-path");
}
console.log(shortestPath);
