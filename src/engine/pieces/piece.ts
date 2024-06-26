import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;
    public firstMove;
    public constructor(player: Player) {
        this.player = player;
        this.firstMove = true;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public getLateralMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let moves = [];
        for (let i = 0; i < 8; i++) {
            moves.push(new Square(i, currentSquare.col));
            moves.push(new Square(currentSquare.row, i));
        }
        // Remove piece position from moves
        moves = moves.filter((square) => (square.row != currentSquare.row) || (square.col != currentSquare.col));
        return moves;
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.firstMove = false;
    }
}
