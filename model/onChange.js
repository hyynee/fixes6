import { List } from "./List.js";

/* document.querySelector("#searchRegency").onchange = (event) => {
  const LIST = JSON.parse(localStorage.getItem("DS"));
  console.log(LIST);
  const newList = new List(); // rỗng
  newList.ListPerson = LIST;
  if (event.target.value !== "all") {
    const personRegency = LIST.filter(
      (person) => person.regency == event.target.value
    );
    newList.ListPerson = personRegency;
  }
  switch (event.target.value) {
    case "sinh viên":
      break;
    case "nhân viên":
      break;
    case "khách hàng":
      break;
    default:
      newList.renderTable("#tBodylist");
      break;
  }
};
*/

document.querySelector("#searchRegency").onchange = (event) => {
  const LIST = JSON.parse(localStorage.getItem("DS"));
  console.log(LIST);
  // Tạo các đối tượng List mới
  const newList = new List();
  const newStu = new List();
  const newEmp = new List();
  const newCus = new List();
  newList.ListPerson = LIST;
  newStu.ListPerson = LIST;
  newEmp.ListPerson = LIST;
  newCus.ListPerson = LIST;
  console.log(newStu.ListPerson);
  // Lọc danh sách theo đơn vị (nếu giá trị được chọn khác "all") và lưu vào newList
  if (event.target.value !== "all") {
    const personRegency = LIST.filter(
      (person) => person.regency == event.target.value
    );
    newList.ListPerson = personRegency;
    newStu.ListPerson = personRegency;
    newEmp.ListPerson = personRegency;
    newCus.ListPerson = personRegency;
  }
  // Lọc lại danh sách người dùng theo loại và lưu vào các đối tượng List tương ứng
  newStu.ListPerson = newStu.ListPerson.filter(
    (person) => person.type === "sinh viên"
  );
  console.log(newStu.regency);
  newEmp.ListPerson = newEmp.ListPerson.filter(
    (person) => person.type === "nhân viên"
  );
  newCus.ListPerson = newCus.ListPerson.filter(
    (person) => person.type === "khách hàng"
  );

  // Render các bảng riêng biệt cho mỗi loại người dùng
  switch (event.target.value) {
    case "sinh viên":
      newStu.renderTable("#tBodylist");
      break;
    case "nhân viên":
      newEmp.renderTable("#tBodylist");
      break;
    case "khách hàng":
      newCus.renderTable("#tBodylist");
      break;
    default:
      newList.renderTable("#tBodylist");
      break;
  }
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
            console.log(element.id);
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
            console.log(element);
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
