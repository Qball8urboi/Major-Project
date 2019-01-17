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
    // simpleDisplay(){
    //     image(this.image, width/2 , height/2, this.size, this.size);

    // }

    //logic behind knowing when the mouse is hovering, and setting a variable to the button thats clicked
    flagclicked() {
        this.selected = false;
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
  
//runner class to show the animations of the player 1 and two runners
class Runner {
    constructor(graphics){
        this.x=0;
        this.y = height;
        //speed
        this.dx = 12;
        this.winOne = false;
        this.winTwo = false;
        // counter to count which image i am currently on
        this.counter=0;
        
        this.raceCounter=0;
        
        // setting this.graphics to the list of images to make one full running cycle
        this.graphics= graphics;
        

    }
    running(player){
        //if you get to image number 10, it sends you back to image number 1
        if(this.counter>=10){
            this.counter = 0;
        }  
        if(player === "two"){
            tint(255,0,255);
            image(this.graphics[this.counter], this.x, this.y - 2*(this.graphics[this.counter].height/3), this.graphics[this.counter].width/3, this.graphics[this.counter].height/3);
        }
        //displaying the image
        if(player === "one"){
            image(this.graphics[this.counter], this.x, this.y - this.graphics[this.counter].height/3, this.graphics[this.counter].width/3, this.graphics[this.counter].height/3);
        }
        noTint();
    }

    //logic behind how long the race is, every click of the two buttons is 1 meter
    clicked(player){
        if(player === "one"){
            //race counter just counter up until it reaches the distance required
            if(this.raceCounter<100){
                if(key==="a"||key==="d"){
                    this.counter = this.counter+1;
                    this.raceCounter = this.raceCounter+1;
                    this.x += this.dx;
                }
            }
            else if(this.raceCounter >=100 && this.winTwo === false){
                this.winOne = true;
            }
        }
        if(player === "two"){
            if(this.raceCounter<100){
                if(key==="h" || key==="k"){
                    this.counter = this.counter + 1;
                    this.raceCounter = this.raceCounter + 1;
                    this.x += this.dx;
                }
            }
            else if (this.raceCounter >=100 && this.winOne === false){
                this.winTwo = true;
            }
        }

    }

}

//timer class to time both players in the race
class Timer {
    constructor(timeToWait) {
      this.startTime = millis();
      this.waitTime = timeToWait;
    }
  
    isDone() {
      if (millis() >= this.startTime + this.waitTime) {
        return true;
      }
      else {
        return false;
      }
    }
  
    reset(timeToWait) {
      this.startTime = millis();
      this.waitTime = timeToWait;
    }
  }


let margin = 210; // margin is just the distance between the centers of the flags in the falg selection screen

let country;//picking country varable

// a bunch of boolens for i can switch from function to function in my code
let countrySelection = false;
let competetion = false;
let welcome = false;
let startingScreen = true;
let playerOne = false; 
let playerTwo = false;
let winner = false;

//use input things, some fro player 1 and some for player 2
let input, button, greeting;
let inputTwo, buttonTwo, greetingTwo;
let name = "";
let nameTwo = "";
//running grpahics, will be list with images
let runningGrphics = [];
//temp varaible
let race = 100;
//some varibales to help with the running graphics, and the differnt images used in it
let positionOne, positionTwo, positionThree, positionFour, positionFive, positionSix, positionSeven, positionEight, positionNine, positionTen;
let counter = 0;
let raceCounter = 0;
//just a varaible to make it easy to figure out if it is player 1 or 2 selcting their country and name
let temp;

function preload() {
    //loading flag icons
    canadaFlag = loadImage("assets/Canada Flag.png");
    unitedStatesFlag = loadImage("assets/USA Flag.png");
    eritreaFlag = loadImage("assets/Eritrea Flag.png");
    kenyaFlag = loadImage("assets/Kenya Flag.png");
    greatBritainFlag = loadImage("assets/Brit.png");
    //loading running graphics
    positionOne = loadImage("assets/runner0.png");
    positionTwo = loadImage("assets/runner1.png");
    positionThree = loadImage("assets/runner2.png");
    positionFour = loadImage("assets/runner3.png");
    positionFive = loadImage("assets/runner4.png");
    positionSix = loadImage("assets/runner5.png");
    positionSeven = loadImage("assets/runner6.png");
    positionEight = loadImage("assets/runner7.png");
    positionNine = loadImage("assets/runner8.png");
    positionTen = loadImage("assets/runner9.png");
    //starting image
    startingImage = loadImage("assets/medals.png");
    //background image
    track = loadImage("assets/track.jpg");

}

function setup() {
    //creating canvas
    createCanvas(windowWidth,windowHeight);
    //calling the name picker portion 
    namePicker();
    

    //making list for running poistipons
    runningGrphics = [positionOne, 
                      positionTwo, 
                      positionThree, 
                      positionFour, 
                      positionFive, 
                      positionSix, 
                      positionSeven, 
                      positionEight, 
                      positionNine, 
                      positionTen];
                    
    //creating player one      
    runner = new Runner(runningGrphics);
    runnerPlayerTwo = new Runner(runningGrphics);

 
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
    if(startingScreen){
        startScreen();
    }
    if(countrySelection){
        displayFlagSelection();
    }
    //if names are no longer empty delete the user inputs
    if(name !== ""){
        input.remove();
        greeting.remove();
        button.remove();  
    }
    if(nameTwo !== ""){
        inputTwo.remove();
        greetingTwo.remove();
        buttonTwo.remove();
    }
   
    if(competetion){
        imageMode(CORNER);
        image(track,0,0,width,height);
        running();
    }
    if(welcome){
    
        if(playerOne){
            welcomeScreen(temp, name);
        }
        if(playerTwo){
            welcomeScreen(temp,nameTwo);
        }
    }
    //showing which player is currently selecting their stuff
    if(playerOne){
        temp = 1;
        textAlign(LEFT);
        textSize(20);
        fill(0);
        text("Player One Selection", 20,height-20);
    }
    if(playerTwo){
        temp = 2;
        textAlign(LEFT);
        textSize(20);
        fill(0);
        text("Player Two Selection", 20, height - 20);
    }
    // if(winner){
    //     if(keyIsDown(32)){
    //         competetion = false;
    //         playerOne =true;
    //         countrySelection = true;
    //     }
        
    // }
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
        welcome = true;
      
    }
    if(unitedStatesButton.selected === true){
        country = "United States";
        countrySelection = false;
        welcome = true;
       
    }
    if(kenyaButton.selected === true){
        country = "Kenya";
        countrySelection = false;
        welcome = true;
       
    }
    if(eritreaButton.selected === true){
        country = "Eritrea";
        countrySelection = false;
        welcome = true;
      
    }
    if(greatBritainButton.selected === true){
        country = "Great Britain";
        countrySelection = false;
        welcome = true;
        
    }
}

