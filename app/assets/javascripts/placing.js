function findintensiveplace(start, period, y, s){
  if(period.indexOf("fall") != -1 && period.indexOf("spring") != -1){
     if(localStorage.getItem("y" + y + "in" + s) === null){
      return "y" + y + "in" + s
    }
    else if (s < 2){
      return findintensiveplace(start, period, y, s+1)
    }
    else if (y < 3){
      return findintensiveplace(start, period, y+1, 1)
    }
    else {
      return "y1in1"
    }
  } 
  else if (period.indexOf("fall") != -1) {
    start == "fall" ? s = 1 : s = 2;
    if(localStorage.getItem("y" + y + "in" + s) === null){
      return "y" + y + "in" + s
    }
    else if (y < 3){
      return findintensiveplace(start, period, y+1, s)
    }
    else {
      return "y1in" + s
    }
  }
  else if (period.indexOf("spring") != -1){
    start == "spring" ? s = 1 : s = 2;
    if(localStorage.getItem("y" + y + "in" + s) === null){
      return "y" + y + "in" + s
    }
    else if (y < 3){
      return findintensiveplace(start, period, y+1, s)
    }
    else {
      return "y1in" + s
    }
  }
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
    start == "fall" ? s = 1 : s = 2;

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
    start == "spring" ? s = 1 : s = 2;
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
