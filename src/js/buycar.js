import $ from './library/jquery.js'
import './library/jquery.cookie.js'

class Car {
  constructor() {
    this.conlist = $(".content_list");
    this.fl_num = $(".fl_num");
    this.zongji = $(".zongji");
    this.str = "";
    this.counts = 0; //商品总件数
    this.arrid = []; //存储商品的编号。
    this.arrnum = []; //存储商品的数量。
  }
  init () {
    if ($.cookie("id") && $.cookie("num")) {
      this.arrid = $.cookie("id").split(",");
      this.arrnum = $.cookie("num").split(",");
      for (let i = 0; i < this.arrid.length; i++) {
        this.render(this.arrid[i], this.arrnum[i]);
      };
    }

  }
  //渲染
  function () {


    if (shop) {
      shop = JSON.parse(shop); //  有cookie数据 才转JSON

      let idList = shop.map(elm => elm.id).join(); // 获取所有id

      $.ajax({
        type: "get",
        url: "../.././php/alldata.php",

        dataType: "json",
        success: function (res) {
          var template = '';
          res.forEach((elm, i) => {
            let picture = JSON.parse(elm.pic);

            // 让ajax获得的数据结果的id 与 cookie中id  一一对应
            // 索引值不同

            // 从cookie中去筛选数据
            let arr = shop.filter(val => val.id == elm.id);

            template += `
                    <div class="man1_con clearfix">
                    <ul class="listBox">
                        <li class="pad_t20">
                            <input type="checkbox" name="" checked="">
                        </li>
                        <li class="man1_pro">
                            <a href="./detail.html?id=${value.id}">
                                <img title="${value.title}" src=${value.src} id=${value.id}>
                            </a>

                        </li>
                        <li class="man1_n">
                            <p class="man1_name">
                                <a href="./detail.html?id=${value.id}" title="${value.title}">${value.title}</a>
                            </p>

                            <div>
                                <a href="./detail.html?id=${value.id}" title="${value.detatils}"> ${value.detatils}</a>
                                <br>
                            </div>
                        </li>
                        <li class="man1_p_m">
                            <div class="price_font danjia">${value.price}
                            </div>
                        </li>

                        <li class="man1_p_m">
                            <div>
                                <button class="wid_jian" type="button">-</button>
                                <input class="wid_num" name="" type="text" value="${num}" autocomplete="off">
                                <button class="wid_jia" type="button">+</button>
                            </div>
                            <div class="stock_box">
                                库存:<span class="proAllQty">有货</span>
                            </div>
                        </li>
                        <li class="man1_p_m price_font xiaoji">
                            <strong class="xiaoji">${(num * value.price).toFixed(2)}</strong>
                        </li>
                        <li class="main1_del">
                            <a href="javascript:;">【删除】</a>
                           
                        </li>
                    </ul>
                </div>`;

          });

          $('.content_list').append(template);
        }
      });

    }
  }


