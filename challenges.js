/* ==========================================================
   GEORGIA'S LITTLE QUEST
   Challenge System v5
   ========================================================== */


/* ==========================================================
   ELEMENTS
   ========================================================== */


const challengeModal =
document.getElementById("challengeModal");


const challengeContent =
document.getElementById("challengeContent");



const completedChallenges = new Set();






/* ==========================================================
   CHALLENGE CONTROL
   ========================================================== */


function openChallenge(challengeFunction){


    canMove=false;


    player.classList.remove(
        "walking"
    );


    challengeModal.hidden=false;


    challengeFunction();


}





function closeChallenge(){


    challengeModal.hidden=true;


    challengeContent.innerHTML="";


}





function finishChallenge(id){


    if(
        !completedChallenges.has(id)
    ){


        completedChallenges.add(id);


        completeChallenge(id);


    }



    closeChallenge();


    resumeGame();


}







/* ==========================================================
   GARDEN TRIAL
   ========================================================== */


function gardenGame(){


challengeContent.innerHTML=`


<h2>
🌻 Garden Trial
</h2>


<p>
Dodge the wilting thorns and protect your heart for 10 seconds!
</p>


<div id="gardenArena">


<div id="gardenLives">
💛💛💛💛
</div>


<div id="gardenHeart">
💛
</div>


</div>


<h3 id="gardenTimer">
10
</h3>


`;




const arena =
document.getElementById(
"gardenArena"
);


const heart =
document.getElementById(
"gardenHeart"
);


const livesDisplay =
document.getElementById(
"gardenLives"
);




let x=130;

let y=90;


let time=10;


let lives=4;


let invincible=false;


let running=true;


let keys={};


let obstacles=[];


let spawnTimer=0;




function keyDown(e){

keys[e.key.toLowerCase()]=true;

}


function keyUp(e){

keys[e.key.toLowerCase()]=false;

}



window.addEventListener(
"keydown",
keyDown
);


window.addEventListener(
"keyup",
keyUp
);






const timer=setInterval(()=>{


time--;


document.getElementById(
"gardenTimer"
).textContent=time;



if(time<=0){


endGame();


}


},1000);






function spawnObstacle(){


const thorn =
document.createElement(
"div"
);


thorn.className=
"gardenObstacle";


thorn.textContent=
"🥀";



const startX=
Math.random()*260;



thorn.style.left=
startX+"px";


thorn.style.top=
"-30px";



arena.appendChild(
thorn
);



obstacles.push({

el:thorn,

x:startX,

y:-30,

speed:1.6+Math.random()*1.6

});


}






function updateLives(){


livesDisplay.textContent=

"💛".repeat(lives)+

"🖤".repeat(4-lives);


}






function hitHeart(){


if(invincible)
return;



lives--;


updateLives();



invincible=true;



heart.classList.add(
"hurt"
);



setTimeout(()=>{


heart.classList.remove(
"hurt"
);


invincible=false;


},900);




if(lives<=0){


restartTrial();


}


}






function restartTrial(){


time=10;


lives=4;


updateLives();



obstacles.forEach(
o=>o.el.remove()
);


obstacles=[];



document.getElementById(
"gardenTimer"
).textContent=time;


}






function loop(){


if(!running)
return;



if(keys.w)
y-=4;


if(keys.s)
y+=4;


if(keys.a)
x-=4;


if(keys.d)
x+=4;



x=Math.max(
0,
Math.min(
260,
x
)
);



y=Math.max(
0,
Math.min(
160,
y
)
);



heart.style.left=x+"px";

heart.style.top=y+"px";






spawnTimer++;



if(spawnTimer>=58){


spawnTimer=0;


spawnObstacle();


}






obstacles.forEach(o=>{


o.y+=o.speed;


o.el.style.top=
o.y+"px";


});






obstacles=obstacles.filter(o=>{


if(o.y>220){


o.el.remove();


return false;


}


return true;


});






if(!invincible){


for(let o of obstacles){


const dx=
(o.x)-(x+15);


const dy=
(o.y)-(y+15);



const dist=
Math.sqrt(
dx*dx+dy*dy
);



if(dist<28){


hitHeart();


break;


}


}


}





requestAnimationFrame(
loop
);


}



loop();







function cleanup(){


running=false;


clearInterval(timer);



window.removeEventListener(
"keydown",
keyDown
);



window.removeEventListener(
"keyup",
keyUp
);



obstacles.forEach(
o=>o.el.remove()
);


obstacles=[];


}







function endGame(){


cleanup();



challengeContent.innerHTML=`


<h2>
🌻 Garden Restored!
</h2>


<p>
The garden remembers your kindness.
</p>


<button id="gardenDone">
Continue
</button>


`;



document
.getElementById(
"gardenDone"
)
.onclick=()=>{


finishChallenge(
"garden"
);


};



}



}











