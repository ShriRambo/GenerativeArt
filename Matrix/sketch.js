var symbolSize = 30
var streams = [];


function setup() {
  createCanvas(
      window.innerWidth,
      window.innerHeight);
  background(0);
  var x = 0;
  for (var i = 0; i <= width/symbolSize;i++) {
      var stream = new Stream();
      stream.generateSymbols(x,random(-1000));
      streams.push(stream);
      x+=symbolSize;
}

  
}


function draw() {
    background(0, 150);
    
   streams.forEach(function(stream){
       stream.render();
});
}


function Symbol(x,y,speed, first) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(2,20));
    this.first = first;
    
    this.setToRandomSymbol = function() {
        if (frameCount % this.switchInterval == 0){
        this.value = String.fromCharCode(
            0x30A0 + round(random(0,96))
        );
        }
    }
    

    this.rain = function() {
        
        this.y = (this.y>= height) ? 0 : this.y += this.speed;

    }
    
}



function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5,20));
    this.speed = random(8,20);
    this.symSize = symbolSize - 20 + this.speed

    
    this.generateSymbols = function(x,y) {
        
        var first = round(random(0,4)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x,y,this.speed,first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }
    
    this.render = function() {
        textSize(this.symSize);
        this.symbols.forEach(function(symbol){
            if (symbol.first){
                fill(180,255,180);
            }else {
            fill(0,255,70);
            }
            text(symbol.value,symbol.x,symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
    
}



















function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}
