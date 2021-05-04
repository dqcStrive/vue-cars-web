let walking = null;

export function Walking(params){
  //步行导航
    if(!walking){
      walking = new AMap.Walking({
        map: params.map,
        hideMarkers: true,
      }); 
    }
  //根据起终点坐标规划步行路线
  walking.search(params.position_start, params.position_end, (status, result) => {
    // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
    if (status === 'complete') {
      if(params.complete && typeof params.complete == "function"){
        // console.log(AMap.event);
        // AMap.event.complete(result);//返回定位信息
        params.complete(result);
      }
    } else {
      console.log('步行路线数据查询失败' + result)
    } 
  });
}

