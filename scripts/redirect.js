// If HTTP then redirect to HTTPS
function checkHTTPS(){
  var url = window.location.href;
  if(url.substring(0,5) !== "https"){
    var newurl = "https"+url.substring(4);
    window.location.href=newurl;
  }
};
