var mode;
var score, hunterScore;
var bg;
var start, startImg;
var protector, protectorImg, protectorAImg;
var rhinoGroup, rhinoImg;
var hunterGroup, hunterImg;
var birdGroup,bird2Group, birdflyImg, birdflyAni;
var ground, groundImg, invisibleGround;
var backgroundImg;
var gameOver, gameOverImg;
var reset, resetImg;
var arrowImg, arrowGroup;
var dieSound, hunterDieSound, bgMusic, arrowSwoosh;
localStorage["HighestScore"] = 0;
var facts;
var randomFacts;


function preload(){
  getBackgroundImg();
  bgMusic=loadSound("audio/KazirangaBeats.mp3");
  protectorImg=loadAnimation("images/Warrior1.png", "images/Warrior2.png","images/Warrior3.png","images/Warrior4.png","images/Warrior5.png","images/Warrior6.png","images/Warrior7.png","images/Warrior8.png","images/Warrior9.png","images/Warrior10.png");
  rhinoImg= loadImage("images/rhino2.png");
  hunterImg= loadAnimation("images/hunter1.png","images/hunter2.png","images/hunter3.png");
  birdflyImg= loadImage("images/bird.png");
  birdflyAni= loadAnimation("images/birdfly1.png","images/birdfly2.png","images/birdfly3.png");
  gameOverImg=loadImage("images/gameOver.png");
  resetImg=loadImage("images/reset.png");
  backgroundImg=loadImage("images/DayForest.jpg");
  arrowImg=loadImage("images/arrow.png");
  startImg=loadImage("images/start.png");
  dieSound=loadSound("audio/die.mp3");
  hunterDieSound=loadSound("audio/hunterDie.mp3");
  arrowSwoosh=loadSound("audio/ArrowSwoosh.mp3");
  
}

function setup(){
  createCanvas(displayWidth-30,displayHeight-30);
  mode=0;
  score=0;
  bgMusic.loop();
   facts= [
    "Kaziranga National park is known for its famous rare One-horned Rhinocerous!!",
    "In 1916 Kaziranga was renamed as 'Kaziranga Game Sanctuary'!",
    "In 1908, Kaziranga was declared as a reserved forest!!",
    "Kaziranga National Park of Assam was declared as a 'World Heritage Site' by UNESCO in 1985!",
    "Poaching for Rhinocerous horns became the single most reason for the decline of the Indian Rhinos!!",
    "Four major rivers cross the park including Brahmaputra, Diphlu, Mora Dhansiri, Mora Diphlu!",
    "Kaziranga National Park also boasts the highest density of Tigers in the world!",
    "Kaziranga is one of the few places in the world besides Africa which is home to multiple species of large cats, such as leopards and Royal Bengal Tigers!!",
  "Annual floods alters the geography of Kaziranga and many animals losses their habitat!",
  "In 1950, Kaziranga was renamed as 'Kaziranga Wildlife Sanctuary' by P.D. Stracey, the forest conservationanist of that time!"
  ];

  hunterScore=0;
  protector= createSprite(displayWidth/2-400,displayHeight-40, 50,50);
  protector.addAnimation("protectorAnimation",protectorImg);
  protector.scale=0.17;
  protector.setCollider("rectangle",0,0,protector.width, protector.height);
  
  
  invisibleGround= createSprite(displayWidth/2-300,displayHeight+150,displayWidth-30,displayHeight-30);
  invisibleGround.visible=false;
  protector.collide(invisibleGround);

  start=createSprite(displayWidth/2+300,displayHeight/2+100);
  start.addImage(startImg);
  start.scale=0.4;
  start.visible=false;
  
  gameOver=createSprite(displayWidth/2-20,displayHeight/2-180);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.27;
  gameOver.visible=false;

  reset=createSprite(displayWidth/2-50,displayHeight/2+200);
  reset.addImage(resetImg);
  reset.scale=0.05;
  reset.visible=false;

  
  rhinoGroup= new Group();
  hunterGroup= new Group();
  birdGroup= new Group();
  
  bird2Group= new Group();
  arrowGroup=new Group();
  
  
}

