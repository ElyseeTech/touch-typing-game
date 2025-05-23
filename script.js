const typingText =document.querySelector(".typing-text p"),
inputField =document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag= document.querySelector(".mistake span"),
wpmTag= document.querySelector(".wpm span"),
cpmTag= document.querySelector(".cpm span");
tryAgainBtn = document.querySelector("button");

let timer,
maxTime =180,
timeLeft =maxTime,
charIndex =mistakes =isTyping = 0;

function randomParagraph(){
    //getting random paragraphs
    let randomIndex= Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML ="";
    //gettind eah character in random paragraph
    paragraphs[randomIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML +=spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
//focus input field on keydown or click 
document.addEventListener("keydown", ()=> inputField.focus());
typingText.addEventListener("click", ()=> inputField.focus());
}
function initTyping (){
    const characters =typingText.querySelectorAll("span");
    let typedCharacter =inputField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
           // timer starting only once, not when every character is typed
    if (!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping= true;

    }
   
   
    //if any character is typed or backspace
    if(typedCharacter == null){
        charIndex--;
        

        if(characters[charIndex].classList.contains("incorrect")){
            mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");   

    }
    else{
    if(characters[charIndex].innerText === typedCharacter){
    characters[charIndex].classList.add("correct");    
    //if user types the correct character then add correct else, incorrect
}
    else{
        //mistake increment
    mistakes++;    
    characters[charIndex].classList.add("incorrect");   
}
    
    charIndex++;
}
characters.forEach(span => span.classList.remove("active"));
characters[charIndex].classList.add("acive");

let wpm =Math.round((((charIndex - mistakes)/5) / (maxTime - timeLeft)) * 60);
//Settin wpm value to 0 is if it is 0,empty or infinty
wpm = wpm < 0 || !wpm || wpm  === Infinity ? 0 : wpm;
mistakeTag.innerText = mistakes;
wpmTag.innerText = wpm;
cpmTag.innerText = charIndex - mistakes;
    }
    else{
        inputField.value ="";
        clearInterval(timer);
    }
}
function initTimer(){
    //if timeleft is > 0 then  decrement timeleft else, clear the timer
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText= timeLeft;
    }
    else{
        clearInterval(timer);
    }
}
function resetGame(){

    // loading random paragraph and resetting each variable and element to default
    randomParagraph();
     inputField.value ="";
    clearInterval(timer);

    timeLeft = maxTime,
    charIndex = mistakes =isTyping =0;
    timeTag.innerText = timeLeft;

    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);