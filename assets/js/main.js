var musicArry = []

const treble = ['R','S','T','U','V','W','X']
const bass = ['W', 'X', 'Y', 'Z', '[', "\\", ']']
const alto = ['V', 'W', 'X', 'Y', 'Z', '[', '\\']

$(window).on("load",function (){
  setTimeout(() => {
    $(".loading").fadeOut(3000);
  }, 3000)
})


function moveLetter(letter) {
  const lettersContainer = document.getElementById('symbol_container');
  const newNote = document.createElement('span')
  newNote.classList.add('letter')
  newNote.textContent = letter

  const offset = Math.random() > 0.5 ? 40 : 60;
  newNote.style.setProperty('--top-offset', offset + '%');
  lettersContainer.appendChild(newNote);
  
  // Remove the letter after the animation completes
  newNote.addEventListener('animationend', function() {
    newNote.remove();
  });
}

function generateRandomNumber(clefArray) {
  // Generate random length between 2 and maxLength
  const maxLength = clefArray.length + 1;
  const length = Math.floor(Math.random() * (maxLength - 1)) + 2;
  
  // Generate first number between 1 and 3
  let randomNumber = clefArray[Math.floor(Math.random() * clefArray.length)];

  // Generate remaining numbers between 1 and 7
  for (let i = 1; i < length; i++) {
      const digit = Math.floor(Math.random() * 7) + 1;
      randomNumber = randomNumber * 10 + digit;
  }

  return randomNumber;
}

function checkLetter(letter) {
  const letters = document.querySelectorAll('.letter')

}

$(document).ready(function() {
  const randomNum = generateRandomNumber([1, 2, 3]);
  
  // musicArry.push({
  //   value : randomNum,
  //   string : randomLetter
  // })

})



$(document).on('click', '#start_btn', function() {
  let index = 0;
function outputMusicNote() {
  // Check if all words have been displayed
  if (index < 20) {
    // Output the word
    generateMusicNote()
    // Increment the index for the next word
    index++;
} else {
    // Stop the interval when all words have been displayed
    clearInterval(interval);
}
}
  const interval = setInterval(outputMusicNote, 2000)
  console.log(true)
})

$(document).on('click', '.music_button', function() {

})

// Get the modal
var modal = document.getElementById("option_modal");

// Get the button that opens the modal
var btn = document.getElementById("option_btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}