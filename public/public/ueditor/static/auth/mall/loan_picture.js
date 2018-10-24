$(function(){
    var point = 0;
    $("#userImageInfoForm ").on("click", "img", function(){
        var src = $ ( this ).attr ( "src" );
        // console.log(src);
        // console.log($ ( this ));
        // var label = $ ( this ).siblings ( "label" ).html();
        // var name = label.substring( 0, label.indexOf("：") );
        $( "#dialog" ).html("<img src='" + src + "'  />");
        $( "#dialog" ).dialog( "open" );
    });
    $( "#dialog" ).dialog({
        modal:true,
        autoOpen:false,
        width: 600,
        maxHeight: 600,
        buttons:{
			'顺时针90°旋转':function () {
				point += 90;
				$( "#dialog img" ).css('transform', 'rotate(' + point + 'deg)');
			},
            '在新窗口中打开':function () {
				window.open ( $("#dialog img").attr("src") );
            }
        },
        position:["center",100]
    });
});