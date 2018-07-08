var aks = [];
var poas = [];
var dx = 25;
var nx = 20;
var ny = 20;
var clrs = [];
var poas_index = 0;

function setup() {
  createCanvas(nx*dx,ny*dx);
  angleMode(DEGREES);
  background('#f9f7ca');
  
  for(var i = 0; i < nx; i++){
      var col = [];
      for (var j = 0; j < ny; j++){
         col[j] = new ark( dx*(i + 0.5), dx*(j + 0.5));
         
         if (random() < 0.2){
             poas[poas_index++] = new poa(dx*(i + 0.5), dx*(j + 0.5));
        }
      }
      aks[i] = col;
  }
  
  
  clrs[0] = '#FF6B57';
  clrs[1] = '#FF884D';
  clrs[2] = '#32526E';
  clrs[3] = '#81B9C3';
  
  
  //
  //saveFrames("Anim_","png",2,2);
}


function draw() {
    background('#f9f7ca50');  //
    //translate(200,200);
    //rotate(-90)
    
    for(var i = 0; i < nx; i++){
      for (var j = 0; j < ny; j++){
        aks[i][j].drawArk();
    }
    }
    
    for (var i = 0; i < poas_index; i++){
        poas[i].drawPoa();
    }
    
    
}












function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}





function ark(x,y) {
    
    this.x = x;
    this.y = y;
    this.vel0 = 10
    this.vel = this.vel0;
    this.startL = 45 + 90*round(random(0,4));
    this.endL = this.startL - 90;
    this.diam = dx*0.7;
    this.clr = floor(random(0,4));
    this.tLag = round(random(0,50))
    
    this.drawArk = function() {
        
    strokeWeight(10*(dx/50));
    noFill();
    stroke(clrs[this.clr]);
    arc(this.x,this.y,this.diam,this.diam, this.startL,this.endL);
    
    this.updatePos();
    }
    
    this.updatePos = function() {
        this.startL += this.vel;
        this.endL += this.vel;
        
        if ((this.startL+45) % 90 == 0) {
            this.vel = 0;
        }
        
        if ( ((frameCount + this.tLag) % 50) == 0) {
            this.vel = round(random())*2*this.vel0 - this.vel0;
        }
    }
    
    
}







function poa(x,y) {
    
    this.x = x;
    this.y = y;
    this.daim0 = 0.35*dx;
    this.daim = this.daim0*random();
    this.vel = 0.4;
    this.col = floor(random(0,4));
    this.tLag = round(random(0,50))
    
    this.drawPoa = function() {
        
        noStroke();
        fill(clrs[this.col]);
        
        ellipse(this.x,this.y,this.daim,this.daim);
        
        this.updaePoa();
    }
    
    
    this.updaePoa = function() {
        this.daim -= this.vel;
        
        if (this.daim <= 0 ) {
            this.vel = -this.vel;
            this.x = dx*(0.5+floor(random(0,nx)));
            this.y = dx*(0.5+floor(random(0,ny)));
            this.col = floor(random(0,4));
        }
        
        if(abs(this.daim) >= this.daim0) {
            this.vel = -this.vel;
        }
        
        
    }
    
    
}

