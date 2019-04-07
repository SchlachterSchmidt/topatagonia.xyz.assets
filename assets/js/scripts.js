///*
//* Zoom Images, Get Date and Shadow
//* ========================================================================== */
//
//(function() {
//  /* variables */
//  var shadow = document.getElementById('shadow');
//  var images = document.querySelectorAll('.blog-content a img');
//  var imageHeight = window.innerHeight - 20;
//
//  /* events */
//  shadow.addEventListener('click', resetShadow, false);
//  window.addEventListener('keydown', resetStyles, false);
//  window.addEventListener('resize', refreshImageSizes, false);
//
//  /* functions */
//  setDate();
//  toggleImages();
//
//
//  function setDate() {
//    var currentYear = document.querySelector('.full-year');
//    if (currentYear) {
//      currentYear.innerHTML = new Date().getFullYear();
//    }
//  }
//
//  function refreshImageSizes() {
//    // select all images
//    [].forEach.call(images, function(img) {
//      // if image zoomed
//      if (img.classList.contains('img-popup')) {
//        img.style.maxHeight = imageHeight + 'px';
//        img.style.marginLeft = '-' + (img.offsetWidth / 2) + 'px';
//        img.style.marginTop = '-' + (img.offsetHeight / 2) + 'px';
//      }
//    });
//  }
//
//  function resetShadow() {
//    shadow.style.display = 'none';
//    resetAllImages();
//  }
//
//  function resetStyles(event) {
//    if (event.keyCode == 27) {
//      event.preventDefault();
//      shadow.style.display = 'none';
//      resetAllImages();
//    }
//  }
//
//  function resetAllImages() {
//    [].forEach.call(images, function(img) {
//      img.classList.remove('img-popup');
//      img.style.cursor = 'zoom-in';
//      img.style.marginLeft = 'auto';
//      img.style.marginTop = 'auto';
//    });
//  }
//
//  function toggleImages() {
//    [].forEach.call(images, function(img) {
//      img.addEventListener('click', function(event) {
//        event.preventDefault();
//        img.classList.toggle('img-popup');
//        if (img.classList.contains('img-popup')) {
//          img.style.cursor = 'zoom-out';
//          img.style.maxHeight = imageHeight + 'px';
//          img.style.marginLeft = '-' + (img.offsetWidth / 2) + 'px';
//          img.style.marginTop = '-' + (img.offsetHeight / 2) + 'px';
//          shadow.style.display = 'block';
//        } else {
//          img.style.cursor = 'zoom-in';
//          img.style.maxHeight = '100%';
//          img.style.marginLeft = 'auto';
//          img.style.marginTop = 'auto';
//          shadow.style.display = 'none';
//        }
//      });
//    });
//  }
//})();


/*
* Aside Resize
* ========================================================================== */

(function() {
  var aside = document.querySelector('.sidebar');
  var mainContainer = document.querySelectorAll('.content-wrapper');
  var switcher = document.getElementById('switcher');

  switcher.addEventListener('click', slide, false);


  function slide() {
    aside.classList.add('transition-divs');
    aside.classList.toggle('aside-left');
    [].forEach.call(mainContainer, function(c) {
      c.classList.add('transition-divs');
      c.classList.toggle('centering');
    });
  }
})();



/*
* Image gallery resize
* ========================================================================== */
window.onload=function(){
  $("#gallery").justifiedGallery({
      rowHeight : 220,
      maxRowHeight: 340,
      margins : 5,
      border : 0,
      fixedHeight: false,
      lastRow : "nojustify",
      captions: true
  });

  $("#gallery").fadeIn(500);


/*
* Image slideshow
* ========================================================================== */
  $('img.gallery-image').click(function(){
    var currentImage = $(this).data('value');
    openModal()
    showImage(currentImage)
  });

  $('#close').click(function(){
    closeModal()
  });

 $('#next').click(function(){
    var currentImage = findDisplayedImage();
    showImage(currentImage + 1)
 });

  $('#prev').click(function(){
     var currentImage = findDisplayedImage();
     showImage(currentImage - 1)
  });

 function openModal() {
    $('#modal-container').css({'display': 'block'})
 }

 function closeModal() {
    $('#modal-container').css({'display': 'none'})
 }

 function findDisplayedImage() {
    return $('#modal-content').find('[style="display: block;"]').data('value');
 }

 function showImage(n) {
    var index = 0;
    var imgCount = $('.modal-image').length - 1
    // if we are displaying the last image and going forward
    if (n > imgCount) {
        index = 0
    }
    // if we are displaying the first image and going backwards
    else if (n < 0) {
        index = imgCount
    }
    // otherwise use arg
    else index = n
    // hide any displayed image
    $('.modal-image').css({'display': 'none'})
    // display only the selected image
    var image = $('#modal-content').find("[data-value='" + index + "']")
    image.css({'display': 'block'})
    $('#modal-caption').html(image.attr('alt'))
 }

 $(document).keydown(function(event) {
    // left arrow
    if (event.which == 37) {
        var currentImage = findDisplayedImage();
        showImage(currentImage - 1)
    }
    // right arrow
    if (event.which == 39) {
        var currentImage = findDisplayedImage();
        showImage(currentImage + 1)
    }
    // esc
    if (event.which == 27) {
        closeModal()
    }
 });

 /*
 * Single image
 * ========================================================================== */

  $('.post-image').click(function(){
      console.log("click")


    });
};
