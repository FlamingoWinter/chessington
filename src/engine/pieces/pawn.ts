import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import player from "../player";
import Offset from "../offset";

export default class Pawn extends Piece {

     public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const direction = this.player === player.BLACK ? -1 : 1;
        let moves:Square[] = [];

        const oneForward = currentSquare.squareAtOffset(new Offset(0,direction))
        if(oneForward && !board.getPiece(oneForward)){
            moves.push(oneForward);
            if (this.firstMove) {
                const twoForward = currentSquare.squareAtOffset(new Offset(0,2*direction));
                if(twoForward && !board.getPiece(twoForward)){
                    moves.push(twoForward);
                }
            }
        }

        return moves;
    }


}
