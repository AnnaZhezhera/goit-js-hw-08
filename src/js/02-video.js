import throttle from 'lodash.throttle';
console.log(throttle);

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo.Player(iframe);
const LOCALSTORAGE_TIME_KEY = 'videoplayer-current-time';

// player.on('play', function () {
//   console.log('played the video!');
// });

player.on(
  'timeupdate',
  throttle(function (data) {
    // console.log('timeupdate the video!', data);
    // data is an object containing properties specific to that event
    localStorage.setItem(LOCALSTORAGE_TIME_KEY, data.seconds);
  }, 1000)
);

player
  .setCurrentTime(localStorage.getItem(LOCALSTORAGE_TIME_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
