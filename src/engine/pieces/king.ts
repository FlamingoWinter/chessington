import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Offset from "../offset";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let moves = [];
        let directions = [
            Offset.north(),
            Offset.south(),
            Offset.east(),
            Offset.west(),
            Offset.northeast(),
            Offset.northwest(),
            Offset.southeast(),
            Offset.southwest()

        ]
        for(const direction of directions){
            moves.push(currentSquare.squareAtOffset(direction));
        }

        return moves;
    }
}
