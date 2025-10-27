class Sprite {
    image;
    x;
    y;
    width;
    height;
    scale;

    constructor(src, x, y, width = null, height = null) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = src;

        if (width === null) {
            this.width = this.image.width;
        }
        else {
            this.width = width;
        }
        if (height === null) {
            this.height = this.image.height;
        }
        else {
            this.height = height;
        }
        this.scale = { x: 1, y: 1 };
    }
    update(audioData) {
        let lowFreq = 0;
        let highFreq = 0;
        let zeroCount = 0;
        // Add loudness of different frequencies
        for (let i = 0; i < audioData.length; i++) {
            if (i < 8) { // 8 represents lower frequencies (arbitrary)
                lowFreq += audioData[i];
            }
            else {
                if(audioData[i] == 0){
                    zeroCount++;
                    continue;
                }
                highFreq += audioData[i];
            }
        }
        // Average out values
        lowFreq /= 8;
        highFreq /= audioData.length - 4 - zeroCount;

        this.setScale(lowFreq / 255, highFreq / 255);

        //console.log(`Low Freq: ${lowFreq}\nHighFreq: ${highFreq}`);
    }
    draw(ctx) {
        ctx.drawImage( this.image, 
            this.x - (this.width * this.scale.x) / 2,
            this.y - (this.height * this.scale.y)/2,
            this.width * this.scale.x,
            this.height * this.scale.y)
    }
    setScale(x, y) {
        this.scale.x = x;
        this.scale.y = y;
    }
}
export { Sprite }