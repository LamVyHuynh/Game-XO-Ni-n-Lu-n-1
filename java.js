function ChangePage() {
  const audioClick = new Audio("./audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./ChonLoaiTroChoi/ChooseGameStyle.html");
  };
}
