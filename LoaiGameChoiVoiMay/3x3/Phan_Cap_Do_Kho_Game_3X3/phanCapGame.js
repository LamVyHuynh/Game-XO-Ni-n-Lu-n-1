function Easy3x3() {
  const audioClick = new Audio("../../../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./capEasy/easy_3x3.html");
  };
}

function Kho3x3() {
  const audioClick = new Audio("../../../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./CapKho/3x3Robot.html");
  };
}

document.getElementById("btn_back").onclick = function () {
  const audioClick = new Audio("../../../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("../../TheLoaiGameRobot.html");
  };
};
