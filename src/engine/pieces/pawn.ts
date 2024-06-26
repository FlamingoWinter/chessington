import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import player from "../player";

export default class Pawn extends Piece {

     public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const direction = this.player === player.BLACK ? -1 : 1;
        let moves:Square[] = [];
        moves.push(new Square(currentSquare.row + direction, currentSquare.col));
        if (this.firstMove) {
            moves.push(new Square(currentSquare.row + direction * 2, currentSquare.col));
        }
        return moves;
    }


}
