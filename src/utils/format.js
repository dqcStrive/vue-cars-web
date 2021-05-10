

/** 
 * 格式化请求数据的参数 
 * keyData：form_data
 * requestData：请求的数据
 * 
 * */
export function formatRequestData(keyData, requestData){
    const data = {}
    for(let key in keyData) {
        if(Object.keys(requestData).includes(key)) {
            data[key] = requestData[key]
        }
    }
    return data;
}

// 格式化汽车属性
export function formatCarsAttr(val){
  if(!val) return "";
  return JSON.parse(val);
}

// 获取指定属性的key的值
export function getCarsAttrKey(params){
  if(!params.data) return "";
  // 格式化汽车属性数据
  const data = formatCarsAttr(params.data);
  // 判断数据，并返回成员
  if(data[params.parerntKey] && data[params.parerntKey][params.childKey]){
    return data[params.parerntKey][params.childKey];
  }
  return ""
}