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

function findplace(start, period, y, s, c){
  var amountOfCourses = 4;

  $('#course5').is(":visible") ? amountOfCourses = 5 : amountOfCourses = 4;

  if(period.indexOf("fall") != -1 && period.indexOf("spring") != -1){
    if(localStorage.getItem("y" + y + "s" + s + "c" + c) === null){
      return "y" + y + "s" + s + "c" + c
    }
    else if(c < amountOfCourses){
      return findplace(start,period, y , s, c+1)
    }
    else if(s == 1){
      return findplace(start,period, y , 2, 1)
    }
    else if(y < 3){
      return findplace(start,period, y+1, 1, 1)
    }
    else {
      return "y1s1c1";
    }
  }
  else if (period.indexOf("fall") != -1) {
    start == period ? s = 1 : s = 2;

    if(localStorage.getItem("y" + y + "s" + s + "c" + c) === null){
      return "y" + y + "s" + s + "c" + c
    }
    else if(c < amountOfCourses){
      return findplace(start,period, y , s, c+1)
    }
    else if(y < 3){
      return findplace(start,period, y+1, s, 1)
    }
    else {
      return "y1s1c1";
    }
  } else if (period.indexOf("spring") != -1){
    start == period ? s = 1 : s = 2;
    if(localStorage.getItem("y" + y + "s" + s + "c" + c) === null){
      return "y" + y + "s" + s + "c" + c
    }
    else if(c < amountOfCourses){
      return findplace(start,period, y , s, c+1)
    }
    else if(y < 3){
      return findplace(start,period, y+1, s, 1)
    }
    else {
      return "y1s1c1";
    }
  }
}

function checkprereq(id){
  prerequisites = JSON.parse(localStorage.getItem(id)).prerequisites;
  split = id.split("");
  var y = split[1];
  var s = 2

 for (var i = 1; i <= y; i++) {
  if (i == y)
    s = split[3] - 1;
   for (var j = 1; j <= s; j++) {
     for (var k = 1; k <= 5; k++) {
      if (localStorage.getItem("y" + i + "s" + j + "c" + k) != undefined){
        index = prerequisites.indexOf(JSON.parse(localStorage.getItem("y" + i + "s" + j + "c" + k)).id);
      if (index != -1){
        prerequisites.splice(index,1);
      }
        } 
      }
    }
  }

  if(prerequisites.length == 0) 
    return true;
  else
     return setPrereqTooltips(prerequisites,id)
}

function setPrereqTooltips(prereqid, course){
  console.log(prereqid);
  console.log(course);
  $.getJSON('/courses.json', {"id" : prereqid}, function(data) {
    var items = 'Missing prerequisites: <br/> <ul class="unstyled">';
 
    $.each(data, function(key,val) {
      items += '<li>' + val.name + '</li>';
    });

    items += '</ul>'
    console.log(items)
    $('#' + course + "> div > a > i").attr('data-placement', 'right').attr('data-original-title',items).tooltip('fixTitle');
  });

  return true;
}


if(!localStorage['start'])
  localStorage['start'] = 'fall';

var allowDelete = false;
var dragOnSelf = false;

var flip = false;
var flipcourse;


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

  if (this.getAttribute('data-period').indexOf('spring') >= 0){
    $('div.spring').each(function(){
     addListeners(this);
   });
  }

  if (this.getAttribute('data-period').indexOf('fall') >= 0){
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

  if(this.classList.contains('course')){
    flip = true;
  }

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
    if(flip){
      flipcourse = localStorage[this.id];
    }

    localStorage[this.id] = localStorage[e.dataTransfer.getData('text/plain')];
    storagetodiv(this.id);
  }

  allowDelete = true;
  this.classList.remove('over');

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  if (allowDelete && !dragOnSelf && !flip) {
    this.classList.remove('course');
    this.removeAttribute('data-major')
    this.innerHTML = '';

    localStorage.removeItem(this.id);

    if (this.classList.contains('courseplace')) {
      this.setAttribute("draggable","false");
    }
  } 

  //Not checking if flipped course is allowd on that spot: this.classList.contains(flipcourse.period)

  if(flip){
    localStorage[this.id] = flipcourse;
    storagetodiv(this.id);
  }

  this.style.opacity = '1';
  dragOnSelf = false;
  flip = false;

  $('.courseplace').each(function(){
      this.classList.remove('over');
      this.removeEventListener('dragenter', handleDragEnter, false);
      this.removeEventListener('dragover', handleDragOver, false);
      this.removeEventListener('dragleave', handleDragLeave, false);
      this.removeEventListener('drop', handleDrop, false);
   });
}
