import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Offset from "../offset";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }


    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let moves = [];
        let offsets = [
            new Offset(2,1),
            new Offset(1,2),
            new Offset(-2,1),
            new Offset(-1,2),
            new Offset(2,-1),
            new Offset(1,-2),
            new Offset(-2,-1),
            new Offset(-1,-2),
        ]
        for(let offset of offsets){
            const newSquare = currentSquare.squareAtOffset(offset);
            if (newSquare) {
                moves.push(currentSquare.squareAtOffset(offset));
            }

        }

        return moves;
    }
}
