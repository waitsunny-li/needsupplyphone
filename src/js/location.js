/*
 * @Author: liweilong
 * @Date: 2020-10-21 17:37:10
 */
function Location() {};

Location.prototype.getLocation = function (callback) {
  var options = {
    enableHighAccuracy: true,
    maximumAge: 1000
  };
  this.callback = Object.prototype.toString.call(callback) == "[object Function]" ?
    callback :
    function (address) {
      alert(address.province + address.city);
      console.log("getocation(callbackFunction) 可获得定位信息对象");
    };
  var self = this;
  if (navigator.geolocation) {
    //浏览器支持geolocation
    navigator.geolocation.getCurrentPosition(function (position) {
      //经度
      var longitude = position.coords.longitude;
      //纬度
      var latitude = position.coords.latitude;
      self.loadMapApi(longitude, latitude);
    }, self.onError, options);
  } else {
    //浏览器不支持geolocation
  }
};

Location.prototype.loadMapApi = function (longitude, latitude) {
  var self = this;
  var oHead = document.getElementsByTagName('HEAD').item(0);
  var oScript = document.createElement("script");
  oScript.type = "text/javascript";
  oScript.src = "http://api.map.baidu.com/api?v=3.0&ak=mqwXwy9cIxyohruM8LncFkgecPfaXCS7";
  oHead.appendChild(oScript);
  oScript.onload = function (date) {
    var point = new BMap.Point(longitude, latitude);
    var gc = new BMap.Geocoder();
    gc.getLocation(point, function (rs) {
      var addComp = rs.addressComponents;
      self.callback(addComp);
    });
  }
};

Location.prototype.onError = function (error) {
  switch (error.code) {
    case 1:
      alert("位置服务被拒绝");
      break;
    case 2:
      alert("暂时获取不到位置信息");
      break;
    case 3:
      alert("获取信息超时");
      break;
    case 4:
      alert("未知错误");
      break;
  }
};

//调用
var local = new Location();
local.getLocation(function (res) {
  //此处就是返回的地理位置信息
  console.log(res);
  //JSON.stringify(res)，把返回的对象转为字符串了，自己根据需求截取下就好
  var resstr = JSON.stringify(res);
  alert(resstr);
});