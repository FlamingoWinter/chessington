export default class Offset {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static north() : Offset{
        return new Offset(0,1);
    }
    public static south() : Offset{
        return new Offset(0,-1);
    }
    public static west() : Offset{
        return new Offset(-1,0);
    }
    public static east() : Offset{
        return new Offset(1,0);
    }
    public static northeast() : Offset{
        return new Offset(1,1);
    }
    public static southeast() : Offset{
        return new Offset(1,-1);
    }
    public static northwest() : Offset{
        return new Offset(-1,1);
    }
    public static southwest() : Offset{
        return new Offset(-1,-1);
    }


    public equals(otherOffset: Offset) {
        return !!otherOffset && this.x === otherOffset.x && this.y === otherOffset.y;
    }

}
