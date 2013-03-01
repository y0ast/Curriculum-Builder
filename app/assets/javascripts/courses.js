$(function(){
    $('.february').tooltip();

    var courseplaces = document.querySelectorAll('.courseplace');
    [].forEach.call(courseplaces, function(courseplace){
      addStartEndListeners(courseplace);
    });

    var courses = document.querySelectorAll('.course');
    [].forEach.call(courses, function(course){
      addStartEndListeners(course);
    });

    var notdraggables = document.querySelectorAll('.bin');
    [].forEach.call(notdraggables,function(notdraggable){
      notdraggable.addEventListener('dragenter', handleDragEnter, false);
      notdraggable.addEventListener('dragover', handleDragOver, false);
      notdraggable.addEventListener('dragleave', handleDragLeave, false);
      notdraggable.addEventListener('drop', handleDrop, false);
    });


    $(".icon-plus").click(function() {
      $("#course5").show();
      $("#curriculum").css("width","975");
      $(".course5").show('slow');
      $(".icon-plus").hide();
    });

    $(".icon-remove-circle").click(function() {
      $("#curriculum").css("width","1050"); //fix for weird resizing of first column
      $("#course5").hide('slow');
      $(".course5").hide('slow');
      $(".icon-plus").show();
      $("#curriculum").css("width","815");
  });

    var id;

    for (var i = 0; i < localStorage.length; i++){
      id = localStorage.key(i);
      storagetodiv(id);
    }

  $('.february').click(function(){
    //Flip the period on the courseplaces
    $('div.courseplace').each(function(){
      $(this).getAttribute('data-period') == "fall" ? $(this).setAttribute('data-period','spring') : $(this).setAttribute('data-period','fall');
    });

    $('.courseplace').html('').removeAttribute('data-major');

    $('.period').each(function(){
      $(this).html() == "Fall" ? $(this).html('Spring') : $(this).html('Fall');
    });

    // Clean up localStorage
    var period = localStorage['start'];
    localStorage.clear();
    period == 'fall' ? localStorage['start'] = 'spring' : localStorage['start'] = 'fall';
  });

});

function addStartEndListeners(e) {
  e.addEventListener('dragstart', handleDragStart, false);
  e.addEventListener('dragend', handleDragEnd, false);
}

function storagetodiv(id){
  if (id == "start" || localStorage[id] == 'undefined')
    return false;

  var course = JSON.parse(localStorage.getItem(id));

  var courseplace = document.getElementById(id);

  courseplace.classList.add("course");
  courseplace.setAttribute('data-major', course.major);
  courseplace.setAttribute('data-period', course.period);
  courseplace.setAttribute('draggable', 'true');

  courseplace.innerHTML = '\
    <div class="infolink">\
      <a href="/courses/' + course.id + '">\
        <i class="icon-info-sign"></i>\
      </a>\
    </div>\
    <ul>\
      <li><h5>' + course.name +'</h5></li>\
      <li>' + course.major + ' - ' + course.level +'</li>\
      <li>' + course.period + '</li>\
    </ul>';

   addStartEndListeners(courseplace);

   checkprereq(id);
}


if(!localStorage['start'])
  localStorage['start'] = 'fall';

var allowDelete = false;
var dragOnSelf = false;


function addListeners(place){
  place.classList.add('over');
  place.addEventListener('dragenter', handleDragEnter, false);
  place.addEventListener('dragover', handleDragOver, false);
  place.addEventListener('dragleave', handleDragLeave, false);
  place.addEventListener('drop', handleDrop, false);
}

function handleDragStart(e) {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';

  allowDelete = false;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.id);

  if(this.getAttribute('data-period').indexOf('intensive-fall') >= 0){
    $('div.intensive-fall').each(function(){
        addListeners(this);
    });
  }

  else if(this.getAttribute('data-period').indexOf('intensive-spring') >= 0){
    $('div.intensive-spring').each(function(){
        addListeners(this);
    });
  } 

  else if (this.getAttribute('data-period').indexOf('spring') >= 0){
    $('div.spring').each(function(){
     addListeners(this);
   });
  }

  else if (this.getAttribute('data-period').indexOf('fall') >= 0){
    $('div.fall').each(function(){
     addListeners(this);
   });
  }

}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
}

function handleDragLeave(e) {
// this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  //seems unnecessary for now
  // if (e.stopPropagation) {
  //   e.stopPropagation(); // Stops some browsers from redirecting. 
  // }

  if (e.preventDefault) {
    e.preventDefault(); // Necessary for firefox. Allows us to drop.
  }

  if(this.id == e.dataTransfer.getData('text/plain')){
    dragOnSelf = true;
  }

  if (!this.classList.contains("bin")){
    localStorage[this.id] = localStorage[e.dataTransfer.getData('text/plain')];
    storagetodiv(this.id);
  }

  allowDelete = true;
  this.classList.remove('over');

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  if (allowDelete && !dragOnSelf) {
    this.classList.remove('course');
    this.removeAttribute('data-major')
    this.innerHTML = '';

    localStorage.removeItem(this.id);

    if (this.classList.contains('courseplace')) {
      this.setAttribute("draggable","false");
    }

    for (var i = 0; i < localStorage.length; i++){
      id = localStorage.key(i);
      if (id != 'start')
        storagetodiv(id);
    }
  } 

  this.style.opacity = '1';
  dragOnSelf = false;

  $('.courseplace').each(function(){
      this.classList.remove('over');
      this.removeEventListener('dragenter', handleDragEnter, false);
      this.removeEventListener('dragover', handleDragOver, false);
      this.removeEventListener('dragleave', handleDragLeave, false);
      this.removeEventListener('drop', handleDrop, false);
   });
}
