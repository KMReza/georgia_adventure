/* ==========================================================
   GEORGIA'S LITTLE QUEST
   Dialogue System v3
   ========================================================== */


/* ELEMENTS */


const dialogueBox =
document.getElementById(
    "dialogueBox"
);


const speakerBox =
document.getElementById(
    "speaker"
);


const textBox =
document.getElementById(
    "dialogueText"
);


const nextButton =
document.getElementById(
    "dialogueNext"
);







/* ==========================================================
   STATE
   ========================================================== */


let dialogueQueue=[];

let dialogueIndex=0;

let typing=false;

let typingInterval=null;







/* ==========================================================
   START DIALOGUE
   ========================================================== */


function startDialogue(lines){


    if(!lines)
    return;



    dialogueActive=true;


    canMove=false;


    player.classList.remove(
        "walking"
    );



    dialogueQueue=lines;


    dialogueIndex=0;



    dialogueBox.hidden=false;



    showDialogue();



}









/* ==========================================================
   DISPLAY CURRENT LINE
   ========================================================== */


function showDialogue(){


    if(
        dialogueIndex >= dialogueQueue.length
    ){

        closeDialogue();

        return;

    }



    const current =
    dialogueQueue[dialogueIndex];



    speakerBox.textContent =
    current.speaker;



    typeText(
        current.text
    );


}









/* ==========================================================
   TYPEWRITER
   ========================================================== */


function typeText(text){


    clearInterval(
        typingInterval
    );


    textBox.textContent="";


    typing=true;



    let index=0;



    typingInterval=setInterval(
    ()=>{


        textBox.textContent +=
        text[index];


        index++;



        if(
            index >= text.length
        ){

            clearInterval(
                typingInterval
            );


            typing=false;


        }



    },
    35
    );


}









/* ==========================================================
   ADVANCE DIALOGUE
   ========================================================== */


function advanceDialogue(){



    if(
        typing
    ){

        clearInterval(
            typingInterval
        );


        textBox.textContent =
        dialogueQueue[
            dialogueIndex
        ].text;


        typing=false;


        return;


    }




    dialogueIndex++;


    showDialogue();



}









/* BUTTON */


nextButton.addEventListener(
"click",
()=>{


    advanceDialogue();


});









/* ==========================================================
   SPACE BUTTON
   ========================================================== */


window.addEventListener(
"keydown",
e=>{


    if(
        e.code==="Space"
        &&
        !dialogueBox.hidden
    ){

        e.preventDefault();


        advanceDialogue();


    }


});









/* ==========================================================
   CLOSE DIALOGUE
   ========================================================== */


function closeDialogue(){


    clearInterval(
        typingInterval
    );



    dialogueBox.hidden=true;



    dialogueActive=false;



    canMove=true;



}









/* ==========================================================
   STORY DIALOGUES
   ========================================================== */


const dialogues={


start:[


{
speaker:"The Otherworldly Daschund 🐶",

text:
"*Woof Woof* Somewhere in a tiny pastel world, a special adventure begins..."
},


{
speaker:"The Otherworldly Daschund 🐶",

text:
"This world was created for one person *Woof*."
},


{
speaker:"The Otherworldly Daschund 🐶",

text:
"Someone who makes ordinary days feel so much brighter 😊."
},


{
speaker:"The Otherworldly Daschund 🐶",

text:
"Georgia, your adventure awaits! 💛"
}


],






flowerSpirit:[


{
speaker:"Flower Spirit",

text:
"Oh! You found me..."
},


{
speaker:"Flower Spirit",

text:
"I have been waiting for someone with a kind heart to arrive."
},


{
speaker:"Flower Spirit",

text:
"Four memories are hidden throughout this garden."
},


{
speaker:"Flower Spirit",

text:
"Complete the challenges and discover the final surprise."
}


],






butterfly:[


{
speaker:"Butterfly (Keza Weeza) 🦋",

text:
"Hello Georgia!"
},


{
speaker:"Butterfly (Keza Weeza) 🦋",

text:
"Every adventure needs courage and curiosity. I believe in youuu!"
},

{
speaker:"Butterfly (Keza Weeza) 🦋",

text:
"I hope you enjoy this little game that I made for you!"
}


],






garden:[


{
speaker:"Flower Spirit",

text:
"The flowers are losing their glow!"
},


{
speaker:"Flower Spirit",

text:
"Protect the garden heart and restore its color."
}


],






memory:[


{
speaker:"The Otherworldly Daschund 🐶",

text:
"Some memories hide, but the important ones always return."
}


],






parkour:[


{
speaker:"Cloud Spirit",

text:
"The clouds are waiting!"
},


{
speaker:"Cloud Spirit",

text:
"Reach the flower above the sky."
}


],






letter:[


{
speaker:"The Otherworldly Daschund 🐶",

text:
"The final memory is something you feel, not something you find."
}


],






finalTreasure:[


{
speaker:"The Otherworldly Daschund 🐶",

text:
"You found every memory..."
},


{
speaker:"The Otherworldly Daschund 🐶",

text:
"Every challenge brought you closer to this moment."
},


{
speaker:"The Otherworldly Daschund 🐶",

text:
"There is one final question waiting for you."
}


]


};