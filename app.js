let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#repeat');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let songLenght = document.querySelector('#songLenght');
let songProgress = document.querySelector('#songProgress');

let timer;
let progress;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;
function format(time) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = '';
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }
  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
}

//create a audio Element
let track = document.createElement('audio');
track.preload = 'metadata';
track.onloadedmetadata = function () {
  // console.log(format(track.duration));
  songLenght.innerHTML = format(track.duration);
};

//All songs list
let All_song = [
  {
    singer: '1',
    name: 'jore',
    label: 'AG',
    path: './assets/Runtown-ft.-Bella-Shmurda-x-Darkovibes-Body-Riddim.mp3',
    img: './assets/jore.jfif',
    artist: 'AG',
  },
  {
    singer: '2',
    name: 'Bella ft wizkid',
    label: 'MHD',
    path: './assets/MHD-feat-Wizkid-Bella.mp3',
    img: './assets/mhd.jfif',
    artist: 'MHD',
  },
  {
    singer: '3',
    name: 'peace of mind',
    label: 'Sean',
    path:
      './assets/Sean_Kingston_Peace_Of_Mind_ft_Davido_And_Tory_Lanez_9jaflaver.com_.mp3',
    img: './assets/sean.jfif',
    artist: 'Sean Kingston',
  },
];

// All functions

//set active class

function setActive(index) {
  if (index === index_no) return 'musicdetails';

  if (index !== index_no) return 'musicdetails active';
}

//Tracks
All_song.map((json, index) => {
  var root = document.querySelector('.contentareacontainer');
  var song = document.createElement('DIV');
  song.classList.add('d');
  song.innerHTML = ` <div onclick="load_track2(${index})" class="musicdetails">  <span>${json.singer}</span>
  <img src=${json.img}></img>
  <div class="musicdetailsinner">
    <p>${json.name}</p>
    <div class="musicdetailsinner2">
      <p class="label">${json.label}</p>
      <p>3:20</p>
    </div>
  </div> </div>`;

  root.appendChild(song);
});

// load track from list of tracks
function playtrackfromlist(track) {
  load_track2(track);
}

// function load the track
function load_track(index_no) {
  clearInterval(timer);
  clearInterval(progress);
  reset_slider();

  track.src = All_song[index_no].path;
  title.innerHTML = All_song[index_no].name;
  track_image.src = All_song[index_no].img;
  artist.innerHTML = All_song[index_no].artist;
  track.load();

  timer = setInterval(range_slider, 1000);
  progress = setInterval(progressSlider, 1000);
}

function load_track2(index_no) {
  console.log(index_no);
  clearInterval(timer);
  clearInterval(progress);
  reset_slider();

  track.src = All_song[index_no].path;
  title.innerHTML = All_song[index_no].name;
  track_image.src = All_song[index_no].img;
  artist.innerHTML = All_song[index_no].artist;
  track.load();

  playsong();
  timer = setInterval(range_slider, 1000);
  progress = setInterval(progressSlider, 1000);
}

load_track(index_no);

//shuffle song
function shuffleSong() {
  load_track2(Math.floor(Math.random() * (All_song.length - 1)));
}

//mute sound function
function mute_sound() {
  track.volume = 0;
  volume.value = 0;
  volume_show.innerHTML = 0;
}

// checking.. the song is playing or not
function justplay() {
  if (Playing_song == false) {
    playsong();
  } else {
    pausesong();
  }
}

// reset song slider
function reset_slider() {
  slider.value = 0;
}

// play song
function playsong() {
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
  track.pause();
  Playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

// next song
function next_song() {
  if (index_no < All_song.length - 1) {
    index_no += 1;
    load_track2(index_no);
    // playsong();
  } else {
    index_no = 0;
    load_track2(index_no);
    // playsong();
  }
}

// previous song
function previous_song() {
  if (index_no > 0) {
    index_no -= 1;
    load_track2(index_no);
    // playsong();
  } else {
    index_no = All_song.length;
    load_track2(index_no);
    // playsong();
  }
}

// change volume
function volume_change() {
  //   volume_show.innerHTML = recent_volume.value;
  track.volume = recent_volume.value / 100;
}

// change slider position
function change_duration() {
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch() {
  console.log(autoplay);
  if (autoplay == 1) {
    autoplay = 0;
    auto_play.style.background = 'grey';
  } else {
    autoplay = 1;
    auto_play.style.background = '#676767';
  }
}

function progressSlider() {
  songProgress.innerHTML = format(track.currentTime);
}

function range_slider() {
  let position = 0;
  var exitLoop = false;

  // update slider position
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }

  // function will run when the song is over
  if (track.ended) {
    if (index_no === All_song.length - 1) {
      console.log(index_no);
      index_no = 0;
      load_track2(index_no);
      playsong();
      exitLoop = true;
    }
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    if (exitLoop === false) {
      if (autoplay == 1) {
        load_track2(index_no);
        playsong();
      } else {
        index_no += 1;
        load_track2(index_no);
        playsong();
      }
    }
  }
}
