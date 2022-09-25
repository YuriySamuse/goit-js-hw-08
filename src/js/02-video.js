import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerRef = document.querySelector('#vimeo-player');
const player = new Player(playerRef);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

function playTime({ seconds }) {
  localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
  // console.log(seconds);
}

player.on('timeupdate', throttle(playTime, 1000));

const initPage = () => {
  let saveTime = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saveTime) {
    player.setCurrentTime(saveTime);
  }
};
initPage();

// player
//   .setCurrentTime(30.456)
//   .then(function (seconds) {
//     // seconds = the actual time that the player seeked to
//   })
//   .catch(function (error) {
//     switch (error.name) {
//       case 'RangeError':
//         // the time was less than 0 or greater than the video’s duration
//         break;

//       default:
//         // some other error occurred
//         break;
//     }
//   });