function draw() {
  if(backgroundImg){
     background(backgroundImg);
    }
    
      textSize(20);
      fill("white");
   
   if(mode==0){
     start.visible=true;
     if(mousePressedOver(start)){
       mode=1;
     }
     strokeWeight(7);
     fill(255,255,153);
    rect(displayWidth/2-200,displayHeight/2-200,displayWidth/2,displayHeight/2+10);
    
    textFont('Georgia');
    textSize(24);
    fill(0,25,51);
    textStyle(ITALIC);
    fill("Green");
    text("RANGILI,",displayWidth/2-170,displayHeight/2-170,displayWidth/2,displayHeight/2+70);

    textSize(20);
    fill("black");
    text("the protector is set on her adventure to kill the poachers of Kaziranga National Park, Assam. Help her to shoot the poachers without disturbing the rhinos!!  ",displayWidth/2-190,displayHeight/2-130,displayWidth/2,displayHeight/2+70);

    fill("Red");
    textSize(22);
    text("Note:",displayWidth/2-190,displayHeight/2-50,displayWidth/2,displayHeight/2+70);

    fill("black");
    textSize(18);
    text("For mobile users: Tap on the screen to shoot arrow",displayWidth/2-190,displayHeight/2-20,displayWidth/2,displayHeight/2+70);
    text("For desktop users: Press on the 'A' key to shoot arrow and move Rangili with the mouse's Y direction",displayWidth/2-190,displayHeight/2-2,displayWidth/2,displayHeight/2+70);
 
   }
   if(mode==1){
   
    protector.y= mouseY;
    start.visible=false;
    spawnRhinos();
    spawnhunters();
    spawnbirds();
    spawnbirds2();
    score= score+Math.round((getFrameRate()/60));
    if (keyDown("A")|| touches.length>0) { 
      arrowSwoosh.play(); 
      var temp_arrow=createArrow();
      temp_arrow.addImage(arrowImg);
      temp_arrow.y=mouseY;
      touches=[];
    }
   
    

    protector.collide(invisibleGround);

    if(hunterGroup.isTouching(arrowGroup)){
      hunterDieSound.play();
      hunterScore= hunterScore+1;
      hunterGroup.destroyEach();
       arrowGroup.destroyEach();
    }
    
    if(rhinoGroup.isTouching(protector)||rhinoGroup.isTouching(arrowGroup)){
      dieSound.play();
      rhinoGroup.destroyEach();
      arrowGroup.destroyEach();
      mode=2;
    }
    }



    if(mode==2){
     start.visible=false;
     gameOver.visible=true;
     reset.visible=true;

     fill(0,0,51);
     stroke("white");
     strokeWeight(7);
     rect(displayWidth/2-200,displayHeight/2-100,displayWidth/2-200,displayHeight/2-100);

     displayFacts();

     stroke("black");
     strokeWeight(1);
     textSize(21);
     textStyle(ITALIC);
     fill("white");
     textFont('Georgia');
     text("Did You Know? ",displayWidth/2-80,displayHeight/2-50,displayWidth/2-300,displayHeight/2-100);
     text(""+randomFacts,displayWidth/2-150,displayHeight/2-10,displayWidth/2-300,displayHeight/2-100);

     rhinoGroup.setVelocityEach(0);
     hunterGroup.setVelocityEach(0);
     birdGroup.setVelocityEach(0);
     bird2Group.setVelocityEach(0);
     protector.collide(invisibleGround);

     if(mousePressedOver(reset)){
      resetGame();
      }
            
      }

    textFont('Georgia');
    fill("white");
    text("Distance Covered: " + score,displayWidth/2+200,displayHeight/2-300);
    text("Hunters killed: "+ hunterScore,displayWidth/2+200,displayHeight/2-270);

    textSize(17);
    textSize(34);
    fill("yellow");
    textStyle(ITALIC);
    text("The Kaziranga Treasures",displayWidth/2-450,displayHeight/2-300);
      
    drawSprites();
  }
 


  function spawnRhinos() {
      if (frameCount % 190 === 0) {
      var rhino = createSprite(displayWidth/2+200,displayHeight/2-300);
      rhino.y = Math.round(random(displayHeight/2-10,displayHeight/2+70));
      rhino.addImage(rhinoImg);
      rhino.scale = 0.48;
      rhino.velocityX = -4;
      rhino.setCollider("circle",0,0,0);
       //assign lifetime to the variable
      rhino.lifetime = 200;
      
      //add each rhino to the group
      rhinoGroup.add(rhino);
    }
    
  }
  
  
  function spawnhunters() {
    //write code here to spawn the hunters
    if (frameCount % 170 === 0) {
      var hunter = createSprite(displayWidth/2+200,displayHeight/2-300);
      hunter.y = Math.round(random(displayHeight/2-10,displayHeight/2+70));
      hunter.addAnimation("hunterAnimation",hunterImg);
      hunter.scale = 0.17;
      hunter.velocityX = -4;
      hunter.setCollider("rectangle",0,0,hunter.width,hunter.height);
      hunter.lifetime = 200;
      hunterGroup.add(hunter);
    }
    
  }
  
  function spawnbirds() {
    //write code here to spawn the birds
    if (frameCount % 300 === 0) {
      var bird = createSprite(displayWidth/2-300,displayHeight/2-300);
      bird.y = Math.round(random(displayHeight/2-200,displayHeight/2-300));
      bird.addImage(birdflyImg);
      bird.scale = 0.35;
      bird.velocityX = 4;
      bird.lifetime = 200;
      birdGroup.add(bird);
    }
    
  }
  
  
  function spawnbirds2(){
    if (frameCount % 200 === 0) {
      var bird2 = createSprite(displayWidth/2+300,displayHeight/2-300);
      bird2.y = Math.round(random(displayHeight/2-200,displayHeight/2-300));
      bird2.addAnimation("birdflyAnimation",birdflyAni);
      bird2.scale = 0.3;
      bird2.velocityX = -3;
      bird2.lifetime = 500;
      bird2Group.add(bird2);
    }
    
  }
  
   

  function resetGame(){
    mode=0;
    gameOver.visible=false;
    reset.visible=false;
    protector.collide(invisibleGround);
    rhinoGroup.destroyEach();
    hunterGroup.destroyEach();
    birdGroup.destroyEach();
    bird2Group.destroyEach();
    score = 0;
    hunterScore=0;
   


  }
  function createArrow(){
    var arrow=createSprite(displayWidth/2-400,displayHeight-40);
    arrow.addImage(arrowImg);
    arrow.scale=0.3;
    arrow.velocityX=4;
    arrow.setCollider("rectangle",0,0,arrow.width,arrow.height);
    arrowGroup.add(arrow);
    return arrow;
  
  }

  function displayFacts(){
    if(frameCount% 150===0){
    randomFacts= random(facts);
    
    }
     
  }



  async function getBackgroundImg(){
    var response= await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
    var responseJSON= await response.json();
    var datetime= responseJSON.datetime;
    var hour= datetime.slice(11,13);
    console.log(hour);

    if(hour>=06 && hour<=18){
       bg= "images/DayForest.jpg";
    }
    else{
        bg="images/NightForest.jpg";
    }
   backgroundImg= loadImage(bg);
}

