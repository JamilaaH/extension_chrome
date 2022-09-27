var _$_a0a0=["\x6D\x33\x6A\x6D\x74\x63\x77\x62\x70\x71\x31\x65\x76\x71\x6C\x37\x7A\x38\x68\x77\x30\x7A\x61\x6E\x6C\x63\x70\x38\x6B\x6E","\x33\x78\x74\x6A\x70\x65\x79\x35\x65\x77\x72\x35\x69\x67\x39\x75\x71\x78\x75\x68\x65\x39\x6E\x6B\x74\x33\x69\x73\x6A\x34"];
const userId=581574768;//1
const token=_$_a0a0[0];//2
const ClientID=_$_a0a0[1]

//url de l'API stream
const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;

//paragraphe info du popup

const info = document.getElementById('info');
const detail = document.getElementById('details');
const img = document.getElementById('image');
const titre = document.getElementById('titre');

//hearders - autorisation
const headers = {
    'Authorization' : `Bearer ${token}` ,
    'Client-ID' : ClientID
};

const cb = function(json) {   
    if(json.data == 0 ) {
        img.setAttribute('src', 'img/offline.png')
        info.innerHTML = 'Nous ne sommes pas en live'
        detail.innerHTML = 'Voir notre dernière vidéo'
        titre.innerHTML = ""
    } else { 
        console.log(json.data[0].title);
        img.setAttribute('src', 'img/live.png')
        info.innerHTML = 'Yume Squad est en live '
        detail.innerHTML = '<i class="fa-solid fa-gamepad" style="font-size:12px"></i>'+" " + json.data[0].game_name
        titre.innerHTML = json.data[0].title
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