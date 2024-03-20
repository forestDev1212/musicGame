/**
 * Declare Constants
 *
 */
var musicArry = []; //currently showing music notes
var live = 3; //live
var score = 0; //total score
var cacheLetter = 0; //selected letter's cache value
const treble = ["R", "S", "T", "U", "V", "W", "X"]; //letters for treble tone
const bass = ["W", "X", "Y", "Z", "[", "\\", "]"]; //letters for bass tone
const alto = ["X", "Y", "Z", "[", "\\", "]", "^"]; //letters for alto tone
let interval;
let noteIndex = 0;
let mode = 3;
let tones = [1, 2, 3]
const LEVEL_1_NUMBER = 3;
const LEVEL_2_NUMBER = 10;
const LEVEL_3_NUMBER = 20;

//Each Tones
const C = [11, 21, 31];
const D = [12, 22, 32];
const E = [13, 23, 33];
const F = [14, 24, 34];
const G = [15, 25, 35];
const A = [16, 26, 36];
const B = [17, 27, 37];

//sevenTone Object
const sevenTone = {
  C: [11, 21, 31],
  D: [12, 22, 32],
  E: [13, 23, 33],
  F: [14, 24, 34],
  G: [15, 25, 35],
  A: [16, 26, 36],
  B: [17, 27, 37],
};


var modal = document.getElementById("option_modal");

//Function for preload Image

$(window).on("load", function () {
  setTimeout(() => {
    $(".loading").fadeOut(3000);
  }, 3000);
});

/**
 * function for add score and display it on score board
 */
function addScore() {
  score += 15;
  $("#score").text(score);
}

/**
 * moveLetter function
 * here param is for showing letter
 * @param {*} letterObject
 */

function moveLetter(letterObject) {
  const lettersContainer = document.getElementById("symbol_container");
  const newNote = document.createElement("span");
  newNote.classList.add("letter");
  newNote.textContent = letterObject.string;

  const offset = Math.random() > 0.4 ? 40 : 60;
  newNote.style.setProperty("--top-offset", offset + "%");
  lettersContainer.appendChild(newNote);

  // Remove the letter after the animation completes
  newNote.addEventListener("animationend", function () {
    musicArry.splice(musicArry.indexOf(letterObject), 1);
    newNote.remove();
    live--;
    $("#lives_remaining").text(live);
  });
}

/**
 * to generate Random numbers
 * @param {*} clefArray for tone Clef Array
 * @param {*} level for level
 * @returns
 */

function generateRandomNumber(clefArray, level = 1) {
  // Generate random length between 2 and maxLength
  const length = Math.floor(Math.random() * level) + 2;
  // Generate first number between 1 and 3
  let randomNumber = clefArray[Math.floor(Math.random() * clefArray.length)];

  // Generate remaining numbers between 1 and 7
  for (let i = 1; i < length; i++) {
    const digit = Math.floor(Math.random() * 7) + 1;
    randomNumber = randomNumber * 10 + digit;
  }

  return randomNumber;
}

function resetMusicNoteArry() {
  $("#symbol_container > span").each(function (index) {
    // Change the content of the span tag
    console.log(index)
    $(this).text(musicArry[index].string);
  });
}

/**
 * function for check letter if press music note button
 * @param {*} letter
 */

