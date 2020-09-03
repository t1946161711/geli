import $ from '../js/library/jquery.js'
class Lbt {
  constructor() {
    //index轮播图
    //获取元素
    this.box = $(".banner");
    this.imgBoxUl = $(".imgBox ul");
    this.imgLi = $(".imgBox ul li");
    this.ydBox = $(".ydBox");
    this.ydLis = $(".ydBox li");
    this.left = $("#left");
    this.right = $("#right");
    this.timer = null;
    // 计算
    //图片盒子的宽高
    //页面宽度
    this.clientWidth = $(window).width();
    this.liWidth = this.imgLi.eq(0).width();
    this.imgBoxUl.css("width", this.clientWidth * this.imgLi.length);
  }
  init () {
    //index轮播图  
    this.yuandian();
    this.mouse();
  }
  //圆点点击事件
  yuandian () {
    this.num = 0;
    this.ydLis.each((index, selector) => {
      $(selector).on("click", () => {
        this.num = index;
        if ($(selector)[0] != $(".listLi")[0]) {
          this.move();
        };
      });
    });
  }

  //自动播放
  autoPlay () {
    this.timer = setInterval(() => {
      this.num++;
      if (this.num === this.ydLis.length + 1) {
        this.imgBoxUl.css({
          left: 0
        });
        this.num = 1;
      }
      //判断设置小圆点
      if (this.num === this.ydLis.length) {
        this.ydLis.eq(0).addClass('listLi').siblings().removeClass('listLi');
      } else {
        this.ydLis.eq(this.num).addClass('listLi').siblings().removeClass('listLi');
      }
      this.move();
    }, 2000)

  }
  //页面加载完成自动播放
  mouse () {
    $(() => {
      this.autoPlay();
      this.box.on("mouseover", () => {
        clearInterval(this.timer);
      });
      this.box.on("mouseout", () => {
        this.autoPlay();
      });
    })
  }
  //运动函数
  move () {
    this.ydLis.eq(this.num).addClass("listLi").siblings("li").removeClass("listLi");
    this.imgBoxUl.stop(true).animate({
      left: -this.clientWidth * this.num
    }, 800);
  }
}
new Lbt().init();

(function () {

  $.ajax({
    type: "get",
    url: "../.././php/alldata.php",
    dataType: "json",
    success: function (res) {
      console.log(res);
      let temp = '';
      res.forEach((elm, i) => {
        let picture = JSON.parse(elm.picture);
        console.log(picture);

        temp += `<li><a href="./items.html?id=${elm.id}">
        <img src="${picture[0].src}" alt="" alt="" class="hover">
              <p>${elm.title}</p>
              <span>${elm.title2}</span>
              <i>￥${elm.price}</i>
              </a></li>
              `;
      });
      $('.1f .F-right').append(temp);
    }
  });
})();
