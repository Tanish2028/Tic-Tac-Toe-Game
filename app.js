let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");

let newGame = document.querySelector("#newbtn");
let msgC = document.querySelector(".msg");
let winG = document.querySelector("#win");
let turnO = true;  //playerx playerO

let winningpattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


const resetgame = ()=>{
      turnO = true;
      EnableBoxes();
      msgC.classList.add("hide");
};

const EnableBoxes = ()=>{
    for(let box of boxes){
       box.disabled = false;
       box.innerText = "";
       box.style.color = "black"; 
    }
};

boxes.forEach((box)=>{
   box.addEventListener("click",()=>{
    if(turnO){
        box.innerText = "O";
        box.style.color = "rgba(43, 246, 7, 0.96)";
        turnO = false;
    }
        
    else{
        box.innerText = "X";
        box.style.color = "rgba(246, 9, 242, 1)";
        turnO = true;
    }
    
    box.disabled = true;

    checkWinner();
   }); 
});



const disableBoxes = ()=>{
    for(let box of boxes){
       box.disabled = true; 
    }
};
const showWinner = (winner)=>{
    
    
    winG.innerText = `Congratulations, Winner is ${winner}`;
    msgC.classList.remove("hide");
    
    disableBoxes();
};

const showDraw = () => {
    winG.innerText = "It's a Draw!";
    msgC.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winningpattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                winnerFound = true;
                showWinner(pos1);
                return; 
            }
        }
    }

    
    let allFilled = [...boxes].every(box => box.innerText !== "");
    if (!winnerFound && allFilled) {
        showDraw();
    }
};


newGame.addEventListener("click",resetgame);
resetBtn.addEventListener("click",resetgame);
