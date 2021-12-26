import Vector from "./vector.js";


export default class BoxCollider {
    constructor(position,diagonal,color,ctx,box0Circle1){
        this.position = position;
        this.diagonal = diagonal;
        this.color = color;
        this.ctx = ctx;
        this.drawMode = box0Circle1;
        
    }

    getCenter(){
        return this.position.addV(this.diagonal.multiplyV(0.5))
    }

    /*
       A     D
        #####
        #####
        #####
       B     C
        layout of corners in rectangle
    */

    getCorners() {
        const a = this.position;
        const b = this.position.addV(new Vector(0, this.diagonal.y));
        const c = this.position.addV(this.diagonal);
        const d = this.position.addV(new Vector(this.diagonal.x, 0));
        return [a,b,c,d];
    }

   
    
    move(dir) {
        this.position = this.position.addV(dir);
    }

    pointInIt(point){
        const isInX = (point.x >= this.position.x && point.x <= this.position.x + this.diagonal.x)
        const isInY = (point.y >= this.position.y && point.y <= this.position.y + this.diagonal.y)
        return (isInX && isInY);
    }

    colidesWith(otherBox) {
        const corners = otherBox.getCorners();

        for (let index = 0; index < corners.length; index++) {
            const corner = corners[index];
            if (this.pointInIt(corner) == true){
                return true;
            }
            
        }

        return false
    }

    draw() {
        if (this.drawMode == 0){
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.position.x, this.position.y, this.diagonal.x, this.diagonal.y);
        }
        else {
            this.ctx.beginPath();
            this.ctx.arc(this.position.x,this.position.y,this.diagonal.x,0,2 * 3.15)
            this.ctx.fill();
        }
    }

}