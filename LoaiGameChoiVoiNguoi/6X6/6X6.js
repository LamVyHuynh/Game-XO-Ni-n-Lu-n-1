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
// KẾT THÚC TRỞ VỀ THỂ LOẠI

// BẮT ĐẦU TRỞ VỀ TRANG CHỦ
function Home() {
  window.location.assign("../../index.html");
}
// KẾT THÚC TRỞ VỀ TRANG CHỦ

//   BẮT ĐẦU: RESET TRÒ CHƠI
function reset() {
  // Khi làm ván mới thì các giá trị đã đánh sẽ trống
  isPlayer1 = true;
  gameEnded = false;
  document.getElementById("gamestatus").innerHTML = "";
  arrayWin = [];
  for (let i = 0; i < 6; i++) {
    array[i] = new Array(10);
    for (let j = 0; j < 6; j++) {
      array[i][j] = "";
    }
  }
  display();
  document.getElementById(
    "who_next"
  ).innerHTML = `<span style="color:blue; font-weight: 700">X</span>`;
  ShowBox.style.display = "none";
}
// KẾT THÚC: RESET TRÒ CHƠI
//BẮT ĐẦU: Code tạo bảng để đánh XO
function display() {
  let tableString = `<table>`;
  for (let i = 0; i < 6; i++) {
    tableString += `<tr>`;
    for (let j = 0; j < 6; j++) {
      if (arrayWin.includes(`${i} - ${j}`)) {
        if (array[i][j] === "X") {
          tableString += `<td style="color: blue; background-color: lightgreen" onclick="DanhXO(${i}, ${j})"> ${array[i][j]}</td>`;
        } else if (array[i][j] === "O") {
          tableString += `<td style="color: red; background-color:lightgreen" onclick="DanhXO(${i}, ${j})"> ${array[i][j]}</td>`;
        } else {
          tableString += `<td onclick="DanhXO(${i}, ${j})"> ${array[i][j]}</td>`;
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
  } else {
    document.getElementById(
      "who_next"
    ).innerHTML = `<span style="color:blue; font-weight: 700">X</span>`;
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
    } `;
    setTimeout(() => {
      ShowBox.style.display = "block";
    }, 300);
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
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (i + 4 < 6) {
        // Dòng điều kiện này đảm bảo là sẽ có đủ 5 ô liên tiếp để chiến thắng
        if (
          array[i][j] === value &&
          array[i + 1][j] === value &&
          array[i + 2][j] === value &&
          array[i + 3][j] === value &&
          array[i + 4][j] === value
        ) {
          for (let m = 0; m < 5; m++) {
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
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (j + 4 < 6) {
        if (
          array[i][j] === value &&
          array[i][j + 1] === value &&
          array[i][j + 2] === value &&
          array[i][j + 3] === value &&
          array[i][j + 4] === value
        ) {
          for (let m = 0; m < 5; m++) {
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
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (i + 4 < 6 && j + 4 < 6) {
        if (
          array[i][j] === value &&
          array[i + 1][j + 1] === value &&
          array[i + 2][j + 2] === value &&
          array[i + 3][j + 3] === value &&
          array[i + 4][j + 4] === value
        ) {
          for (let m = 0; m < 5; m++) {
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
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (i + 4 < 6 && j - 4 >= 0) {
        if (
          array[i][j] === value &&
          array[i + 1][j - 1] === value &&
          array[i + 2][j - 2] === value &&
          array[i + 3][j - 3] === value &&
          array[i + 4][j - 4] === value
        ) {
          for (let m = 0; m < 5; m++) {
            arrayWin.push(`${i + m} - ${j - m}`);
          }
          return true;
        }
      }
    }
  }
  return false;
}

function kiemTraDay() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (array[i][j] === "") {
        return false;
      }
    }
  }
  return true;
}
