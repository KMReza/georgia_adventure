/* ==========================================================
   GEORGIA'S LITTLE QUEST
   Main Game Engine v7
   Quest Progression Update
   ========================================================== */


/* ==========================
   ELEMENTS
   ========================== */


const intro =
document.getElementById("intro");


const startButton =
document.getElementById("startButton");


const game =
document.getElementById("game");


const player =
document.getElementById("player");


const playerImg =
.querySelector("img");


const interactionPrompt =
document.getElementById("interactionPrompt");


const chest =
document.getElementById("treasureChest");


const progressText =
document.getElementById("questProgress");







/* ==========================
   GAME STATE
   ========================== */


let gameStarted=false;

let canMove=false;

let dialogueActive=false;


let keys={};


let nearbyObject=null;


let memoriesFound=0;



const totalMemories=4;



const questState={


    garden:false,


    memory:false,


    parkour:false,


    letter:false,


    finaleUnlocked:false


};




const npcMet={


    butterfly:false,


    flowerSpirit:false


};







/* ==========================
   PLAYER
   ========================== */


const playerData={


    x:205,


    y:240,


    speed:3


};








/* ==========================
   START GAME
   ========================== */


startButton.addEventListener(
"click",
()=>{


    intro.hidden=true;


    game.hidden=false;


    gameStarted=true;


    canMove=true;



    updatePlayer();



    startDialogue(
        dialogues.start
    );


});









/* ==========================
   INPUT
   ========================== */


document.addEventListener(
"keydown",
e=>{


keys[
e.key.toLowerCase()
]=true;



});





document.addEventListener(
"keyup",
e=>{


keys[
e.key.toLowerCase()
]=false;



});









/* ==========================
   GAME LOOP
   ========================== */


function gameLoop(){


    if(
        gameStarted &&
        canMove &&
        !dialogueActive
    ){


        movePlayer();


        checkNearby();


    }



    requestAnimationFrame(
        gameLoop
    );


}



gameLoop();









/* ==========================
   MOVEMENT
   ========================== */


function movePlayer(){


let dx=0;

let dy=0;



if(
keys.w ||
keys.arrowup
)
dy-=playerData.speed;



if(
keys.s ||
keys.arrowdown
)
dy+=playerData.speed;



if(
keys.a ||
keys.arrowleft
)
dx-=playerData.speed;



if(
keys.d ||
keys.arrowright
)
dx+=playerData.speed;




playerData.x+=dx;

playerData.y+=dy;



playerData.x=Math.max(
0,
Math.min(
650,
playerData.x
)
);



playerData.y=Math.max(
0,
Math.min(
435,
playerData.y
)
);




if(
dx!==0 ||
dy!==0
){


player.classList.add(
"walking"
);


}
else{


player.classList.remove(
"walking"
);


}




if(dx<0){


playerImg.classList.add(
"facing-left"
);


}
else if(dx>0){


playerImg.classList.remove(
"facing-left"
);


}



updatePlayer();



}








function updatePlayer(){


player.style.left =
playerData.x+"px";


player.style.top =
playerData.y+"px";


}









/* ==========================
   INTERACTION DETECTION
   ========================== */


function checkNearby(){


nearbyObject=null;


interactionPrompt.hidden=true;



const objects=[


"flowerSpirit",

"butterfly",

"gardenChallenge",

"memoryChallenge",

"parkourChallenge",

"heartChallenge",

"treasureChest"


];



for(
let id of objects
){


let obj=
document.getElementById(id);



if(
obj &&
distance(obj)<75
){


nearbyObject=obj;


interactionPrompt.hidden=false;


break;


}



}



}









function distance(obj){


return Math.sqrt(

(playerData.x-obj.offsetLeft)**2

+

(playerData.y-obj.offsetTop)**2

);


}









/* ==========================
   SPACE INTERACTION
   ========================== */


document.addEventListener(
"keydown",
e=>{


if(
e.code==="Space" &&
nearbyObject &&
canMove &&
!dialogueActive
){


interact(
nearbyObject
);


}



});









