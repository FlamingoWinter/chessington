import Player from '../player';
import Board from '../board';
import Square from '../square';
import gameSettings from "../gameSettings";

export default class Piece {
    public player: Player;
    public firstMove: boolean;
    public constructor(player: Player) {
        this.player = player;
        this.firstMove = true;
    }

    public inBounds(square: Square) {
        return square.row < gameSettings.BOARD_SIZE && square.col < gameSettings.BOARD_SIZE && square.row >= 0 && square.col >= 0
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public getDiagonalMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let moves = [];
        for (let i = -gameSettings.BOARD_SIZE; i < gameSettings.BOARD_SIZE; i++) {
            moves.push(new Square(currentSquare.row + i, currentSquare.col + i));
            moves.push(new Square(currentSquare.row + i, currentSquare.col - i));
        }

        moves = moves.filter(this.inBounds);
        moves = moves.filter((x) => currentSquare.notEquals(x));
        return moves;
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.firstMove = false;
    }
}
