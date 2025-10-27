class AudioFrame{
    colorData;
    data;
    x;
    speed;
    constructor(data,speed){
        this.data = Array.from(data);
        this.colorData = Array.from(data).map(e=>AudioFrame.audioToColor(e));
        this.x = 0;
        this.speed = speed;
    }
    draw(ctx,canvasHeight){
        ctx.save();
        let width;
        let height = canvasHeight/this.data.length;
        
        for (let i = 0; i < this.data.length; i++){
            width = this.data[i] / 255 * this.speed;
            ctx.beginPath();
            ctx.moveTo(this.x,i*height);
            ctx.lineTo(this.x-width,i*height);
            ctx.lineTo(this.x-width,(i+1)*height);
            ctx.lineTo(this.x,(i+1)*height);
            ctx.closePath();
            ctx.fillStyle = this.colorData[i];
            ctx.fill();
        }
        ctx.restore();
    }
    move(){
        this.x += this.speed;
    }
    setSpeed(speed){
        this.speed = speed;
    }
    static audioToColor(loudness){
        return `rgba(${loudness},0,${255-loudness},${loudness})`;
    }
}
export {AudioFrame};