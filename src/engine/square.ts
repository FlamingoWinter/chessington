import gameSettings from "./gameSettings";
import Offset from "./offset";
import Board from "./board";

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
        return undefined;
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



    public toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }
}
