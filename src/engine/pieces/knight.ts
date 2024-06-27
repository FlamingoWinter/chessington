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
            const newSquare = board.offsetSquareAndCheckBounds(currentSquare, offset);
            if (newSquare) {
                if(board.getPiece(newSquare)){
                    if(board.enemyPieceIsOn(newSquare))
                    {
                        if (!(board.getPiece(newSquare) instanceof King)) {
                            moves.push(newSquare);
                        }
                    }
                }
                else{
                    moves.push(newSquare);
                }
            }
        }

        return moves;
    }
}
