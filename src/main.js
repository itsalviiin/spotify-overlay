import './style.css'
import Gradient from './minigl.js';
import { Vibrant } from "node-vibrant/browser";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const client_id = urlParams.get("client_id") || "";
const client_secret = urlParams.get("client_secret") || "";
let refresh_token = urlParams.get("refresh_token") || "";
let access_token = "";

const visibilityDuration = urlParams.get("duration") || 0;
const hideAlbumArt = urlParams.has("hide_album_art");
const hideTimes = urlParams.has("hide_times");
const textScroll = urlParams.get("text_scroll") || "ease-in-out";

let currentState = false;
let currentSongUri = "";

const regex = /(?:featuring|with|feat\.?)\s+(.*)/i;
var gradient = new Gradient();

/** Spotify API */
async function refreshAccessToken() {
  let body = `grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${client_id}`;

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
    access_token = responseData.access_token;
  }
}

async function getCurrentlyPlaying() {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const responseData = await response.json();
      updatePlayer(responseData);
    } else {
      if (response.status === 401) {
        await refreshAccessToken();
      }
    }
  } catch (error) {
    setVisibility(false);
  }
}

function updatePlayer(data) {
  var isPlaying = data.is_playing;
  var songUri = data.item.uri;
  var duration = `${data.item.duration_ms / 1000}`;
  var progress = `${data.progress_ms / 1000}`;

  /** If song played or paused */
  if (isPlaying != currentState) {
    if (!isPlaying) {
      setVisibility(false);
      setTimeout(() => {
        topInfo.classList.remove("animate");
        topInfo.style.transform = "translateX(0)";
        gradient.pause()
      }, 500);
    } else {
      setTimeout(() => {
        gradient.play()
        setVisibility(true);
        topInfo.classList.add("animate");

        if (visibilityDuration > 0) {
          setTimeout(() => {
            setVisibility(false, false);
          }, visibilityDuration * 1000);
        }
      }, 500);
    }
  }

  var topInfo = document.getElementById("topInfo");

  /** If song is different */
  if (songUri != currentSongUri) {
    if (isPlaying) {
      setTimeout(() => {
        setVisibility(true);

        if (visibilityDuration > 0) {
          setTimeout(() => {
            setVisibility(false, false);
          }, visibilityDuration * 1000);
        }
      }, 500);

      currentSongUri = songUri;

      topInfo.classList.remove("animate");
      topInfo.style.transform = "translateX(0)";

      var name = data.item.name;
      var artist

      /** If song name has other featured artists, remove duplicated ones in the artist section */
      var match = name.match(regex);
      if (match) {
        let feats = match[1].toLowerCase()
        var artistList = [data.item.artists[0].name]
        if (data.item.artists.length > 1) {
          for (const artist of data.item.artists.slice(1)) {
            if (!feats.includes(artist.name.toLowerCase())) {
              artistList.push(artist.name);
            }
          }
        }
        artist = artistList.join(", ")
      } else {
        artist = data.item.artists.map(artist => artist.name).join(", ")
      }

      /** If local song */
      if (data.item.is_local) {
        let t = data.item.name.split(" - ")
        name = t[0]
        artist = t[1]
      }

      var albumArt = data.item.album.images.length > 0 ? `${data.item.album.images[0].url}` : `./src/images/album-art-placeholder.png`;
      updateAlbumArt(document.getElementById("albumArt"), albumArt);
      // updateAlbumArt(document.getElementById("backgroundImage"), albumArt);

      /** Set colors from album art */
      Vibrant.from(albumArt).getPalette().then(function (palette) {
        // document.getElementById("backgroundArt").style.background = data.item.album.images.length > 0 ? `linear-gradient(-45deg, ${palette.DarkVibrant.hex}, ${palette.DarkMuted.hex}, ${palette.Vibrant.hex}, ${palette.LightMuted.hex})` : `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`;
        // document.getElementById("backgroundArt").style.backgroundSize = `400% 400%`;
        // document.getElementById("backgroundArt").style.animation = `gradient 20s ease infinite`;
        document.getElementById("progressBar").style.backgroundColor = getLuminance(palette.Vibrant.hex) <= 0.02 ? brighten(palette.Vibrant.hex, 20) : palette.Vibrant.hex;
        document.getElementById("progressBg").style.backgroundColor = brightenColor(palette.Vibrant.hex);
        document.getElementById("progressTime").style.color = palette.LightVibrant.hex;
        document.getElementById("endTime").style.color = palette.LightVibrant.hex;
        document.getElementById("dotSeparator").style.color = palette.Muted.hex;
        document.getElementById("songLabel").style.color = palette.LightVibrant.hex;
        document.getElementById("artistLabel").style.color = palette.LightMuted.hex;

        gradient.initGradient("#gradient-canvas")

        const gradientCanvas = document.querySelector("#gradient-canvas");
        const gradientSettings = {
          "--gradient-color-1": `${palette.DarkMuted.hex}`,
          "--gradient-color-2": `${brighten(palette.Vibrant.hex, -10)}`,
          "--gradient-color-3": `${brighten(palette.LightVibrant.hex, -10)}`,
          "--gradient-color-4": `${brighten(palette.DarkMuted.hex, -5)}`,
          "--gradient-speed": `0.000009`,
        };

        for (const [name, value] of Object.entries(gradientSettings)) {
          gradientCanvas.style.setProperty(name, value);
        }
      })

      animateSongLabel(name)
      animateArtistLabel(artist)
    }
  }

  /** If text is too long, scroll animation */
  if (topInfo.scrollWidth > topInfo.clientWidth) {
    topInfo.classList.add("animate");
    var distance = topInfo.scrollWidth - topInfo.clientWidth;
    var val = Math.round(topInfo.scrollWidth / 500)
    var animateDuration = val < 1 ? 10 : ((val - 1) * 5) + 10
    var startPercent = 20 - ((val - 1) * 5) > 5 ? 20 - ((val - 1) * 5) : 5
    var endPercent = 80 + ((val - 1) * 5) < 95 ? 80 + ((val - 1) * 5) : 95
    const styleTag = document.getElementById("scroll-style") || document.createElement("style");
    styleTag.id = "scroll-style";

    styleTag.textContent = `
      @keyframes scroll-alternate {
        0% { transform: translateX(0); }
        ${startPercent}% { transform: translateX(0); }
        ${endPercent}% { transform: translateX(var(--scroll-distance)); }
        100% { transform: translateX(var(--scroll-distance)); }
      }

      .animate {
        --scroll-distance: -${distance}px;
        animation: scroll-alternate ${animateDuration}s infinite alternate ${textScroll};
      }
    `;
    document.head.appendChild(styleTag);
  }

  /** Progress Bar */
  const progressPerc = ((progress / duration) * 100);
  const progressTime = secsToMins(progress);
  const endTime = secsToMins(duration);
  document.getElementById("progressBar").style.width = `${progressPerc}%`;
  document.getElementById("progressTime").innerHTML = progressTime;
  document.getElementById("endTime").innerHTML = `${endTime}`;
}

