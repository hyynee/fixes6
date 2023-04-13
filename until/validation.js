// Input validation
function Validation() {
  this.kiemtraRong = function (value, idError, name) {
    if (value.trim() === "") {
      document.getElementById(idError).innerHTML = `${name}`;
      return false;
    }
    document.getElementById(idError).innerHTML = "";
    return true;
  };
  this.kiemTraKyTu = function (value, idError, name) {
    var regexLetter = /^[A-Z a-z]+$/;
    //Nếu chuỗi định dạng test thành công value thì true
    if (regexLetter.test(value)) {
      document.getElementById(idError).innerHTML = "";
      return true;
    }
    document.getElementById(idError).innerHTML = `${name} Tất cả phải là ký tự`;
    return false;
  };
  this.kiemTraEmail = function (value, idError, name) {
    var regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regexEmail.test(value)) {
      document.getElementById(idError).innerHTML = "";
      return true;
    }
    document.getElementById(idError).innerHTML = `${name} không hợp lệ!`;
    return false;
  };
  this.kiemTraSo = function (value,idError,name) {
    var regexNumber = /^[0-9]+$/;
    if(regexNumber.test(value)){
        document.getElementById(idError).innerHTML = '';
        return true;
    }
    document.getElementById(idError).innerHTML = `${name} không hợp lệ!`;
    return false;
}
this.kiemTraDoDai = function(value,idError,name,MinLength,MaxLength){
    // 'abcd'.length = 4;
    if(value.length > MaxLength || value.length < MinLength) {
        document.getElementById(idError).innerHTML = `${name} từ ${MinLength} đến ${MaxLength} ký tự!`;
        return false;
    }
    document.getElementById(idError).innerHTML = '';
    return true;
}
this.kiemTraGiaTri = function (value,idError,name,minValue,maxValue) {
    var regexNumber = /^-?\d*\.?\d+$/;
    if(regexNumber.test(value)){
        //Kiểm tra giá trị
        if(Number(value) < minValue || Number(value) > maxValue) {
            document.getElementById(idError).innerHTML = `${name} giá trị từ ${minValue} đến ${maxValue} !`;
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    }
    document.getElementById(idError).innerHTML = `${name} không hợp lệ !`;
    return false;
}
}
export { Validation};

