const audio = document.getElementById("audio")
const title = document.getElementById("title")
const cover = document.getElementById("cover")
const artist = document.getElementById("artist")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const shuffleBtn = document.getElementById("shuffle")
const progress = document.getElementById("progress")
const volume = document.getElementById("volume")
const playlist = document.getElementById("playlist")

const songs = [
    {
        title: "Don't Look Back In Anger",
        artist: "Oasis",
        src: "Songs/Song 1.mp3",
        cover: "Images/Oasis_-_(What's_The_Story)_Morning_Glory_album_cover.jpg"
    },

    {
        title: "One Last Breath",
        artist: "Creed",
        src: "Songs/Song 2.mp3",
        cover: "Images/Weathered_Main_Cover.jpg"
    },

    {
        title: "Breathe (In The Air)",
        artist: "Pink Floyd",
        src: "Songs/Song 3.mp3",
        cover: "Images/Dark_Side_of_the_Moon.png"
    },

    {
        title: "Another Brick In The Wall",
        artist: "Pink Floyd",
        src: "Songs/Song 4.mp3",
        cover: "Images/PinkfloydThewallcover.jpg" 
    }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
    title.textContent = songs[index].title;
    cover.src = songs[index].cover;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;
}

function playSong() {
    audio.play()
    playBtn.innerHTML = "⏸️";
    isPlaying = true;
}

function pauseSong() {
    audio.pause()
    playBtn.innerHTML = "▶️";
    isPlaying = false;
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
    updateActiveSong();
}
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
    updateActiveSong();
}

function shuffleSong() {

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while(randomIndex === songIndex);

    songIndex = randomIndex;
    loadSong(songIndex);
    playSong();
    updateActiveSong();
}

function createPlaylist() {
    playlist.innerHTML = "";

    songs.forEach((song, index) => {
        const item = document.createElement("div");
        
        item.innerHTML = `
            <strong>${song.title}</strong>
            <small>${song.artist}</small>
        `;

        item.classList.add("playlist-item");

        item.addEventListener("click", () => {
            songIndex = index;
            loadSong(songIndex);
            playSong();
            updateActiveSong();
        });

        playlist.appendChild(item);
    });

    updateActiveSong();
}

function updateActiveSong() {
    const items = document.querySelectorAll(".playlist-item");

    items.forEach((item, index) => {
        item.classList.remove("active");

        if (index === songIndex) {
            item.classList.add("active");
        }
    });
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
shuffleBtn.addEventListener("click", shuffleSong);

audio.addEventListener("ended", nextSong);

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
})
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
})
volume.addEventListener("input", () => {
    audio.volume = volume.value;
})
loadSong(songIndex);

createPlaylist();