import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Offset from "../offset";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }


    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let moves = [];
        let directions = [
            new Offset(2,1),
            new Offset(1,2),
            new Offset(-2,1),
            new Offset(-1,2),
            new Offset(2,-1),
            new Offset(1,-2),
            new Offset(-2,-1),
            new Offset(-1,-2),
        ]
        for(const direction of directions){
            moves.push(currentSquare.squareAtOffset(direction));
        }

        return moves;
    }
}
