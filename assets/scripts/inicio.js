window.onload = function() {
	var ownVideos = $("iframe");
    $.each(ownVideos, function (i, video) {                
        var frameContent = $(video).contents().find('body').html();
        if (frameContent) {
            $(video).contents().find('body').html(frameContent.replace("autoplay", ""));
        }
    });
    
    feather.replace();
}