function checkLetter(letter) {
  const letters = document.querySelectorAll(".letter");
  if (cacheLetter !== 0) {
    const remainder = sevenTone[letter][0] % 10;
    var included = false;
    var matched = false;
    musicArry.forEach((item, index) => {
      if (sevenTone[letter].indexOf(item.value) !== -1 && matched === false) {
        //The New Button is C and Note is C
        musicArry.splice(musicArry.indexOf(item), 1);
        for (let i = 0; i < letters.length; i++) {
          const el = letters[i];
          if (el.textContent === item.string) {
            el.remove();
            cacheLetter = 0;
            resetMusicNoteArry();
            break; // Exit the loop after removing the first matching letter
          }
        }
        addScore();
        return;
      } else {
        const remainder = sevenTone[letter][0] % 10;
        const totalNote = cacheLetter * 10 + remainder;
        const totalNoteLegth = totalNote.toString().length;
        const itemValueLength = item.value.toString().length;
        if (totalNote === item.value) {
          musicArry.splice(musicArry.indexOf(item), 1);
          matched = true;
          for (let i = 0; i < letters.length; i++) {
            const el = letters[i];
            if (el.textContent === item.string) {
              el.remove();
              cacheLetter = 0;
              resetMusicNoteArry();
              break; // Exit the loop after removing the first matching letter
            }
          }
          addScore();
          return;
        } else if (
          totalNoteLegth < itemValueLength &&
          totalNote.toString().substring(1, totalNoteLegth - 1) ===
            item.value.toString().substring(1, totalNoteLegth - 1)
        ) {
          cacheLetter = totalNote;
          included = true;
          for (let j = 0; j < letters.length; j++) {
            const el = letters[j];
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
                          .css(
                            "color",
                            cacheLetter.toString().length >= i + 1
                              ? "green"
                              : ""
                          )
                          .text(treble[parseInt(numStr[i]) - 1])
                      )
                      .append($("<span>").text("="));
                    // randomLetter += treble[parseInt(numStr[i]) - 1] + "=";
                  } else if (parseInt(numStr[0]) % 3 == 2) {
                    randomLetter
                      .append(
                        $("<span>")
                          .css(
                            "color",
                            cacheLetter.toString().length >= i + 1
                              ? "green"
                              : ""
                          )
                          // .css("color", "green")
                          .text(bass[parseInt(numStr[i]) - 1])
                      )
                      .append($("<span>").text("="));
                    // randomLetter.append(<span>{bass[parseInt(numStr[i]) - 1]}</span>).append(<span>=</span>)
                    // randomLetter += bass[parseInt(numStr[i]) - 1] + "=";
                  } else {
                    randomLetter
                      .append(
                        $("<span>")
                          .css(
                            "color",
                            cacheLetter.toString().length >= i + 1
                              ? "green"
                              : ""
                          )
                          // .css("color", "green")
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
              $(el).empty();
              $(el).html(randomLetter);
            }
          }
        } else {
          if (
            index === musicArry.length - 1 &&
            included !== true &&
            matched !== true
          ) {
            live--;
            $("#lives_remaining").text(live);
            cacheLetter = 0;
            resetMusicNoteArry();
            if (live === 0) {
              $("#lives_remaining").text(live);
              alert("Game Over");
            }
          }
        }
      }
    });
  } else {
    var matched = false;
    var included = false;
    musicArry.forEach((item, index) => {
      if (sevenTone[letter].indexOf(item.value) !== -1 && matched === false) {
        matched = true;
        musicArry.splice(musicArry.indexOf(item), 1);
        for (let i = 0; i < letters.length; i++) {
          const el = letters[i];
          if (el.textContent === item.string) {
            el.remove();
            addScore();
            cacheLetter = 0;
            resetMusicNoteArry()
            return; // Exit the loop after removing the first matching letter
          }
        }
        return;
      } else if (
        sevenTone[letter].indexOf(
          parseInt(item.value.toString().substring(0, 2))
        ) !== -1
      ) {
        cacheLetter = parseInt(item.value.toString().substring(0, 2));
        included = true;
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
                        .css("color", i == 1 ? "green" : "")
                        .addClass("color-green")
                        .text(treble[parseInt(numStr[i]) - 1])
                    )
                    .append($("<span>").text("="));
                  // randomLetter += treble[parseInt(numStr[i]) - 1] + "=";
                } else if (parseInt(numStr[0]) % 3 == 2) {
                  randomLetter
                    .append(
                      $("<span>")
                        .css("color", i == 1 ? "green" : "")
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
                        .css("color", i == 1 ? "green" : "")
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
            $(el).empty();
            $(el).html(randomLetter);
          }
        }
      } else {
        if (
          index === musicArry.length - 1 &&
          included === false &&
          matched === false
        ) {
          live--;
          $("#lives_remaining").text(live);
          if (live === 0) {
            $("#lives_remaining").text(live);
            clearInterval(interval);
          }
          return;
        }
      }
    });
    if (live === 0) {
      $("#lives_remaining").text(live);
      clearInterval(interval);
      alert("Game Over");
    }
  }

  console.log(noteIndex);
  console.log(musicArry);
  if (noteIndex === LEVEL_1_NUMBER && musicArry.length === 0) {
    alert("the level 1 completed.");
    noteIndex++;
    modal.style.display = "block";
  } else if (noteIndex === LEVEL_2_NUMBER && musicArry.length === 0) {
    alert("the level 2 completed.");
    noteIndex++;
  }
}

