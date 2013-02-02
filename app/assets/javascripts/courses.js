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
      $('#' + id).html(localStorage.getItem(id));
      $('#' + id).addClass('course');
      $('#' + id).attr("draggable","true");
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

if(!localStorage['start'])
  localStorage['start'] = 'fall';

var allowDelete = false;
var dragOnSelf = false;
var major;

var flip = false;
var flipcourse;
var flipmajor;

var period;

function addListeners(){
  this.classList.add('over');
  this.addEventListener('dragenter', handleDragEnter, false);
  this.addEventListener('dragover', handleDragOver, false);
  this.addEventListener('dragleave', handleDragLeave, false);
  this.addEventListener('drop', handleDrop, false);
}

function handleDragStart(e) {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';

  allowDelete = false;

  major = this.getAttribute('data-major');

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.innerHTML);



  if (this.getAttribute('data-period') == "spring") {
    //fix selecting - maybe possible to call adListeners directly on jQuery select
    $('.courseplace.spring').each(function(){
      this.addListeners();
   });
  } 
  else if(this.getAttribute('data-period') == "fall"){
    $('.courseplace.fall').each(function(){
     this.addListeners();
   });
  } else if(this.getAttribute('data-period') == "intensive-fall"){
    $('.intensive-fall').each(function(){
      this.addListeners();
   });
  } else if(this.getAttribute('data-period') == "intensive-spring"){
    $('.intensive-spring').each(function(){
      this.addListeners();
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
      flipmajor = this.getAttribute('data-major');
    }

    this.innerHTML = e.dataTransfer.getData('text/plain');
    this.setAttribute("draggable","true");
    this.classList.add("course");
    this.setAttribute('data-major', major);

    localStorage[String($(this).attr('id'))] = e.dataTransfer.getData('text/plain');
  }

  allowDelete = true;
  this.classList.remove('over');

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  if(allowDelete && !dragOnSelf && !flip) {
    this.classList.remove('course');
    this.removeAttribute('data-major')
    this.innerHTML = '';

    localStorage.removeItem(String($(this).attr('id')));

    if (this.classList.contains('courseplace')) {
    this.setAttribute("draggable","false");
    }
  } 

  if(flip){
    this.removeAttribute('data-major')
    this.setAttribute('data-major', flipmajor)

    this.innerHTML = flipcourse;

    localStorage[String($(this).attr('id'))] = flipcourse;
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
