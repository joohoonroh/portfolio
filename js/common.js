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
    headerBgColor();

    // 페이지 이동시
    reloadComplete();
  }

  function reloadComplete() {
    // 최초 실행 포함 페이지 이동시
    slider();
  }
  // html include - end

  // headerBgColor - start
    function headerBgColor() {
      function headerPositionCheck() {
        var header = document.querySelector('.header');
        if (window.scrollY || document.scrollTop) {
          if (!document.querySelector('.header.is_onScroll')) {
            header.className += " is_onScroll";
          }
        } else {
          header.className = header.className.replace(/(?:^|\s)is_onScroll(?!\S)/g , '');
        }
      }
      headerPositionCheck();
      window.addEventListener('scroll', function (e) {
        headerPositionCheck();
      });
    }
  // headerBgColor - end

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
            headerNavSync(href_url);
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

  // headerNavSync - start
  function headerNavSync(href_url) {
    changeNav.item.forEach(function (value, index) {
      value.className = value.className.replace(/(?:^|\s)is_active(?!\S)/g , '');
      if (value.getAttribute('href') == href_url) {
        value.className += " is_active";
      }
    });
  }
  // headerNavSync - end

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
    changeNav.item = [];
    var navAll = document.querySelectorAll('.nav');
    navAll.forEach(function (value, index) {
      var nav = navAll[index];
      var nav_itemAll = nav.querySelectorAll('.nav_item');
      nav_itemAll.forEach(function (value, index) {
        var nav_item = nav_itemAll[index];
        changeNav.item[index] = nav_item;
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
        slider_list.itemLength = slider_itemAll.length;
        slider_list.block = false;
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
        sliderTouchmove(slider, slider_list);
      });
    }
  }
  function sliderPageMove(direction, slider_list) {
    if (direction == 'prev') {
      var slider_list_left = slider_list.style.left.split('px')[0];
      slider_list.index--;
      slider_list.style.left = Number(slider_list_left) + Number(slider_list.offsetWidth) + 'px';
      if (slider_list.index < 0) {
        window.setTimeout(function () {
          slider_list.style.transition = "none";
          slider_list.index = slider_list.itemLength - 1;
          slider_list.style.left = -(slider_list.itemLength - 1) * Number(slider_list.offsetWidth) + 'px';
          window.setTimeout(function () {
            slider_list.style.transition = "";
          }, 10);
        }, 440);
      }
    } else if (direction == 'next') {
      slider_list.index++;
      var slider_list_left = slider_list.style.left.split('px')[0];
      slider_list.style.left = Number(slider_list_left) - Number(slider_list.offsetWidth) + 'px';
      if (slider_list.index >= slider_list.itemLength) {
        window.setTimeout(function () {
          slider_list.style.transition = "none";
          slider_list.index = 0;
          slider_list.style.left = '0px';
          window.setTimeout(function () {
            slider_list.style.transition = "";
          }, 10);
        }, 440);
      }
    }
  }
  function sliderControl(slider, slider_list) {
    var sliderControl_btnAll = slider.querySelectorAll('.sliderControl .sliderControl_btn');
    sliderControl_btnAll.forEach(function (value, index) {
      var sliderControl_btn = sliderControl_btnAll[index];
      sliderControl_btn.addEventListener('click', function (e) {
        if (slider_list.block == true) {
          return false;
        }
        e.target.classList.forEach(function (value, index) {
          if (value == 'is_prev') {
            sliderPageMove('prev', slider_list);
          } else if (value == 'is_next') {
            sliderPageMove('next', slider_list);
          }
        });
        slider_list.block = true;
        window.setTimeout(function () {
          slider_list.block = false;
        }, 450);
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
  function sliderTouchmove(slider, slider_list) {
    var mouseChack = false;
    var moveX = 0;
    var startX = 0;
    slider.addEventListener('mousedown', function (e) {
      mouseChack = true;
      slider_list.style.transition = 'transform 0s';
    });
    slider.addEventListener('mouseup', function (e) {
      if (moveX > 20) {
        sliderPageMove('prev', slider_list);
      } else if (moveX < -20) {
        sliderPageMove('next', slider_list);
      }
      mouseChack = false;
      moveX = 0;
      startX = 0;
      slider_list.style.transform = '';
      slider_list.style.transition = '';
    });
    slider.addEventListener('mouseleave', function (e) {
      mouseChack = false;
      moveX = 0;
      startX = 0;
      slider_list.style.transform = '';
      slider_list.style.transition = '';
    }, false);
    slider.addEventListener('mousemove', function (e) {
      if (mouseChack) {
        if (!startX) {
          startX = e.x;
        }
        moveX = -(startX - e.x);
        slider_list.style.transform = 'translateX(' + moveX + 'px)';
      }
    });
  }
  // slider - end

});