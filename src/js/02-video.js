import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const updateTime = ({ seconds }) => {
  console.log(seconds);
  localStorage.setItem('videoplayer-current-time', seconds);
};

player.on('timeupdate', throttle(updateTime, 1000));

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  player.setCurrentTime(savedTime);
}