function animateSongLabel(text) {
  const container = document.getElementById('songLabel');
  container.innerHTML = '';

  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'letterSong';
    span.style.animationDelay = `${i * 0.05}s`;
    span.textContent = char === ' ' ? '\u00A0' : char;
    container.appendChild(span);
  });
}

function animateArtistLabel(text) {
  const container = document.getElementById('artistLabel');
  container.innerHTML = '';

  const chars = [...text];
  const total = chars.length;

  chars.forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'letterArtist';
    span.style.animationDelay = `${(total - i - 1) * 0.05}s`;
    span.textContent = char === ' ' ? '\u00A0' : char;
    container.appendChild(span);
  });
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null
}

function brightenColor(hexColor, threshold = 0.01, brightenStep = -5) {
  let color = hexColor;
  while (getLuminance(color) > threshold) {
    color = brighten(color, brightenStep);
  }
  return color;
}

function getLuminance(hex) {
  return Math.floor(luminance(...hexToRgb(hex)) * 100) / 100
}

function luminance(r, g, b) {
  var RsRGB = r / 255;
  var GsRGB = g / 255;
  var BsRGB = b / 255;

  var R = (RsRGB <= 0.03928) ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
  var G = (GsRGB <= 0.03928) ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
  var B = (BsRGB <= 0.03928) ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

  var L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return L;
}

function brighten(color, amount) {
  amount = Math.max(-100, Math.min(100, amount));

  function hexToHSL(hex) {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  function HSLToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  const hsl = hexToHSL(color);
  hsl.l = Math.max(0, Math.min(100, hsl.l + amount)); /** Adjust lightness */
  return HSLToHex(hsl.h, hsl.s, hsl.l);
}

function updateAlbumArt(div, imgsrc) {
  if (div.src != imgsrc) {
    div.setAttribute("class", "text-fade");
    setTimeout(() => {
      div.src = imgsrc;
      div.setAttribute("class", "text-show");
    }, 500);
  }
}

function secsToMins(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.trunc(time - minutes * 60);

  return `${minutes}:${('0' + seconds).slice(-2)}`;
}

function setVisibility(isVisible, updateCurrentState = true) {
  const mainContainer = document.getElementById("mainContainer");

  if (isVisible) {
    mainContainer.style.opacity = 1;
    mainContainer.style.bottom = "50%";
  } else {
    mainContainer.style.opacity = 0;
    mainContainer.style.bottom = "calc(50% - 20px)";
  }

  if (updateCurrentState)
    currentState = isVisible;
}

if (hideAlbumArt) {
  document.getElementById("albumArtBox").style.display = "none";
}

if (hideTimes) {
  document.getElementById("progressTime").style.display = "none";
  document.getElementById("endTime").style.display = "none";
  document.getElementById("topInfo").style.marginBottom = "20px";
}

if (client_id != "" & client_secret != "") {
  refreshAccessToken();
  setInterval(() => {
    getCurrentlyPlaying()
  }, 1000);
}

