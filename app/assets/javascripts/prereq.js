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
  $.getJSON('/courses.json', {"id" : prereqid}, function(data) {
    var items = 'Missing prerequisites: <br/> <ul class="unstyled">';
 
    $.each(data, function(key,val) {
      items += '<li>' + val.name + '</li>';
    });

    items += '</ul>'
    $('#' + course + "> div > a > i").attr('data-placement', 'right').attr('data-original-title',items).tooltip('fixTitle');
  });

  return true;
}