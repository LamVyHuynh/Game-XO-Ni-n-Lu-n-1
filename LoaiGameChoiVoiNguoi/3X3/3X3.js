let array = new Array(10);
let isPlayer1 = true;
// Tạo mảng lưu giá trị Win
let arrayWin = [];
let gameEnded = false;
let ShowBox = document.getElementById("show_status");

// Sẽ thực hiện tải trang lên với hàm có reset bên trong khi tải trang lên thì hàm reset được gọi và reset lại tất cả có bảng
// đánh bên trong nên dô không cần reset mà dô chỉ cần chơi mà thoi
window.onload = function () {
  reset();
};
// BẮT ĐẦU TRỞ VỀ THỂ LOẠI

function TheLoai() {
  location.assign("../TheLoaiGame.html");
}

function Home() {
  window.location.assign("../../index.html");
}
// KẾT THÚC TRỞ VỀ THỂ LOẠI

// KẾT THÚC: TRÒ CHƠI BẮT ĐẦU
//   BẮT ĐẦU: RESET TRÒ CHƠI
function reset() {
  // Khi làm ván mới thì các giá trị đã đánh sẽ trống
  isPlayer1 = true;
  gameEnded = false;
  arrayWin = [];
  document.getElementById("gamestatus").innerHTML = "";
  for (let i = 0; i < 3; i++) {
    array[i] = new Array(10);
    for (let j = 0; j < 3; j++) {
      array[i][j] = "";
    }
  }
  display(); // Cập nhật lại tình trạng của bàn cờ đều trống rỗng
  document.getElementById(
    "who_next"
  ).innerHTML = `<span style="color:blue; font-weight: 700">X</span>`; // khi reset sẽ hiện lại lượt tiếp theo đi là X
  ShowBox.style.display = "none";
  let audioWin = document.getElementById("audioWin");
  audioWin.pause(); // Dừng âm thanh
  audioWin.currentTime = 0; // Đặt lại thời gian phát về 0
}

// KẾT THÚC: RESET TRÒ CHƠI
//BẮT ĐẦU: Code tạo bảng để đánh XO
function display() {
  let tableString = `<table>`;
  for (let i = 0; i < 3; i++) {
    tableString += `<tr>`;
    for (let j = 0; j < 3; j++) {
      if (arrayWin.includes(`${i} - ${j}`)) {
        if (array[i][j] === "X") {
          tableString += `<td style="color: blue; background-color: lightgreen" onclick="DanhXO(${i}, ${j})"> ${array[i][j]}</td>`;
        } else if (array[i][j] === "O") {
          tableString += `<td style="color: red; background-color:lightgreen" onclick="DanhXO(${i}, ${j})"> ${array[i][j]}</td>`;
        } else {
          tableString += `<td onclick="DanhXO(${i}, ${j})"> ${array[i][j]}</td>`; // Không bằng X hoặc O thì đánh vào ô
        }
      } else {
        if (array[i][j] === "X") {
          tableString += `<td style="color: blue" onclick="DanhXO(${i}, ${j})"> ${array[i][j]}</td>`;
        } else if (array[i][j] === "O") {
          tableString += `<td style="color: red" onclick="DanhXO(${i}, ${j})"> ${array[i][j]}</td>`;
        } else {
          tableString += `<td onclick="DanhXO(${i}, ${j})"> ${array[i][j]}</td>`;
        }
      }
    }
    tableString += `</tr>`;
  }
  tableString += `</table>`;
  document.getElementById("result").innerHTML = tableString;
}
//KẾT THÚC: Code tạo bảng để đánh XO
//   BẮT ĐẦU THAO TÁC BẤM XO
function DanhXO(i, j) {
  if (gameEnded || array[i][j] !== "") return; // Không cho phép đi lại vào ô đã đánh hoặc trò chơi đã kết thúc
  array[i][j] = isPlayer1 ? "X" : "O"; // Gán cho array có giá trị của isPlayer1 = true thì nó đánh X còn false thì nó sẽ đánh là O
  if (array[i][j] === "X") {
    document.getElementById(
      "who_next"
    ).innerHTML = `<span style="color:red;font-weight: 700">O</span>`;
    let audio = document.getElementById("audioDanhCo");
    audio.currentTime = 0; // Đặt lại thời gian phát
    // Phát âm thanh và ngắt ngay sau khi đánh X
    audio.play();
  } else {
    document.getElementById(
      "who_next"
    ).innerHTML = `<span style="color:blue; font-weight: 700">X</span>`;
    let audio = document.getElementById("audioDanhCo");
    audio.currentTime = 0; // Đặt lại thời gian phát
    // Phát âm thanh và ngắt ngay sau khi đánh X
    audio.play();
  }
  display(); // Cập nhật giao diện bàn cờ
  XacNhanTinhTrang(i, j);
  isPlayer1 = !isPlayer1; // không có 2 trường hợp trên thì isPlayer1 sẽ chuyển thành false và Nước O sẽ đi
}
//   KẾT THÚC THAO TÁC BẤM XO

