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
    console.log('includeComplete');
  }

});