
var container = document.getElementById("container");

var channels = ['streamerhouse','freecodecamp', 'esl_csgo','cretetion','twitchpresents','itsmacau'];

function loadTwitch(){
  channels.forEach(function(chnl) {
    function makeURL(type, name){
      return 'https://api.twitch.tv/kraken/' + type + '/' + name +  '?client_id=lgghz9edvzz0ww7wzo5fz1d6xp4u6g';
    }
    $.getJSON(makeURL("streams", chnl), function(data) {
      console.log(data);
      var game, status, liveScreen, liveUsers;
      if (data.stream === null) {
        game = '<span class="off_text">Offline</span>';
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
        liveScreen = data.stream.preview.large;
        liveUsers = data.stream.viewers;
      };
      $.getJSON(makeURL('channels', chnl), function(data) {
        console.log(data);
        console.log(data.logo, data.display_name, data.status);
        var liveText = "";
        var eye = "";
        var className = status == 'online' ? "liveCh" : "offCh";
        if (className == 'offCh')  liveScreen = data.video_banner;
        if (className == 'liveCh') {
          liveText = '<div class="bottomleft">LIVE</div>';
          eye = '<i class="fa fa-eye" aria-hidden="true"> ' + liveUsers + '<span class="tooltiptext">Watching Now</span></i>';
        }
        var htm = '<div class="row ' + className +
        '"><div class="col-sm-6"><img src="' + liveScreen +
        '">'+ liveText + eye + '</div><div class="col-sm-3  text"><a href="'+data.url+'" target="_blank">'+data.display_name+'</a></div><div class="col-sm-3 game">' + game + '</div></div>';
        status == 'online' ? $("#container").prepend(htm) : $("#container").append(htm);
      });

    });

  });
}
$(document).ready(function() {
  loadTwitch();
  $("#on_btn").click(function(){
    $(".liveCh").show();
    $(".offCh").hide();
  });
  $("#off_btn").click(function(){
    $(".liveCh").hide();
    $(".offCh").show();
  });
  $("#all_btn").click(function(){
    $(".liveCh").show();
    $(".offCh").show();
  });
});
