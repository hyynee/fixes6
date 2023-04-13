import { List, resetForm } from "../model/List.js";
import { Person, Customer, Employee, Student } from "../model/PerSon.js";
import { Validation } from "../until/validation.js";

const listPerson = [];
var kiemTra = new Validation();

let list = new List();
list.layLocalStorage("#tBodylist"); // lấy
list.renderTable("#tBodylist");
document.getElementById("btnAdd").onclick = function () {
  var tagSelectValue = document.querySelector("#typeForm :checked").value;
  valid = kiemTra.kiemtraRong("", "notiType", "Vui lòng chọn loại người dùng");
  let person;
  if (tagSelectValue === "Student") {
    person = new Student();
  } else if (tagSelectValue === "Employee") {
    person = new Employee();
  } else if (tagSelectValue === "Customer") {
    person = new Customer();
  } else {
    return;
  }
  person.regency = tagSelectValue;
  // let person = listPerson[tagSelectValue]
  const inputList = document.querySelectorAll(".modal-body input");
  const arrInput = [...inputList];
  for (let property in person) {
    // console.log(property);
    const index = arrInput.findIndex((input) => {
      return input.id === property;
    });
    // console.log(property); // input.name = name : lúc này vị trí là 0
    // console.log(index);
    if (index !== -1) {
      person[property] = arrInput[index].value;
      // person[name] = arrInput[0].value
    }
  }

  var valid = true;
  // kiểm tra rỗng
  valid =
    kiemTra.kiemtraRong(person.name, "notiName", "Không được bỏ trống!!!") &
    kiemTra.kiemtraRong(
      person.address,
      "notiAddress",
      "Không được bỏ trống!!!"
    ) &
    kiemTra.kiemtraRong(person.id, "notiID", "Không được bỏ trống!!!") &
    kiemTra.kiemtraRong(person.email, "notiEmail", "Không được bỏ trống!!!");

  // Kiểm tra ký tự
  valid = valid & kiemTra.kiemTraKyTu(person.name, "notiName", "Name");
  // email
  valid = valid & kiemTra.kiemTraEmail(person.email, "notiEmail", "Email");
  // ID
  valid = valid & kiemTra.kiemTraSo(person.id, "notiID", "ID");
  if (person.regency === "Student") {
    valid =
      valid &
      kiemTra.kiemtraRong(person.math, "notiMath", "Không được bỏ trống!!!") &
      kiemTra.kiemtraRong(
        person.chemistry,
        "notiChemistry",
        "Không được bỏ trống!!!"
      ) &
      kiemTra.kiemtraRong(
        person.physics,
        "notiPhysics",
        "Không được bỏ trống!!!"
      );
    valid =
      valid &
      kiemTra.kiemTraSo(person.math, "notiMath", "Math") &
      kiemTra.kiemTraSo(person.chemistry, "notiChemistry", "Chemistry") &
      kiemTra.kiemTraSo(person.physics, "notiPhysics", "Physics");
    valid =
      valid &
      kiemTra.kiemTraGiaTri(person.math, "notiMath", "Math ", 0, 10) &
      kiemTra.kiemTraGiaTri(
        person.chemistry,
        "notiChemistry",
        "Chemistry",
        0,
        10
      ) &
      kiemTra.kiemTraGiaTri(person.physics, "notiPhysics", "Physics", 0, 10);
  }
  if (person.regency === "Employee") {
    valid =
      valid &
      kiemTra.kiemtraRong(
        person.dayOfWork,
        "notiDayOfWork",
        "Không được bỏ trống!!!"
      ) &
      kiemTra.kiemtraRong(
        person.salaryOneDay,
        "notiSalaryOneDay",
        "Không được bỏ trống!!!"
      );
    valid =
      valid &
      kiemTra.kiemTraSo(person.dayOfWork, "notiDayOfWork", "Number") &
      kiemTra.kiemTraSo(person.salaryOneDay, "notiSalaryOneDay", "Number");
  }
  if (person.regency === "Customer") {
    valid =
      valid &
      kiemTra.kiemtraRong(
        person.nameCompany,
        "notiNameCompany",
        "Không được bỏ trống!!!"
      ) &
      kiemTra.kiemtraRong(
        person.review,
        "notiReview",
        "Không được bỏ trống!!!"
      ) &
      kiemTra.kiemtraRong(
        person.invoiceValue,
        "notiInvoiceValue",
        "Không được bỏ trống!!!"
      );
    valid =
      valid &
      kiemTra.kiemTraKyTu(person.nameCompany, "notiNameCompany", "") &
      kiemTra.kiemTraKyTu(person.review, "notiReview", "");
    valid =
      valid &
      kiemTra.kiemTraSo(person.invoiceValue, "notiInvoiceValue", "Number");
  }
  if (!valid) {
    return;
  }
  listPerson.push(person);
  // console.log(listPerson); // render
  list.themdanhsach(person);
  //
  list.renderTable("#tBodylist");
  //
  list.luuLocalStorage();
};

