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
      this.ListPerson = JSON.parse(stringDS);
    }
    const arrPerSon = this.ListPerson; // tham chieu : có thể gán giá trị làm thay đổi được 
    // arrPerSon[0].name = 'Huy'
    console.log(this.ListPerson)
    if(!arrPerSon) return;
    const Check = arrPerSon.map((element) => {
      if(element.regency === 'Student') {
        const son = new Student();
        Object.assign(son,element)
        return son;
      }
      if(element.regency === 'Employee') {
        const emp = new Employee();
        Object.assign(emp,element)
        return emp;
      }
      if(element.regency === 'Customer') {
        const cus = new Customer();
        Object.assign(cus,element)
        return cus;
      }
    })
    console.log(Check) // dựa trên mảng cũ của ListPerSon nhưng đã tạo thành 1 mảng mới và 2 mảng này tách biệt nhau
    this.ListPerson = [...Check]; // gán giá trị mới cho mảng cũ và render ra theo giá trị mới
    this.renderTable(table)
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
}

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