/* ==========================================================
   MEMORY MEADOW
   ========================================================== */


function memoryGame(){



const symbols=[

"🌼",
"🌼",
"🦋",
"🦋",
"⭐",
"⭐",
"🌙",
"🌙"

];



symbols.sort(
()=>Math.random()-0.5
);



challengeContent.innerHTML=`


<h2>
🃏 Memory Meadow
</h2>


<div id="memoryGrid"></div>


`;



const grid =
document.getElementById(
"memoryGrid"
);



let flipped=[];

let matches=0;





symbols.forEach(symbol=>{


const card =
document.createElement(
"button"
);


card.className=
"memoryCard";


card.dataset.symbol=symbol;



card.textContent="❔";





card.onclick=()=>{


if(
flipped.length>=2 ||
card.textContent!=="❔"
)
return;



card.textContent=symbol;


flipped.push(card);




if(
flipped.length===2
){


if(
flipped[0].dataset.symbol===
flipped[1].dataset.symbol
){


matches++;


flipped=[];



if(
matches===4
){


finishChallenge(
"memory"
);


}


}
else{


setTimeout(()=>{


flipped.forEach(
c=>c.textContent="❔"
);


flipped=[];


},700);



}



}



};



grid.appendChild(card);



});



}









/* ==========================================================
   CLOUDTOP PARKOUR
   ========================================================== */


