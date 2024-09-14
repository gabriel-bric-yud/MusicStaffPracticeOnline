const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const trebleClef = new Image()
trebleClef.src = 'imgs/trebleclefsymbol.png'


let osc1
const audioCtx = new (window.AudioContext || window.webkit.AudioContext)();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawQuarterNoteUp(sx, sy,r,rm, color) {
  ctx.moveTo(sx,sy)
  ctx.beginPath(sx,sy);
  ctx.arc(sx, sy, r, Math.PI * 2, 0, true);
  ctx.fillStyle = color
  ctx.fill();
  ctx.fillRect(sx + (r/1.7),sy-(r*6),4 * rm,60 * rm)
}


function drawQuarterNoteDown(sx, sy,r, rm, color) {
  ctx.moveTo(sx,sy)
  ctx.beginPath(sx,sy);
  ctx.arc(sx, sy, r, Math.PI * 2, 0, true);
  ctx.fillStyle = color
  ctx.fill();
  ctx.fillRect((sx-r),sy,4 * rm,(55 * rm))
}


function draw8thNote(sx, sy,r, rm) {
  ctx.moveTo(sx,sy)
  ctx.beginPath(sx,sy);
  ctx.arc(sx, sy, r, Math.PI * 2, 0, true);
  ctx.fill();
  ctx.fillRect(sx + (r/1.8),sy-(r*5.1),4 * rm, 55 * rm)
  ctx.fillRect(sx + (r/1.8),sy- (r*5.1),25 * rm,4 *rm)

  ctx.arc(sx+(r*2.5), sy, r, Math.PI * 2, 0, true);
  ctx.fill();
  ctx.fillRect((sx + (r*3)),(sy-(r*5.1)),4 *rm,55 * rm)
}


function draw16thNote(sx, sy, r, rm) {
  ctx.moveTo(sx,sy)
  ctx.beginPath(sx,sy);
  ctx.arc(sx, sy, r, Math.PI * 2, 0, true);
  ctx.fill();
  ctx.fillRect(sx + (r/1.8),sy-(r*5.1),4 * rm, 55 * rm);
  ctx.fillRect(sx + (r/1.5),sy- (r*5.1),25 * rm,4 *rm);

  ctx.arc(sx+(r*2.5), sy, r, Math.PI * 2, 0, true);
  ctx.fill();
  ctx.fillRect(sx + (r*3),sy-(r*5.1),4 *rm,55 * rm);
  ctx.fillRect(sx + (r/1.7),sy- (r * 4),25 *rm,4 *rm);
}

function drawQuad16thNote(sx, sy,r,rm, noteColor) {

  draw16thNote(sx,sy,r,rm, noteColor)
  
  ctx.fillRect(sx + (r*3),sy- (r *5.1),25*rm,4*rm)
  ctx.fillRect(sx + (r *3),sy - (r*4),25*rm,4 *rm)

  draw16thNote(sx + (r * 4.9),sy,r,rm, noteColor)

}

//////////////////////////////////////////////////////////////////////////////////////////////////////


function drawBarLine(sx,sy,length) {
  ctx.beginPath(sx,sy)
  ctx.moveTo(sx,sy);
  ctx.lineTo(sx, sy - length);
  ctx.stroke();
}



function drawLedgerLine(sx,sy,length) {
  ctx.beginPath(sx,sy)
  ctx.moveTo(sx,sy);
  ctx.lineTo(sx - length, sy);
  ctx.stroke();

}


