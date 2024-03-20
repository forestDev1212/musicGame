var musicArry = [];
var live = 3;
var cacheLetter = 0;
const treble = ["R", "S", "T", "U", "V", "W", "X"];
const bass = ["W", "X", "Y", "Z", "[", "\\", "]"];
const alto = ["X", "Y", "Z", "[", "\\", "]", "^"];
let interval;

$(window).on("load", function () {
  setTimeout(() => {
    $(".loading").fadeOut(3000);
  }, 3000);
});
const C = [11, 21, 31];
const D = [12, 22, 32];
const E = [13, 23, 33];
const F = [14, 24, 34];
const G = [15, 25, 35];
const A = [16, 26, 36];
const B = [17, 27, 37];

const sevenTone = {
  C: [11, 21, 31],
  D: [12, 22, 32],
  E: [13, 23, 33],
  F: [14, 24, 34],
  G: [15, 25, 35],
  A: [16, 26, 36],
  B: [17, 27, 37],
};
function moveLetter(letterObject) {
  const lettersContainer = document.getElementById("symbol_container");
  const newNote = document.createElement("span");
  newNote.classList.add("letter");
  newNote.textContent = letterObject.string;

  const offset = Math.random() > 0.5 ? 40 : 60;
  newNote.style.setProperty("--top-offset", offset + "%");
  lettersContainer.appendChild(newNote);

  // Remove the letter after the animation completes
  newNote.addEventListener("animationend", function () {
    musicArry.splice(musicArry.indexOf(letterObject), 1);
    newNote.remove();
    live--;
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
  console.log(letter);
  const letters = document.querySelectorAll(".letter");
  if (cacheLetter !== 0) {
    console.log(cacheLetter);
    const remainder = sevenTone[letter][0] % 10;
    musicArry.forEach((item, index) => {
      if (sevenTone[letter].indexOf(item.value) !== -1) {
        console.log("you are right.");
        musicArry.splice(musicArry.indexOf(item), 1);
        for (let i = 0; i < letters.length; i++) {
          const el = letters[i];
          if (el.textContent === item.string) {
            el.remove();
            cacheLetter = 0;
            break; // Exit the loop after removing the first matching letter
          }
        }
        return;
      } else {
        const remainder = sevenTone[letter][0] % 10;
        const totalNote = cacheLetter * 10 + remainder;
        console.log(totalNote);
        console.log(item.value);
        if (totalNote === item.value) {
          console.log("you are right.");
          musicArry.splice(musicArry.indexOf(item), 1);
          for (let i = 0; i < letters.length; i++) {
            const el = letters[i];
            console.log(el.textContent)
            console.log(item.string)
            if (el.textContent === item.string) {
              el.remove();
              cacheLetter = 0;
              break; // Exit the loop after removing the first matching letter
            }
          }
          return;
        } else if (
          totalNote.toString().length < item.value &&
          totalNote.toString() ===
            item.value.toString().substring(0, totalNote.toString().length)
        ) {
          cacheLetter = totalNote;
          for (let i = 0; i < letters.length; i++) {
            const el = letters[i];
            if (el.textContent === item.string) {
              const numStr = item.value.toString();
              var randomLetter = $("<span>");
              for (let i = 0; i < numStr.length; i++) {
                if (i === 0) {
                  if (parseInt(numStr[i]) % 3 == 1) {
                    randomLetter.append($("<span>").text("'&=="));
                  } else if (parseInt(numStr[i]) % 3 == 2) {
                    randomLetter.append($("<span>").text("'¯=="));
                    // randomLetter += "¯==";
                  } else {
                    randomLetter.append($("<span>").text("'ÿ=="));
                    // randomLetter += "ÿ==";
                  }
                } else if (i !== numStr.length - 1) {
                  if (parseInt(numStr[0]) % 3 == 1) {
                    randomLetter
                      .append(
                        $("<span>")
                          .css("color", "green")
                          .addClass("color-green")
                          .text(treble[parseInt(numStr[i]) - 1])
                      )
                      .append($("<span>").text("="));
                    // randomLetter += treble[parseInt(numStr[i]) - 1] + "=";
                  } else if (parseInt(numStr[0]) % 3 == 2) {
                    randomLetter
                      .append(
                        $("<span>")
                          .css("color", "green")
                          .addClass("color-green")
                          .text(bass[parseInt(numStr[i]) - 1])
                      )
                      .append($("<span>").text("="));
                    // randomLetter.append(<span>{bass[parseInt(numStr[i]) - 1]}</span>).append(<span>=</span>)
                    // randomLetter += bass[parseInt(numStr[i]) - 1] + "=";
                  } else {
                    randomLetter
                      .append(
                        $("<span>")
                          .addClass("color-green")
                          .css("color", "green")
                          .text(alto[parseInt(numStr[i]) - 1])
                      )
                      .append($("<span>").text("="));
                    // randomLetter.append(<span>{alto[parseInt(numStr[i]) - 1]}</span>).append(<span>=</span>)
                    // randomLetter += alto[parseInt(numStr[i]) - 1] + "=";
                  }
                } else {
                  if (parseInt(numStr[0]) % 3 == 1) {
                    randomLetter
                      .append(
                        $("<span>")
                          .addClass("color-green")
                          .text(treble[parseInt(numStr[i]) - 1])
                      )
                      .append($("<span>").text("=."));
                    // randomLetter.append(<span>{treble[parseInt(numStr[i]) - 1]}</span>).append(<span>=.</span>)
                    // randomLetter += treble[parseInt(numStr[i]) - 1] + "=.";
                  } else if (parseInt(numStr[0]) % 3 == 2) {
                    randomLetter
                      .append(
                        $("<span>")
                          .addClass("color-green")
                          .text(bass[parseInt(numStr[i]) - 1])
                      )
                      .append($("<span>").text("=."));
                    // randomLetter.append(<span>{bass[parseInt(numStr[i]) - 1]}</span>).append(<span>=.</span>)
                    // randomLetter += bass[parseInt(numStr[i]) - 1] + "=.";
                  } else {
                    randomLetter
                      .append(
                        $("<span>")
                          .addClass("color-green")
                          .text(alto[parseInt(numStr[i]) - 1])
                      )
                      .append($("<span>").text("=."));
                    // randomLetter.append(<span>{alto[parseInt(numStr[i]) - 1]}</span>).append(<span>=.</span>)
                    // randomLetter += alto[parseInt(numStr[i]) - 1] + "=.";
                  }
                }
              }
              console.log(randomLetter);
              $(el).empty();
              $(el).html(randomLetter);
            }
          }
        }
      }
    });
  } else {
    musicArry.forEach((item, index) => {
      console.log(sevenTone[letter], item.value);
      if (sevenTone[letter].indexOf(item.value) !== -1) {
        console.log("you are right.");
        musicArry.splice(musicArry.indexOf(item), 1);
        for (let i = 0; i < letters.length; i++) {
          const el = letters[i];
          if (el.textContent === item.string) {
            el.remove();
            break; // Exit the loop after removing the first matching letter
          }
        }
        return;
      } else if (
        sevenTone[letter].indexOf(
          parseInt(item.value.toString().substring(0, 2))
        ) !== -1
      ) {
        cacheLetter = parseInt(item.value.toString().substring(0, 2));
        console.log(cacheLetter);
        console.log(letter);
        console.log(item);
        for (let i = 0; i < letters.length; i++) {
          const el = letters[i];
          if (el.textContent === item.string) {
            const numStr = item.value.toString();
            var randomLetter = $("<span>");
            for (let i = 0; i < numStr.length; i++) {
              if (i === 0) {
                if (parseInt(numStr[i]) % 3 == 1) {
                  randomLetter.append($("<span>").text("'&=="));
                } else if (parseInt(numStr[i]) % 3 == 2) {
                  randomLetter.append($("<span>").text("'¯=="));
                  // randomLetter += "¯==";
                } else {
                  randomLetter.append($("<span>").text("'ÿ=="));
                  // randomLetter += "ÿ==";
                }
              } else if (i !== numStr.length - 1) {
                if (parseInt(numStr[0]) % 3 == 1) {
                  randomLetter
                    .append(
                      $("<span>")
                        .css("color", "green")
                        .addClass("color-green")
                        .text(treble[parseInt(numStr[i]) - 1])
                    )
                    .append($("<span>").text("="));
                  // randomLetter += treble[parseInt(numStr[i]) - 1] + "=";
                } else if (parseInt(numStr[0]) % 3 == 2) {
                  randomLetter
                    .append(
                      $("<span>")
                        .css("color", "green")
                        .addClass("color-green")
                        .text(bass[parseInt(numStr[i]) - 1])
                    )
                    .append($("<span>").text("="));
                  // randomLetter.append(<span>{bass[parseInt(numStr[i]) - 1]}</span>).append(<span>=</span>)
                  // randomLetter += bass[parseInt(numStr[i]) - 1] + "=";
                } else {
                  randomLetter
                    .append(
                      $("<span>")
                        .addClass("color-green")
                        .css("color", "green")
                        .text(alto[parseInt(numStr[i]) - 1])
                    )
                    .append($("<span>").text("="));
                  // randomLetter.append(<span>{alto[parseInt(numStr[i]) - 1]}</span>).append(<span>=</span>)
                  // randomLetter += alto[parseInt(numStr[i]) - 1] + "=";
                }
              } else {
                if (parseInt(numStr[0]) % 3 == 1) {
                  randomLetter
                    .append(
                      $("<span>")
                        .addClass("color-green")
                        .text(treble[parseInt(numStr[i]) - 1])
                    )
                    .append($("<span>").text("=."));
                  // randomLetter.append(<span>{treble[parseInt(numStr[i]) - 1]}</span>).append(<span>=.</span>)
                  // randomLetter += treble[parseInt(numStr[i]) - 1] + "=.";
                } else if (parseInt(numStr[0]) % 3 == 2) {
                  randomLetter
                    .append(
                      $("<span>")
                        .addClass("color-green")
                        .text(bass[parseInt(numStr[i]) - 1])
                    )
                    .append($("<span>").text("=."));
                  // randomLetter.append(<span>{bass[parseInt(numStr[i]) - 1]}</span>).append(<span>=.</span>)
                  // randomLetter += bass[parseInt(numStr[i]) - 1] + "=.";
                } else {
                  randomLetter
                    .append(
                      $("<span>")
                        .addClass("color-green")
                        .text(alto[parseInt(numStr[i]) - 1])
                    )
                    .append($("<span>").text("=."));
                  // randomLetter.append(<span>{alto[parseInt(numStr[i]) - 1]}</span>).append(<span>=.</span>)
                  // randomLetter += alto[parseInt(numStr[i]) - 1] + "=.";
                }
              }
            }
            console.log(randomLetter);
            $(el).empty();
            $(el).html(randomLetter);
          }
        }
      } else {
        console.log("You are Wrong");
        if (index === musicArry.length - 1) {
          live--;
          if (live === 0) {
            clearInterval(interval);
          }
          console.log(live);
          return;
        }
      }
    });
    if (live === 0) {
      clearInterval(interval);
      alert("Game Over");
    }
  }
}
function generateMusicNote() {
  const randomNum = generateRandomNumber([1, 2, 3]);
  // const randomNum = generateRandomNumber([1, 2, 3]);
  var randomLetter = "'";
  const numStr = String(randomNum);

  // Iterate over each character in the string
  for (let i = 0; i < numStr.length; i++) {
    if (i === 0) {
      if (parseInt(numStr[i]) % 3 == 1) {
        randomLetter += "&==";
      } else if (parseInt(numStr[i]) % 3 == 2) {
        randomLetter += "¯==";
      } else {
        randomLetter += "ÿ==";
      }
    } else if (i !== numStr.length - 1) {
      if (parseInt(numStr[0]) % 3 == 1) {
        randomLetter += treble[parseInt(numStr[i]) - 1] + "=";
      } else if (parseInt(numStr[0]) % 3 == 2) {
        randomLetter += bass[parseInt(numStr[i]) - 1] + "=";
      } else {
        randomLetter += alto[parseInt(numStr[i]) - 1] + "=";
      }
    } else {
      if (parseInt(numStr[0]) % 3 == 1) {
        randomLetter += treble[parseInt(numStr[i]) - 1] + "=.";
      } else if (parseInt(numStr[0]) % 3 == 2) {
        randomLetter += bass[parseInt(numStr[i]) - 1] + "=.";
      } else {
        randomLetter += alto[parseInt(numStr[i]) - 1] + "=.";
      }
    }
  }
  moveLetter({
    value: randomNum,
    string: randomLetter,
  });
  musicArry.push({
    value: randomNum,
    string: randomLetter,
  });
}

$(document).ready(function () {
  const randomNum = generateRandomNumber([1, 2, 3]);

  // musicArry.push({
  //   value : randomNum,
  //   string : randomLetter
  // })
});

$(document).on("click", "#start_btn", function () {
  let index = 0;
  function outputMusicNote() {
    // Check if all words have been displayed
    if (index < 3 && live > 0) {
      // Output the word
      generateMusicNote();
      console.log(musicArry);
      // Increment the index for the next word
      index++;
    } else {
      console.log(live);
      // Stop the interval when all words have been displayed
      clearInterval(interval);
      if (live == 0) {
        alert("Game OVER");
      }
    }
  }
  const interval = setInterval(outputMusicNote, 2000);
  console.log(true);
});

$(document).on("click", ".music_button", function () {});

// Get the modal
var modal = document.getElementById("option_modal");

// Get the button that opens the modal
var btn = document.getElementById("option_btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
