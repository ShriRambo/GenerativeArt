

function Particle() {
 this.pos = createVector(random(width),random(height));
 this.vel = createVector(0,0);
 
 this.prevPos = this.pos.copy();
 
 this.update = function() {
     this.pos.add(this.vel);
}


this.follow = function(vectors) {
    var x = floor(this.pos.x/scl);
    var y = floor(this.pos.y/scl);
    
    var index = x + y*cols;
    this.vel = vectors[index];
}




this.show = function(){
    stroke(0,5);
    strokeWeight(1);
    //point(this.pos.x,this.pos.y);
    line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);
    this.updatePrev();
}

this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
}

this.edges = function() {
 
    
if (this.pos.x > width) {
     this.pos.x = random(width);
     this.pos.y = random(height);
     this.updatePrev();
 }
 if (this.pos.x < 0) {
     this.pos.x = width;
     this.pos.x = random(width);
     this.pos.y = random(height);
     this.updatePrev();
 }
 if (this.pos.y > height) {
     this.pos.y = 0;   
     this.pos.x = random(width);
     this.pos.y = random(height);
     this.updatePrev();
 }
 if (this.pos.y < 0) {
     this.pos.y = height;
     this.pos.x = random(width);
     this.pos.y = random(height);
     this.updatePrev();
 }
 
 // Randomly replace the point if the velocity is close to zero
 // Dont know why, but makes the simulation very slow
 //if (mag(this.vel) < 0.000000001 ){
   //  this.pos.x = random(width);
     //this.pos.y = random(height);
    // this.updatePrev(); 
//}
}

}
