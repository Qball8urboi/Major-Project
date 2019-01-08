// final Project
// quincy fast
// november 21st
//


// making a class for buttons and holding info and hovering and stuff
class GuiButton {
    constructor(image, x, y) {
      this.x = x;
      this.y = y;
      this.size = 200;
      this.tint = color(243,84,41);
      this.image = image;
      this.hovering = false;
      this.hit = false;
      this.selected = false;
    }
    //displaying the hovering tint
    flagdisplay() {
      //tinting orange when the mouse is hovering over top of the button
      if(this.hovering) {
        tint(this.tint);
      }
      else {
        noTint();
      }
      //displaying buttons
      image(this.image, this.x , this.y, this.size, this.size);
      //turning tint off fro the cycle can work again
      noTint();
    }
    //logic behind knowing when the mouse is hovering, and setting a variable to the button thats clicked
    flagclicked() {
        //using p5collid to do hovering logic
        this.hit = collidePointCircle(mouseX,mouseY, this.x, this.y, this.size, this.size); 
        //if hovering is true it should tint, and if hovering is false it shouldnt
        if(this.hit){
            this.hovering = true;
        }
        else {
            this.hovering = false;
        }
        //when this.selected is true the draw bloop no longer draws the buttons
        if(this.hovering && mouseIsPressed){
            this.selected = true;
        }
        else {
            this.selected = false;
        }
    }
}
  
  



let margin = 210; // margin is just the distance between the centers of the flags in the falg selection screen
let country;
let countrySelection = false;
let characterMaker = false;
let input, button, greeting;
let name;

function preload() {
    //loading flag icons
    canadaFlag = loadImage("assets/Canada Flag.png");
    unitedStatesFlag = loadImage("assets/USA Flag.png");
    eritreaFlag = loadImage("assets/Eritrea Flag.png");
    kenyaFlag = loadImage("assets/Kenya Flag.png");
    greatBritainFlag = loadImage("assets/Brit.png");
}

function setup() {
    //creating canvas
    createCanvas(windowWidth,windowHeight);
    if(namePicker){
        namePicker();
    }
    

    //making button classes for countrys
    canadaButton = new GuiButton(canadaFlag, width/2, height/2);
    unitedStatesButton = new GuiButton(unitedStatesFlag, width/2 + margin, height/2);
    eritreaButton = new GuiButton(eritreaFlag, width/2 + 2*margin, height/2);
    greatBritainButton = new GuiButton(greatBritainFlag, width/2 - 2*margin, height/2);
    kenyaButton = new GuiButton(kenyaFlag, width/2 - margin, height/2)

}

function draw() {
    background(243,84,41);
    //displaying country selection until one is selected
    if(countrySelection===true){
        displayFlagSelection();
    }

    
}

//setting up some visuals for the flag selection screen :)
function flagSelectionText() {
    textSize(50);
    textAlign(CENTER);
    textFont('Georgia');
    fill(255);
    text("PICK YOUR COUNTRY", width/2, 200);
    imageMode(CENTER);
}

//displaying the flag classes
function displayFlagSelection() {
    flagSelectionText();
    //displaying the flag guis
    canadaButton.flagdisplay();
    unitedStatesButton.flagdisplay();
    kenyaButton.flagdisplay();
    eritreaButton.flagdisplay();
    greatBritainButton.flagdisplay();
     
    canadaButton.flagclicked();
    unitedStatesButton.flagclicked();
    kenyaButton.flagclicked();
    eritreaButton.flagclicked();
    greatBritainButton.flagclicked();
    //depending on which country you select, it sets a varaible to keep the infromation 
    if(canadaButton.selected === true){
        country = "Canada";
        countrySelection = false;
    }
    if(unitedStatesButton.selected === true){
        country = "United States";
        countrySelection = false;
    }
    if(kenyaButton.selected === true){
        country = "Kenya";
        countrySelection = false;
    }
    if(eritreaButton.selected === true){
        country = "Eritrea";
        countrySelection = false;
    }
    if(greatBritainButton.selected === true){
        country = "Great Britain";
        countrySelection = false;
    }
}

function namePicker() {
    
    input = createInput();
    input.position(20, 65);
    
    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(greet);
    
    greeting = createElement('h2', 'what is your name?');
    greeting.position(20, 5);
    
    textAlign(CENTER);
    textSize(50);
    
}  
function greet() {
    name = input.value();
    input.value('');
    namePicker = false;
    background(243,84,41);
    countrySelection = true;
}
    


    