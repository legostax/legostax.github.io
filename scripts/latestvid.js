var uploadID = "UUTksBrSxoiEgL_iTLqkvHig";
var APIkey = "To whoever stole this key: fuck you :)";
var id;
function dummy(j){
	id = j.items[0].contentDetails.videoId;
	$("#latestvid").attr("src", "https://www.youtube.com/embed/"+id);
	$("#latestvid").show();
};
function getLatest(obj){
	$(document).ready(function(){
		var uploadID = "UUTksBrSxoiEgL_iTLqkvHig";
		var APIkey = "AIzaSyA8Nlwzno4COtvrlO1wqs5c9KtFoDRI1q8";
		$.get("https://www.googleapis.com/youtube/v3/playlistItems?key="+APIkey+"&part=contentDetails&playlistId="+uploadID+"&maxResults=1", function(data, status){
			if(status === "success" && obj === undefined){
				dummy(data); // To prevent Adblock from blocking the player
			}else if(status === "success"){
				obj.echo("Latest video: https://www.youtube.com/watch?v="+data.items[0].contentDetails.videoId);
			}
		});
	});
};
