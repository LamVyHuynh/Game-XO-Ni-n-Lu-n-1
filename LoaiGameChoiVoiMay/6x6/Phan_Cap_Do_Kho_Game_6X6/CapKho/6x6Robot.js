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
  location.assign("../../../TheLoaiGameRobot.html");
}
// KẾT THÚC TRỞ VỀ THỂ LOẠI

// BẮT ĐẦU TRỞ VỀ TRANG CHỦ
function Home() {
  window.location.assign("../../../../index.html");
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
  // tạm dừng âm thanh
  let audioWin = document.getElementById("audioWin");
  audioWin.pause(); // Dừng âm thanh
  audioWin.currentTime = 0; // Đặt lại thời gian phát về 0
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
  array[i][j] = "X"; // Gán cho array có giá trị của isPlayer1 = true thì nó đánh X còn false thì nó sẽ đánh là O
  let audio = document.getElementById("audioDanhCo");
  audio.currentTime = 0; // Đặt lại thời gian phát
  // Phát âm thanh và ngắt ngay sau khi đánh X
  audio.play();
  display(); // Cập nhật giao diện bàn cờ
  XacNhanTinhTrang(i, j);
  if (!gameEnded) {
    document.getElementById(
      "who_next"
    ).innerHTML = `<span style="color:red;font-weight: 700">O</span>`;
    isPlayer1 = !isPlayer1; // không có 2 trường hợp trên thì isPlayer1 sẽ chuyển thành false và Nước O sẽ đi
    setTimeout(MayDanhXO, 500); // cho máy đánh khi trò chơi chưa kết thúc
  }
}
//   KẾT THÚC THAO TÁC BẤM XO

// BẮT ĐẦU HÀM MÁY ĐÁNH
function MayDanhXO() {
  if (gameEnded) return;
  // Ban đầu O điểm cao nhất là âm vô cực để khi tìm nó sẽ tìm đường tốt hơn
  let diemCaoNhat = -Infinity;
  let nuocDiTotNhat = null;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (array[i][j] === "") {
        array[i][j] = "O"; // Giả lập nước đi
        let audio = document.getElementById("audioDanhCo");
        audio.currentTime = 0; // Đặt lại thời gian phát
        // Phát âm thanh và ngắt ngay sau khi đánh X
        audio.play();
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

// BẮT ĐÀU ĐÁNH GIÁ BÀN CỜ
function danhGiaBanCo() {
  if (kiemTraThang("O")) return 1;
  if (kiemTraThang("X")) return -1;
  if (kiemTraDay()) return 0;
  return null;
}
// BẮT ĐẦU HÀM Alpha-beta
function alphaBeta(board, doSau, isMaximizing, alpha, beta) {
  let danhGia = danhGiaBanCo();
  if (danhGia !== null) return danhGia;
  // Giới hạn độ sâu giúp xử lí nhanh hơn
  if (doSau >= 6) {
    return 0; // Tại độ sâu nhất, trả về giá trị hòa
  }
  if (isMaximizing) {
    return MayDanhMax(board, doSau, alpha, beta);
  } else {
    return NguoiDanhMin(board, doSau, alpha, beta);
  }
}
// KẾT THÚC HÀM Alpha-beta

// BẮT ĐẦU HÀM MÁY ĐÁNH MAX
function MayDanhMax(board, doSau, alpha, beta) {
  let maxEval = -Infinity;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] === "") {
        board[i][j] = "O"; // Giả lập nước đi
        let eval = alphaBeta(board, doSau + 1, false, alpha, beta);
        // Nếu không khôi phục thì những nước đi giả định sẽ hiện lên bàn cờ
        board[i][j] = "";
        // gán giá trị nhỏ nhất cho maxEval để lưu lại những lần sau sẽ so sánh với eval nữa
        maxEval = Math.max(maxEval, eval);
        alpha = Math.max(alpha, eval);
        if (beta <= alpha) break; // Cắt tỉa
      }
    }
  }
  return maxEval;
}
// KẾT THÚC HÀM MÁY ĐÁNH MAX

// BẮT ĐẦU HÀM NGƯỜI ĐÁNH MIN
function NguoiDanhMin(board, doSau, alpha, beta) {
  let minEval = Infinity;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] === "") {
        board[i][j] = "X"; // Giả lập nước đi
        // eval sẽ trả về trạng thái trò chơi nếu O thắng thì sẽ là 1,
        // X thắng thì sẽ là -1, Còn hoà thì sẽ là 0
        let eval = alphaBeta(board, doSau + 1, true, alpha, beta);
        // Ban đầu sẽ cho nước đi giả lập trên tất cả các nước đi của bàn cờ nếu bỏ thì nó sẽ hiện hết tất cả nước đi giả lập đó
        board[i][j] = "";
        // gán giá trị nhỏ nhất cho minEval để lưu lại những lần sau sẽ so sánh với eval nữa
        minEval = Math.min(minEval, eval);
        beta = Math.min(beta, eval);

        if (beta <= alpha) break; // Cắt tỉa
      }
    }
  }
  return minEval;
}
// KẾT THÚC HÀM NGƯỜI ĐÁNH MIN

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
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (i + 3 < 6) {
        // Dòng điều kiện này đảm bảo là sẽ có đủ 5 ô liên tiếp để chiến thắng
        if (
          array[i][j] === value &&
          array[i + 1][j] === value &&
          array[i + 2][j] === value &&
          array[i + 3][j] === value
        ) {
          for (let m = 0; m < 4; m++) {
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
      if (j + 3 < 6) {
        if (
          array[i][j] === value &&
          array[i][j + 1] === value &&
          array[i][j + 2] === value &&
          array[i][j + 3] === value
        ) {
          for (let m = 0; m < 4; m++) {
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
      if (i + 3 < 6 && j + 3 < 6) {
        if (
          array[i][j] === value &&
          array[i + 1][j + 1] === value &&
          array[i + 2][j + 2] === value &&
          array[i + 3][j + 3] === value
        ) {
          for (let m = 0; m < 4; m++) {
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
      if (i + 3 < 6 && j - 3 >= 0) {
        if (
          array[i][j] === value &&
          array[i + 1][j - 1] === value &&
          array[i + 2][j - 2] === value &&
          array[i + 3][j - 3] === value
        ) {
          for (let m = 0; m < 4; m++) {
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
