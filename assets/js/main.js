$(window).on("load",function (){
  setTimeout(() => {
    $(".loading").fadeOut(3000);
  }, 3000)
})

const tones = [1, 2, 3, 4]

function checkLetter(letter) {
  moveLetter('A')
}
const treble = ['R','S','T','U','V','W','X']
const bass = ['W', 'X', 'Y', 'Z', '[', "\\", ']']
const alto = ['V', 'W', 'X', 'Y', 'Z', '[', '\\']
function makeSymbol() {
  const symbolTone = Math.random() % 4 + 1;
  const volumn = Math.random() % 7 + 1;
  const signal = symbolTone
}
function moveLetter(letter) {
  const lettersContainer = document.getElementById('symbol_container');
  const newNote = document.createElement('span')
  newNote.classList.add('letter')
  newNote.textContent = letter

  const offset = Math.random() > 0.5 ? 40 : 60;
  console.log(offset)
  newNote.style.setProperty('--top-offset', offset + '%');
  console.log(newNote)
  console.log(lettersContainer)
  lettersContainer.appendChild(newNote);
  
  // Remove the letter after the animation completes
  newNote.addEventListener('animationend', function() {
    newNote.remove();
  });
}

function generateRandomNumber(clefArray) {
  // Generate random length between 2 and maxLength
  console.log(clefArray)
  const maxLength = clefArray.length + 1;
  console.log(maxLength)
  const length = Math.floor(Math.random() * (maxLength - 1)) + 2;
  console.log(length)
  
  // Generate first number between 1 and 3
  let randomNumber = clefArray[Math.floor(Math.random() * clefArray.length)];
  console.log(randomNumber)

  // Generate remaining numbers between 1 and 7
  for (let i = 1; i < length; i++) {
      const digit = Math.floor(Math.random() * 7) + 1;
      randomNumber = randomNumber * 10 + digit;
  }

  return randomNumber;
}

$(document).ready(function() {
  const randomNum = generateRandomNumber([1, 2, 3]);
  var musicArry = []
console.log(randomNum);
  var randomLetter = "'" 
  const numStr = String(randomNum);
  
  // Iterate over each character in the string
  $(document).on('cl')
  for (let i = 0; i < numStr.length; i++) {
    if(i === 0) {
      if( parseInt(numStr[i]) % 3 == 1) {
        randomLetter += '&=='
      } else if(parseInt(numStr[i]) % 3 == 2) {
        randomLetter += '¯=='
      } else {
        randomLetter += 'ÿ=='
      }
    } else if(i !== numStr.length - 1) {
      if(parseInt(numStr[0]) % 3 == 1) {
        randomLetter += treble[parseInt(numStr[i]) - 1] + "="
      } else if(parseInt(numStr[0]) % 3 == 2) {
        randomLetter += bass[parseInt(numStr[i]) - 1] + "="
      } else {
        randomLetter += alto[parseInt(numStr[i]) - 1] + "="
      }
    } else {
      if(parseInt(numStr[0]) % 3 == 1) {
        randomLetter += treble[parseInt(numStr[i]) - 1] + "=."
      } else if(parseInt(numStr[0]) % 3 == 2) {
        randomLetter += bass[parseInt(numStr[i]) - 1] + "=."
      } else {
        randomLetter += alto[parseInt(numStr[i]) - 1] + "=."
      }
    }
  }
  console.log(true)
  console.log(randomLetter)
  // document.getElementById('music_symbol').innerText = randomLetter
  moveLetter(randomLetter)
  musicArry.push({
    value : randomNum,
    string : randomLetter
  })
  console.log(musicArry)

})

$(document).on('click', '#start_btn', function() {
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

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}