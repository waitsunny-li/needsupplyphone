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

  init() {
    let self = this;

    return new Promise((resolve, reject) => {
      let getmylocation = new qq.maps.Geolocation(self.keyid, "myapp");
      //获取位置信息
      getmylocation.getLocation(resolve, reject, self.options);
    })

  }

}
