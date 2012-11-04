$(function(){
    $('.february').tooltip();

    var courseplaces = document.querySelectorAll('.courseplace');
    [].forEach.call(courseplaces, function(courseplace){
      addStartEnd(courseplace);
    });

    var courses = document.querySelectorAll('.course');
    [].forEach.call(courses, function(course){
      addStartEnd(course);
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

      $("#y3s2c5").parent('td').show('slow');
      $("#y3s1c5").parent('td').show('slow');
      $("#y2s2c5").parent('td').show('slow');
      $("#y2s1c5").parent('td').show('slow');
      $("#y1s2c5").parent('td').show('slow');
      $("#y1s1c5").parent('td').show('slow');

      $(".icon-plus").hide();
    });

    $(".icon-remove-circle").click(function() {
      $("#curriculum").css("width","1050"); //fix for weird resizing of first column
      $("#course5").hide('slow');

      $("#y3s2c5").parent('td').hide('slow');
      $("#y3s1c5").parent('td').hide('slow');
      $("#y2s2c5").parent('td').hide('slow');
      $("#y2s1c5").parent('td').hide('slow');
      $("#y1s2c5").parent('td').hide('slow');
      $("#y1s1c5").parent('td').hide('slow');

      $(".icon-plus").show();

      $("#curriculum").css("width","815");
  });

    var id;

    for (var i = 0; i < localStorage.length; i++){
      id = localStorage.key(i);
      $('#' + id).html(localStorage.getItem(id));
      $('#' + id).addClass(localStorage.getItem(id + ' - major'));
      $('#' + id).addClass('course');
      $('#' + id).attr("draggable","true");
    }

  $('.february').click(function(){
    a = $('div.spring.courseplace');
    b = $('div.fall.courseplace');

    a.removeClass('spring').addClass('fall');
    b.removeClass('fall').addClass('spring');

    $('.courseplace').html('').removeClass('course SCI SSC HUM');

    $('.period').each(function(){
      $(this).html() == "Fall" ? $(this).html('Spring') : $(this).html('Fall');
    });

    var period = localStorage['start'];
    localStorage.clear();
    period == 'fall' ? localStorage['start'] = 'spring' : localStorage['start'] = 'fall';
  });

});

function addStartEnd(e) {
  e.addEventListener('dragstart', handleDragStart, false);
  e.addEventListener('dragend', handleDragEnd, false);
}

if(!localStorage['start'])
  localStorage['start'] = 'fall';

var allowDelete = false;
var dragOnSelf = false;
var major;

var flip = false;
var flipcourse;
var flipmajor;

var period;

function getMajor(source){
  if(source.classList.contains("SCI")){
    return "SCI";
  }
  if(source.classList.contains("SSC")){
    return "SSC" ;
  } 
  if(source.classList.contains("HUM")){
    return "HUM";
  }
}

function handleDragStart(e) {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';

  allowDelete = false;

  major = getMajor(this);

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.innerHTML);

  if (this.classList.contains("spring")) {
    $('.courseplace.spring').each(function(){
      this.classList.add('over');
      this.addEventListener('dragenter', handleDragEnter, false);
      this.addEventListener('dragover', handleDragOver, false);
      this.addEventListener('dragleave', handleDragLeave, false);
      this.addEventListener('drop', handleDrop, false);
   });
  } 
  else if(this.classList.contains("fall")){
    $('.courseplace.fall').each(function(){
      this.classList.add('over');
      this.addEventListener('dragenter', handleDragEnter, false);
      this.addEventListener('dragover', handleDragOver, false);
      this.addEventListener('dragleave', handleDragLeave, false);
      this.addEventListener('drop', handleDrop, false);
   });
  } else if(this.classList.contains("intensive-spring")){
    $('.intensive-fall').each(function(){
      this.classList.add('over');
      this.addEventListener('dragenter', handleDragEnter, false);
      this.addEventListener('dragover', handleDragOver, false);
      this.addEventListener('dragleave', handleDragLeave, false);
      this.addEventListener('drop', handleDrop, false);
   });
  } else if(this.classList.contains("intensive-spring")){
    $('.intensive-spring').each(function(){
      this.classList.add('over');
      this.addEventListener('dragenter', handleDragEnter, false);
      this.addEventListener('dragover', handleDragOver, false);
      this.addEventListener('dragleave', handleDragLeave, false);
      this.addEventListener('drop', handleDrop, false);
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

  if(this.innerHTML == e.dataTransfer.getData('text/plain')){
    dragOnSelf = true;
  }

  if (!this.classList.contains("bin")){
    if(flip){
      flipcourse = this.innerHTML;
      flipmajor = getMajor(this);
      this.classList.remove(flipmajor);
    }

    this.innerHTML = e.dataTransfer.getData('text/plain');
    this.setAttribute("draggable","true");
    this.classList.add("course");
    this.classList.add(major);

    localStorage[String($(this).attr('id'))] = e.dataTransfer.getData('text/plain');
    localStorage[String($(this).attr('id')) + ' - major'] = major;
  }

  allowDelete = true;
  this.classList.remove('over');

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  if(allowDelete && !dragOnSelf && !flip) {
    this.classList.remove('course');
    this.classList.remove(major);
    this.innerHTML = '';

    localStorage.removeItem(String($(this).attr('id')));
    localStorage.removeItem(String($(this).attr('id')) + ' - major');

    if (this.classList.contains('courseplace')) {
    this.setAttribute("draggable","false");
    }
  } 

  if(flip){
    this.classList.remove(major);
    this.classList.add(flipmajor);

    this.innerHTML = flipcourse;

    localStorage[String($(this).attr('id'))] = flipcourse;
    localStorage[String($(this).attr('id')) + ' - major'] = flipmajor;
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
