var tree = [];
var angle;
var Clk = 0;
var maxClk = 10;
var seedID ;
var Cannvass;


function setup() {
   Cannvass =  createCanvas(400,400);
    //slider = createSlider(0,TWO_PI,PI / 4, 0.01);
    var a = createVector(width/2,height);
    var b = createVector(width/2,height - 100);
    root = new Branch(a,b);
    seedID = int(random(45,872,));
    randomSeed(seedID)
    tree[0] = root;

    angle = PI / 4;
}

function mousePressed(){
    Clk++;
    console.log("Mouse pressed")
    if (Clk <= maxClk){
        for (var i = tree.length-1; i >=0; i--){
            
            if (! tree[i].finished) {
                bOut = tree[i].branchOut()
                if (bOut.length != 0) tree.push(bOut[0]);
                if (bOut.length == 2) tree.push(bOut[1]);
                
            }
         }
    }
}





function draw() {
    background(51);
    
    push();
        textSize(8);
        noStroke();
        fill(225);
        TreeID = "ID:" + seedID; 
        text(TreeID, 5, 15);
    pop();
    //angle = slider.value()
    for (var i = 0; i < tree.length; i++){
        tree[i].show();
    }
    
    

    //noLoop();

}

// Each branch should store its childrens... Otherwise waving is difficult in this case.


function Branch(begin,end){
    this.begin = begin;
    this.end = end;
    this.finished = false;
    this.rSeed = random(1,357);

    this.show = function() {
        stroke(255);
        line(this.begin.x,this.begin.y,this.end.x,this.end.y);
        dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(0.01*noise(this.rSeed + 0.001*frameCount));
        this.end = p5.Vector.add(this.begin, dir);
    }


    this.branchOut = function() {

        var RteurnStuff = [];

        
        
        if (random() > 0.2){
            var dirR = p5.Vector.sub(this.end, this.begin);
            dirR.rotate(angle);
            dirR.mult(0.67);
            var newEndR = p5.Vector.add(this.end, dirR);
            var right = new Branch(this.end,newEndR);
            RteurnStuff.push(right);
        }
        if (random() > 0.3){
            var dirL = p5.Vector.sub(this.end, this.begin);
            dirL.rotate(-angle);
            dirL.mult(0.67);
            var newEndL = p5.Vector.add(this.end, dirL);
            var left = new Branch(this.end,newEndL);
            RteurnStuff.push(left);
        }

        this.finished = true;
        return RteurnStuff;
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



/*
function branch(len) {
    line(0, 0, 0, - len);
    translate(0,-len);
    if (len > 4){
        push();
        //angle = noise(seed + len);
            rotate(angle);
            branch( len*0.7);
        pop();
        push();
        //angle = noise(seed + len + 10);
            rotate(-angle);
            branch( len*0.7);
        pop();
    }
    
   
}
*/