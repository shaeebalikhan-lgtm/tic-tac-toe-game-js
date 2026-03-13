let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector("#msg");
let stopBtn = document.querySelector(".stop-btn");
let line = document.querySelector(".win-line");

let turn0 = true; // playerX, playerO
// winning patterns 
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) =>{
    box.addEventListener("click",() =>{
        console.log("box was clicked");
        if(turn0){ // player0
            box.innerText = "O";
            turn0 = false;
        }
        else{//playerX
            box.innerText="X";
            turn0=true;
        }
        box.disabled = true;
        checkWinner();

    });
});

const checkWinner = () =>{
    for(let pattern of winPatterns){
        console.log(pattern[0],pattern[1],pattern[2]);
        console.log(boxes[pattern[0]].innerText,
                    boxes[pattern[1]].innerText,
                    boxes[pattern[2]].innerText
        );

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner",pos1Val);
                highlightWinner(pattern);
                //showWinner(pos1Val);
                setTimeout(() => { //setTimeout() so the message appears after the line is draw
                  showWinner(pos1Val);
                    }, 1000);
                return;
            }
        }
    }
    // Draw check 
    let filledBoxes = 0;
    boxes.forEach((box)=>{
        if (box.innerText !== ""){
            filledBoxes = filledBoxes+1;
        }
    });
    if(filledBoxes === 9){
        nowinner();
    }

};

// function highlightWinner(pattern){
//     console.log("Highlight called");
//     boxes[pattern[0]].style.backgroundColor = "lightgreen";
//     boxes[pattern[1]].style.backgroundColor = "lightgreen";
//     boxes[pattern[2]].style.backgroundColor = "lightgreen";
// }

function highlightWinner(pattern){

    const p = pattern.toString();

    // Horizontal
    if(p === "0,1,2"){
        line.style.width = "90%";
        line.style.top = "16%";
    }

    if(p === "3,4,5"){
        line.style.width = "90%";
        line.style.top = "50%";
    }

    if(p === "6,7,8"){
        line.style.width = "90%";
        line.style.top = "84%";
    }

    // Vertical
    if(p === "0,3,6"){
        line.style.width = "6px";
        line.style.height = "90%";
        line.style.left = "16%";
        line.style.top = "5%";
    }

    if(p === "1,4,7"){
        line.style.width = "6px";
        line.style.height = "90%";
        line.style.left = "50%";
        line.style.top = "5%";
    }

    if(p === "2,5,8"){
        line.style.width = "6px";
        line.style.height = "90%";
        line.style.left = "84%";
        line.style.top = "5%";
    }

    // Diagonal
    if(p === "0,4,8"){
        line.style.width = "120%";
        line.style.top = "50%";
        line.style.left = "-10%";
        line.style.transform = "rotate(45deg)";
    }

    if(p === "2,4,6"){
        line.style.width = "120%";
        line.style.top = "50%";
        line.style.left = "-10%";
        line.style.transform = "rotate(-45deg)";
    }

}
const showWinner = (winner)=>{

       msg.innerText = `Congratulation, Winner is ${winner}`;
       msgContainer.classList.remove("hide");
       disableBoxes();
       stopBtn.classList.add("hide")
    };

const nowinner = ()=>{
    msg.innerText = `Match Drawn`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    stopBtn.classList.add("hide")
};

const disableBoxes = () => {
     for(let box of boxes) {
        box.disabled = true;
     }
};


stopBtn.addEventListener("click",()=>{
    if(stopBtn.innerText == "Stop"){
        disableBoxes();
        stopBtn.innerText = "Start";
    }
    else{
        startBoxes();
        stopBtn.innerText = "Stop";
    }
})
const startBoxes = () => {
     for(let box of boxes) {
        box.disabled = false;
     }
};

const resetGame =() =>{
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    stopBtn.classList.remove("hide");
};
const enableBoxes = () => {
     for(let box of boxes) {
        box.disabled = false;
        box.innerText="";
     }
    line.style.width = "0";
    line.style.height = "6px";
    line.style.transform = "rotate(0deg)";

};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
    
