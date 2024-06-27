import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import player from "../player";
import Offset from "../offset";
import King from "./king";

export default class Pawn extends Piece {

     public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const direction = this.player === player.BLACK ? -1 : 1;
        let moves:Square[] = [];

        const oneForward = board.offsetSquareAndCheckBounds(currentSquare, new Offset(0,direction))
        if(oneForward && !board.getPiece(oneForward)){
            moves.push(oneForward);
            if (this.firstMove) {
                const twoForward = board.offsetSquareAndCheckBounds(currentSquare, new Offset(0,2*direction));
                if(twoForward && !board.getPiece(twoForward)){
                    moves.push(twoForward);
                }
            }
        }

        const diagonalEast = board.offsetSquareAndCheckBounds(currentSquare, new Offset(1,direction));
        const diagonalWest = board.offsetSquareAndCheckBounds(currentSquare, new Offset(-1,direction));

        for (let captureSquare of [diagonalEast, diagonalWest]) {
            if(captureSquare){
                if(board.getPiece(captureSquare)){
                    if(board.enemyPieceIsOn(captureSquare) && !(board.getPiece(captureSquare) instanceof King)) {
                        moves.push(captureSquare);
                    }
                }
            }
        }


        return moves;
    }


}