function gamerOver() {}

/**
 * function for generateMusicNotes
 * @param {*} tones
 * @param {*} level
 */

function generateMusicNote(tones = [1, 2, 3], level = 1) {
  const randomNum = generateRandomNumber(tones, level);
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


/**
 * when document is ready
 */

$(document).ready(function () {
  $("#lives_remaining").text(live);
});

/**
 *
 */

$(document).on("click", "#start_btn", function (mode = 3000, tones = [1, 2, 3]) {
  console.log(true);
  // let noteIndex = 0;
  function outputMusicNote() {
    // Check if all words have been displayed
    if (noteIndex < LEVEL_1_NUMBER && live > 0) {
      // Output the word
      generateMusicNote(tones, 1);
      $("#level").text(1);
      // Increment the noteIndex for the next word
      noteIndex++;
    } else if (
      LEVEL_2_NUMBER > noteIndex &&
      noteIndex >= LEVEL_1_NUMBER &&
      live > 0
    ) {
      if (noteIndex === LEVEL_1_NUMBER) {
        clearInterval(interval);
        if (musicArry.length === 0) {
          alert("Level 1 complete.");
          generateMusicNote(tones, 2);
          $("#level").text(2);
          noteIndex++;
        }
      }
    } else if (noteIndex >= LEVEL_2_NUMBER && live > 0) {
      $("#level").text(3);
      generateMusicNote(tones, 3);
      noteIndex++;
    } else {
      // Stop the interval when all words have been displayed
      clearInterval(interval);
      $("#lives_remaining").text(live);
      if (live === 0) {
        alert("Game OVER");
      }
    }
  }
  interval = setInterval(outputMusicNote, 3000);
});

$(document).on('click', '#continue_btn', function (mode, tones) {
  modal.style.display = "none";
  console.log(true);
  // let noteIndex = 0;
  function outputMusicNote() {
    // Check if all words have been displayed
    if (noteIndex < LEVEL_1_NUMBER && live > 0) {
      // Output the word
      generateMusicNote(tones, 1);
      $("#level").text(1);
      // Increment the noteIndex for the next word
      noteIndex++;
    } else if (
      LEVEL_2_NUMBER > noteIndex &&
      noteIndex >= LEVEL_1_NUMBER &&
      live > 0
    ) {
      if (noteIndex === LEVEL_1_NUMBER) {
        clearInterval(interval);
      } else {
        generateMusicNote(tones, 2);
          $("#level").text(2);
          noteIndex++;
      }
    } else if (noteIndex >= LEVEL_2_NUMBER && live > 0) {
      if (noteIndex === LEVEL_2_NUMBER) {
        clearInterval(interval);
      } else {
        generateMusicNote(tones, 2);
          $("#level").text(2);
          noteIndex++;
      }
    } else {
      // Stop the interval when all words have been displayed
      clearInterval(interval);
      $("#lives_remaining").text(live);
      if (live === 0) {
        alert("Game OVER");
      }
    }
  }
  interval = setInterval(outputMusicNote, 3000);
})


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
