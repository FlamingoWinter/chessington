import Piece from './piece';
import Player from '../player';
import Board from '../board';
import gameSettings from "../gameSettings";
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
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

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let moves = [];

        moves.push(new Square(currentSquare.row + 2, currentSquare.col + 1));
        moves.push(new Square(currentSquare.row + 2, currentSquare.col - 1));
        moves.push(new Square(currentSquare.row - 2, currentSquare.col + 1));
        moves.push(new Square(currentSquare.row - 2, currentSquare.col - 1));
        moves.push(new Square(currentSquare.row + 1, currentSquare.col + 2));
        moves.push(new Square(currentSquare.row + 1, currentSquare.col - 2));
        moves.push(new Square(currentSquare.row - 1, currentSquare.col + 2));
        moves.push(new Square(currentSquare.row - 1, currentSquare.col - 2));

        moves = moves.filter(this.inBounds);

        return moves;
    }
}
