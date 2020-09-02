import $ from './library/jquery.js';
import { cookie } from './library/cookie.js';

(function () {
  let id = location.search.split('=')[1]; // 获取id


  $.ajax({
    type: "get",
    url: "../../interface/getitem.php",
    data: {
      id: id
    },
    dataType: "json",
    success: function (res) {
      let picture = JSON.parse(res.pic);

      let template = `
            <h1>${res.title}</h1>
            <div class="p-picture">
                <img src="..${picture[1].src}">
            </div>
            <div class="p-price">
                <span class="yuan">￥</span>${res.price}
            </div>
            <div class="p-num">
                ${res.num}
            </div>
            <input type="number" value="1" min="1" max="${res.num}" id="num">
            <input type="button" value="加入购物车" id="additem">
            <div>
            ${res.details}
            </div>
            `;

      $('body').append(template).find('#additem').on('click', function () {
        addItem(res.id, res.price, $('#num').val());
      });
    }
  });



  function addItem (id, price, num) {
    let shop = cookie.get('shop'); // 从cookie中获取shop数据

    let product = {
      id: id,
      price: price,
      num: num
    };

    if (shop) { // 判断是否存有购物车数据
      shop = JSON.parse(shop);
      // 购物车中是否已经存在当前这件商品
      if (shop.some(elm => elm.id == id)) {
        // 修改数量
        shop.forEach(elm => {
          elm.id === id ? elm.num = num : null;
        });
      } else {
        // 添加商品
        shop.push(product);
      }

    } else {
      shop = [];
      shop.push(product);
    }

    cookie.set('shop', JSON.stringify(shop), 1);
  }
})();