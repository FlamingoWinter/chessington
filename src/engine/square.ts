import gameSettings from "./gameSettings";

export default class Square {
    public row: number;
    public col: number;

    public constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    public static at(row: number, col: number) {
        return new Square(row, col);
    }

    public equals(otherSquare: Square) {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    public notEquals(otherSquare: Square) {
        return !this.equals(otherSquare);
    }

    public inBounds() {
        return this.row < gameSettings.BOARD_SIZE && this.col < gameSettings.BOARD_SIZE && this.row >= 0 && this.col >= 0
    }

    public getSquaresInRankAndFile() {
        let squares = [];
        for (let i = 0; i < gameSettings.BOARD_SIZE; i++) {
            squares.push(new Square(i, this.col));
            squares.push(new Square(this.row, i));
        }
        // Remove piece position from moves
        squares = squares.filter((square) => (square.row != this.row) || (square.col != this.col));
        return squares;
    }

    public getDiagonalSquares() {
        let squares = [];
        for (let i = -gameSettings.BOARD_SIZE; i < gameSettings.BOARD_SIZE; i++) {
            squares.push(new Square(this.row + i, this.col + i));
            squares.push(new Square(this.row + i, this.col - i));
        }

        squares = squares.filter((square) => square.inBounds());
        squares = squares.filter((square) => this.notEquals(square));
        return squares;
    }


    public toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }
}
