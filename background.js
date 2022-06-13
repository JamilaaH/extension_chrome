
var _$_a0a0=["\x6D\x33\x6A\x6D\x74\x63\x77\x62\x70\x71\x31\x65\x76\x71\x6C\x37\x7A\x38\x68\x77\x30\x7A\x61\x6E\x6C\x63\x70\x38\x6B\x6E","\x33\x78\x74\x6A\x70\x65\x79\x35\x65\x77\x72\x35\x69\x67\x39\x75\x71\x78\x75\x68\x65\x39\x6E\x6B\x74\x33\x69\x73\x6A\x34"];
const userId=581574768;//1
const token=_$_a0a0[0];//2
const ClientID=_$_a0a0[1]


//url de l'API stream
const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;

//hearders - autorisation
const headers = {
    'Authorization' : `Bearer ${token}` ,
    'Client-ID' : ClientID
};

let isLiveOn = false
const cb = function(json) {   
    if(json.data.length  && !isLiveOn) {  
        chrome.action.setIcon({ path: {"128": "img/live_on.png"}});
        chrome.notifications.create('LiveOn', {
            imageUrl: "img/live.png",
            title: 'On est en live !',
            iconUrl: 'img/logo.png',
            message: 'Rejoins le live dès maintenant !',
            type: 'image'
        });
        isLiveOn = true;
    } else  {
        chrome.action.setIcon({ path: {"128": "img/logo.png"}});
        isLiveOn = false;
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