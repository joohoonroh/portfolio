document.addEventListener('DOMContentLoaded', function(){

  // html include
  (function includeHTML() {
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
            includeComplete();
          }
        }
        xhttp.open('GET', file, true);
        xhttp.send();
        return;
      }
    }
  })();

  function includeComplete() {
    slider();
  }
  
  function slider() {
    var selectSlider = document.querySelectorAll('.slider');
    selectSlider.forEach(function (value, index) {
      var self = selectSlider[index];
      var self_list = self.querySelector('.slider_list');
      var self_item = self_list.querySelectorAll('.slider_item');
      var self_width = self.offsetWidth;
      self_list.style.left = '0px';
      self_item.forEach(function (value, index) {
        var self = self_item[index];
        self.style.left = index * self_width + 'px';
      });
      sliderControl(self, self_list);
    });
  }
  function sliderControl(target, target_list) {
    var slider_list = target.querySelector('.slider_list');
    var sliderControl_btn = target.querySelectorAll('.sliderControl .sliderControl_btn');
    sliderControl_btn.forEach(function (value, index) {
      var self = sliderControl_btn[index];
      self.addEventListener('click', function (e) {
        var nowSliderListLeft = target_list.style.left.split('px')[0];
        e.target.classList.forEach(function (value, index) {
          if (value == 'is_prev') {
            target_list.style.left = Number(nowSliderListLeft) - Number(target_list.offsetWidth) + 'px';
          } else if (value == 'is_next') {
            target_list.style.left = Number(nowSliderListLeft) + Number(target_list.offsetWidth) + 'px';
          }
        });
      });
    });
  }

});