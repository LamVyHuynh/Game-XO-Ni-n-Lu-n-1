function Easy6x6() {
  const audioClick = new Audio("../../../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./CapEasy/easy_6x6.html");
  };
}

function Kho6x6() {
  const audioClick = new Audio("../../../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./CapKho/6x6Robot.html");
  };
}

document.getElementById("btn_back").onclick = function () {
  const audioClick = new Audio("../../../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("../../TheLoaiGameRobot.html");
  };
};
