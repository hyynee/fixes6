import { List } from "./List.js";

// document.querySelector("#searchRegency").onchange = (event) => {
//   const LIST = JSON.parse(localStorage.getItem("DS"));
//   console.log(LIST);
//   const newList = new List(); // rỗng
//   newList.ListPerson = LIST;
//   if (event.target.value !== "all") {
//     const personRegency = LIST.filter(
//       (person) => person.regency == event.target.value
//     );
//     console.log(personRegency);
//     newList.ListPerson = personRegency;
//   }
//   switch (event.target.value) {
//     case "sinh viên":

//       break;
//     case "nhân viên":

//       break;
//     case "khách hàng":

//       break;
//     default:
//       newList.renderTable("#tBodylist");
//       break;
//   }
// };

// Hàm tìm kiếm theo đơn vị
document.querySelector("#searchRegency").onchange = (event) => {
  // Lấy danh sách người dùng từ LocalStorage
  const LIST = JSON.parse(localStorage.getItem("DS"));
  // Tạo các đối tượng List mới cho từng trường hợp
  const newList = new List();
  const newStu = new List();
  const newEmp = new List();
  const newCus = new List();
  newList.ListPerson = LIST;
  newStu.ListPerson = LIST;
  newEmp.ListPerson = LIST;
  newCus.ListPerson = LIST;
  // Lọc danh sách theo đơn vị nếu giá trị được chọn không phải "all"
  if (event.target.value !== "all") {
    const personRegency = LIST.filter(
      (person) => person.regency === event.target.value
    );
    newList.ListPerson = personRegency;
    newStu.ListPerson = personRegency.filter(
      (person) => person.type === "sinh viên"
    );
    newEmp.ListPerson = personRegency.filter(
      (person) => person.type === "nhân viên"
    );
    newCus.ListPerson = personRegency.filter(
      (person) => person.type === "khách hàng"
    );
  }
  // Render bảng tương ứng với giá trị được chọn
  switch (event.target.value) {
    case "Student":
      newStu.renderTable("#tBodylist");
      break;
    case "Employee":
      newEmp.renderTable("#tBodylist");
      break;
    case "Customer":
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
