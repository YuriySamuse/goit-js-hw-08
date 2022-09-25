import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerRef = document.querySelector('#vimeo-player');
const player = new Player(playerRef);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

function playTime(evt) {
  localStorage.save(LOCAL_STORAGE_KEY, Math.floor(evt.seconds));
  console.log(Math.floor(evt.seconds));
}

player.on('timeupdate', throttle(playTime, 1000));

// const savingTime = JSON.parse(
//   localStorage.save(LOCAL_STORAGE_KEY, Math.floor(evt.seconds))
// );

// if (savingTime) {
//   player
//     .setCurrentTime(savingTime.seconds)
//     .then(function (seconds) {})
//     .catch(function (error) {
//       switch (error.name) {
//         case 'RangeError':
//           break;

//         default:
//           break;
//       }
//     });
// }
