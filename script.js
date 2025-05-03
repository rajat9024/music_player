const audio = document.getElementById('audio');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const album = document.getElementById('album');

const playpauseBtn = document.querySelector('.playpause-track');
const prevBtn = document.querySelector('.prev-track');
const nextBtn = document.querySelector('.next-track');
const seek_slider = document.querySelector('.seek_slider');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.total-duration');
const volumeSlider = document.querySelector('.volume-slider');
const playlistContainer = document.querySelector('.playlist-container');
const playlistUl = document.getElementById('playlist');
const musicPlayer = document.querySelector('.music-player');
let curr_track =document.createElement('audio');

let currentSongIndex = 0;
let isPlaying = false;
let playlist = [
    {
        title: 'Song Title 1',
        artist: 'Artist 1',
        album: 'Album 1',
        img :'music.jpg',
       music :"./"
    },
    {
        title: 'Another Song',
        artist: 'Second Artist',
        album: 'Different Album',
        src: './', // Replace with your audio file path
        img: 'music.jpg' // Replace with your artwork path
    },
    {
        title: 'Another Song',
        artist: 'Second Artist',
        album: 'Different Album',
        music: 'song/Kissik - Pushpa 2 The Rule 128 Kbps.mp3', // Replace with your audio file path
        img: 'music.jpg' // Replace with your artwork path
    },
    {
        title: 'Another Song',
        artist: 'Second Artist',
        album: 'Different Album',
        music: 'song/Kissik - Pushpa 2 The Rule 128 Kbps.mp3', // Replace with your audio file path
        img: 'music.jpg' // Replace with your artwork path
    },
    // Add more songs here
];

function loadSong(index) {
    clearInterval(updateTimer);
    reset();


    curr_track.src = playlist[index].music;
    curr_track.load();


    // const currentSong = playlist[index].music;
    // audio.src = './song/s${x}.mp3';
    albumArt.src = playlist[index].img || 'default-album.png';
    songTitle.textContent = playlist[index].title;
    artist.textContent = playlist[index].artist;
    album.textContent = playlist[index].album;
    now_playing.textContent="playing music "+(index + 1) +"of" +playlist.length;

    updateTimer = setInterval(setUpdate,1000);
    curr_track.addEventListener('ended',nextTrack);



    progressBar.value = 0;
    currentTimeDisplay.textContent = '0:00';
    durationDisplay.textContent = '2:00';
    updateActiveSongInPlaylist();

    
}

function randomTrack(){
    isRandom ? playSong() : pauseSong(); 
}

function playSong() {
    isPlaying = true;
    randomIcon .classList.add('randomActive');
    // audio.play();
    // playPauseBtn.classList.add('playing');
}

function pauseSong() {
    isPlaying = false;
    randomIcon .classList.add('randomActive');
    // audio.pause();
    // playPauseBtn.classList.remove('playing');
}

function repeatTrack(){
    const current_index=index;
    load(current_index);
    playTrack();
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying =true;
    track_art.classList.add('Rotate');
    Wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

// function togglePlay() {
//     if (isPlaying) {
//         pauseSong();
//     } else {
//         playSong();
//     }
// }

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

function updateProgress(e) {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
    currentTimeDisplay.textContent = formatTime(currentTime);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setVolume() {
    audio.volume = volumeSlider.value;
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

function updateDuration() {
    durationDisplay.textContent = formatTime(audio.duration);
}

function createPlaylist() {
    playlist.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = song.title;
        listItem.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        playlistUl.appendChild(listItem);
    });
    updateActiveSongInPlaylist();
}

function updateActiveSongInPlaylist() {
    const playlistItems = document.querySelectorAll('#playlist li');
    playlistItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentSongIndex) {
            item.classList.add('active');
        }
    });
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);
audio.addEventListener('loadedmetadata', updateDuration);
audio.addEventListener('ended', nextSong);

// Initialize
createPlaylist();
loadSong(currentSongIndex);