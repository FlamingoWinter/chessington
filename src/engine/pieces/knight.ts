import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Offset from "../offset";
import King from "./king";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }


    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
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

        return board.squaresReachableWithOffsets(currentSquare, offsets)
    }
}
