import $ from './library/jquery.js'
import './library/jquery.cookie.js'
var id;
class Detail {
  constructor() {
    this.id = location.search.slice(5);
    //获取元素（放大镜）
    this.wrap = $(".fdj_box"); //大盒子
    this.spicBox = $("#spic");
    this.spic = $("#spic img"); //小图
    this.sf = $("#sf"); //小放
    this.bpic = $("#bpic"); //大图
    this.bf = $("#bf"); //大放
    //小图的切换列表盒子
    this.listUl = $("#list ul");
    this.list = $("#list");
    //渲染内容的盒子
    this.conBox = $(".mid_con");


  }
  init () {
    this.render();
    this.scale();
  }
  //渲染 //请求数据
  render () {
    id = location.search.split('=')[1]; // 获取id

    $.ajax({
      type: "get",
      url: "../.././php/getitem.php",
      data: {
        id: id
      },
      dataType: "json",
      success: function (res) {
        console.log(res);

        let picture = JSON.parse(res.picture);

        let temp = `<h1 class="tit_h">${res.title}</h1>
        <p class="tit_p">${res.title2}</p>
        <dl class="clearfix">
            <dt>售价：</dt>
            <dd class="pri">￥${res.price}</dd>
        </dl>
        <dl class="clearfix">
            <dt>促销信息：</dt>
            <dd></dd>
        </dl>
        <dl class="clearfix">
            <dt>商品评分：</dt>
            <dd>
                <i class="icon"></i>
                <i class="icon"></i>
                <i class="icon"></i>
                <i class="icon"></i>
                <i class="icon"></i>
            </dd>
        </dl>
        <dl class="clearfix">
            <dt>好评率：</dt>
            <dd>99%</dd>
        </dl>
        <dl class="clearfix">
            <dt>累计销量：</dt>
            <dd class="sailnum">${res.num}件</dd>
        </dl>
        <dl class="clearfix">
            <dt>配送至：</dt>
            <dd>
                <select name="" id="">
                    <option value="">北京市</option>
                </select>
            </dd>
            <dd>包邮</dd>
        </dl>
        <dl class="clearfix ">
            <dt>&nbsp;</dt>
            <dd>由格力董明珠店&nbsp;发货</dd>
        </dl>
        <dl class="clearfix">
            <dt>颜色：</dt>
            <dd class="color">${res.detatils}</dd>
        </dl>
        <dl class="clearfix">
            <dt>数量：</dt>
            <dd class="jj">
                <a href="javascript:;">-</a>
                <input type="text" value="1">
                <a href="javascript:;">+</a>
            </dd>
            <dd>有货</dd>
  
        </dl>
        <div class="mid_gm clearfix">
            <span><i class="iconfont icon-gouwuche1"></i><b>加入购物车</b></span>
            <a href="./buycar.html"><em>进入购物车</em></a>
        </div>
        <dl class="clearfix">
            <dt>支付：</dt>
            <dd><i class="iconfont icon-shouhou"></i> 立即支付</dd>
        </dl>`;
        let xt = '';
        for (let i = 0; i < picture.length; i++) {
          xt += `<li><img src=${picture[i].src} /></li>`;
        }

        $('#list>ul').append(xt);
        $('.mid_con').append(temp);



      }
    }).done((data) => {
      //渲染元素的调用
      this.jja = $(".jj a");
      this.jjinput = $(".jj input");
      this.gwc = $(".mid_gm span b");
      this.input = $(".jj input");
      this.shopNum();
      this.addcart();
    });
  }
  //放大镜
  scale () {
    //事件委托改变小图显示
    this.list.on("mouseover", (e) => {
      var e = e || window.event;
      var el = e.target || e.srcElement;
      if (el.nodeName === "IMG") {
        this.spic[0].src = el.src;
        this.bpic[0].src = el.src;
      }
    })
    //左右箭头
    let right1 = $("#right");
    let left1 = $("#left");
    //右箭头
    right1.on("click", () => {
      this.listUl.stop(true).animate({
        left: -this.listUl.width() / 5
      })
    })
    //左箭头
    left1.on("click", () => {
      this.listUl.stop(true).animate({
        left: 0
      })
    })
    //放大
    this.spicBox.on("mouseover", () => {
      //大放的宽高
      this.bf.css({
        width: this.bpic.width() / this.spic.width() * this.sf.width(),
        height: this.bpic.height() / this.spic.height() * this.sf.height()
      })
      //显示小放和大放
      this.sf.css({
        visibility: "visible"
      })
      this.bf.css({
        visibility: "visible"
      });

      //比例
      this.bl = this.bpic.width() / this.spic.width();
      //获取鼠标位置
      this.spicBox.on("mousemove", (e) => {
        var e = e || window.event;
        let left1 = e.pageX - this.spicBox.offset().left - this.sf.width() / 2;
        let top1 = e.pageY - this.spicBox.offset().top - this.sf.height() / 2;
        if (left1 <= 0) {
          left1 = 0;
        } else if (left1 >= this.spicBox.width() - this.sf.width()) {
          left1 = this.spicBox.width() - this.sf.width();
        }
        if (top1 <= 0) {
          top1 = 0;
        } else if (top1 >= this.spicBox.height() - this.sf.height()) {
          top1 = this.spicBox.height() - this.sf.height();
        }

        this.sf.css({
          left: left1,
          top: top1
        })
        this.bpic.css({
          left: -left1 * this.bl,
          top: -top1 * this.bl
        })
      })
    });

    //隐藏小放大放
    this.spicBox.on('mouseout', () => {
      this.sf.css({
        visibility: "hidden"
      })
      this.bf.css({
        visibility: "hidden"
      });
    })


  }
  //商品数量加减
  shopNum () {

    this.num = this.jjinput.val();
    this.input.on("blur", () => {
      this.num = this.jjinput.val();
      this.jjinput.val(this.num)
    });
    this.jja.eq(0).on("click", () => {

      this.num--;
      if (this.num <= 1) {
        this.num = 1
      }
      this.jjinput.val(this.num)
    })

    this.jja.eq(1).on("click", () => {

      this.num++;
      this.jjinput.val(this.num)
    })


  }
  //加入购物车
  addcart () {
    let $tk_box = $("#tk_box");
    let $tk_ll = $(".tk_ll");
    let $tk_js = $(".tk_js");
    this.gwc.on("click", () => {

      $tk_box.css({
        display: "block"
      })
      $tk_ll.on("click", () => {
        $tk_box.css({
          display: "none"
        })
      })

      let arrid = [];
      let arrnum = [];
      console.log(this.jjinput.val());
      //首先判断cookie储存里是否存在

      if ($.cookie("id") && $.cookie("num")) {
        arrid = $.cookie("id").split(",");
        arrnum = $.cookie("num").split(",");
      } else {
        arrid = [];
        arrnum = [];
      };
      console.log(arrid);
      console.log(arrnum);
      if (arrid.indexOf(id) == -1) {
        arrid.push(id);
        $.cookie("id", arrid, {
          expires: 7, //有效日期
          path: "/",
        });
        arrnum.push(this.jjinput.val());
        $.cookie("num", arrnum, {
          expires: 7, //有效日期
          path: "/",
        });
      } else {
        let index = arrid.indexOf(id); //找到该id的下标，相对应的也是num的下标
        let num = parseInt(arrnum[index]) + parseInt(this.jjinput.val());
        console.log(this.jjinput.val());
        arrnum[index] = num;
        $.cookie("num", arrnum, {
          expires: 7, //有效日期
          path: "/",
        });
      }
    })
  }

};
new Detail().init();





