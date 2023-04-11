// Input validation

const VALID_STRING = "Thông tin không hợp lệ";
const NUMBER_STRING = "Chỉ được phép nhập số ở đây";
const NUMBER = /^[0-9]*$/;

function validPerson() {
  let flag = true;

  // kiểm tra loại người dùng
  let regency = document.querySelector("#typeForm").selectedIndex;
  if (regency === 0) {
    flag = false;
    document.querySelector("#notiType").innerHTML =
      "Vui lòng chọn loại người dùng";
  } else {
    document.querySelector("#notiType").innerHTML = "";
  }

  // kiểm tra name
  let name = document.querySelector("#name").value;
  if (!name) {
    flag = false;
    document.querySelector("#notiName").innerHTML = VALID_STRING;
  } else {
    document.querySelector("#notiName").innerHTML = "";
  }

  // kiểm tra address
  let address = document.querySelector("#address").value;
  if (!address) {
    flag = false;
    document.querySelector("#notiAddress").innerHTML = VALID_STRING;
  } else {
    document.querySelector("#notiAddress").innerHTML = "";
  }

  // kiểm tra email
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let email = document.querySelector("#email").value;
  if (!email) {
    flag = false;
    document.querySelector("#notiEmail").innerHTML = VALID_STRING;
  } else if (!email.match(mailFormat)) {
    flag = false;
    document.querySelector("#notiEmail").innerHTML = "Email không hợp lệ";
  } else {
    document.querySelector("#notiEmail").innerHTML = "";
  }

  return flag;
}

function validStudent() {
  let flag = true;
  const SCORE_VALID = "Điểm phải nằm trong phạm vi từ 0 - 10";

  // kiểm tra điểm toán
  let math = document.querySelector("#math").value;
  if (!math) {
    flag = false;
    document.querySelector("#notiMath").innerHTML = VALID_STRING;
  } else if (Number(math) > 10 || Number(math) < 0) {
    flag = false;
    document.querySelector("#notiMath").innerHTML = SCORE_VALID;
  } else {
    document.querySelector("#notiMath").innerHTML = "";
  }

  // kiểm tra điểm hóa
  let chemistry = document.querySelector("#chemistry").value;
  if (!chemistry) {
    flag = false;
    document.querySelector("#notiChemistry").innerHTML = VALID_STRING;
  } else if (Number(chemistry) > 10 || Number(chemistry) < 0) {
    flag = false;
    document.querySelector("#notiChemistry").innerHTML = SCORE_VALID;
  } else {
    document.querySelector("#notiChemistry").innerHTML = "";
  }

  // kiểm tra điểm lý
  let physics = document.querySelector("#physics").value;
  if (!physics) {
    flag = false;
    document.querySelector("#notiPhysics").innerHTML = VALID_STRING;
  } else if (Number(physics) > 10 || Number(physics) < 0) {
    flag = false;
    document.querySelector("#notiPhysics").innerHTML = SCORE_VALID;
  } else {
    document.querySelector("#notiPhysics").innerHTML = "";
  }
  
  return flag;
}

function validEmployee() {
  let flag = true;

  // kiểm tra số ngày làm việc
  let dayOfWork = document.querySelector("#dayOfWork").value;

  if (!dayOfWork) {
    flag = false;
    document.querySelector("#notiDayOfWork").innerHTML = VALID_STRING;
  } else {
    document.querySelector("#notiDayOfWork").innerHTML = "";
  }

  // kiểm tra lương ngày
  let salaryOneDay = document.querySelector("#salaryOneDay").value;

  if (!salaryOneDay.trim()) {
    flag = false;
    document.querySelector("#notiSalaryOneDay").innerHTML = VALID_STRING;
  } else if (!salaryOneDay.match(NUMBER)) {
    flag = false;
    document.querySelector("#notiSalaryOneDay").innerHTML = NUMBER_STRING;
  } else {
    document.querySelector("#notiSalaryOneDay").innerHTML = "";
  }

  return flag;
}

function validCustomer() {
  let flag = true;

  // kiểm tra tên công ty
  let nameCompany = document.querySelector("#nameCompany").value;

  if (!nameCompany) {
    flag = false;
    document.querySelector("#notiNameCompany").innerHTML = VALID_STRING;
  } else {
    document.querySelector("#notiNameCompany").innerHTML = "";
  }

  // kiểm tra trị giá hóa đơn
  let invoiceValue = document.querySelector("#invoiceValue").value;

  if (!invoiceValue.trim()) {
    flag = false;
    document.querySelector("#notiInvoiceValue").innerHTML = VALID_STRING;
  } else if (!invoiceValue.match(NUMBER)) {
    flag = false;
    document.querySelector("#notiInvoiceValue").innerHTML = NUMBER_STRING;
  } else {
    document.querySelector("#notiInvoiceValue").innerHTML = "";
  }

  // kiểm tra đánh giá
  let review = document.querySelector("#review").value;

  if (!review) {
    flag = false;
    document.querySelector("#notiReview").innerHTML = VALID_STRING;
  } else {
    document.querySelector("#notiReview").innerHTML = "";
  }

  return flag;
}

export { validPerson, validStudent, validEmployee, validCustomer };
