document.addEventListener('DOMContentLoaded', function(){

  // html include - start
  function includeHTML(reload, page) {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName('*');
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute('include-html');
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            elmnt.innerHTML = this.responseText;
            elmnt.removeAttribute('include-html');
            if (reload) {
              reloadComplete(page);
            } else {
              includeComplete();
            }
          }
        }
        xhttp.open('GET', file, true);
        xhttp.send();
        return;
      }
    }
  }
  includeHTML();

  function includeComplete() {
    changeNav();
    slider();
  }
  function reloadComplete() {
    // reload 경우
  }
  // html include - end

  // changeNav - start
  function changeNav() {
    var navAll = document.querySelectorAll('.nav');
    navAll.forEach(function (value, index) {
      var nav = navAll[index];
      var nav_itemAll = nav.querySelectorAll('.nav_item');
      nav_itemAll.forEach(function (value, index) {
        var nav_item = nav_itemAll[index];
        nav_item.addEventListener('click', function (e) {
          e.preventDefault();
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
    sliderAll.forEach(function (value, index) {
      var slider = sliderAll[index];
      var slider_list = slider.querySelector('.slider_list');
      var slider_itemAll = slider_list.querySelectorAll('.slider_item');
      var slider_width = slider.offsetWidth;
      slider_list.style.left = '0px';
      slider_itemAll.forEach(function (value, index) {
        var slider_item = slider_itemAll[index];
        slider_item.style.left = index * slider_width + 'px';
      });
      sliderControl(slider, slider_list);
    });
  }
  function sliderControl(slider, slider_list) {
    var sliderControl_btnAll = slider.querySelectorAll('.sliderControl .sliderControl_btn');
    sliderControl_btnAll.forEach(function (value, index) {
      var sliderControl_btn = sliderControl_btnAll[index];
      sliderControl_btn.addEventListener('click', function (e) {
        var slider_list_left = slider_list.style.left.split('px')[0];
        e.target.classList.forEach(function (value, index) {
          if (value == 'is_prev') {
            slider_list.style.left = Number(slider_list_left) + Number(slider_list.offsetWidth) + 'px';
          } else if (value == 'is_next') {
            slider_list.style.left = Number(slider_list_left) - Number(slider_list.offsetWidth) + 'px';
          }
        });
      });
    });
  }
  // slider - end

});