function namePicker() {
    //creating inputs fro player 1 and player 2 for their names

    input = createInput();
    input.position(20, 65);
    
    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(greet);
    
    greeting = createElement('h2', 'what is your name Player 1?');
    greeting.position(20, 5);
    
    inputTwo = createInput();
    inputTwo.position(width/2, 65);
    
    buttonTwo = createButton('submit');
    buttonTwo.position(inputTwo.x + inputTwo.width, 65);
    buttonTwo.mousePressed(greetTwo);
    
    greetingTwo = createElement('h2', 'what is your name Player 2?');
    greetingTwo.position(width/2, 5);
    
    
    textAlign(CENTER);
    textSize(50);
    
}  
//if input is pressed, then the names are set to varables, and the flag selection is called as well as who will be selecing their flag next
function greet() {
    name = input.value();
    input.value('');
    if(name !== "" && nameTwo !== ""){
        countrySelection = true;
        startingScreen = false;
        playerOne = true;
    }
}
function greetTwo(){
    nameTwo = inputTwo.value();
    inputTwo.value('');
    if(nameTwo !== "" && name !== ""){
        countrySelection = true;
        startingScreen = false;
        playerOne = true;
    }

}
//just something to make the begiing look nicer
function startScreen(){
    textAlign(CENTER);
    textFont('Georgia');
    textSize(100);
    fill(0);
    text("RUNNING CHAMPION",width/2,height/3);
    imageMode(CENTER);
    image(startingImage,width/2, height/1.5, startingImage.width/3,startingImage.height/3);
}
// this just shows the current players country, name, and athlete before the race
function welcomeScreen(temp, player){
    textSize(20);
    fill(0);
    text("click space to continue",width/2,50);
    textAlign(CENTER);
    fill(255);
    textSize(50)
    textFont('Georgia');
    text("welcome " + player, width/2, 150);
    imageMode(CENTER)
    //if player 1 you are normal, if player two then you are purple
    if(temp === 2){
        tint(255,0,255);
    }
    if(temp === 1){
        noTint();
    }
    //shows the runner, and the falg 
    image(positionFive, width/2, height - (positionFive.height/3)/2, positionFive.width/3, positionFive.height/3);
    if(country === "Canada"){
        canadaButton.flagdisplay();
    }
    if(country === "United States"){
        unitedStatesButton.flagdisplay();
    }
    if(country === "Kenya"){
        kenyaButton.flagdisplay();  
    }
    if(country === "Eritrea"){
        eritreaButton.flagdisplay();
    }
    if(country === "Great Britain"){
        greatBritainButton.flagdisplay(); 
    }
    //figuring out if pressing space is starting the races, or if it means it is player twos turn to pick the country
    if(keyIsDown(32)){
        if(temp === 1){
            welcome=false;
            playerOne=false;
            playerTwo=true;
            countrySelection=true;
        }
        else if(temp === 2){
            playerTwo = false;
            welcome=false;
            competetion = true;
        }

    }

}
    
//function that does the graphics for running
function running(){
    runnerPlayerTwo.running("two");
    runner.running("one");
    if(runner.winOne){
        textAlign(CENTER);
        fill(0);
        textSize(150)
        textFont('Georgia');
        text(name + " wins!", width/2, 250);
        textSize(50);
        text("CLICK REFRESH TO PLAY AGAIN", width/2,600);
        
        // winner=true;
    }
    else if(runnerPlayerTwo.winTwo){
        textAlign(CENTER);
        fill(0);
        textSize(150)
        textFont('Georgia');
        text(nameTwo + " wins!", width/2, 250);
        textSize(50);
        text("CLICK REFRESH TO PLAY AGAIN", width/2,600);
        
        // winner=true;   
    }
}
//the actual running effects when buttons are clicked



function keyTyped(){
    if(competetion){
        runner.clicked("one");
        runnerPlayerTwo.clicked("two");   
    }
}