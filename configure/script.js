const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const code = urlParams.get("code") || "";

const baseURL = "https://itsalviiin.github.io/spotify-widget";
const redirect_uri = `${baseURL}/configure`;
let refresh_token = "";
let access_token = "";
let widgetURL = "";

function requestAuthorization() {
    const client_id = document.getElementById("client_id_box").value;
    const client_secret = document.getElementById("client_secret_box").value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret);

    let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURI(redirect_uri)}&show_dialog=true&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private`;
    window.location.href = url;
}

if (code != "") {
    fetchAccessToken(code);
} else {
    document.getElementById("connectBox").style.display = 'inline';
}

async function fetchAccessToken(code) {
    const client_id = localStorage.getItem("client_id");
    const client_secret = localStorage.getItem("client_secret");

    let body = `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURI(redirect_uri)}&client_id=${client_id}&client_secret=${client_secret}`;

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            'Authorization': `Basic ${btoa(client_id + ":" + client_secret)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });

    if (response.ok) {
        const responseData = await response.json();
        refresh_token = responseData.refresh_token;
        access_token = responseData.access_token;

        widgetURL = `${baseURL}?client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}`;
        document.getElementById("authorizationBox").style.display = 'inline';
    }
}

const clientIdBox = document.getElementById('client_id_box');
const clientSecretBox = document.getElementById('client_secret_box');
const authorizeButton = document.getElementById('authorizeButton');

function checkInputs() {
    if (clientIdBox.value.trim() === '' || clientSecretBox.value.trim() === '') {
        authorizeButton.disabled = true;
    } else {
        authorizeButton.disabled = false;
    }
}

clientIdBox.addEventListener('input', checkInputs);
clientSecretBox.addEventListener('input', checkInputs);

checkInputs();

function copyToURL() {
    navigator.clipboard.writeText(widgetURL);

    document.getElementById("copyURLButton").innerText = "Copied to Clipboard";
    document.getElementById("copyURLButton").style.backgroundColor = "#00dd63"
    document.getElementById("copyURLButton").style.color = "#ffffff";

    setTimeout(() => {
        document.getElementById("copyURLButton").innerText = "Click to Copy URL";
        document.getElementById("copyURLButton").style.backgroundColor = "#ffffff";
        document.getElementById("copyURLButton").style.color = "#181818";
    }, 10000);
}
