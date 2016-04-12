var uploadID = "UUTksBrSxoiEgL_iTLqkvHig";
var APIkey = "AIzaSyA8Nlwzno4COtvrlO1wqs5c9KtFoDRI1q8";
var id;
function dummy(j){
	id = j.items[0].contentDetails.videoId;
	$("#latestvid").attr("src", "https://www.youtube.com/embed/"+id);
	$("#latestvid").show();
};
function getLatest(videos){
	$(document).ready(function(){
		var uploadID = "UUTksBrSxoiEgL_iTLqkvHig";
		var APIkey = "AIzaSyA8Nlwzno4COtvrlO1wqs5c9KtFoDRI1q8";
		$.get("https://www.googleapis.com/youtube/v3/playlistItems?key="+APIkey+"&part=contentDetails&playlistId="+uploadID+"&maxResults=1", function(data, status){
			if(status === "success" && videos === true){
				dummy(data);
			}else if(status === "success" && videos === false){
				console.log("got data");
				return data;
				//return data.items[0].contentDetails.videoId;
			}
		});
	});
};