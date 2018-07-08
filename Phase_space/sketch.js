var scl = 2;        // Resolution of Phase plane
var rows, cols;     
var particles = []; // Array to store particles
var flowfield = []; // Array to store flow field
var nParticles = 1000; // Number of particles




function setup() {
  createCanvas(200, 200);   // Canvas size
  cols= floor(width/scl);   
  rows= floor(height/scl);
  
  cent = createVector(cols/2,rows/2);   // Center of the canvas
  xlim = 1; // X range = -xlim..xlim
  ylim = 1; // Y rane  = -ylim..ylim
  
  // Scale multiplier to transform to required coordinate system
  xscl = 2*xlim/cols;
  yscl = 2*ylim/rows;
  
  flowfield = new Array(cols*rows); // Empty flow field array
   
  for (var i=0; i< nParticles; i++){
    particles[i] = new Particle();
  }
  
  getFlowField(cols,rows,cent,xlim,ylim);
}




// Dynamical system. 
// Edit following two functions
function dX(x,y){
    return y;
}
function dY(x,y){
    return 2*x*x - x + 0.01*(1 - x*x)*y;
}




// Function to generate flowfield
function getFlowField(cols,rows,cent,xlim,ylim){
    for (var y = 0; y < rows; y++) {
    
        for (var x = 0; x < cols; x++) {
        
            var index = x + y *cols;
            var xpos = xscl*(x - cent.x);
            var ypos = yscl*(y - cent.y);
            
            
            var xdot = dX(xpos,ypos);
            var ydot = dY(xpos,ypos);
            
            var c = 1; // To slow down or speed up the flow 
            
            var v = createVector(c*xdot,c*ydot);
            flowfield[index] = v;
  
        }
    }
}


function draw() {
     //background(255);
      
      // Uncomment following lines to view flowfields
        //stroke(0,50);
        //push();
        //translate(x*scl,y*scl);
        //rotate(v.heading());
        //strokeWeight(1);
        //line(0,0,scl,0);
        //pop();
    
    
  
  
  // Updating particle positions
  for (var i=0; i< nParticles; i++){
    particles[i].update();
    particles[i].show();
    particles[i].edges();
    particles[i].follow(flowfield);
  }
  

  //noLoop();
}


function mouseClicked() {
   background(255);
   for (var i=0; i< nParticles; i++){
    particles[i] = new Particle();
  }
}
