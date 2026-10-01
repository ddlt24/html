/* 在页面右上角显示实时时间，格式：年.月.日.时：分：秒 */
document.addEventListener('DOMContentLoaded', function () {
  const clock = document.createElement('div');
  clock.id = 'clock';
  document.body.appendChild(clock);

  function pad(n) {
    return String(n).padStart(2, '0');
  }
  
  function formatTime(date) {
    const year  = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day   = pad(date.getDate());
    const hour  = pad(date.getHours());
    const min   = pad(date.getMinutes());
    const sec   = pad(date.getSeconds());
    return `${year}.${month}.${day}.${hour}:${min}:${sec}`;
  }

  function updateClock() {
    const now = new Date();
    clock.textContent = formatTime(now);
  }
  
  updateClock();
  setInterval(updateClock, 1000);
});