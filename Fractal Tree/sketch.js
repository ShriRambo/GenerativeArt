var angle =0;
var seed = 0;
var d = 0.75;
var Cannvass;
var seedID;

var slider;

function setup() {
    Cannvass = createCanvas(750,410);
    //slider = createSlider(0,TWO_PI,PI / 4, 0.01);
    seedID = int(random(0,1000));
}


function draw() {
    background(51);
    seed = seed + 0.01; // slider.value();
    translate(width/2,height)
    len = 80;
    stroke(255);
    strokeWeight(3);
    branch(len);

    //noLoop();

}


function branch(len) {
    
    strokeWeight(3*(len/100));
    line(0, 0, 0, - len);
    translate(0,-len);
    angle = noise(seed + len)
    randomSeed(len*sqrt(99)*101);
    r1 = random();
    r2 = random();
    if (len > 6){
        
        if (r1 > 0.0 ){
            push();
            angle = noise(seed + len);
                rotate(angle);
                branch( len*d);
            pop();
        }
      
        if (r2 > 0.0){
            push();
            angle = noise(seed + len + 100);
                rotate(-angle);
                branch( len*d);
            pop();
        }
    } else{
        push();
        fill("#556B2F70");
        noStroke();
        ellipse(0, 0, 5, 5);
        pop();
    }
    
   
}










function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        name = 'TheTreeID' + seedID;
        saveCanvas(Cannvass, name, 'jpg');
    }
}



