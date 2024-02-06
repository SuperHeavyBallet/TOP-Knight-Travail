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

class BoardRow
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
            

            boardRowContainer.appendChild(square);
            boardSquareMatrix[rowNum].push(square);
        }

        board.appendChild(boardRowContainer);

    }

}

const newBoardRow = new BoardRow();
console.log(boardSquareMatrix);