function drawStaff(x,ey,g4y,b4y,d5y,f5y, m, length) {
  ctx.beginPath(x,ey*m);
  ctx.moveTo(x,ey*m);
  ctx.lineTo(length, ey*m);
  ctx.stroke();
  ctx.moveTo(x,g4y *m);
  ctx.lineTo(length, (g4y*m));
  ctx.stroke();
  ctx.moveTo(x, b4y *m );
  ctx.lineTo(length,(b4y*m));
  ctx.stroke();
  ctx.moveTo(x,d5y *m);
  ctx.lineTo(length,(d5y*m));
  ctx.stroke();
  ctx.moveTo(x,f5y *m);
  ctx.lineTo(length,(f5y*m));
  ctx.stroke();

  
  trebleClef.addEventListener(
    "load",
    () => {
      ctx.drawImage(trebleClef,-50, -40, 200, 400) 
    },
    false
  )

  ctx.drawImage(trebleClef,-50, -40, 200, 400) 
   
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function drawCorrectNote(note) {
  switch(note[1]) {
    case 'G5':
      drawQuarterNoteDown(xStart,g5y *m,r,rm, 'green');
      break;
    case 'F5':
      drawQuarterNoteDown(xStart,f5y *m,r,rm, 'green'); 
      break;
    case 'E5':
      drawQuarterNoteDown(xStart,e5y *m,r,rm, 'green'); 
      break;
    case 'D5':
      drawQuarterNoteDown(xStart,d5y *m,r,rm, 'green'); 
      break;
    case 'C5':
      drawQuarterNoteDown(xStart,cy5*m,r,rm, 'green'); 
      break;
    case 'B4':
      drawQuarterNoteDown(xStart,b4y *m,r,rm, 'green'); 
      break;
    case 'A4':
      drawQuarterNoteUp(xStart,a4y *m,r,rm, 'green');
      break;
    case 'G4':
      drawQuarterNoteUp(xStart,g4y *m,r,rm, 'green'); 
      break;
    case 'F4':
      drawQuarterNoteUp(xStart,f4y *m,r,rm, 'green'); 
      break;
    case 'E4':
      drawQuarterNoteUp(xStart,e4y *m,r,rm, 'green'); 
      break;
    case 'D4':
      drawQuarterNoteUp(xStart,d4y *m,r,rm, 'green');;
      break;
    case 'C4':
      drawLedgerLine(xStart + (r*1.5),c4y*m,r*3);
      drawQuarterNoteUp(xStart,c4y *m,r,rm, 'green');
      break;
    case 'B3':
      drawLedgerLine(xStart + (r*1.5),c4y*m,r*3);
      drawQuarterNoteUp(xStart,b3y *m,r,rm, 'green');
      break;
    case 'A3':
      drawLedgerLine(xStart + (r*1.5),c4y*m,r*3);
      drawLedgerLine(xStart + (r*1.5),a3y*m,r*3);
      drawQuarterNoteUp(xStart,a3y *m,r,rm, 'green');
      break;
    case 'G3':
      drawLedgerLine(xStart + (r*1.5),c4y*m,r*3);
      drawLedgerLine(xStart + (r*1.5),a3y*m,r*3);
      drawQuarterNoteUp(xStart,g3y *m,r,rm, 'green');
      break;
    case 'F3':
      drawLedgerLine(xStart + (r*1.5),c4y*m,r*3);
      drawLedgerLine(xStart + (r*1.5),a3y*m,r*3)
      drawLedgerLine(xStart + (r*1.5),f3y*m,r*3);
      drawQuarterNoteUp(xStart,f3y *m,r,rm, 'green');
      break; 
    case 'E3':
      drawLedgerLine(xStart + (r*1.5),c4y*m,r*3);
      drawLedgerLine(xStart + (r*1.5),a3y*m,r*3)
      drawQuarterNoteUp(xStart,e3y *m,r,rm, 'green');
      break;        
  }

  playOsc(osc1, "triangle", .1, 2, note)
}



let playerTurn = true
let currentNote
const f5y = 25;
const d5y = 45;
const b4y = 65;
const g4y = 85;
const e4y = 105;
const c4y = 125;
const a3y = 145;
const f3y = 165;


const g5y = 15;
const e5y = 35;
const cy5= 55;
const a4y= 75;
const f4y = 95;
const d4y = 115;
const b3y = 135;
const g3y = 155;
const e3y = 175;



const m = 2.5;
let x
let y
const r = 25;
const rm = 2.5;

let xStart = 170;
let noteCount = 0
let composition = []

drawStaff(10,e4y,g4y,b4y,d5y,f5y,m,340)
drawBarLine(10,262,200)
drawBarLine(340,262,200)
drawLedgerLine(xStart + (r*1.5),c4y*m,r*3);
drawLedgerLine(xStart + (r*1.5),a3y*m,r*3);
drawLedgerLine(xStart + (r*1.5),f3y*m,r*3);

canvas.addEventListener('click', (e) => {
  x = e.clientX - canvas.offsetLeft + window.scrollX ;
  y = e.clientY - canvas.offsetTop + window.scrollY;
  let noteColor
  if (noteCount < 1 &&  currentNote != undefined){
    if (y > (g5y*m) - (1 * 4) && y < (a4y* m) - (1 * 4)){
      if (y > (g5y*m) -(1 * 4) && y < (f5y *m)-(1 * 4)) {
        if (currentNote[1] == 'G5') { 
          noteColor = 'green'
        }
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,g5y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(32)); xStart += (35*m); noteCount+=1;
      }
      if (y > (f5y*m) -(1 * 4) && y < (e5y *m)-(1 * 4)) {
        if (currentNote[1] == 'F5') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,f5y *m,r,rm, noteColor);playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(31)); xStart += (35*m); noteCount+=1;  
      }
      if (y > (e5y*m) -(1 * 4) && y < (d5y *m)-(1 * 4)) {
        if (currentNote[1] == 'E5') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,e5y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(30)); xStart += (35*m); noteCount+=1;
      }
      if (y > (d5y*m) -(1 * 4) && y < (cy5*m)-(1 * 4)) {
        if (currentNote[1] == 'D5') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,d5y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(29)); xStart += (35*m); noteCount+=1;
      }
      if (y > (cy5*m) -(1 * 4) && y < (b4y *m)-(1 * 4)) {
        if (currentNote[1] == 'C5') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,cy5*m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(28)); xStart += (35*m); noteCount+=1;
      }
      if (y > (b4y*m) -(1 * 4) && y < (a4y*m)-(1 * 4)) {
        if (currentNote[1] == 'B4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,b4y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(27)); xStart += (35*m); noteCount+=1;
      }
    }
    else if (y > (a4y*m) - (1 * 4) && y < 450) {
      if (y > (a4y*m) -(1 * 4) && y < (g4y *m)-(1 * 4)) {
        if (currentNote[1] == 'A4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,a4y*m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(26)); xStart += (35*m); noteCount+=1;
      }
      if (y > (g4y*m) -(1 * 4) && y < (f4y *m)-(1 * 4)) {
        if (currentNote[1] == 'G4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,g4y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(25)); xStart += (35*m); noteCount+=1;
      }
      if (y > (f4y*m) -(1 * 4) && y < (e4y *m)-(1 * 4)) {
        if (currentNote[1] == 'F4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,f4y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(24)); xStart += (35*m); noteCount+=1;
      }
      if (y > (e4y*m) -(1 * 4) && y < (d4y *m)-(1 * 4)) {
        if (currentNote[1] == 'E4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,e4y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(23)); xStart += (35*m); noteCount+=1;
      }
      if (y > (d4y*m) -(1 * 4) && y < (c4y *m)-(1 * 4)) {
        if (currentNote[1] == 'D4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,d4y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(22)); xStart += (35*m); noteCount+=1;
      }
      if (y > (c4y*m) -(1 * 4) && y < (b3y *m)-(1 * 4)) {
        if (currentNote[1] == 'C4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawLedgerLine(xStart + (r*1.5),c4y*m,r*3); 
        drawQuarterNoteUp(xStart,c4y *m,r,rm, noteColor);
        playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(21))
        noteCount+=1;  
        xStart += (35*m);
      }
      if (y > (b3y*m) -(1 * 4) && y < (a3y *m)-(1 * 4)) {
        if (currentNote[1] == 'B3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,b3y *m,r,rm, noteColor);
        playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(20))
        noteCount+=1;  
        xStart += (35*m);
      }
      if (y > (a3y*m) -(1 * 4) && y < (g3y *m)-(1 * 4)) {
        if (currentNote[1] == 'A3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawLedgerLine(xStart + (r*1.5),a3y*m,r*3); 
        drawQuarterNoteUp(xStart,a3y *m,r,rm, noteColor);
        playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(19))
        noteCount+=1;  
        xStart += (35*m);
      }
      if (y > (g3y*m) -(1 * 4) && y < (f3y *m)-(1 * 4)) {
        if (currentNote[1] == 'G3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,g3y *m,r,rm, noteColor);
        playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(18))
        noteCount+=1;  
        xStart += (35*m);
      }
      if (y > (f3y*m) -(1 * 4) && y < (e3y *m)-(1 * 4)) {
        if (currentNote[1] == 'F3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawLedgerLine(xStart + (r*1.5),f3y*m,r*3); 
        drawQuarterNoteUp(xStart,f3y *m,r,rm, noteColor);
        playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(17))
        noteCount+=1;  
        xStart += (35*m);
      }
    }

    if (y > (e3y*m) -(1 * 4) && y < (e3y*m) + (1 * 4)) {
      if (currentNote[1] == 'E3') { noteColor = 'green'}
      else {
        noteColor = 'red'
        setTimeout(() => {
          drawCorrectNote(currentNote)
        }, 450)
      }
      drawQuarterNoteUp(xStart,e3y *m,r,rm, noteColor);
      playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(16))
      noteCount+=1;  
      xStart += (35*m);
    }
  }
  //console.log(x/2,y/2)
 // console.log(composition) 
});


function reset() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawStaff(10,e4y,g4y,b4y,d5y,f5y,m,340)
  drawBarLine(10,262,200)
  drawBarLine(340,262,200)
  xStart = 170;
  drawLedgerLine(xStart + (r*1.5),c4y*m,r*3);
  drawLedgerLine(xStart + (r*1.5),a3y*m,r*3);
  drawLedgerLine(xStart + (r*1.5),f3y*m,r*3);
  noteCount = 0;
  composition = []
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const audioList = document.querySelectorAll('.audioList');

function chooseRandomNote(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  let randomNote = array[randomIndex]
  return randomNote
}


function playSound(array,num) {
  // const audioList = Array.from(document.querySelectorAll('.audioList'));
  // const audioList = Array.from(document.getElementsByClassName('audioList'));
  // console.log(audioList)
  playerTurn = false
  const Audio1 = array[num];
  composition.push(Audio1);
  
  console.log(Audio1);

  Audio1.loop=false
  Audio1.volume = .1;
  Audio1.play();

  setTimeout(() => {
    playerTurn = true
  }, 1300)
};

function playNote(note) {
  playerTurn = false
  note.loop = false
  note.volume = .1;
  note.play()
  setTimeout(() => {
    playerTurn = true
  }, 1300)
}


function playCompositionNote(array,num) {
  // const audioList = Array.from(document.querySelectorAll('.audioList'));
  // const audioList = Array.from(document.getElementsByClassName('audioList'));
  // console.log(audioList)
  const Audio1 = array[num];
  Audio1.loop=false
  Audio1.volume = .1;
  Audio1.play();
};

let dura

function playComp(array) {
  for (let i = 0; i<array.length; i++) {
      setTimeout(function() {
        playCompositionNote(array, i);
          console.log(array[i]);
          dura = array[i].duration
          console.log(dura)
      }, i * 1300)
  }  
}

const randomNote = document.querySelector('#randomNote');
randomNote.addEventListener('click', (e) => {
  if (playerTurn == true) {
    reset()
    currentNote = chooseRandomFrequency(16, 16, getFrequencyMajorHectatonic)
    //currentNote = getFrequencyMajorHectatonic(32)
    //console.log(currentNote)
    //console.log(currentNote[1])
    playOsc(osc1, "triangle", .1, 2, currentNote)
    document.querySelector('#note').textContent = currentNote[1]
  }
})

document.addEventListener('touchend', (e) => {
  randomNote.style.opacity = 1
})



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getFrequencyMajorHectatonic(num) {
  let noteNum;
  let note;
  let freq;
  if (num <= 6) {
    noteNum = num;
  }
  else {
    noteNum = (num % 7);
  }

  switch(noteNum) {
    case 0:
      freq = 32.70320// 261.63;
      note = "C";
      break;
    case 1:
      freq = 36.70810 //293.66;
      note = "D"
      break;
    case 2:
      freq = 41.20344 //329.62;
      note = "E"
      break;
    case 3:
      freq = 43.65353 // 349.23;
      note = "F"
      break;
    case 4:
      freq = 48.99943		//392;
      note = "G"
      break;
    case 5:
      freq = 55.00000;
      note = "A"
      break;
    case 6:
      freq = 61.73541;
      note = "B"
      break;
  }

  let multiplier = 1
  if (num > 7) {
    multiplier = Math.floor(num /7);

    if (multiplier < 2) {
      note = note + (multiplier + 1)  
      freq *= 2   
    }
    else {
      for (let i = 0; i < multiplier; i++) {
        freq *= 2
      }
      note = note + (multiplier + 1)
    }
  }
  else {
    note = note + (multiplier)
  }

  
  //console.log("final freq: " + freq)
  //console.log("note name: " + note)
  return [freq, note];
}

function chooseRandomFrequency(min, size, callback) {
  let randomIndex = Math.floor(Math.random() * size) + min;
  return callback(randomIndex); 
}



function playOsc(osc, type, gain, sustain, freq) {
  let stopTime = Number(.4)
  let oscGain = audioCtx.createGain();
  oscGain.gain.value = .2;
  osc = audioCtx.createOscillator();
  osc.type =  "sine"// type//"sawtooth" //"square";
  osc.frequency.setValueAtTime(freq[0], audioCtx.currentTime);
  osc.connect(oscGain).connect(audioCtx.destination);
  osc.start(audioCtx.currentTime)
  stopTime += .25
  oscGain.gain.setTargetAtTime(0, audioCtx.currentTime + stopTime - 0.25, .025);
  osc.stop(audioCtx.currentTime + stopTime)
  //osc.disconnect(audioCtx.destination)
}


