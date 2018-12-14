
var Cannvass;
var tree;
var max_dist = 50;
var min_dist = 10;
var nLeaves = 600;

function setup() {
    Cannvass = createCanvas(400,400);
   // randomSeed(999);
    tree = new Tree();
    
    
}

function draw() {
    background("#140000");140000 //FFFCCF
    
    tree.show();
    tree.grow();
}


function Tree() {
    this.leaves = [];
    this.branches = [];

    for (var i = 0; i < nLeaves; i++){
        this.leaves.push(new Leaf());
    }
    var coin = (random() > 0.5);
    var coin2 = (random() > 0.5);
    var rx = coin*random(2*width/8,7*width/8) + (!coin)*(coin2)*width;
    var ry = (!coin)*random(2*width/8,7*width/8) + (coin)*(coin2)*height;
    
    var position = createVector(rx,ry);
    var dir = createVector(1,+1);
    var root = new Branch(null,position,dir);
    this.branches.push(root)

    var current = root;
    var found = false;

    while(!found){
        for (var i = 0; i < this.leaves.length; i++){
            var d = p5.Vector.dist(current.pos, this.leaves[i].pos);
            if (d < max_dist){
                found = true;
            }
        }

        if(!found){
            var brannch = current.next();
            current = brannch;
            this.branches.push(current);
        }
    }
    


    this.grow = function(){
        
        for(var i = 0; i < this.leaves.length; i++){
            var leaf = this.leaves[i];

            var closestBranch = null;
            var record = 99999;
            for(var j = 0; j < this.branches.length; j++){
                var branch = this.branches[j];
                var d = p5.Vector.dist(leaf.pos,branch.pos);
                
                if (d < min_dist){
                    leaf.reached = true;
                    break;
                }else if(d > max_dist){
                    
                }else if (closestBranch == null || d < record){
                    closestBranch = branch;
                    record = d;
                }

                
            }


            if(closestBranch != null){
                var newDir = p5.Vector.sub(leaf.pos,closestBranch.pos);
                newDir.normalize();
                closestBranch.dir.add(newDir)
                closestBranch.count++;
                
            }


        }


        for(var i =  this.leaves.length -1; i>=0 ; i--){
            if (this.leaves[i].reached){
                this.leaves.splice(i,1);
            }
        }

        for(var i = this.branches.length -1; i>= 0 ; i--){
           var branch = this.branches[i];
           if(branch.count > 0){
               branch.dir.div(branch.count);
               this.branches.push(branch.next());
            //    var newPos = p5.Vector.add(branch.pos,branch.dir);
            //    var newBranch = new Branch(branch, newPos, branch.dir.copy());
            //    this.branches.push(newBranch);
           }
           branch.reset();
        }


    }




    this.show = function() {
        // for (var i=0;i<this.leaves.length; i++){
        //     this.leaves[i].show();
        // }

        for (var i=0;i<this.branches.length; i++){
            this.branches[i].show();
        }
    }
}



function Leaf(){
    this.pos = getRandomPos();
    this.reached = false;

    function getRandomPos(){
        inRegion = false;
        var x;
        var y;
        while(!inRegion){
            x = random(5,width-5)
            y = random(5,height-5);
            inRegion = true;
            //if( abs(x - width/2)**2  + ( height - y)**2 >= 100  ){
             //   console.log("In the region");
             //   inRegion = true;
            //}
        }
        
       
        return createVector(x,y);
    }

    this.show = function(){
        fill("#ff025a");
        noStroke();
        ellipse(this.pos.x, this.pos.y,4,4);
    }
}


function Branch(parent,pos,dir) {
    this.pos = pos;
    this.parent = parent;
    this.dir = dir;
    this.origDir = this.dir.copy();
    this.count = 0;
    this.len = 3;
    this.sWidth = 4;
    this.isleaf = true;

    if(this.parent != null){
        var mult;
        var minWidth = 1;
        if(this.parent.sWidth >= minWidth){
            mult = 0.95;
        }else{
            mult = 1;
        }

        this.sWidth = this.parent.sWidth*mult;
    }

    this.reset = function() {
        this.dir = this.origDir.copy();
        this.count = 0;
    }

    this.next = function(){
        var noiseDir = createVector(0.01*noise(this.pos.x,this.pos.y),0.01*noise(this.pos.x + 100,this.pos.y + 100));
        var nextDir = p5.Vector.mult(this.dir,this.len)
        var nextPos = p5.Vector.add(this.pos,noiseDir);
        nextPos = p5.Vector.add(nextPos,nextDir);
        var nextBranch = new Branch(this, nextPos, this.dir.copy());
        this.isleaf = false;
        return nextBranch;
    }

    this.show = function(){
        //console.log("something");
        if(this.parent != null){
            stroke("#94C600");
            noStroke;
            strokeWeight(this.sWidth);
            line(this.pos.x,this.pos.y,this.parent.pos.x,this.parent.pos.y);

            if(this.isleaf){
                push();
                    fill("#ff025aA0");
                    noStroke();
                    ellipse(this.pos.x, this.pos.y,4,4);
                pop();
            }
        }
    }
    
}






function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        name = 'TheTreeID' ;
        //saveCanvas(Cannvass, name, 'jpg');
    }
    if(key == 'N'){
        tree = new Tree();
    }
}



