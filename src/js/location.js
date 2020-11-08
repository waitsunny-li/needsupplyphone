/*
 * @Author: liweilong
 * @Date: 2020-10-21 17:37:10
 */
class MyLocation {
  constructor(keyid) {
    this.keyid = keyid ? keyid : 'NU6BZ-RGSWD-PSV4K-HTQI6-XI4IT-KGFUJ';

    this.options = {
      timeout: 8000
    }
  }

  init(success,error) {
    let self = this;
    let getmylocation = new qq.maps.Geolocation(self.keyid, "myapp");
      //获取位置信息
      getmylocation.getLocation(success, error, self.options);

  }

  // 通过ip地址来获取位置，适合pc端
  getLoaction() {
    let key = this.keyid
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=${key}`,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: 'getLocat',
        type: 'get',
        success: function (res) {
          resolve(res)
        },
        error: function (error) {
          console.log(error);
        }
      })
    })
  }

  // 通过经纬度转化为详细地址
  latLngTransAddress({lat, lng, get_poi}, cb) {
    let key = this.keyid
    let get_poi_id = get_poi ? get_poi : 0
    $.ajax({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?output=jsonp&location=${lat},${lng}&key=${key}&get_poi=${get_poi_id}`,
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: 'getLocat',
      type: 'get',
      success: function (res) {
        cb(res)
      },
      error: function (error) {
        console.log(error);
      }
    })
  }

}