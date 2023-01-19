
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");

}
$(function () {
  /* 控制点击动画的效果   */
  $(".la").click(function () {
    var _this = $(this)
    if ($(this).css("top") !== "-30px") {
      $(this).animate({ top: "-30px", "font-size": "14px" }, 300)
      $(this).parent().find("input").focus()
    } else {
      if (_this.parent().find("input").val() == '' || _this.parent().find("select").val() == '請選擇') {
        _this.animate({ top: "0px", "font-size": "15px" }, 300)
      }
    }
  })

  $(".la").mouseover(function () {
    $(this).parent().find("input").unbind("blur")
  })
  $(".la").mouseout(function () {
    $(this).parent().find("input").bind("blur", function () {
      var _this = $(this)
      if (_this.parent().find(".la").css("top") == "-30px") {

        if (_this.val() == '') {
          _this.parent().find(".la").animate({ top: "0px", "font-size": "15px" }, 300)
        }
      }
    })
  })
  /*動畫結束*/

  var firstEnter = false   //第一次進來不做驗證函數
  var submitOver = false  //防止重复提交
  function checkUser(val) {
    if (val.trim() !== "") {
      return true
    } else {
      return false
    }
  }
  function checkEName(v) {
    if (checkUser(v) && /^[a-zA-Z ]+$/.test(trim(v)))
      return true;
    else
      return false;
  }
  function checkPhone(val) {
    var phone = /^[0-9]{8}$/;
    var v = val.trim();
    if (phone.test(v)) {
      return true
    } else {
      return false
    }
  }
  function checkEmail(val) {
    var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var v = val.trim();
    if (email.test(val)) {
      return true
    } else {
      return false
    }
  }
  function checkAgree(val) {
    if (val == false) {
      return false
    } else {
      return true
    }
  }
  function checkSelect(val) {
    if (val == '' || val == 'Please select') {
      return false
    } else {
      return true
    }
  }

  // 验证所有input (type=text) i参数代表要验证的表单元素dom，fn是一个表单验证规则函数
  function testInputText(i, fn) {
    var bool = false
    if (firstEnter) {
      if (!fn(i.val())) {
        i.parent().find(".error").css("display", "block")
        bool = false
      } else {
        i.parent().find(".error").css("display", "none")
        bool = true
      }
    } else {
      i.change(function () {
        if (!fn($(this).val())) {
          $(this).parent().find(".error").css("display", "block")
          bool = false
        } else {
          $(this).parent().find(".error").css("display", "none")
          bool = true
        }
      })
      i.bind('input propertychange', function () {
        if (!fn($(this).val())) {
          $(this).parent().find(".error").css("display", "block")
          bool = false
        } else {
          $(this).parent().find(".error").css("display", "none")
          bool = true
        }
      });
      i.blur(function () {
        if (!fn($(this).val())) {
          $(this).parent().find(".error").css("display", "block")
          bool = false
        } else {
          $(this).parent().find(".error").css("display", "none")
          bool = true
        }
      })
    }
    return bool
  }

  // 验证所有select i参数代表要验证的表单元素dom，fn是一个表单验证规则函数
  function testSelect(i, fn) {
    var bool = false
    if (firstEnter) {
      if (!fn(i.val())) {
        i.addClass("box_shadow")
        bool = false
      } else {
        i.removeClass("box_shadow")
        bool = true
      }
    } else {
      i.change(function () {
        if (!fn(i.val())) {
          i.addClass("box_shadow")
          bool = false
        } else {
          i.removeClass("box_shadow")
          bool = true
        }
      })
      i.blur(function () {
        if (!fn(i.val())) {
          i.addClass("box_shadow")
          bool = false
        } else {
          i.removeClass("box_shadow")
          bool = true
        }
      })
    }
    return bool
  }

  /*驗證所有的checkbox*/
  function testCheckbox(i) {
    var bool = false
    if (firstEnter) {
      if (i.is(":checked") == false) {
        i.parents('.level_item,.item').find(".error").css("display", "block")
        bool = false
      } else {
        i.parents('.level_item,.item').find(".error").css("display", "none")
        bool = true
      }
    } else {
      i.change(function () {
        if (i.is(":checked") == false) {
          i.parents('.level_item,.item').find(".error").css("display", "block")
          bool = false
        } else {
          i.parents('.level_item,.item').find(".error").css("display", "none")
          bool = true
        }
      })
    }
    return bool
  }

  var favoritesDom = $('input[name="favorites[]"]');
  testCheckbox(favoritesDom);
  var eNameDom = $(".eName")
  testInputText(eNameDom, checkEName)
  var phoneNumberDom = $(".phoneNumber")
  testInputText(phoneNumberDom, checkPhone)
  var emailDom = $(".email");
  testInputText(emailDom, checkEmail);
  var birthDateYDom = $("select[name=birthDateY]");
  testSelect(birthDateYDom, checkSelect);
  var birthDateMDom = $("select[name=birthDateM]");
  testSelect(birthDateMDom, checkSelect);
  var birthDateDDom = $("select[name=birthDateD]");
  testSelect(birthDateDDom, checkSelect);
  var sexDom=$(".sex");
  testSelect(sexDom,checkSelect);
  var ageBracketDom = $("select[name=ageBracket]");
  testSelect(ageBracketDom, checkSelect);
  var educationLevelDom = $("select[name=educationLevel]");
  testSelect(educationLevelDom, checkSelect);
  var jobPositionDom = $("select[name=jobPosition]");
  testSelect(jobPositionDom, checkSelect);
  var industryDom = $("select[name=industry]");
  testSelect(industryDom, checkSelect);
  var monthlyIncomeDom = $("select[name=monthlyIncome]");
  testSelect(monthlyIncomeDom, checkSelect);
  var interestsDom = $('input[name="interests[]"]');
  testCheckbox(interestsDom);
  // var familyMonthlyIncomeDom = $("select[name=FamilyMonthlyIncome]");
  // testSelect(familyMonthlyIncomeDom, checkSelect);
  var additionDom = $("input[name='addition']");
  testInputText(additionDom, checkUser);
  var clauseDom = $('input[name="clause"]');
  testCheckbox(clauseDom);
  

  $('#submit').click(function () {
    if (submitOver) {
      alert("不能重複提交");
    } else {
      firstEnter = true;
      var isValid = testCheckbox(favoritesDom);
      isValid = testInputText(eNameDom, checkEName) && isValid;
      isValid = testSelect(birthDateYDom, checkSelect) && isValid;
      isValid = testSelect(birthDateMDom, checkSelect) && isValid;
      isValid = testSelect(birthDateDDom, checkSelect) && isValid;
      isValid = testInputText(emailDom, checkEmail) && isValid;
      isValid = testInputText(phoneNumberDom, checkPhone) && isValid;
      isValid = testSelect(sexDom,checkSelect) && isValid;
      isValid = testSelect(ageBracketDom, checkSelect) && isValid;
      isValid = testSelect(educationLevelDom, checkSelect) && isValid;
      isValid = testSelect(jobPositionDom, checkSelect) && isValid;
      isValid = testSelect(industryDom, checkSelect) && isValid;
      isValid = testSelect(monthlyIncomeDom, checkSelect) && isValid;
      // isValid = testSelect(familyMonthlyIncomeDom, checkSelect) && isValid;
      isValid = testCheckbox(interestsDom) && isValid;
      isValid = testInputText(additionDom, checkUser) && isValid;
      isValid = testCheckbox(clauseDom) && isValid;

      if (isValid) {
        submitOver = true;
        $('form').submit();
      } else {
        alert('請驗證您的輸入是否有錯誤!');
      }
    }
  });

})