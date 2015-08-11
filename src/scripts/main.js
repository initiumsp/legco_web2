(function(window, document, undefined){
  'use strict';

  // Special configuration for touchscreens
  var is_touch_device = 'ontouchstart' in document.documentElement;
  if (is_touch_device) {
    //TODO
  };

  // Enable click-to-play for videos
  var video = document.getElementById('introVideo');
  video.addEventListener('click', function(){
    this.paused?this.play():this.pause();
  }, false)

}(window, window.document));
