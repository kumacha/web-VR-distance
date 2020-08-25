let obniz = new Obniz("obniz_id");
let connected = false;

let audio1 = new Audio("audio/otukaresu.mp3");
let audio2 = new Audio("audio/sanmitu.mp3");
let audio3 = new Audio("audio/social.mp3");
let audio4 = new Audio("audio/sugoine.mp3");
let audio5 = new Audio("audio/test.mp3");

obniz.onconnect = async function () {
  obniz.display.clear();
  obniz.display.print("Hello obniz!");
  connected = true;
  obniz.display.clear();
  obniz.display.print("Hello obniz!!!!!");
  const sensor = obniz.wired("Keyestudio_PIR", {
    signal: 0,
    vcc: 1,
    gnd: 2,
  });
  //   const speaker = obniz.wired("Keyestudio_Buzzer", {
  //     signal: 8,
  //     vcc: 9,
  //     gnd: 10,
  //   });
  const matrix = obniz.wired("MatrixLED_HT16K33", {
    gnd: 8,
    vcc: 9,
    sda: 10,
    scl: 11,
  });
  matrix.init(8);
  matrix.brightness(7);
  const ctx = obniz.util.createCanvasContext(matrix.width, matrix.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, matrix.width, matrix.height);
  ctx.fillStyle = "white";
  ctx.font = "9px sans-serif";
  ctx.fillText("✕", 0, 7);

  const cty = obniz.util.createCanvasContext(matrix.width, matrix.height);
  cty.fillStyle = "black";
  cty.fillRect(0, 0, matrix.width, matrix.height);
  cty.fillStyle = "white";
  cty.font = "7px sans-serif";
  cty.fillText("◎", 0, 7);
  let risk = 0;
  let targetNumber = 7;
  sensor.onchange = async (val) => {
    console.log(val ? "Moving!" : "Stopped");
    if (val) {
      //   speaker.play(1000); // ブザーを鳴らす　1000hz
      const audioNumber = Math.floor(Math.random() * Math.floor(5) + 1);
      if (audioNumber == 1) {
        audio1.play();
      }
      if (audioNumber == 2) {
        audio2.play();
      }
      if (audioNumber == 3) {
        audio3.play();
      }
      if (audioNumber == 4) {
        audio4.play();
      }
      if (audioNumber == 5) {
        audio5.play();
      }
      matrix.draw(ctx);
      risk += 10;
      console.log(risk);
      let newDiv = document.createElement("div");
      newDiv.setAttribute("id", "target" + targetNumber);
      newDiv.classList.add("target");
      let newP = document.createElement("p");
      newP.innerText = "危険度は" + risk + "%です";

      const keikoku = document.getElementById("addList");
      newP.classList.add("detail");
      keikoku.appendChild(newDiv);
      newDiv.appendChild(newP);
      const frame = document.getElementById("aframeApp");
      let newBox = document.createElement("a-box");
      let positionX = Math.ceil(Math.random() * 25) - 18;
      let positionY = Math.ceil(Math.random() * 12) - 6;
      let positionZ = Math.ceil(Math.random() * 45) - 15;
      let positionXYZ = positionX + " " + positionY + " " + positionZ;
      let rotationX = 0;
      let rotationY = Math.floor(Math.random() * 75) + 15;
      let rotationZ = 0;
      let rotationXYZ = rotationX + " " + rotationY + " " + rotationZ;
      console.log(positionXYZ);
      newBox.setAttribute("id", "areabox" + targetNumber);
      newBox.setAttribute("width", 16);
      newBox.setAttribute("height", 10);
      newBox.setAttribute("position", positionXYZ);
      newBox.setAttribute(
        "material",
        "shader:html;target: #target" + targetNumber + ";"
      );
      newBox.setAttribute("rotation", rotationXYZ);
      frame.appendChild(newBox);
      targetNumber++;
    } else {
      //   speaker.stop(); // ブザーを止める
      matrix.draw(cty);
    }
  };
};
obniz.onclese = async function () {
  connected = false;
};

async function handlerClick(event) {
  console.log("handlerClick");
  console.log(event);
  event.target.object3D.position.z += 0.5;

  if (connected) {
    obniz.display.clear();
    obniz.display.print("3D A-Frame");
    obniz.display.print("　↑↓");
    obniz.display.print("obniz");
  }
}

obniz.display.clear(); // 一旦クリアする
