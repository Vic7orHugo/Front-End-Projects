
// Global variables
let api = "https://wind-bow.gomix.me/twitch-api/streams/";
let channels = ["freecodecamp", "singsing", "LowkoTV", "MrLlamaSC", "DannyGaminGnC", "AlaraShade", "Gorgcc", "l34um1"];
let profileImages = {
  "freecodecamp": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
  "singsing": "https://static-cdn.jtvnw.net/jtv_user_pictures/singsing-profile_image-11f10df8952aee16-300x300.jpeg",
  "LowkoTV": "https://static-cdn.jtvnw.net/jtv_user_pictures/9c5a176173c88590-profile_image-300x300.jpeg",
  "MrLlamaSC": "https://static-cdn.jtvnw.net/jtv_user_pictures/acad9d038d558c8a-profile_image-300x300.png",
  "DannyGaminGnC": "https://static-cdn.jtvnw.net/jtv_user_pictures/6b3fbeb6-1ab9-4427-b402-849db5d0bf25-profile_image-300x300.png",
  "AlaraShade": "https://static-cdn.jtvnw.net/jtv_user_pictures/alarashade-profile_image-ec378ed2b84a50a3-300x300.jpeg",
  "Gorgcc": "https://static-cdn.jtvnw.net/jtv_user_pictures/gorgcc-profile_image-469e05d25a1e8594-300x300.jpeg",
  "l34um1": "https://static-cdn.jtvnw.net/jtv_user_pictures/l34um1-profile_image-47612a7dcb63f547-300x300.png"
};
let buttonFlag = 'all';

$(document).ready(function() {
  
  channels.forEach(twitchAPI);
  
  $("#all").click(function() {
    buttonFlag = 'all';
    $("div.channel-box").remove();
    channels.forEach(twitchAPI);
  });
  
  $("#online").click(function() {
    buttonFlag = 'online';
    $("div.channel-box").remove();
    channels.forEach(twitchAPI);
  });
  
  $("#offline").click(function() {
    buttonFlag = 'offline';
    $("div.channel-box").remove();
    channels.forEach(twitchAPI);
  });

});

// Makes the full twitch channels query
function twitchAPI(channelId) {
  
  $.ajax( {
    url: api + channelId,
    dataType: 'jsonp',
    method: 'GET',
    success: function(data) {
      switch(buttonFlag) {
        case 'all':
          if (data.stream != null) {
            let title = data.stream.channel.status;
            let subject = data.stream.game;
            let banner = data.stream.channel.logo;
            let link = data.stream.channel.url;
            let desc = (subject + ' - ' + title).slice(0, 40);
            if (desc.length === 40) {
              desc += '...';  
            }
            $("#twitch-channels").after(channelBox(desc, banner, link, channelId, true));
            if (profileImage[channelId] !== banner) {
              profileImages[channelId] = banner;
            }
          } else {
            $("#twitch-channels").after(channelBox('Offline', profileImages[channelId], 'https://twitch.tv/' + channelId, channelId, false));
          }
          break;
        case 'online':
          if (data.stream != null) {
            let title = data.stream.channel.status;
            let subject = data.stream.game;
            let banner = data.stream.channel.logo;
            let link = data.stream.channel.url;
            let desc = (subject + ' - ' + title).slice(0, 40);
            if (desc.length === 40) {
              desc += '...';  
            }
            $("#twitch-channels").after(channelBox(desc, banner, link, channelId, true));
            if (profileImage[channelId] !== banner) {
              profileImages[channelId] = banner;
            }
          }
          break;
        case 'offline':
          if (data.stream == null) {
            $("#twitch-channels").after(channelBox('Offline', profileImages[channelId], 'https://twitch.tv/' + channelId, channelId, false));
          }
          break;
      }
            
    }
  });
  
}

// Creates the twitch channel boxes
function channelBox(description, userPic, channelUrl, chan, status) {
  // Changes color background depending if the streamer is "on" or "off"
  let boxDetails;
  status ? boxDetails = 'class="row channel-box bg-light-green pt-1 pb-1"' : boxDetails = 'class="row channel-box bg-dark text-light pt-1 pb-1"';
  // Html for the twitch channels boxes
  let box = '<div ' + boxDetails + '>\n<div class="col-md-2 text-center">\n<img class="small-img rounded" alt="..." src=' + userPic + '></img>\n</div>\n<div class="col-md-3 text-center pt-4 pb-3">\n<a class="font-ubuntu-400" target="_blank" href=' + channelUrl + '><span>' + chan + '</span></a>\n</div>\n<div class="col-md-7 pt-4 pb-3">\n<span><p class="font-ubuntu-400">' + description + '</span></p>\n</div>\n</div>';
  //let box = '<div class="row"><div class="col-md-3"></div><div class="col-md-6 bg-primary"><h1>FUCK YOU</h1></div><div class="col-md-3"></div>'
  return box;
}