// BẮT ĐẦU XÁC NHẬN CHIẾN THẮNG
function XacNhanTinhTrang(i, j) {
  if (kiemTraThang(array[i][j])) {
    document.getElementById("gamestatus").innerHTML = `${
      isPlayer1
        ? `<div style="border-bottom: 2px solid blue; display: inline">Người chơi <span style="color: blue">X</span> thắng</div>`
        : `<div style="border-bottom: 2px solid red; display: inline">Người chơi <span style="color: red">O</span> thắng</div>`
    }`;
    setTimeout(() => {
      ShowBox.style.display = "block";
    }, 300);
    // Âm thanh chiến thắng
    let audio = document.getElementById("audioWin");
    audio.currentTime = 0; // Đặt lại thời gian phát
    // Phát âm thanh và ngắt ngay sau khi đánh X
    audio.play();
    display();
    gameEnded = true;
  } else if (kiemTraDay()) {
    document.getElementById("gamestatus").innerHTML = "Hòa nhau!";
    setTimeout(() => {
      ShowBox.style.display = "block";
    }, 300);
    gameEnded = true;
  }
}
// KẾT THÚC XÁC NHẬN CHIẾN THẮNG

// BẮT ĐẦU: KIỂM TRA CHIẾN THẮNG

function kiemTraThang(value) {
  return (
    kiemTraTrenXuong(value) ||
    kiemTraTraiPhai(value) ||
    kiemTraCheoTrai(value) ||
    kiemTraCheoPhai(value)
  );
}

function kiemTraTrenXuong(value) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i + 2 < 3) {
        // Đảm bảo 3 con liên
        if (
          array[i][j] === value &&
          array[i + 1][j] === value &&
          array[i + 2][j] === value
        ) {
          for (let m = 0; m < 3; m++) {
            arrayWin.push(`${i + m} - ${j}`);
          }
          return true;
        }
      }
    }
  }
  return false;
}

function kiemTraTraiPhai(value) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (j + 2 < 3) {
        if (
          array[i][j] === value &&
          array[i][j + 1] === value &&
          array[i][j + 2] === value
        ) {
          for (let m = 0; m < 3; m++) {
            arrayWin.push(`${i} - ${j + m}`);
          }
          return true;
        }
      }
    }
  }
  return false;
}

function kiemTraCheoTrai(value) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i + 2 < 3 && j + 2 < 3) {
        if (
          array[i][j] === value &&
          array[i + 1][j + 1] === value &&
          array[i + 2][j + 2] === value
        ) {
          for (let m = 0; m < 3; m++) {
            arrayWin.push(`${i + m} - ${j + m}`);
          }
          return true;
        }
      }
    }
  }
  return false;
}

function kiemTraCheoPhai(value) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i + 2 < 3 && j - 1 >= 0) {
        if (
          array[i][j] === value &&
          array[i + 1][j - 1] === value &&
          array[i + 2][j - 2] === value
        ) {
          for (let m = 0; m < 3; m++) {
            arrayWin.push(`${i + m} - ${j - m}`);
          }
          return true;
        }
      }
    }
  }
  return false;
}

// KIỂM TRA ĐẦY
function kiemTraDay() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (array[i][j] === "") {
        return false;
      }
    }
  }
  return true;
}
