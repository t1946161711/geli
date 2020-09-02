import $ from '../js/library/jquery.js'
class Reg {
  constructor() {
    //获取元素
    this.name = $(".username");
    this.pass1 = $(".pass1");
    this.pass2 = $(".pass2");
    this.yzm = $(".yzm");
    this.randomnum = $(".num");

    this.ems = $(".tab_form em");
    this.btn = $(".btn input");

    //标记
    this.oNameFlag = true;
    this.oPass1Flag = true;
    this.oPass2Flag = true;
    this.oYzmFlag = true;

  }
  init () {
    this.username();
    this.passone();
    this.passtwo();
    this.picyz()
    this.submit()

  }
  //用户名验证
  username () {
    //获得焦点
    this.name.on("focus", () => {
      this.ems.eq(0).html('支持中文，字母、数字，"-","_"的组合,6-18个字符');
      this.ems.eq(0).css({
        color: "#ccc",
      })
      this.name.css({
        border: "1px solid red"
      });
    });
    //失去焦点
    this.name.on("blur", () => {
      if (this.name.val() !== "") {
        var reg = /^[0-9a-zA-Z\u4e00-\u9fa5\-\_]+$/;
        var length = this.name.val().replace(/[\u4e00-\u9fa5]/g, "**").length;
        if (length >= 6 && length <= 18) {
          if (reg.test(this.name.val())) {
            this.ems.eq(0).html("√");
            this.ems.eq(0).css({
              color: "green"
            });
            this.ajax()
            this.oNameFlag = true;
          } else {
            this.ems.eq(0).html("用户名格式不对");
            this.ems.eq(0).css({
              color: "red"
            });
            this.oNameFlag = false;
          }
        } else {
          this.ems.eq(0).html("用户名长度不对");
          this.ems.eq(0).css({
            color: "red"
          });
          this.oNameFlag = false;
        }
      } else {
        this.ems.eq(0).html("用户名不得为空");
        this.ems.eq(0).css({
          color: "red"
        });
        this.oNameFlag = false;
      }

    });
  }
  //密码验证
  passone () {
    //用户密码获得焦点
    this.pass1.on("focus", () => {
      this.ems.eq(1).html("建议使用字母，数字和符号两种及以上的组合，6-20个字符");
      this.ems.eq(1).css({
        color: "#ccc"
      });
      this.pass1.css({
        border: "1px solid red"
      });
    })
    //失去焦点
    this.pass1.on("blur", () => {
      if (this.pass1.val() == "") {
        this.ems.eq(1).html("密码不得为空");
        this.ems.eq(1).css({
          color: "red"
        });
      }

    })
    //内容改变
    this.pass1.on("input", () => {
      if (this.pass1.val() !== "") {
        if (this.pass1.val().length >= 6 && this.pass1.val().length <= 20) {
          var count = 0;
          var regNum = /[0-9]/;
          var regLowerCase = /[A-Z]/;
          var regUpperCase = /[a-z]/;
          var regOther = /[\W\_]/;

          if (regNum.test(this.pass1.val())) {
            count++;
          }
          if (regLowerCase.test(this.pass1.val())) {
            count++;
          }
          if (regUpperCase.test(this.pass1.val())) {
            count++;
          }
          if (regOther.test(this.pass1.val())) {
            count++;
          }
          switch (count) {
            case 1:
              this.ems.eq(1).html("弱，有被盗风险,建议使用字母、数字和符号两种及以上组合");
              this.ems.eq(1).css({
                color: "red"
              });
              this.oPass1Flag = false;
              break;

            case 2:
            case 3:
              this.ems.eq(1).html("中，安全强度适中，可以使用三种以上的组合来提高安全强度");
              this.ems.eq(1).css({
                color: "yellow"
              });
              this.oPass1Flag = true;
              break;
            case 4:
              this.ems.eq(1).html("强，你的密码很安全");
              this.ems.eq(1).css({
                color: "green"
              });
              this.oPass1Flag = true;
              break;
          }
        } else {
          this.ems.eq(1).html = ("密码长度出错");
          this.ems.eq(1).css({
            color: "red"
          });
          this.oPass1Flag = false;
        }

      } else {
        this.ems.eq(1).html("密码不得为空");
        this.ems.eq(1).css({
          color: "red"
        });
        this.oPass1Flag = false;
      }
      //用户名失去焦点

      if (this.pass2.val() !== "") {
        if (this.pass2.val() === this.pass1.val()) {
          this.ems.eq(2).html("√");
          this.ems.eq(2).css({
            color: "green"
          });
          this.oPass2Flag = false;
        } else {
          this.ems.eq(2).html("两次输入的密码不一致");
          this.ems.eq(2).css({
            color: "red"
          });
          this.oPass2Flag = false;
        }
      } else {
        this.ems.eq(2).html("密码不得为空");
        this.ems.eq(2).css({
          color: "red"
        })
        this.oPass2Flag = false;
      }
    })



  }
  //再次确认密码  
  passtwo () {
    //用户密码获得焦点
    this.pass2.on("focus", () => {
      this.ems.eq(2).html("请再次输入密码");
      this.ems.eq(2).css({
        color: "#ccc"
      });
      this.pass2.css({
        border: "1px solid red"
      });
    })
    //用户名失去焦点
    this.pass2.on("blur", () => {
      if (this.pass2.val() !== "") {
        if (this.pass2.val() === this.pass1.val()) {
          this.ems.eq(2).html("√");
          this.ems.eq(2).css({
            color: "green"
          });
          this.oPass2Flag = true;
        } else {
          this.ems.eq(2).html("两次输入的密码不一致");
          this.ems.eq(2).css({
            color: "red"
          });
          this.oPass2Flag = false;
        }
      } else {
        this.ems.eq(2).html("密码不得为空");
        this.ems.eq(2).css({
          color: "red"
        })
        this.oPass2Flag = false;
      }

    })


  }
  //随机验证码
  picyz () {
    //验证码获得焦点
    this.yzm.on("focus", () => {
      this.ems.eq(3).html("请输入图片里的验证码");
      this.ems.eq(3).css({
        color: "#ccc"
      });
      this.yzm.css({
        border: "1px solid red"
      });
    });


    //验证码的来源
    $(() => {
      this.randomnum.html(Math.random().toString(16).substr(-6));
      this.randomnum.on("click", () => {
        this.randomnum.html(Math.random().toString(16).substr(-6));
      })
    });
    //验证码失去焦点
    this.yzm.on("blur", () => {
      if (this.yzm.val() !== "") {
        if (this.yzm.val() == this.randomnum.html()) {
          this.ems.eq(3).html("√");
          this.ems.eq(3).css({
            color: "green"
          });
          this.oYzmFlag = true;
        } else {
          this.ems.eq(3).html("前后验证码不一致");
          this.ems.eq(3).css({
            color: "red"
          });
          this.oYzmFlag = false;
        }
      } else {
        this.ems.eq(3).html("验证码不得为空");
        this.ems.eq(3).css({
          color: "red"
        });
        this.oYzmFlag = false;
      }
      this.submit()
    })


  }
  //提交 //阻止默认事件
  submit () {
    let $form = $(".tab_form form")
    $form.on("submit", (e) => {
      // if ($(".tab_form input:checkbox").prop("checked")) {
      if (this.name.val() === '') {
        this.ems.eq(0).html('用户姓名不能为空');
        this.ems.eq(0).css({
          color: 'red'
        });
        this.oNameFlag = false;
      }
      if (this.pass1.val() === '') {
        this.ems.eq(1).html('密码不能为空');
        this.ems.eq(1).css({
          color: 'red'
        });
        this.oPass1Flag = false;
      }
      if (this.pass2.val() === '') {
        this.ems.eq(2).html('密码不能为空');
        this.ems.eq(2).css({
          color: 'red'
        });
        this.oPass2Flag = false;
      }

      if (this.yzm.val() === '') {
        this.ems.eq(3).html('手机号码不能为空');
        this.ems.eq(3).css({
          color: 'red'
        });
        this.oYzmFlag = false;
      }
      console.log(!this.oNameFlag, !this.oPass1Flag, !this.oPass2Flag, !this.oYzmFlag);
      if (!this.oNameFlag || !this.oPass1Flag || !this.oPass2Flag || !this.oYzmFlag) {
        if (e && e.preventDefault) {
          e.preventDefault();
        } else {
          window.event.returnValue = false;
        }
      }


      // }
      // else {
      //     alert("不同意无法注册");

      // }

    })

  }
  //发送请求 //验证用户名是否存在
  ajax () {
    $.ajax({
      url: "http://localhost/gelikongtiao/php/reg.php",
      type: "post",
      data: {
        username: this.name.val()
      }
    }).done((data) => {
      if (!data) {
        console.log(data);
        this.ems.eq(0).html("可使用的用户名");
        this.ems.eq(0).css({
          color: "green"
        });
      } else {
        this.ems.eq(0).html("还用户名已存在");
        this.ems.eq(0).css({
          color: "red"
        });
        this.oYzmFlag = false;
      }
    })
  }
}
new Reg().init();