window.deletePerSon = function (id) {
  list.xoaPerSon(id);
  // render
  list.renderTable("#tBodylist");
  list.luuLocalStorage();
};
window.Sua = function (id) {
  document.querySelector("#btnClick").click();
  document.getElementById("id").disabled = true;
  document.getElementById("btnAdd").disabled = true;
  document.getElementById("typeForm").disabled = true;
  // document.getElementById("btnReset").disabled = "false";
  document.getElementById("btnReset").removeAttribute("disabled");
  document.getElementById("btnUpdate").removeAttribute("disabled");
  let sua = list.Sua(id);
  var arrInput = document.querySelectorAll(
    ".modal-body select , .modal-body input"
  );
  Object.keys(sua).forEach((key) => {
    const input = document.getElementById(key);
    if (input) {
      // Kiểm tra xem có phần tử HTML tương ứng hay không
      input.value = sua[key];
    }
  });
  const regency = sua.regency;
  if (regency === "Student") {
    document.querySelector("#studentForm").classList.remove("d-none");
    document.querySelector("#employeeForm").classList.add("d-none");
    document.querySelector("#customerForm").classList.add("d-none");
  } else if (regency === "Employee") {
    document.querySelector("#employeeForm").classList.remove("d-none");

    document.querySelector("#studentForm").classList.add("d-none");
    document.querySelector("#customerForm").classList.add("d-none");
  } else {
    document.querySelector("#customerForm").classList.remove("d-none");

    document.querySelector("#studentForm").classList.add("d-none");
    document.querySelector("#employeeForm").classList.add("d-none");
  }
  // Lấy giá trị của thuộc tính "regency"

  // Tìm vị trí của option có giá trị bằng với "regency"
  const select = document.getElementById("typeForm");
  const options = select.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === regency) {
      select.selectedIndex = i;
      break;
    }
  }
};
console.log(list.ListPerson);
document.querySelector("#btnUpdate").onclick = function () {
  document.getElementById("id").disabled = false;
  document.getElementById("btnAdd").disabled = false;
  const arrInput = Array.from(document.querySelectorAll(".modal-body input"));
  const regencySelect = document.getElementById("typeForm");
  const id = document.querySelector("#id").value;
  const personEdit = list.ListPerson.find((element) => element.id === id);
  // validation
  for (const property in personEdit) {
    const index = arrInput.findIndex((element) => {
      return element.id === property;
    });
    if (index !== -1) {
      personEdit[property] = arrInput[index].value;
    }
  }
  personEdit.regency = regencySelect.value;
  console.log(personEdit);
  let valid = true;

  // kiểm tra rỗng
  valid =
    kiemTra.kiemtraRong(personEdit.name, "notiName", "Không được bỏ trống!!!") &
    kiemTra.kiemtraRong(
      personEdit.address,
      "notiAddress",
      "Không được bỏ trống!!!"
    ) &
    kiemTra.kiemtraRong(personEdit.id, "notiID", "Không được bỏ trống!!!") &
    kiemTra.kiemtraRong(
      personEdit.email,
      "notiEmail",
      "Không được bỏ trống!!!"
    );

  // Kiểm tra ký tự
  valid = valid & kiemTra.kiemTraKyTu(personEdit.name, "notiName", "Name");
  // email
  valid = valid & kiemTra.kiemTraEmail(personEdit.email, "notiEmail", "Email");
  // ID
  valid =
    valid &
    kiemTra.kiemTraSo(personEdit.id, "notiID", "ID") &
    kiemTra.kiemTraSo(personEdit.id, "notiID", "ID");
  if (personEdit.regency === "Student") {
    valid =
      valid &
      kiemTra.kiemtraRong(
        personEdit.math,
        "notiMath",
        "Không được bỏ trống!!!"
      ) &
      kiemTra.kiemtraRong(
        personEdit.chemistry,
        "notiChemistry",
        "Không được bỏ trống!!!"
      ) &
      kiemTra.kiemtraRong(
        personEdit.physics,
        "notiPhysics",
        "Không được bỏ trống!!!"
      );
    valid =
      valid &
      kiemTra.kiemTraSo(personEdit.math, "notiMath", "Math") &
      kiemTra.kiemTraSo(personEdit.chemistry, "notiChemistry", "Chemistry") &
      kiemTra.kiemTraSo(personEdit.physics, "notiPhysics", "Physics");
    valid =
      valid &
      kiemTra.kiemTraGiaTri(personEdit.math, "notiMath", "Math ", 0, 10) &
      kiemTra.kiemTraGiaTri(
        personEdit.chemistry,
        "notiChemistry",
        "Chemistry",
        0,
        10
      ) &
      kiemTra.kiemTraGiaTri(
        personEdit.physics,
        "notiPhysics",
        "Physics",
        0,
        10
      );
  }
  if (personEdit.regency === "Employee") {
    valid =
      valid &
      kiemTra.kiemtraRong(
        personEdit.dayOfWork,
        "notiDayOfWork",
        "Không được bỏ trống!!!"
      ) &
      kiemTra.kiemtraRong(
        personEdit.salaryOneDay,
        "notiSalaryOneDay",
        "Không được bỏ trống!!!"
      );
    valid =
      valid &
      kiemTra.kiemTraSo(personEdit.dayOfWork, "notiDayOfWork", "Number") &
      kiemTra.kiemTraSo(personEdit.salaryOneDay, "notiSalaryOneDay", "Number");
  }
  if (personEdit.regency === "Customer") {
    valid =
      valid &
      kiemTra.kiemtraRong(
        personEdit.nameCompany,
        "notiNameCompany",
        "Không được bỏ trống!!!"
      ) &
      kiemTra.kiemtraRong(
        personEdit.review,
        "notiReview",
        "Không được bỏ trống!!!"
      ) &
      kiemTra.kiemtraRong(
        personEdit.invoiceValue,
        "notiInvoiceValue",
        "Không được bỏ trống!!!"
      );
    valid =
      valid &
      kiemTra.kiemTraKyTu(personEdit.nameCompany, "notiNameCompany", "") &
      kiemTra.kiemTraKyTu(personEdit.review, "notiReview", "");
    valid =
      valid &
      kiemTra.kiemTraSo(personEdit.invoiceValue, "notiInvoiceValue", "Number");
  }
  if (!valid) {
    return;
  }

  list.renderTable("#tBodylist");
  list.luuLocalStorage();
};

