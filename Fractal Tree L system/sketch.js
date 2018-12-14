// Var: A B
// Axiom: A
// Rules: A -> AB,  B -> A

// L system
// var F + - [ ]
// axiom F
// rule F -> FF+[+F-F-F]-[-F+F+F]    F+[[XX]-X]-F[-FX]+X

// axiom X
// 1 a: "F", b: "FF"
// 2 a: "X",  b: "F+[[X]-X]-F[-FX]+X" b: "F+[[X]-X]-F[+FX]+X"  b: "F+[[X]-X]-F[-FX]+FX"
// 2 

var Cannvass;
var len = 100;
var angle;

var axiom = "X";
var sentence = axiom;
var rules = [];




rules[0] = { 
    a: "F",
    b: "FF"
}
rules[1] = { 
    a: "X",
    b: "F+[[X]-X]-F[-FX]+FX"
}

/*
rules[0] = { 
    a: "F",
    b: " FF+[+FF-FF]-[-F+F+F]"
}
*/


function generate() {
    len = 0.5*len
    var nextSentence = "";
    for(var i = 0; i < sentence.length; i++){
        var current = sentence.charAt(i);
        var found = false;
        for(var j = 0; j < rules.length; j++){
            if(current == rules[j].a){
                nextSentence += rules[j].b;
                found = true;
                break;
            }
        } 
        if(! found) {
            nextSentence += current;
        }
    }

    sentence = nextSentence;
    //createP(sentence);
    turtle();

}


function turtle(){
    background("#F4F4CF"); //F4F4CF
    resetMatrix(); // resets all the translation and rotation
    translate(width/2 - 40,height);
    rotate(PI / 6)
    stroke("#42431F80");
    strokeWeight(1);

    for (var i = 0; i < sentence.length; i++){
        var current = sentence.charAt(i);

        if(current =="F"){
            line(0,0,0,-len);
            translate(0,-len);
        } else if (current == "+") {
            rotate(angle)
        }  else if (current == "-") {
            rotate(-angle)
        }else if (current == "[") {
            push();
        }else if (current == "]") {
            pop();
        }


    }
}


function setup() {
    Cannvass = createCanvas(400,420);
    background(51);
    //noCanvas();
    angle = radians(-25);
    //createP(sentence);
    turtle();
    var button = createButton("generate");
    button.mousePressed(generate);
    
}





function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        name = 'Fern'
        saveCanvas(Cannvass, name, 'jpg');
    }
}



