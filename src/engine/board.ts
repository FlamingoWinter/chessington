import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import Offset from "./offset";

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    public squaresReachableInDirection(square: Square, direction : Offset){
        let squares:Square[] = [];
        let nextSquare = square.squareAtOffset(direction);
        while(nextSquare && !this.getPiece(nextSquare)){
            squares.push(nextSquare);
            nextSquare = nextSquare.squareAtOffset(direction);
        }
        return squares;
    }

    public squaresReachableLaterally(square:Square) {
        const offsets : Offset[] = [
            Offset.north(),
            Offset.south(),
            Offset.east(),
            Offset.west(),
        ]
        let squares: Square[] = [];
        for (const offset of offsets) {
            squares = squares.concat(this.squaresReachableInDirection(square, offset));
        }
        return squares;
    }

    public squaresReachableDiagonally(square: Square) {
        const offsets : Offset[] = [
            Offset.northeast(),
            Offset.southeast(),
            Offset.northwest(),
            Offset.southwest(),
        ]
        let squares: Square[] = [];
        for (const offset of offsets) {
            squares = squares.concat(this.squaresReachableInDirection(square, offset));
        }
        return squares;
    }
}
