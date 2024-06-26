
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

    public getSquaresInRankAndFile() {
        let squares = [];
        for (let i = 0; i < 8; i++) {
            squares.push(new Square(i, this.col));
            squares.push(new Square(this.row, i));
        }
        // Remove piece position from moves
        squares = squares.filter((square) => (square.row != this.row) || (square.col != this.col));
        return squares;
    }

    public toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }
}
