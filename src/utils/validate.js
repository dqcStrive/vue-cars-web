export function validate_email(value){
    let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return regEmail.test(value);
}

export function validate_password(value){
    let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return regPassword.test(value);
}

// 校验手机号
export function validate_phone(value){ //13719446486  1 13,14,15,17,18,
  let regPhone = /^1[34578]\d{9}$/;// \d为数字0-9SS
  // let regPhone = /^1(3|4|5|7|8)\d{9}&/;// \d为数字0-9S
  return regPhone.test(value);
}