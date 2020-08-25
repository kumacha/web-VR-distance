let obniz = new Obniz("obniz_id");
let connected = false;

let audio = new Audio("audio/test.mp3");
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

  const keikoku = document.getElementById("target1");
  sensor.onchange = async (val) => {
    console.log(val ? "Moving!" : "Stopped");
    if (val) {
      //   speaker.play(1000); // ブザーを鳴らす　1000hz
      audio.play();
      matrix.draw(ctx);
      keikoku.object3D.position.z -= 1;
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
