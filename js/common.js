document.addEventListener('DOMContentLoaded', function(){

  // html include - start
  function includeHTML() {
    var includeAll = document.querySelectorAll('[include-html]');
    var nowIndex = 0
    includeAll.forEach(function (value, index) {
      var include = includeAll[index];
      var include_url = include.getAttribute('include-html');
      if (include_url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            include.innerHTML = this.responseText;
            include.removeAttribute('include-html');
            if (++nowIndex == includeAll.length) {
              includeComplete();
            }
          }
        }
        xhttp.open('GET', include_url, true);
        xhttp.send();
        return;
      }
    });
  }
  includeHTML();

  function includeComplete() {
    // 최초 실행 경우
    keyboardOutline();
    goToPage();
    changeNav();
    reloadComplete();
  }

  function reloadComplete() {
    // 최초 실행 포함 페이지 이동시
    slider();
  }
  // html include - end

  // goToPage - start
  function goToPage() {
    var hrefAll = document.querySelectorAll('a[href]');
    hrefAll.forEach(function (value, index) {
      var href = hrefAll[index];
      href.addEventListener('click', function (e) {
        e.preventDefault();
        var container = document.querySelector('.container');
        var href_url = e.target.getAttribute('href');
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            container.innerHTML = this.responseText;
            reloadComplete();
          }
        }
        xhttp.open('GET', href_url, true);
        xhttp.send();
        return;
      });
    });
  };
  // goToPage - end

  // keyboardOutline - start
  function keyboardOutline() {
    document.addEventListener('keydown', function (e) {
      if (e.key == 'Tab') {
        if (!document.querySelector('body.onKeyDown')) {
          document.querySelector('body').className += 'onKeyDown'
        }
      }
    });
  }
  // keyboard_outline - end

  // changeNav - start
  function changeNav() {
    var navAll = document.querySelectorAll('.nav');
    navAll.forEach(function (value, index) {
      var nav = navAll[index];
      var nav_itemAll = nav.querySelectorAll('.nav_item');
      nav_itemAll.forEach(function (value, index) {
        var nav_item = nav_itemAll[index];
        nav_item.addEventListener('click', function (e) {
          var nav_item_select = nav.querySelector('.nav_item.is_active');
          if (e.target != nav_item_select) {
            nav_itemAll.forEach(function (value, index) {
              var nav_item = nav_itemAll[index];
              nav_item.className = nav_item.className.replace(/(?:^|\s)is_active(?!\S)/g , '');
            });
            e.target.className += " is_active";
          }
        });
      });
    });
  };
  // changeNav - end

  // slider - start
  function slider() {
    var sliderAll = document.querySelectorAll('.slider');
    if(sliderAll) {
      sliderAll.forEach(function (value, index) {
        var slider = sliderAll[index];
        var slider_list = slider.querySelector('.slider_list');
        var slider_list_width = slider_list.offsetWidth
        var slider_itemAll = slider_list.querySelectorAll('.slider_item');
        var slider_item_dummyFirst;
        var slider_item_dummyLast;
        slider_list.index = 0;
        slider_list.style.left = '0px';
        slider_itemAll.forEach(function (value, index) {
          var slider_item = slider_itemAll[index];
          slider_item.style.left = index * slider_list_width + 'px';
          if (index == 0) {
            slider_item_dummyFirst = slider_item.cloneNode(true);
            slider_item_dummyFirst.style.left = slider_itemAll.length * slider_list_width + 'px';
          } else if (index == slider_itemAll.length -1) {
            slider_item_dummyLast = slider_item.cloneNode(true);
            slider_item_dummyLast.style.left = -1 * slider_list_width + 'px';
          }
        });
        slider_list.prepend(slider_item_dummyLast);
        slider_list.append(slider_item_dummyFirst);
        sliderControl(slider, slider_list);
        sliderResize(slider_itemAll, slider_list);
      });
    }
  }
  function sliderControl(slider, slider_list) {
    var sliderControl_btnAll = slider.querySelectorAll('.sliderControl .sliderControl_btn');
    sliderControl_btnAll.forEach(function (value, index) {
      var sliderControl_btn = sliderControl_btnAll[index];
      sliderControl_btn.addEventListener('click', function (e) {
        var slider_list_left = slider_list.style.left.split('px')[0];
        e.target.classList.forEach(function (value, index) {
          if (value == 'is_prev') {
            slider_list.index--;
            slider_list.style.left = Number(slider_list_left) + Number(slider_list.offsetWidth) + 'px';
          } else if (value == 'is_next') {
            slider_list.index++;
            slider_list.style.left = Number(slider_list_left) - Number(slider_list.offsetWidth) + 'px';
          }
        });
        console.log(slider_list.index);
      });
    });
  }
  function sliderResize(slider_itemAll, slider_list) {
    window.addEventListener('resize', function (e) {
      slider_list.style.transition = "none";
      var endCheck = false;
      var slider_list_width = slider_list.offsetWidth;
      var slider_list_left = slider_list.style.left.split('px')[0];
      slider_itemAll.forEach(function (value, index) {
        var slider_item = slider_itemAll[index];
        slider_item.style.left = index * slider_list_width + 'px';
      });
      slider_list.style.left = slider_list.index * slider_list_width * -1 + 'px';
      window.setTimeout(function () {
        slider_list.style.transition = "";
      }, 10);
    });
  }
  // slider - end

});