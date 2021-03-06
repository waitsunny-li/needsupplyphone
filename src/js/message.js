/*
 * @Author: liweilong
 * @Date: 2020-10-19 09:22:39
 */
let message = {
  // 成功消息
  success(content) {
    layer.open({
      content: content,
      skin: 'msg',
      style: 'background-color:#f0f9eb; color:#67C23A; border:none;bottom: 50%' //自定风格
        ,
      time: 2
    });
  },

  // 错误消息
  error(content) {
    layer.open({
      content: content,
      style: 'background-color:#fef0f0; color:#F56C6C; border:none;bottom: 50%' //自定风格
        ,
      skin: 'msg',
      time: 2
    });
  },

  // 提示消息
  info(content) {
    layer.open({
      content: content,
      style: 'background-color:#edf2fc; color:#909399; border:none;bottom: 50%' //自定风格
        ,
      time: 2,
      skin: 'msg',
    });
  },

  // 底部提示
  bconfirm(content, btnArry) {
    return new Promise((resolve, reject) => {
      layer.open({
        content: content,
        btn: btnArry,
        skin: 'footer',
        yes: resolve,
        no: reject,
      });
    })
  },

  // 提示消息
  warning(content) {
    layer.open({
      content: content,
      style: 'background-color:#fdf6ec; color:#E6A23C; border:none;bottom: 50%' //自定风格
        ,
      time: 2,
      skin: 'msg',
    });
  },

  // 加载中
  loading(content) {
    return layer.open({
      type: 2,
      content: content ? content : ''
    });
  },

  // prompt
  prompt(title, content) {
    return new Promise((resolve, reject) => {
      layer.open({
        title: [
          title,
          'background-color:#319595; color:#fff;'
        ],
        anim: 'up',
        content: content,
        btn: ['确认', '取消'],
        yes: resolve,

      });
    })
  }
}