//no-same="设置2次输入密码不一致的提示，比如账号和密码 和支付密码，放在第二个密码控件上"
//errormsg="可以设置不匹配正则后的提示语，优先级高于此正则不匹配的全局默认提示语"
//表单验证新版方案2017-5-13
/*表单序列化*/
//给出警告语,macth="tel",equel
//function form_check(form, func, json) {
// 
//  var check_modle = {
//      tel: [/^1[345678]\d{9}$/, "请输入正确的手机号码"],
//      email: [/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, "邮箱格式不正确，请重新输入！"],
//      qq: [/^\d{5,10}$/, "QQ号输入不为纯数字或位数错误！"],
//      person_id: [/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$||^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, "身份证格式不对！"],
//      number: [/\d+/, "请输入纯数字"],
//      mix: [/\w*\D\w*/, "密码不能为纯数字"]
//  }
//  if (typeof arguments[2] != "function") {
//      $.extend(check_modle, json)
//  };
//
//  var form_json = getFormJson(form);
//
//  //检测多选，至少选择一项
//  if (form.find("[type='checkbox']").length) {
//      var chekbox_name = [];
//      form.find("[type='checkbox']").each(function () {
//          if (chekbox_name.join(",").indexOf($(this).attr("name")) < 0) {
//              chekbox_name.push($(this).attr("name"))
//          }
//      });
//
//      var item_name;
//      var tag = true;
//      while (chekbox_name.length) {
//          item_name = chekbox_name.shift();
//          if (!form_json[item_name]) {
//              go_alert2(form.find("input[name=" + item_name + "]").eq(0).attr("placeholder"));
//              tag = false;
//              break;
//          }
//
//      }
//      if (!tag) return false;
//  }
//
//  var tag = true;
//  //基础验证 ，是否为空
//  for (var item in form_json) {
//      var form_dom = form.find("[name =" + item + "]");
//      if (form_dom.attr("use-val") == "" && form_dom.val() == "") {
//          continue;
//      } else if (form_dom.val()) {
//
//
//          if (check_modle[form_dom.attr("match")] && !check_modle[form_dom.attr("match")][0].test(form_dom.val())) {
//              if (form_dom.attr("errormsg")) {
//
//                  //go_alert2(form_dom.attr("errormsg"));
//              } else {
//                  go_alert2(check_modle[form_dom.attr("match")][1]);
//
//              }
//              return false;
//
//          }
//          //检测密码二次输入是否一致
//          if (form_dom.attr("type") == "password" && form_dom.attr("name")) {
//
//              var ind = form.find("[type=password]").index(form_dom);
//
//              var next_psw = form.find("[type=password]").eq(ind + 1);
//              if (next_psw.length && !next_psw.attr("name")) {
//
//                  if (next_psw.val()) {
//                      if (form_dom.val() != next_psw.val()) {
//                          go_alert2(next_psw.attr("no-same") || "两次输入密码不一致")
//                          return false
//                      }
//
//                  } else {
//
//                      go_alert2(next_psw.attr("placeholder"))
//                      return false;
//
//                  }
//
//
//              }
//
//
//
//          }
//      }
//
//      //上传控件不做验证，交由其它插件做验证
//      if (form_dom.attr("type") != "file" && form_json[item] == "") {
//   
//          var input_dom = form.find("[name =" + item + "]")
//          if (input_dom.attr("placeholder")) {
//              go_alert2(input_dom.attr("placeholder").replace(/\(\w+\)/, ""));
//              tag = false
//              break;
//
//          }
//
//      };
//
//
//  }
//
//tag && (typeof func == "function") && func(form_json);
//}



