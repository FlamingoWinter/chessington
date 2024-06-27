import gameSettings from "./gameSettings";
import Offset from "./offset";

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

    public squareAtOffset(offset : Offset){
        const {x, y} = offset;
        const newSquare = new Square(this.row + y, this.col + x);
        if(newSquare.inBounds()){
            return newSquare;
        }
        return null;
    }
    
    public squaresReachableInDirection(direction : Offset){
        let squares:Square[] = [];
        let nextSquare = this.squareAtOffset(direction);
        while(nextSquare){
            squares.push(nextSquare);
            nextSquare = nextSquare.squareAtOffset(direction);
        }
        return squares;
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
        const offsets : Offset[] = [
            Offset.north(),
            Offset.south(),
            Offset.east(),
            Offset.west(),
        ]
        let squares: Square[] = [];
        for (const offset of offsets) {
            squares = squares.concat(this.squaresReachableInDirection(offset));
        }
        return squares;
    }

    public getDiagonalSquares() {
        const offsets : Offset[] = [
            Offset.northeast(),
            Offset.southeast(),
            Offset.northwest(),
            Offset.southwest(),
        ]
        let squares: Square[] = [];
        for (const offset of offsets) {
            squares = squares.concat(this.squaresReachableInDirection(offset));
        }
        return squares;
    }


    public toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }
}
