
//identifiant twitch
const userId = 581574768;
const token = 'soarnnzm5nfk98m9u4ej91t4ac4ehl';
const ClientID = '3xtjpey5ewr5ig9uqxuhe9nkt3isj4';

//url de l'API stream
const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;

//paragraphe info du popup

const info = document.getElementById('info');
const detail = document.getElementById('details');
const img = document.getElementById('image');

//hearders - autorisation
const headers = {
    'Authorization' : `Bearer ${token}` ,
    'Client-ID' : ClientID
};

const cb = function(json) {   

    if(json.data == 0 ) {
        info.innerHTML = 'Nous ne sommes pas en live'
        detail.innerHTML = 'Voir notre dernière vidéo'
    } else { 
        img.style.display = "flex"
        info.innerHTML = 'Yume Squad est en live '
        detail.innerHTML = '<i class="fa-solid fa-gamepad" style="font-size:12px"></i>'+" " + json.data[0].game_name
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