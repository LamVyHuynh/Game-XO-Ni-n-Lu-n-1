document.getElementById("game3x3").onclick = function () {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./3x3/Phan_Cap_Do_Kho_Game_3X3/phanCapGame.html");
  };
};

document.getElementById("game6x6").onclick = function () {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("./6x6/Phan_Cap_Do_Kho_Game_6X6/phanCapGame.html");
  };
};

document.getElementById("game10x10").onclick = function () {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign(
      "./10x10/Phan_Cap_Do_Kho_Game_10x10/phanCapGame.html"
    );
  };
};

document.getElementById("btn_back").onclick = function () {
  const audioClick = new Audio("../audio/clickbutton.mp3");
  audioClick.play();
  audioClick.onended = function () {
    window.location.assign("../ChonLoaiTroChoi/ChooseGameStyle.html");
  };
};
