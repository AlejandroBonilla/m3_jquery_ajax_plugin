$(function () {
  $("ul > li:first").css("background","green");
  $("ul > li").filter(":last").css("background","red");

  $("ul > li").filter(":eq(2)").css("background","blue");

  $("ul > li > span").filter(":eq(1)").click(e=>{
  
    var fontSize = parseInt($("ul >li").filter(":last").css("font-size"));
    fontSize *= 2;
    $("ul>li").filter(":last").css("font-size",`${fontSize}px`);
  })

  $(".lista4").css("background","black");

});