  //  商品的件数和商品的总价
  calcprice () {
    let $sum = 0;
    let $count = 0;
    $('.man1_con').each((index, ele) => {
      console.log($(ele).find('.price_font strong').text());
      if ($(ele).find('.pad_t20 input').prop('checked')) {
        $sum += parseInt($(ele).find('.wid_num').val());
        $count += parseFloat($(ele).find('.xiaoji').text());
      }
    });
    //赋值
    $('.fl_num').html($sum);
    $('.zongji').html($count.toFixed(2));
  }
  //全选按钮
  allselector () {
    $(".allsel").each((idenx, item) => {
      $(item).on("change", () => {
        $(".cart-checkbox input:checkbox").prop("checked", $(item).prop("checked"));
        this.calcprice();
      });

    })
    //事件委托
    let $inputs = $('.cart-checkbox').find(':checkbox'); //获取渲染的复选框
    $('.cart-checkbox').on('change', $inputs, () => {
      if ($(".cart-checkbox input:checked").not(".allsel").length === $(".cart-checkbox input:checkbox").not(".allsel").length) {
        $('.allsel').prop('checked', true);
      } else {
        $('.allsel').prop('checked', false);
      }
      this.calcprice();
    });

  }
  //数量的改变
  count () {
    this.xiaoji = 0;
    //加加
    this.jias.each((index, item) => {
      $(item).on('click', () => {
        let $num = $(item).parents('.man1_con').find('.man1_p_m .wid_num').val();
        $num++;
        $(item).parents('.man1_con').find('.wid_num').val($num);

        this.calcsingleprice($(item));
        $(item).parents('.man1_con').find('.xiaoji').text(this.xiaoji);
        this.calcprice();
        this.setcookie($(item));
      });
    });

    //减减
    this.jians.each((index, item) => {
      $(item).on('click', () => {
        let $num = $(item).parents('.man1_con').find('.man1_p_m .wid_num').val();
        $num--;
        if ($num < 1) {
          $num = 1;
        };
        $(item).parents('.man1_con').find('.wid_num').val($num);
        this.xiaoji = 0;
        this.calcsingleprice($(item));
        $(item).parents('.man1_con').find('.xiaoji').text(this.xiaoji);
        this.calcprice();
        this.setcookie($(item));
      });
    });
    //输入改变
    this.num.each((index, item) => {
      $(item).on('input', () => {
        let $reg = /^\d+$/g;
        let $value = $(item).val();
        if (!$reg.test($value)) {
          $(item).val(1);
        }
        this.calcsingleprice($(item));
        $(item).parents('.man1_con').find('.xiaoji').text(this.xiaoji);
        this.calcprice();
        this.setcookie($(item));
      });
    })



  }
  //计算每个商品的总价
  calcsingleprice (obj) {
    let $dj = parseFloat(obj.parents('.man1_con').find('.danjia').text());
    let $num = parseInt(obj.parents('.man1_con').find('.wid_num').val());
    this.xiaoji = ($dj * $num).toFixed(2);

  }
  //获取cookie
  getcookie () {
    if ($.cookie("id") && $.cookie("num")) {
      this.arrid = $.cookie("id").split(',');
      this.arrnum = $.cookie("num").split(',');
    } else {
      this.arrid = [];
      this.arrnum = [];
    }
  }

  //设置cookie
  setcookie (obj) {
    this.getcookie();
    let $id = obj.parents('.man1_con').find('img').attr('id');
    this.arrnum[$.inArray($id, this.arrid)] = obj.parents('.man1_con').find('.wid_num').val();
    $.cookie('num', this.arrnum, { expires: 7, path: '/' })
  }
  //删除cookie
  delcookie (id, arrid) {
    let $index = -1; //删除的索引位置
    $.each(this.arrid, (index, value) => {
      if (id === value) {
        $index = index; //当前被删除的id的索引
      }
    });
    this.arrid.splice($index, 1); //改变原数组，删除id
    this.arrnum.splice($index, 1); //改变原数组，删除数量

    //覆盖存储
    $.cookie('id', this.arrid, { expires: 7, path: '/' })
    $.cookie('num', this.arrnum, { expires: 7, path: '/' })
  }
  //删除商品
  delshop () {

    $('.main1_del a').each((index, item) => {
      $(item).off("click");
      $(item).on('click', () => {
        this.getcookie();
        if (window.confirm('你确定要删除吗?')) {
          $(item).parents('.man1_con').remove();
          this.delcookie($(this).parents('.man1_con').find('img').attr('id'), this.arrid);
          this.calcprice();
        }
      })

    });
    $('.qb_del a').off("click");
    $('.qb_del a').on('click', () => {
      this.getcookie();
      if (window.confirm('你确定要全部删除吗?')) {
        $('.man1_con').each((index, item) => {
          if ($('.man1_con').find(':checkbox').is(':checked')) {
            $(item).remove();
            this.delcookie($(item).find('img').attr('id'), this.arrid);
          }
        });
        this.calcprice(); //计算总价
      }
    });
  }

}
new Car().init();

