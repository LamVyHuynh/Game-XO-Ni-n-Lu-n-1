document.getElementById("game3x3").onclick = function () {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./3X3/3X3.html");
  };
};

document.getElementById("game6x6").onclick = function () {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./6X6/6X6.html");
  };
};

document.getElementById("game10x10").onclick = function () {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./10X10/10X10.html");
  };
};

document.getElementById("btn_back").onclick = function () {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("../ChonLoaiTroChoi/ChooseGameStyle.html");
  };
};
