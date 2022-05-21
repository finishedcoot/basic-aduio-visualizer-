const audioCtx = new AudioContext();

const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
const file = document.getElementById("fileupload");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let audioSource;
let analyser;

/**
 * Loading the audio file with "new Audio()"
 */

// let audio1 = new Audio();
// audio1.src = "cday.mp3";

// container.addEventListener("click", function () {
//   audio1.play();
//   audioSource = audioCtx.createMediaElementSource(audio1);
//   analyser = audioCtx.createAnalyser();
//   audioSource.connect(analyser);
//   analyser.connect(audioCtx.destination);
//   analyser.fftSize = 64;
//   const bufferLength = analyser.frequencyBinCount;
//   const dataArray = new Uint8Array(bufferLength);
//   const barWidth = canvas.width / bufferLength;
//   let barHeight;
//   let x = 0;

//   function animate() {
//     x = 0;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     analyser.getByteFrequencyData(dataArray);
//     for (let i = 0; i < bufferLength; i++) {
//       barHeight = dataArray[i];
//       ctx.fillStyle = "white";
//       ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//       x += barWidth;
//     }
//     requestAnimationFrame(animate);
//   }
//   animate();
// });

/**
 * Loading the audio file through input element
 */

file.addEventListener("change", function () {
  const files = this.files;
  console.log(this.files);
  const audio1 = document.getElementById("audio1");
  audio1.src = URL.createObjectURL(files[0]);
  audio1.load();
  audio1.play();
  audioSource = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 1024;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = canvas.width / 2 / bufferLength;
  let barHeight;
  let x = 0;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

/**
 * Function to draw the visualiser on canvas
 */

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  /**
   * Linear visualiser
   */
  //   for (let i = 0; i < bufferLength; i++) {
  //     barHeight = dataArray[i];
  //     const red = (i * barHeight) / 20;
  //     const green = i * 4;
  //     const blue = barHeight / 2;
  //     ctx.fillStyle = `rgb(${red},${green},${blue})`;
  //     ctx.fillRect(
  //       canvas.width / 2 - x,
  //       canvas.height - barHeight,
  //       barWidth,
  //       barHeight
  //     );
  //     x += barWidth;
  //   }

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((i * (Math.PI * 2)) / bufferLength);
    // const red = (i * barHeight) / 20;
    // const green = i * 4;
    // const blue = barHeight / 2;
    // ctx.fillStyle = `rgb(${red},${green},${blue})`;

    const hue = i;
    ctx.fillStyle = `hsl(${hue},100%,50%)`;
    ctx.fillRect(0, 0, barWidth, barHeight);
    x += barWidth;
    ctx.restore();
  }
}
