function Kho10x10() {
  const audioClick = new Audio("../../../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./KHo/10x10Robot.html");
  };
}

function Easy10x10() {
  const audioClick = new Audio("../../../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./De/Easy_10x10.html");
  };
}

document.getElementById("btn_back").onclick = function () {
  const audioClick = new Audio("../../../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("../../TheLoaiGameRobot.html");
  };
};
