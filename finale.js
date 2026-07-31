/* ==========================================================
   GEORGIA'S LITTLE QUEST
   Finale System v2
   ========================================================== */



const ending =
document.getElementById(
    "ending"
);



const yesButton =
document.getElementById(
    "yesButton"
);



const noButton =
document.getElementById(
    "noButton"
);



const yesMessage =
document.getElementById(
    "yesMessage"
);





/* ==========================================================
   OPEN FINAL ENDING
   ========================================================== */


function openTreasureEnding(){


    document
    .getElementById(
        "game"
    )
    .hidden=true;



    ending.hidden=false;



    ending.innerHTML=`

    <div class="ending-card">


        <h1>
        🎁 The Final Treasure
        </h1>


        <p id="endingText">
        Loading your final memory...
        </p>


        <button id="continueEnding">
        Continue
        </button>


    </div>


    `;



    let continueButton =
    document.getElementById(
        "continueEnding"
    );



    let lines=[


    "You collected every memory hidden in this little world.",


    "You protected the garden.",


    "You remembered the important moments.",


    "You climbed higher than the clouds.",


    "And now you have reached the final surprise. 💛"



    ];



    let index=0;



    continueButton.onclick=()=>{


        if(index < lines.length){


            document
            .getElementById(
                "endingText"
            )
            .textContent=
            lines[index];



            index++;


        }


        else{


            showQuestion();


        }



    };



}









/* ==========================================================
   FINAL QUESTION
   ========================================================== */


function showQuestion(){



ending.innerHTML=`

<div class="ending-card final-question">


<h1>
💛 Georgia...
</h1>


<p>
Thank you for going on this little adventure.
</p>


<p>
Even though this is a tiny game,
I hope it shows how special you are to me.
</p>


<h2>
Will you be my girlfriend Georgia?
</h2>



<div class="ending-buttons">


<button id="yesButton">

Yes 💛

</button>



<button id="noButton">

No

</button>


</div>


<div id="yesMessage" hidden>


<h1>
🥰 Yay!!
</h1>


<p>

I can't wait to make more memories with you.

</p>


<p>

Thank you for choosing me 💛

</p>


</div>



</div>


`;



setupButtons();



}









/* ==========================================================
   BUTTON LOGIC
   ========================================================== */


function setupButtons(){



const yes =
document.getElementById(
"yesButton"
);



const no =
document.getElementById(
"noButton"
);



const message =
document.getElementById(
"yesMessage"
);





yes.onclick=()=>{


yes.style.display=
"none";


no.style.display=
"none";



message.hidden=false;



createConfetti();



};








no.addEventListener(
"mouseenter",
()=>{


moveNoButton(
no
);


});





no.addEventListener(
"touchstart",
()=>{


moveNoButton(
no
);


});



}









function moveNoButton(button){



button.style.position=
"fixed";



button.style.left =
Math.random()
*
(
window.innerWidth -
button.offsetWidth
)
+
"px";



button.style.top =
Math.random()
*
(
window.innerHeight -
button.offsetHeight
)
+
"px";



}









/* ==========================================================
   CONFETTI
   ========================================================== */


function createConfetti(){



const pieces=[

"💛",
"🌼",
"✨",
"🌻",
"🦋"

];




/* Inject the fall keyframes once */


if(
!document.getElementById(
"confettiKeyframes"
)
){


const style=
document.createElement(
"style"
);


style.id=
"confettiKeyframes";


style.textContent=`
@keyframes confettiFall {
    0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translate(var(--drift), var(--fall)) rotate(var(--spin));
        opacity: 0;
    }
}`;


document.head.appendChild(
style
);


}





for(
let i=0;
i<100;
i++
){



let confetti =
document.createElement(
"div"
);



confetti.textContent =
pieces[
Math.floor(
Math.random()
*
pieces.length
)
];



const fallDistance=

window.innerHeight+100;



const driftDistance=

(Math.random()*160)-80;



const spinAmount=

(Math.random()>0.5?1:-1)*
(360+Math.random()*360);



const duration=

3+Math.random()*1.5;



const delay=

Math.random()*0.6;




confetti.style.position=
"fixed";


confetti.style.pointerEvents=
"none";



confetti.style.left =
Math.random()*100+
"vw";



confetti.style.top =
"-30px";



confetti.style.fontSize =
(
15+
Math.random()*20
)
+
"px";



confetti.style.zIndex=
"999";



confetti.style.setProperty(
"--fall",
fallDistance+"px"
);


confetti.style.setProperty(
"--drift",
driftDistance+"px"
);


confetti.style.setProperty(
"--spin",
spinAmount+"deg"
);



confetti.style.animation=

`confettiFall ${duration}s ease-in ${delay}s forwards`;



document.body.appendChild(
confetti
);





confetti.addEventListener(
"animationend",
()=>{


confetti.remove();


}
);



}



}









/* ==========================================================
   OVERRIDE CHEST FUNCTION
   ========================================================== */


function openTreasure(){


if(memoriesFound<4)
return;



openTreasureEnding();


}