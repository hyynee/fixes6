import { List, resetForm } from "../model/List.js";
import { Person, Customer, Employee, Student } from "../model/PerSon.js";
import {
  validPerson,
  validStudent,
  validEmployee,
  validCustomer,
} from "../until/validation.js";

const listPerson = [];
let list = new List();
list.layLocalStorage("#tBodylist"); // lấy
list.renderTable("#tBodylist");
document.getElementById("btnAdd").onclick = function () {
  var tagSelectValue = document.querySelector("#typeForm :checked").value;
  if (!validPerson()) {
    return;
  }
  let person;
  if (tagSelectValue === "Student") {
    person = new Student();
    if (!validPerson() & !validStudent()) {
      return;
    }
  } else if (tagSelectValue === "Employee") {
    person = new Employee();
    if (!validPerson() & !validEmployee()) {
      return;
    }
  } else if (tagSelectValue === "Customer") {
    person = new Customer();
    if (!validPerson() & !validCustomer()) {
      return;
    }
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
  // Lấy giá trị của thuộc tính "regency"
  const regency = sua.regency;
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
  list.renderTable("#tBodylist");
  list.luuLocalStorage();
};

document.getElementById("btnClick").onclick = function () {
  document.getElementById("btnUpdate").disabled = "flase";
};
document.getElementById("btnReset").onclick = function () {
  resetForm();
  document.getElementById("btnAdd").removeAttribute("disabled");
};
document.getElementById("Close").onclick = function () {
  document.getElementById("btnAdd").removeAttribute("disabled");
  document.getElementById("id").removeAttribute("disabled");
  document.getElementById("btnReset").removeAttribute("disabled");
  resetForm();
  const input = document.querySelectorAll(".modal-body input");
  input.forEach((element) => {
    element.style.display = " block";
  });
  if (!validPerson() & !validStudent() & !validEmployee() & !validCustomer()) {
    document.querySelector("#notiType").innerHTML = "";
    document.querySelector("#notiName").innerHTML = "";
    document.querySelector("#notiAddress").innerHTML = "";
    document.querySelector("#notiEmail").innerHTML = "";
    document.querySelector("#notiMath").innerHTML = "";
    document.querySelector("#notiChemistry").innerHTML = "";
    document.querySelector("#notiPhysics").innerHTML = "";
    document.querySelector("#notiDayOfWork").innerHTML = "";
    document.querySelector("#notiSalaryOneDay").innerHTML = "";
    document.querySelector("#notiNameCompany").innerHTML = "";
    document.querySelector("#notiInvoiceValue").innerHTML = "";
    document.querySelector("#notiReview").innerHTML = "";
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
};
