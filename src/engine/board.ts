import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import Offset from "./offset";
import King from "./pieces/king";
import gameSettings from "./gameSettings";

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

    private inBounds(square:Square) {
        return square.row < gameSettings.BOARD_SIZE && square.col < gameSettings.BOARD_SIZE && square.row >= 0 && square.col >= 0
    }

    public offsetSquareAndCheckBounds(square:Square, offset:Offset):Square | null{
        const offsetSquare = square.offset(offset);
        if(this.inBounds(offsetSquare)){
            return offsetSquare;
        }
        return null;
    }

    public enemyPieceIsOn(square : Square):boolean {
        return this.getPiece(square)?.player != this.currentPlayer;
    }

    public squaresReachableInDirection(square: Square, offset : Offset){
        let squares:Square[] = [];
        let nextSquare = this.offsetSquareAndCheckBounds(square,offset);
        while(nextSquare && !this.getPiece(nextSquare)){
            squares.push(nextSquare);
            nextSquare = this.offsetSquareAndCheckBounds(nextSquare,offset);
        }

        if(nextSquare && this.enemyPieceIsOn(nextSquare)){
            if(!(this.getPiece(nextSquare) instanceof King)){
                squares.push(nextSquare);
            }
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

    public squaresReachableWithOffsets(square: Square, offsets: Offset[]): Square[] {
        let squares: Square[] = [];
        for (let offset of offsets){
            const newSquare = this.offsetSquareAndCheckBounds(square, offset);
            if (newSquare) {
                if(this.getPiece(newSquare)){
                    if(this.enemyPieceIsOn(newSquare) && !(this.getPiece(newSquare) instanceof King)) {
                        squares.push(newSquare);
                    }
                }
                else{
                    squares.push(newSquare);
                }
            }
        }
        return squares;
    }
}
