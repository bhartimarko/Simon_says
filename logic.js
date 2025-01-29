let start = false;
let level = 0;
let heading3 = document.querySelector("h3");

//these two arrays are store, values.
// first gameSequence array is store random boxes.
// and second userSesquence array is store gameSequence one by one.
let gameSequence = [];
let userSequence = [];

//We will not put colors in the array because if we put colors then classlist will not be able to access the class from the HTML file.
//for eg. let button = ['blue', 'green', 'brown', 'purple'];
let buttons = ["box1", "box2", "box3", "box4"];

let body = addEventListener('keypress' , () => {
     if(start == false){
          start = true;
     }
     levelUp();
})

// This game flash function will, make the buttons flash when the game starts and the game sequence plays out.
function gameFlash(btn){
      if(btn && btn.classList){
          btn.classList.add("Flash");
          setTimeout(() => {
               btn.classList.remove("Flash");
          }, 300);
      }
      else{
          console.error("invalid button");
          }          
}

// This user flash function will, run according to the Flash functions or we can say this user flash function is run according to the game sequence.
function userFlash(btn){
     if(btn && btn.classList){
         btn.classList.add("userFlash");
         setTimeout(() => {
              btn.classList.remove("userFlash");
         }, 250);
     }
     else{
         console.error("invalid button");
         }          
}

let allButtons = document.querySelectorAll('.box1, .box2, .box3, .box4');
for (let buttons of allButtons) {
     buttons.addEventListener("click", buttonPress);
}

// this button press function will,check which button the user has pressed
function buttonPress(){
// don't accept input if game hasn't started.
     if(!start) return; 

     let buttons = this;
     console.log(buttons);
     userFlash(buttons);

     userBoxes = buttons.getAttribute('id');
     userSequence.push(userBoxes);
     console.log(userSequence);
   
     //last button check krne ke liye ham is function k andar parameter daal denge.
     checkSequence(userSequence.length - 1);
}


function checkSequence(currentIndex){
      //get the current index from user sequence.     
     //  currentIndex = level-1 (This currentIndex is fixed so that's why we do not check again and again in same array. and it's show us undefined)

      console.log("Checking:", userSequence[currentIndex], "vs", gameSequence[currentIndex]); 

      //check if the current input matches the gameSequence
      if(userSequence[currentIndex] === gameSequence[currentIndex]){
          //if we've completed the sequence successfully
          if(userSequence.length == gameSequence.length){
               console.log("same sequence")
               setTimeout(() => {
                    userSequence = []; //clear user sequence.
                    levelUp();
               },500);
          }         
      }
      else{
          heading3.innerHTML = `GAME OVER - Sequence dosen't match!<br> <b>Your Score was : ${level},</b> Press any key to restart`;
          document.querySelector('body').style.backgroundColor = "darkred";
          setTimeout(() => {
               document.querySelector('body').style.backgroundColor = "white";         
          }, 200);
          resetGame(); //after 2day change this.
          }     
}

// tO RESET THE GAME.
function resetGame(){
     start = false;  // Reset game state
     level = 0;      // Reset level
     gameSequence = []; // Clear game sequence
     userSequence = []; // Clear user sequence
}

function levelUp(){
     level += 1;
     heading3.innerText = `Level ${level}`;
     
     let randomIndex = Math.floor(Math.random() * 4);
     let randomBoxes = buttons[randomIndex];
     let randomButton = document.querySelector(`.${randomBoxes}`);

     // console.log(randomIndex);
     // console.log(randomBoxes);
     // console.log(randomButton);
     
     gameSequence.push(randomBoxes);
     console.log(gameSequence);     
     gameFlash(randomButton);      
}

