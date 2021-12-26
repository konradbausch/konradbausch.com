export default class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    addV(otherVector){
        return new Vector(this.x + otherVector.x, this.y + otherVector.y)
    }

    subtractV(otherVector){
        return new Vector(this.x - otherVector.x, this.y - otherVector.y)
    }

    multiplyV(factor){
        return new Vector(this.x * factor, this.y * factor)
    }
    
}