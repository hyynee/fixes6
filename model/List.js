import { Customer, Employee, Student } from "./PerSon.js";

export class List {
  ListPerson = [];
  themdanhsach(person) {
    this.ListPerson.push(person);
  }
  renderTable(selectorTbody) {
    let html = "";
    for (let person of this.ListPerson) {
      html += `
      <tr>
      <td>${person.id}</td>
      <td>${person.regency || ""}</td>
      <td>${person.name}</td>
      <td>${person.address}</td>
      <td>${person.email}</td>
      <td>${person.average ? person.average() : ""}</td>
      <td>${person.total ? person.total() : ""}</td>
      <td>${person.nameCompany || " "}</td>
      <td>${person.invoiceValue || ""}</td>
      <td>${person.review || " "}</td>
      <td>
        <button class="btn btn-success my-1" data-toggle="modal" data-target="#personModal" onclick="Sua(
                   '${person.id}'
                 )">Fixes</button>
        <button class="btn btn-danger my-1" onclick="deletePerSon('${
          person.id
        }')">Delete</button>
        </td>
      </tr>
      `;
    }
    document.querySelector(selectorTbody).innerHTML = html;
    // hàm là dùng toán tử ba ngôi
    // kiểm tra giá trị là dùng 2 ngôi
    // 1 hàm làm 1 nhiệm vụ
  }
  //luu
  luuLocalStorage() {
    let stringDS = JSON.stringify(this.ListPerson);
    localStorage.setItem("DS", stringDS);
  }
  //lay
  layLocalStorage(table) {
    if (localStorage.getItem("DS")) {
      let stringDS = localStorage.getItem("DS");
      this.ListPerson = JSON.parse(stringDS) || [];
      sortByName(this.ListPerson);
    }
    const arrPerSon = this.ListPerson; // tham chieu : có thể gán giá trị làm thay đổi được
    // arrPerSon[0].name = 'Huy'
    console.log(this.ListPerson);
    if (!arrPerSon) return;
    const Check = arrPerSon.map((element) => {
      if (element.regency === "Student") {
        const son = new Student();
        Object.assign(son, element);
        return son;
      }
      if (element.regency === "Employee") {
        const emp = new Employee();
        Object.assign(emp, element);
        return emp;
      }
      if (element.regency === "Customer") {
        const cus = new Customer();
        Object.assign(cus, element);
        return cus;
      }
    });
    console.log(Check); // dựa trên mảng cũ của ListPerSon nhưng đã tạo thành 1 mảng mới và 2 mảng này tách biệt nhau
    this.ListPerson = [...Check]; // gán giá trị mới cho mảng cũ và render ra theo giá trị mới
    this.renderTable(table);
  }

  //xoa
  xoaPerSon(id) {
    for (let index in this.ListPerson) {
      if (this.ListPerson[index].id === id) {
        this.ListPerson.splice(index, 1);
        break;
      }
    }
  }
  // Sửa
  Sua(id) {
    for (let person of this.ListPerson) {
      if (person.id === id) {
        return person;
      }
    }
    return undefined;
  }
  // update
  capNhat(updatePerson) {
    for (let person of this.ListPerson) {
      if (person.id === updatePerson.id) {
        for (let key in person) {
          person[key] = updatePerson[key];
        }
      }
    }
  }
}
document.getElementById("btnReset").onclick = function () {
  resetForm();
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
// Hàm reset
export function resetForm() {
  document.querySelector("#typeForm").value = "Chọn loại người dùng";
  document.querySelector("#name").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#id").value = "";

  document.querySelector("#math").value = "";
  document.querySelector("#physics").value = "";
  document.querySelector("#chemistry").value = "";

  document.querySelector("#dayOfWork").value = "";
  document.querySelector("#salaryOneDay").value = "";
  document.querySelector("#nameCompany").value = "";

  document.querySelector("#invoiceValue").value = "";
  document.querySelector("#review").value = "";
}

function getFullName(person) {
  return person.name.trim().split(/\s+/).reverse().join(" ");
}
function sortByName(list) {
  list.sort(function (a, b) {
    var nameA = getFullName(a).toUpperCase(); // Chuyển họ tên thành chữ in hoa để so sánh
    var nameB = getFullName(b).toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}
