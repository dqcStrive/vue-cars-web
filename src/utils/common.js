import store from "@/store";
// 格式化时间
export function formatDate(params){
  // 连接符
  const conn = params.conn || ".";

  const date = new Date(params.value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const min = date.getMinutes() < 10 ? '0' + date.getMinutes() :date.getMinutes();
  const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  // 日期
  const dateValue = `${year}${conn}${month}${conn}${day}`
  //时间
  const timeValue = `${hours}:${min}:${sec}`

  switch(params.type){
    case "yyyy-MM-dd" : return dateValue ;
    case "yyyy-MM-dd hh mm:ss" : return `${dateValue} ${timeValue}`;
  }
  return `${dateValue} ${timeValue}`;

}

/** 省市区街道 */
export function address(value){
    let address = value;
    let addressInfo = "";
    if(address) {
        let split = address.split(",");
        addressInfo += split[0];
        // 街道
        if(split[1]) {
            addressInfo += `<br/>${split[1]}`
        }
    }
    return addressInfo;
}

/** 停车场类型 */
export function parkingType(value){
    const data = store.state.config.parking_type_json[value];
    if(data) { return data.label; }
}

/** 年检 */
export function yearCheckType(value){
    const data = store.state.config.year_check;
    const filterData = data.filter(item => item.value == value);
    if(filterData.length > 0) {
        return filterData[0].label
    }
    return "";
}

/** 能源类型 */
export function energyType(value){
    const data = store.state.config.energyType;
    const filterData = data.filter(item => item.value === parseInt(value)); //=== 结果值是否一致以及值类型，== 结果值是否一致
    if(filterData.length > 0) {
        return filterData[0].label
    }
    return "";
}