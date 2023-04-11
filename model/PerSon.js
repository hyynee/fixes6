export class Person {
  name = "";
  address = "";
  id = "";
  email = "";
  regency = "";
}
export class Student extends Person {
  math = "";
  physics = "";
  chemistry = "";
  average() {
    let dTB =
      (Number(this.math) + Number(this.physics) + Number(this.chemistry)) / 3;
    return dTB.toFixed(2);
  }
}
export class Employee extends Person {
  dayOfWork = "";
  salaryOneDay = "";
  total() {
    let sumSalaryEmployee = Number(this.dayOfWork) * Number(this.salaryOneDay);
    return sumSalaryEmployee.toLocaleString();
  }
}
export class Customer extends Person {
  nameCompany = "";
  review = "";
  invoiceValue = "";
}


