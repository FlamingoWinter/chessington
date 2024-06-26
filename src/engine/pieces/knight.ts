import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }


    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let moves = [];

        moves.push(new Square(currentSquare.row + 2, currentSquare.col + 1));
        moves.push(new Square(currentSquare.row + 2, currentSquare.col - 1));
        moves.push(new Square(currentSquare.row - 2, currentSquare.col + 1));
        moves.push(new Square(currentSquare.row - 2, currentSquare.col - 1));
        moves.push(new Square(currentSquare.row + 1, currentSquare.col + 2));
        moves.push(new Square(currentSquare.row + 1, currentSquare.col - 2));
        moves.push(new Square(currentSquare.row - 1, currentSquare.col + 2));
        moves.push(new Square(currentSquare.row - 1, currentSquare.col - 2));

        moves = moves.filter((square) => square.inBounds);

        return moves;
    }
}
