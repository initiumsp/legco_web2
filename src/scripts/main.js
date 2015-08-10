(function(window, document, undefined){
  // Special configuration for touchscreens
  var is_touch_device = 'ontouchstart' in document.documentElement;
  if (is_touch_device) {
    //TODO
  };

  var previousBox = { style: { display: '' } };

  function showElement(el) {
    return function() {
      previousBox.style.display = 'none';
      el.style.display = 'block';
      previousBox = el;
    }
  }

  var areaReferences = document.getElementsByClassName('areaReference');
  console.log(areaReferences);
  var spanID;
  var divBorders = {
    //divID:           [ width% height% top% left% ]
    'div-demodemo'     : [31.3, 29.8,  7.5, 16.6],
    'div-estaesta'     : [49.3, 58.0, 40.5, 49.0],
    'div-cheung-yu-yan': [31.3,  1.0, 50.5, 16.5],
    'div-chan-hak-kan' : [31.3,  1.0, 48.0, 16.5],
    'div-fili-internal': [ 5.0,  4.0,  7.5, 16.6]
  };
  var divBorder;

  for (var i in areaReferences) {

    if (areaReferences.hasOwnProperty(i)) {

      // Find the span
      spanID = areaReferences[i].id;
      var span = document.getElementById(spanID);

      // Create a box on the matrix, corresponding the reference in span
      div = document.createElement('div');
      div.id = spanID.replace('span-', 'div-');
      div.className = 'box';

      divBorder = divBorders[div.id] || [0, 0, 0, 0];
      div.style.width  = divBorder[0] + '%';
      div.style.height = divBorder[1] + '%';
      div.style.top    = divBorder[2] + '%';
      div.style.left   = divBorder[3] + '%';

      var matrixBox = document.getElementById('matrixBox');
      matrixBox.appendChild(div);

      span.addEventListener('mousedown', showElement(div), false);
    }
  }

}(window, window.document));
