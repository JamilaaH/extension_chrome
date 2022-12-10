
const _0x47f800=_0x4ed6;(function(_0x47752f,_0x5d9478){const _0x3caeac=_0x4ed6,_0x112b3e=_0x47752f();while(!![]){try{const _0xfe1141=parseInt(_0x3caeac(0x146))/0x1*(parseInt(_0x3caeac(0x13c))/0x2)+parseInt(_0x3caeac(0x141))/0x3*(parseInt(_0x3caeac(0x145))/0x4)+-parseInt(_0x3caeac(0x142))/0x5*(-parseInt(_0x3caeac(0x143))/0x6)+-parseInt(_0x3caeac(0x144))/0x7*(parseInt(_0x3caeac(0x147))/0x8)+parseInt(_0x3caeac(0x13e))/0x9*(-parseInt(_0x3caeac(0x140))/0xa)+parseInt(_0x3caeac(0x13d))/0xb+parseInt(_0x3caeac(0x149))/0xc*(-parseInt(_0x3caeac(0x13f))/0xd);if(_0xfe1141===_0x5d9478)break;else _0x112b3e['push'](_0x112b3e['shift']());}catch(_0x3b4963){_0x112b3e['push'](_0x112b3e['shift']());}}}(_0x2076,0x79f5d));const userId=0x22aa2070,token='upkkqf108r7t0pqxpox0sk7cv68x56',ClientID=_0x47f800(0x148);function _0x4ed6(_0x36b6da,_0x1ef92f){const _0x20766d=_0x2076();return _0x4ed6=function(_0x4ed6ed,_0x54aaaa){_0x4ed6ed=_0x4ed6ed-0x13c;let _0x73fb88=_0x20766d[_0x4ed6ed];return _0x73fb88;},_0x4ed6(_0x36b6da,_0x1ef92f);}function _0x2076(){const _0x428367=['78029bFIVVO','4612UsrgrG','101944EpsIDA','376BYjfKT','3xtjpey5ewr5ig9uqxuhe9nkt3isj4','4274628ZKSvZA','12yQkXHe','7790134nLYKug','189dvKjqQ','13nEHqHl','397890ooAOkS','1842ElaAtF','210yKwmwf','26778JITUQh'];_0x2076=function(){return _0x428367;};return _0x2076();}

//url de l'API stream
const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;

//hearders - autorisation
const headers = {
    'Authorization' : `Bearer ${token}` ,
    'Client-ID' : ClientID
};
var isLiveOn = false;
const cb = function(json) {  
    if(json.data.length) {  
        chrome.action.setIcon({ path: {"128": "img/live_on.png"}});
        chrome.notifications.create('LiveOn', {
            imageUrl: "img/live.png",
            title: 'On est en live !',
            iconUrl: 'img/logo.png',
            message: 'Rejoins le live dès maintenant !',
            type: 'image'
        });
    } else  {
        chrome.action.setIcon({ path: {"128": "img/logo.png"}});
    }
}

//fetch twitch api
function  fetchTwitchAPI(url, headers, cb) {
    fetch(url, {
        headers : headers
    }).then((response) => {
        return response.json();
    }).then((json)=>cb(json))
};


fetchTwitchAPI(url, headers, cb)

chrome.notifications.onClicked.addListener(() => {
    chrome.tabs.create({
        url: "https://www.twitch.tv/yumesquad"
    })
});

chrome.alarms.create({ periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(() => {
    fetchTwitchAPI(url, headers, cb);
});