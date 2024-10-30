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
  location.assign("../TheLoaiGameRobot.html");
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

//   BẮT ĐẦU THAO TÁC ĐÁNH XO
function DanhXO(i, j) {
  if (gameEnded || array[i][j] !== "") return; // Không cho phép đi lại vào ô đã đánh hoặc trò chơi đã kết thúc
  array[i][j] = "X"; // Gán cho array có giá trị của isPlayer1 = true thì nó đánh X còn false thì nó sẽ đánh là O
  display(); // Cập nhật giao diện bàn cờ
  XacNhanTinhTrang(i, j);
  if (!gameEnded) {
    isPlayer1 = !isPlayer1; // không có 2 trường hợp trên thì isPlayer1 sẽ chuyển thành false và Nước O sẽ đi
    document.getElementById(
      "who_next"
    ).innerHTML = `<span style="color:red;font-weight: 700">O</span>`;
    setTimeout(MayDanhXO, 300); // cho máy đánh khi trò chơi chưa kết thúc
  }
}
//   KẾT THÚC THAO TÁC ĐÁNH XO

// BẮT ĐẦU HÀM MÁY ĐÁNH
function MayDanhXO() {
  if (gameEnded) return;
  // Ban đầu O điểm cao nhất là âm vô cực để khi tìm nó sẽ tìm đường tốt hơn
  let diemCaoNhat = -Infinity;
  let nuocDiTotNhat;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (array[i][j] === "") {
        array[i][j] = "O"; // Giả lập nước đi
        if (array[i][j] === "O") {
          document.getElementById(
            "who_next"
          ).innerHTML = `<span style="color:blue;font-weight: 700">X</span>`;
        }
        // Trả về số điểm là 1 - O thắng, -1 là X thắng còn O là hoà
        let diem = alphaBeta(array, 0, false, -Infinity, Infinity);
        // Nếu không khôi phục thì những nước đi giả định sẽ hiện lên bàn cờ
        array[i][j] = "";

        if (diem > diemCaoNhat) {
          diemCaoNhat = diem; // Gán điểm
          nuocDiTotNhat = { i, j }; // Cập nhật lại vị trí tốt nhất
        }
      }
    }
  }

  if (nuocDiTotNhat) {
    // Reset lại mảng arrayWin trước khi máy thực sự đánh để không bị tô màu background của ô
    arrayWin = [];
    array[nuocDiTotNhat.i][nuocDiTotNhat.j] = "O"; // Máy đánh
    display(); // Cập nhật giao diện
    XacNhanTinhTrang(nuocDiTotNhat.i, nuocDiTotNhat.j); // Kiểm tra tình trạng thắng
    isPlayer1 = !isPlayer1; // Chuyển lượt
  }
}

// KẾT THÚC HÀM MÁY ĐÁNH

// BẮT ĐẦU HÀM Alpha-beta
function alphaBeta(board, doSau, isMaximizing, alpha, beta) {
  if (kiemTraThang("O")) return 1; // Máy thắng
  if (kiemTraThang("X")) return -1; // Người chơi thắng
  if (kiemTraDay()) return 0; // Hòa
  // Giới hạn độ sâu giúp xử lí nhanh hơn
  if (doSau >= 1) {
    return 0; // Không còn nước đi nào hết thì sẽ trả về hoà
  }
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = "O"; // Giả lập nước đi
          let eval = alphaBeta(board, doSau + 1, false, alpha, beta);
          // Nếu không khôi phục thì những nước đi giả định sẽ hiện lên bàn cờ
          board[i][j] = "";
          // gán giá trị lớn nhất cho maxEval để lưu lại những lần sau sẽ so sánh với eval nữa
          // giá trị lớn nhất có thể đạt được hợp
          maxEval = Math.max(maxEval, eval);
          // tìm giá trị lớn nhất và gán cho alpha, ngưỡng giá trị lớn nhất
          alpha = Math.max(alpha, eval);
          if (beta <= alpha) break; // Cắt tỉa
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = "X"; // Giả lập nước đi
          // eval sẽ trả về trạng thái trò chơi nếu O thắng thì sẽ là 1,
          // X thắng thì sẽ là -1, Còn hoà thì sẽ là 0
          let eval = alphaBeta(board, doSau + 1, true, alpha, beta);
          // Ban đầu sẽ cho nước đi giả lập trên tất cả các nước đi của bàn cờ nếu bỏ thì nó sẽ hiện hết tất cả nước đi giả lập đó
          board[i][j] = "";
          // gán giá trị nhỏ nhất cho minEval để lưu lại những lần sau sẽ so sánh với eval nữa
          minEval = Math.min(minEval, eval);
          // tìm giá trị nhỏ nhất và gán cho beta
          beta = Math.min(beta, eval);

          if (beta <= alpha) break; // Cắt tỉa
        }
      }
    }
    return minEval;
  }
}
// KẾT THÚC HÀM Alpha-beta

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
    }, 500);
    display();
    gameEnded = true;
  } else if (kiemTraDay()) {
    document.getElementById("gamestatus").innerHTML = "Hòa nhau!";
    setTimeout(() => {
      ShowBox.style.display = "block";
    }, 500);
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