document.getElementById("btnClick").onclick = function () {
  document.getElementById("btnUpdate").disabled = "flase";
  document.querySelector("#studentForm").classList.remove("d-none");
  document.querySelector("#employeeForm").classList.remove("d-none");
  document.querySelector("#customerForm").classList.remove("d-none");
};
document.getElementById("btnReset").onclick = function () {
  resetForm();
  document.getElementById("btnAdd").removeAttribute("disabled");
};
document.getElementById("Close").onclick = function () {
  document.getElementById("btnAdd").removeAttribute("disabled");
  document.getElementById("id").removeAttribute("disabled");
  document.getElementById("btnReset").removeAttribute("disabled");
  document.getElementById("typeForm").removeAttribute("disabled");
  resetForm();
  const input = document.querySelectorAll(".modal-body input");
  input.forEach((element) => {
    element.style.display = " block";
  });
  document.querySelector("#notiName").classList.add("d-none");
  document.querySelector("#notiAddress").classList.add("d-none");
  document.querySelector("#notiID").classList.add("d-none");
  document.querySelector("#notiEmail").classList.add("d-none");
  document.querySelector("#notiMath").classList.add("d-none");
  document.querySelector("#notiChemistry").classList.add("d-none");
  document.querySelector("#notiPhysics").classList.add("d-none");
  document.querySelector("#notiDayOfWork").classList.add("d-none");
  document.querySelector("#notiSalaryOneDay").classList.add("d-none");
  document.querySelector("#notiNameCompany").classList.add("d-none");
  document.querySelector("#notiReview").classList.add("d-none");
  document.querySelector("#notiInvoiceValue").classList.add("d-none");
  if(!valid) {
    return;
  }
};

document.querySelector("#searchRegency").onchange = (event) => {
  if (event.target.value === "all") {
    list.renderTable("#tBodylist");
    console.log(list);
    return;
  }
  const filterList = list.ListPerson.filter((element) => {
    return element.regency === event.target.value;
  });
  list.renderTable("#tBodylist", filterList);
  // luôn luôn có 1 giá trị mặc định để render ra
  // khi nào có sự thay đổi thì ms dùng cái mảng mới để làm và render ra mảng mới đó vs tham số của mảng mới truyền vào
};
document.querySelector("#typeForm").onchange = (event) => {
  const student = [
    "name",
    "address",
    "id",
    "email",
    "math",
    "chemistry",
    "physics",
  ];
  const employee = [
    "name",
    "address",
    "id",
    "email",
    "dayOfWork",
    "salaryOneDay",
  ];
  const customer = [
    "name",
    "address",
    "id",
    "email",
    "nameCompany",
    "review",
    "invoiceValue",
  ];
  const input = document.querySelectorAll(".modal-body input");
  switch (event.target.value) {
    case "Student":
      input.forEach((element) => {
        for (let inputRender of student) {
          if (element.id === inputRender) {
            element.style.display = "block";
            break;
          }
          element.style.display = "none";
        }
      });
      break;
    case "Employee":
      input.forEach((element) => {
        for (let emrender of employee) {
          if (element.id === emrender) {
            element.style.display = "block";
            break;
          }
          element.style.display = "none";
        }
      });
      break;
    case "Customer":
      input.forEach((element) => {
        for (let cusrender of customer) {
          if (element.id === cusrender) {
            element.style.display = "block";
            break;
          }
          element.style.display = "none";
        }
      });
  }
  document.querySelector("#notiType").classList.add("d-none");
};
