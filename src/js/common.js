/*
 * @Author: liweilong
 * @Date: 2020-10-15 15:10:56
 */
class Common {
  constructor() {
    this.mySwiper = null

    this.BuyClick()
    this.UsedClick()
    this.listanBaner()
  }

  listanBaner() {
    this.mySwiper = new Swiper('.swiper-container', {
      autoHeight: true, //高度随内容变化
      on: {
        slideChange: function () {
          if (this.activeIndex == 0) {
            // 消除累计已用效果
            $('.used_wrap').removeClass("text_active bg_active2")
            // 激活效果
            $('.buy_wrap').addClass("text_active bg_active1")
          } else {
            // 消除累计已用效果
            $('.buy_wrap').removeClass("text_active bg_active1")
            // 激活效果
            $('.used_wrap').addClass("text_active bg_active2")
          }
        }
      }
    })
  }

  // 定义点击充值记录函数
  BuyClick() {
    let self = this
    $('.buy_wrap').click(function () {
      // 消除累计已用效果
      $('.used_wrap').removeClass("text_active bg_active2")
      // 激活效果
      $(this).addClass("text_active bg_active1")
      // 转化为充值记录表
      self.mySwiper.slidePrev()
    })
  }

  // 定义累计已用
  UsedClick() {
    let self = this
    $('.used_wrap').click(function () {
      // 消除累计已用效果
      $('.buy_wrap').removeClass("text_active bg_active1")
      // 激活效果
      $(this).addClass("text_active bg_active2")
      // 转化为累计已用记录表
      self.mySwiper.slideNext()
    })
  }

}

new Common()