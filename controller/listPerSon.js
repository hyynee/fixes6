import { List, resetForm } from "../model/List.js";
import { Person, Customer, Employee, Student } from "../model/PerSon.js";
import { validPerson, validStudent, validEmployee, validCustomer} from "../until/validation.js";

const listPerson = [];
let list = new List();
list.layLocalStorage("#tBodylist"); // lấy
list.renderTable("#tBodylist");
document.getElementById("btnAdd").onclick = function () {
  if(!validPerson()) {
    return;
  }
  let person;
  if (tagSelectValue === "Student") {
    person = new Student();
    if(!validStudent()) {
      return;
    }
  } else if (tagSelectValue === "Employee") {
    person = new Employee();
    if(!validEmployee()) {
      return;
    }
  } else if (tagSelectValue === "Customer") {
    person = new Customer();
    if(!validCustomer()) {
      return;
    }
  } else {
    return;
  }
  var tagSelectValue = document.querySelector("#typeForm :checked").value;
  person.regency = tagSelectValue;
  // let person = listPerson[tagSelectValue]
  const inputList = document.querySelectorAll(".modal-body input");
  const arrInput = [...inputList];
  for (let property in person) {
    console.log(property);
    const index = arrInput.findIndex((input) => {
      return input.id === property;
    });
    console.log(property); // input.name = name : lúc này vị trí là 0
    console.log(index);
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

window.Sua = function(id) {
  document.querySelector("#btnClick").click();
  document.getElementById("id").disabled = true;
  document.getElementById("btnAdd").disabled = true;
  document.getElementById("btnReset").disabled = "false";
  let sua = list.Sua(id);
  var arrInput = document.querySelectorAll(".modal-body select , .modal-body input");
  Object.keys(sua).forEach(key => {
    const input = document.getElementById(key);
    if (input) { // Kiểm tra xem có phần tử HTML tương ứng hay không
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
}

document.querySelector("#btnUpdate").onclick = function () {
  document.getElementById("id").disabled = "flase";
  document.getElementById("btnAdd").disabled = "flase"; 

  resetForm();
}