//*表单前端验证JS 2017-2-11 qqmao1984*/
//只验证设置了required 属性的表单元素,设置了use-val属性则可以提交默认值
//动态添加的表单依然有效，通过计时器随时自动对新增的form 绑定事件
//表单需要匹配的正则模式，可以加match=正则，可以设置默认几种自定义的模式，模式名字随便起,match="yourname"即可。
(function () {

    $(function () {
        //生成样式
        $("head").append("<style>[required][waiting-change].error{ background-color: #f93; color:#fff}select[required][waiting-change].error{color:red; background-color: initial;}</style>")

        //自定义匹配正则模式
        var match_items = {
            "mail": /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            "tel": /^0?1[3|4|5|8][0-9]\d{8}$/,
            "number": /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/,
        };
        function form_check() {
            if ($("form").length == 0) return false;
            var page_forms = $("form:not([binded])");
            page_forms.each(function () {
                var that = $(this);
                $(this).attr("binded", "");
                $(this).find("[required]").attr("waiting-change", "").change(function () {
                    //删除之前的错误提示样式
                    $(this).removeClass("error");
                    //如果不等于默认值
                    if ($(this)[0].nodeName.toLocaleLowerCase() == "select") {

                        if ($(this).val() == $(this).find("option:first").val()) {
                            $(this).attr("waiting-change", "");
                            return;
                        }
                        else {
                            this.removeAttribute("waiting-change");

                        }

                    }
                    if ($(this).val() != this.defaultValue) {

                        //不等于默认值，如果设置匹配正则
                        if ($(this).attr("match") != undefined) {
                            //如果匹配模式有自定义
                            if (match_items[$(this).attr("match")] != undefined) {
                                var Reg = match_items[$(this).attr("match")];

                                //如果匹配模式没有自定义
                            } else {

                                eval("Reg=" + $(this).attr("match"));
                            }

                            //测试值是否配置模式
                            if (Reg.test($(this).val())) {

                                this.removeAttribute("waiting-change");


                            } else {

                                $(this).attr("waiting-change", "");

                            };

                            //不等于默认值，如果没有设置匹配正则	
                        } else {

                            this.removeAttribute("waiting-change")

                        }
                        //判断二次输入密码是否一致
                        if ($(this).prop("type") == "password") {

                            var ind = that.find("[required]").index($(this));

                            if (that.find("[required]").eq(ind - 1).prop("type") == "password" && that.find("[required]").eq(ind - 1).val() != "") {

                                if ($(this).val() != that.find("[required]").eq(ind - 1).val()) {
                                    $(this).attr("waiting-change", "");
                                    go_alert2("二次密码输入不一致")

                                } else {
                                    this.removeAttribute("waiting-change");
                                    that.find("[required]").eq(ind - 1)[0].removeAttribute("waiting-change");

                                }

                            } else if (that.find("[required]").eq(ind + 1).prop("type") == "password" && that.find("[required]").eq(ind + 1).val() != "") {

                                if ($(this).val() != that.find("[required]").eq(ind + 1).val()) {
                                    $(this).attr("waiting-change", "");
                                    go_alert2("二次密码输入不一致")


                                } else {
                                    this.removeAttribute("waiting-change");
                                    that.find("[required]").eq(ind + 1)[0].removeAttribute("waiting-change");

                                }

                            }
                        }

                        //和默认值一样
                    } else {

                        $(this).attr("waiting-change", "");

                    };


                });
                //提交前验证,禁止错误提交
                $(this).find("[type=submit],[type=image]").click(function (e) {
                    var form_dom = $(this).parents("form");
                    if (form_dom.find("[required][waiting-change]").not("[use-val]").length) {

                        var check_selects = form_dom.find("select[required][waiting-change]").not("[use-val]");
                        if (check_selects.length) {

                            //针对select下拉改变值不触发change ,再判断是不是初始值，如果都改变了就提交表单
                            var tag = true;
                            check_selects.each(function () {

                                if ($(this).val() == $(this).find("option:first").val()) {

                                    tag = false;
                                }

                            });

                            if (tag) {
                                if (form_dom.find("[required][waiting-change]:not('select')").length) {

                                    form_dom.find("[required][waiting-change]:not('select')").addClass("error");
                                    e.preventDefault();
                                } else {

                                    form_dom.submit();
                                }

                            } else {
                                form_dom.find("[required][waiting-change]").not("[use-val]").addClass("error");
                                e.preventDefault();

                            }


                        } else {
                            form_dom.find("[required][waiting-change]").not("[use-val]").addClass("error");
                            e.preventDefault()

                        }

                    }
                    else {

                        form_dom.submit();
                        e.preventDefault()

                    }

                })

            })

        };
        form_check();
        setInterval(function () {
            if ($("form:not([binded])").length) {
                form_check();
            }
        }, 10)
    })

})()     


