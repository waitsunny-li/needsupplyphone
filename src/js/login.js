/*
 * @Author: liweilong
 * @Date: 2020-10-15 15:10:56
 */
class Common {
  constructor() {
    this.mySwiper = null

    this.verCodeClick()
    this.passwordClick()
    this.listanBaner()
  }

  listanBaner() {
    this.mySwiper = new Swiper('.login_container', {
      // autoHeight: true, //高度随内容变化
      spaceBetween: "14%",
      on: {
        slideChange: function () {
          if (this.activeIndex == 0) {
            $(".sub_line").stop().animate({
              "left": "0px"
            }, 300)
          } else {
            $(".sub_line").stop().animate({
              "left": "50%"
            }, 100)
          }
        }
      }
    })
  }

  // 定义点击短信验证登录
  verCodeClick() {
    let self = this
    $('.vcode_login').click(function () {
      $(".sub_line").stop().animate({
        "left": "0px"
      }, 300)
      // 转化为账户登录
      self.mySwiper.slidePrev()
    })
  }

  // 定义密码登录
  passwordClick() {
    let self = this
    $('.password_login').click(function () {
      $(".sub_line").stop().animate({
        "left": "50%"
      }, 100)
      // 转化为验证码登录
      self.mySwiper.slideNext()
    })
  }

}

new Common()