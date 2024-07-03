

// Пузырьки при помощи ИИ


const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];
const BUBBLE_DENSITY = 100;

function generateDecimalBetween(max, min) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function generateColor(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}




class Bubble {
    constructor(canvas) {
        this.canvas = canvas;
        this.getCanvasSize();
        this.init();
    }

    getCanvasSize() {
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }
  
    init() {
        this.color = generateColor(COLORS.length, 0);;
        //  let min = 0;
        // let max = COLORS.length - 1;
        //Math.floor( Math.random() * (max - min) + min);
       
        this.size = generateDecimalBetween(4, 1);
        this.alpha = generateDecimalBetween(10, 5) / 10;
        this.translateX = generateDecimalBetween(this.canvasWidth, 0);
        this.translateY = generateDecimalBetween(this.canvasHeight, 0);
        this.velocity = generateDecimalBetween(40, 20);
        this.movementX = generateDecimalBetween(2, -2) / this.velocity;
        this.movementY = generateDecimalBetween(20, 1) / this.velocity;
      
    }
  
    move() {
        this.translateX = this.translateX - this.movementX;
        this.translateY = this.translateY - this.movementY;
        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
        }
    }
  }

//const canvas = document.getElementById("orb-canvas");

//   const bubbles = [];
// bubbles.push(new Bubble(canvas));
// bubbles.push(new Bubble(canvas));
// bubbles.push(new Bubble(canvas));

// console.log(bubbles);


  function getRandom(max = 10, min = 0){
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getColor(){
      let r = getRandom(256),
          g = getRandom(256),
          b = getRandom(256);
          return `rgb(${r}, ${g}, ${b})`;
  }


  
class canvasBackground{
    constructor(id){
       this.canvas = document.getElementById(id);
       this.ctx = this.canvas.getContext('2d');
       this.dpr = window.devicePixelRatio;
    }
    

    start(){
        this.canvasSize();
        this.generateBubbles();
        this.animate();
    }


    canvasSize(){
        this.canvas.width = this.canvas.offsetWidth * this.dpr;
        this.canvas.height = this.canvas.offsetHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
    }


    generateBubbles(){
        this.bubblesList = []; // this для сохранения списка в контексте объекта
        for (let i = 0; i < BUBBLE_DENSITY; i++) {
            this.bubblesList.push(new Bubble(this.canvas));
        }
    }

    animate() {
       // this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.bubblesList.forEach(bubble => {
          this.ctx.save();
          bubble.move();
          this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
          this.ctx.translate(bubble.translateX, bubble.translateY);
          this.ctx.beginPath();
          this.ctx.arc(0, 0, bubble.size, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(${COLORS[bubble.color]},${bubble.alpha})`;
          this.ctx.fill();
          this.ctx.restore();
        });

        requestAnimationFrame(this.animate.bind(this));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const CanvasBackground = new canvasBackground('orb-canvas'); // Исправлено на правильное имя класса
    CanvasBackground.start();
});
