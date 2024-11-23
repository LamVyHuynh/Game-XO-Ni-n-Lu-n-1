function ChooseGamePeople() {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("../LoaiGameChoiVoiNguoi/TheLoaiGame.html");
  };
}

function ChooseGameRobot() {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("../LoaiGameChoiVoiMay/TheLoaiGameRobot.html");
  };
}

function Home() {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("../index.html");
  };
}
