import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        return currentSquare.getDiagonalSquares();
    }
}