function parkourGame(){



challengeContent.innerHTML=`


<h2>
☁️ Cloudtop Parkour
</h2>


<p>
Use A/D to move and W (or Space) to jump across the clouds — watch out, one of them drifts!
</p>


<div id="parkourArena">


<div id="parkourPlayer">
🐶
</div>


<div id="parkourGoal">
🌸
</div>


</div>


`;




const arena =
document.getElementById(
"parkourArena"
);


const player =
document.getElementById(
"parkourPlayer"
);


const goal =
document.getElementById(
"parkourGoal"
);




const GRAVITY=0.75;

const JUMP_VELOCITY=-12;

const MOVE_SPEED=1.5;

const PLAYER_SIZE=34;

const ARENA_WIDTH=480;

const ARENA_HEIGHT=300;




const platforms=[

{x:15,y:280,w:75,h:15,goal:false},

{x:150,y:245,w:65,h:15,goal:false},

{x:270,y:205,w:60,h:15,goal:false},

{x:170,y:165,w:60,h:15,goal:false},

{x:300,y:125,w:55,h:15,goal:false},

{x:250,y:85,w:55,h:15,goal:false,moving:true,moveMin:230,moveMax:340,moveSpeed:1.3,dir:1},

{x:400,y:45,w:75,h:15,goal:true}

];




platforms.forEach(p=>{


const plat=
document.createElement(
"div"
);


plat.className=

"platform"+
(p.moving?" platform-moving":"");


plat.style.left=
p.x+"px";


plat.style.top=
p.y+"px";


plat.style.width=
p.w+"px";


arena.appendChild(
plat
);


p.el=plat;


});




const startPlatform=
platforms[0];



const goalPlatform=
platforms[
platforms.length-1
];




goal.style.left=

(
goalPlatform.x+
goalPlatform.w/2-15
)+"px";



goal.style.top=

(
goalPlatform.y-40
)+"px";




let x=

startPlatform.x+

(startPlatform.w-PLAYER_SIZE)/2;



let y=

startPlatform.y-PLAYER_SIZE;



let vy=0;


let grounded=true;


let won=false;


let running=true;


let keys={};


let standingOn=null;




function respawn(){


x=

startPlatform.x+

(startPlatform.w-PLAYER_SIZE)/2;



y=

startPlatform.y-PLAYER_SIZE;



vy=0;


grounded=true;


standingOn=null;


}




function keyDown(e){


keys[e.key.toLowerCase()]=true;



if(

e.code==="Space" ||

e.key===" " ||

e.key.toLowerCase()==="w" ||

e.key==="ArrowUp"

){


e.preventDefault();



if(grounded && !won){


vy=JUMP_VELOCITY;


grounded=false;


}


}


}


function keyUp(e){

keys[e.key.toLowerCase()]=false;

}



window.addEventListener(
"keydown",
keyDown
);


window.addEventListener(
"keyup",
keyUp
);







function loop(){


if(!running)
return;



if(won){


requestAnimationFrame(
loop
);


return;


}




platforms.forEach(p=>{


if(!p.moving)
return;



const prevX=p.x;


p.x+=p.dir*p.moveSpeed;



if(p.x<=p.moveMin){

p.x=p.moveMin;

p.dir=1;

}



if(p.x>=p.moveMax){

p.x=p.moveMax;

p.dir=-1;

}



p.el.style.left=
p.x+"px";



if(standingOn===p){


x+=(p.x-prevX);


}


});




if(keys.a)
x-=MOVE_SPEED;


if(keys.d)
x+=MOVE_SPEED;



x=Math.max(
0,
Math.min(
ARENA_WIDTH-PLAYER_SIZE,
x
)
);





vy+=GRAVITY;


y+=vy;





let landed=false;


let landedPlatform=null;



if(vy>=0){


for(let p of platforms){


const withinX=

x+PLAYER_SIZE>p.x &&

x<p.x+p.w;



const feetY=

y+PLAYER_SIZE;



if(

withinX &&

feetY>=p.y &&

feetY<=p.y+p.h+vy+1

){


y=p.y-PLAYER_SIZE;


vy=0;


landed=true;


landedPlatform=p;


break;


}


}


}



grounded=landed;


standingOn=landedPlatform;





if(y>ARENA_HEIGHT){


respawn();


}





player.style.left=
x+"px";


player.style.top=
y+"px";






if(

landedPlatform &&

landedPlatform.goal &&

!won

){


win();


}




requestAnimationFrame(
loop
);


}



loop();







function cleanup(){


running=false;



window.removeEventListener(
"keydown",
keyDown
);


window.removeEventListener(
"keyup",
keyUp
);


}







function win(){


won=true;


cleanup();



challengeContent.innerHTML=`


<h2>
☁️ Parkour Complete!
</h2>


<button id="parkourDone">
Continue
</button>


`;



document
.getElementById(
"parkourDone"
)
.onclick=()=>{


finishChallenge(
"parkour"
);


};



}



}











/* ==========================================================
   HEART LETTER
   ========================================================== */


function letterGame(){



challengeContent.innerHTML=`


<h2>
💌 Heart Letter
</h2>


<p>
Complete the sentence:
</p>


<p>
"I am happiest when I am with ___"
</p>


<input id="letterAnswer">


<button id="letterSubmit">
Submit
</button>


<p id="letterResult"></p>


`;





document
.getElementById(
"letterSubmit"
)
.onclick=()=>{


const answer =
document
.getElementById(
"letterAnswer"
)
.value
.toLowerCase();



if(
answer.includes("you")
){


finishChallenge(
"letter"
);


}
else{


document
.getElementById(
"letterResult"
)
textContent=
"Try again my love 💛";


}



};



}