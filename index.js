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
  ctx.fillRect(sx + (r/1.8),sy-(r*5.1),4 * rm,55 * rm)
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



function drawStaff(x,ey,gy,by,dy,fy, m, length) {
  ctx.beginPath(x,ey*m);
  ctx.moveTo(x,ey*m);
  ctx.lineTo(length, ey*m);
  ctx.stroke();

  ctx.moveTo(x,gy *m);
  ctx.lineTo(length, (gy*m));
  ctx.stroke();

  ctx.moveTo(x, by *m );
  ctx.lineTo(length,(by*m));
  ctx.stroke();

  ctx.moveTo(x,dy *m);
  ctx.lineTo(length,(dy*m));
  ctx.stroke();

  ctx.moveTo(x,fy *m);
  ctx.lineTo(length,(fy*m));
  ctx.stroke();

  
  trebleClef.addEventListener(
    "load",
    () => {
      ctx.drawImage(trebleClef,-50, 10, 200, 310) 
    },
    false
  )

  ctx.drawImage(trebleClef,-50, 10, 200, 310) 
   
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function drawCorrectNote(note) {
  console.log("draw correct note function: " + note[1])
  switch(note[1]) {
    case 'G4':
      drawQuarterNoteDown(xStart,g2y *m,r,rm, 'green');
      break;
    case 'F4':
      drawQuarterNoteDown(xStart,fy *m,r,rm, 'green'); 
      break;
    case 'E4':
      drawQuarterNoteDown(xStart,e2y *m,r,rm, 'green'); 
      break;
    case 'D4':
      drawQuarterNoteDown(xStart,dy *m,r,rm, 'green'); 
      break;
    case 'C4':
      drawQuarterNoteDown(xStart,cy *m,r,rm, 'green'); 
      break;
    case 'B3':
      drawQuarterNoteDown(xStart,by *m,r,rm, 'green'); 
      break;
    case 'A3':
      drawQuarterNoteUp(xStart,ay *m,r,rm, 'green');
      break;
    case 'G3':
      drawQuarterNoteUp(xStart,gy *m,r,rm, 'green'); 
      break;
    case 'F3':
      drawQuarterNoteUp(xStart,f2y *m,r,rm, 'green'); 
      break;
    case 'E3':
      drawQuarterNoteUp(xStart,ey *m,r,rm, 'green'); 
      break;
    case 'D3':
      drawQuarterNoteUp(xStart,d2y *m,r,rm, 'green');;
      break;
    case 'C3':
      drawLedgerLine(xStart + (r*1.5),c2y*m,r*3);
      drawQuarterNoteUp(xStart,c2y *m,r,rm, 'green');
      break;
  }

  playOsc(osc1, "triangle", .1, 2, note)
}



let playerTurn = true
let currentNote
const fy = 30;
const dy = 50;
const by = 70;
const gy = 90;
const ey = 110;

const g2y = 20;
const e2y = 40;
const cy = 60;
const ay = 80;
const f2y = 100;
const d2y = 120;
const c2y = 130;
const b2y = 140;
const a2y = 150;

const m = 2;
let x
let y
const r = 20;
const rm = 2;

let xStart = 170;
let noteCount = 0
let composition = []

drawStaff(20,ey,gy,by,dy,fy,m,280)
drawBarLine(20,220,160)
drawBarLine(280,220,160)
drawLedgerLine(xStart + (r*1.5),c2y*m,r*3);

canvas.addEventListener('click', (e) => {
  x = e.clientX - canvas.offsetLeft;
  y = e.clientY - canvas.offsetTop;
  let noteColor
  if (noteCount < 1 &&  currentNote != undefined){
    if (y > (g2y*m) - (5*m) && y < (ay * m) - (5*m)){
      if (y > (g2y*m) -(5*m) && y < (fy *m)-(5*m)) {
        if (currentNote[1] == 'G4') { 
          noteColor = 'green'
        }
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,g2y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 11)); xStart += (23.5*m); noteCount+=1;
      }
      if (y > (fy*m) -(5*m) && y < (e2y *m)-(5*m)) {
        if (currentNote[1] == 'F4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,fy *m,r,rm, noteColor);playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 10)); xStart += (23.5*m); noteCount+=1;  
      }
      if (y > (e2y*m) -(5*m) && y < (dy *m)-(5*m)) {
        if (currentNote[1] == 'E4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,e2y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 9)); xStart += (23.5*m); noteCount+=1;
      }
      if (y > (dy*m) -(5*m) && y < (cy *m)-(5*m)) {
        if (currentNote[1] == 'D4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,dy *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 8)); xStart += (23.5*m); noteCount+=1;
      }
      if (y > (cy*m) -(5*m) && y < (by *m)-(5*m)) {
        if (currentNote[1] == 'C4') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,cy *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 7)); xStart += (23.5*m); noteCount+=1;
      }
      if (y > (by*m) -(5*m) && y < (ay *m)-(5*m)) {
        if (currentNote[1] == 'B3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteDown(xStart,by *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 6)); xStart += (23.5*m); noteCount+=1;
      }
    }
    else if (y > (ay *m) - (5*m) && y < (a2y*m) - (5*m)) {
      if (y > (ay*m) -(5*m) && y < (gy *m)-(5*m)) {
        if (currentNote[1] == 'A3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,ay *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 5)); xStart += (23.5*m); noteCount+=1;
      }
      if (y > (gy*m) -(5*m) && y < (f2y *m)-(5*m)) {
        if (currentNote[1] == 'G3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,gy *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 4)); xStart += (23.5*m); noteCount+=1;
      }
      if (y > (f2y*m) -(5*m) && y < (ey *m)-(5*m)) {
        if (currentNote[1] == 'F3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,f2y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 3)); xStart += (23.5*m); noteCount+=1;
      }
      if (y > (ey*m) -(5*m) && y < (d2y *m)-(5*m)) {
        if (currentNote[1] == 'E3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,ey *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 2)); xStart += (23.5*m); noteCount+=1;
      }
      if (y > (d2y*m) -(5*m) && y < (c2y *m)-(5*m)) {
        if (currentNote[1] == 'D3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawQuarterNoteUp(xStart,d2y *m,r,rm, noteColor); playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14 + 1)); xStart += (23.5*m); noteCount+=1;
      }
      if (y > (c2y*m) -(5*m) && y < (b2y *m)-(5*m)) {
        if (currentNote[1] == 'C3') { noteColor = 'green'}
        else {
          noteColor = 'red'
          setTimeout(() => {
            drawCorrectNote(currentNote)
          }, 450)
        }
        drawLedgerLine(xStart + (r*1.5),c2y*m,r*3); 
        drawQuarterNoteUp(xStart,c2y *m,r,rm, noteColor);
        playOsc(osc1, "triangle", .1, 2, getFrequencyMajorHectatonic(14))
        noteCount+=1;  
        xStart += (23.5*m);
      }
    }
  }
  //console.log(x/2,y/2)
 // console.log(composition) 
});


function reset() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawStaff(20,ey,gy,by,dy,fy,m,280)
  drawBarLine(20,220,160)
  drawBarLine(280,220,160)  
  xStart = 170;
  drawLedgerLine(xStart + (r*1.5),c2y*m,r*3);
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
    currentNote = chooseRandomFrequency(14, 12, getFrequencyMajorHectatonic)
    //currentNote = getFrequencyMajorHectatonic(21)
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
 console.log(note)
  
  //console.log("final freq: " + freq)
  //console.log("note name: " + note)
  return [freq, note];
}

function chooseRandomFrequency(min, size, callback) {
  let randomIndex = Math.floor(Math.random() * size) + min;
  return callback(randomIndex); 
}



function playOsc(osc, type, gain, sustain, freq) {
  console.log(freq[1])
  let stopTime = Number(.5)
  let oscGain = audioCtx.createGain();
  oscGain.gain.value = .5;
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


/** 
chooseRandomFrequency(14, 12, getFrequencyMajorHectatonic)
chooseRandomFrequency(14, 12, getFrequencyMajorHectatonic)
chooseRandomFrequency(14, 12, getFrequencyMajorHectatonic)
chooseRandomFrequency(14, 12, getFrequencyMajorHectatonic)
chooseRandomFrequency(14, 12, getFrequencyMajorHectatonic)
chooseRandomFrequency(14, 12, getFrequencyMajorHectatonic)



playOsc(osc1, "triangle", .1, 2, chooseRandomFrequency(14, 12, getFrequencyMajorHectatonic))
playOsc(osc1, "triangle", .1, 2, chooseRandomFrequency(14, 12, getFrequencyMajorHectatonic))
*/