/* ==========================
   OBJECT INTERACTIONS
   ========================== */


function interact(obj){

interactionPrompt.hidden=true;

switch(obj.id){



case "flowerSpirit":


startDialogue(
dialogues.flowerSpirit
);


npcMet.flowerSpirit=true;


checkGardenUnlock();


break;





case "butterfly":


startDialogue(
dialogues.butterfly
);


npcMet.butterfly=true;


checkGardenUnlock();


break;







case "gardenChallenge":


if(
questState.garden
){


startDialogue([

{
speaker:"Flower Spirit",
text:"The garden is already restored!"
}

]);


}
else if(
!npcMet.butterfly ||
!npcMet.flowerSpirit
){


gardenLockedDialogue();


}
else{


openChallenge(
gardenGame
);


}


break;








case "memoryChallenge":


if(
questState.memory
){


startDialogue([

{
speaker:"The Otherworldly Daschund 🐶",
text:"This memory has already been found!"
}

]);


}
else if(
questState.garden
){


openChallenge(
memoryGame
);


}
else{


lockedDialogue();

}


break;








case "parkourChallenge":


if(
questState.parkour
){


startDialogue([

{
speaker:"Cloud Spirit",
text:"You've already conquered the clouds!"
}

]);


}
else if(
questState.memory
){


openChallenge(
parkourGame
);


}
else{


lockedDialogue();

}


break;








case "heartChallenge":


if(
questState.letter
){


startDialogue([

{
speaker:"The Otherworldly Daschund 🐶",
text:"This memory is already written in your heart."
}

]);


}
else if(
questState.parkour
){


openChallenge(
letterGame
);


}
else{


lockedDialogue();

}


break;








case "treasureChest":



if(
questState.finaleUnlocked
){


openTreasureEnding();


}

else{


startDialogue([

{
speaker:"🎁 Present",
text:
"The present sparkles softly..."
},


{
speaker:"🎁 Present",
text:
"There are still memories waiting to be discovered!"
}


]);


}


break;




}



}









/* ==========================
   LOCK MESSAGE
   ========================== */


function lockedDialogue(){


startDialogue([

{
speaker:"The Otherworldly Daschund 🐶",
text:
"This path is still locked..."
},


{
speaker:"The Otherworldly Daschund 🐶",
text:
"Complete the previous memories first."
}

]);


}








/* ==========================
   GARDEN GATE
   ========================== */


function gardenLockedDialogue(){


startDialogue([

{
speaker:"Flower Spirit",
text:
"Not yet... this garden isn't ready for you."
},


{
speaker:"Flower Spirit",
text:
"Go meet the butterfly, and come speak with me first."
}

]);


}





function checkGardenUnlock(){


if(
npcMet.butterfly &&
npcMet.flowerSpirit
){


unlockLocation(
"gardenChallenge"
);


}


}









/* ==========================
   QUEST COMPLETION
   ========================== */


function completeChallenge(id){



if(
questState[id]
)
return;



questState[id]=true;


memoriesFound++;




progressText.textContent=

"Memories Found: "

+
memoriesFound
+
" / "
+
totalMemories;






if(
id==="garden"
){


unlockLocation(
"memoryChallenge"
);


}






if(
id==="memory"
){


unlockLocation(
"parkourChallenge"
);


}






if(
id==="parkour"
){


unlockLocation(
"heartChallenge"
);


}






if(
id==="letter"
){


questState.finaleUnlocked=true;


unlockLocation(
"treasureChest"
);


}




}









/* ==========================
   UNLOCK OBJECT
   ========================== */


function unlockLocation(id){



const object =
document.getElementById(id);



if(!object)
return;



object.classList.remove(
"locked"
);



}









/* ==========================
   RESUME GAME
   ========================== */


function resumeGame(){

canMove=true;

dialogueActive=false;

nearbyObject=null;

interactionPrompt.hidden=true;

}
