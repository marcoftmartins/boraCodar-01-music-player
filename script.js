/** @format */

const playBtn = document.querySelector('.play')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const pauseBtn = document.querySelector('.pause')
const songTitle = document.querySelector('.song-title')
const songArtist = document.querySelector('.artist-name')
const songTotalTime = document.querySelector('.total-time')
const songLastingTime = document.querySelector('.lasting-time')
const audio = document.querySelector('#audio')
const musicCover = document.querySelector('.music-cover')
const player = document.querySelector('.player')
const progressBar = document.querySelector('.track')

const songs = ['Imagina', 'Nos2', 'Madruga']
const artists = [
  'Frankieontheguitar ft. Ivandro, Slow J',
  'Bispo ft. Deezy',
  'Mike11',
]

let songIndex = 1

loadSong(songs[songIndex], artists[songIndex])

function loadSong(song, artist) {
  songTitle.innerText = song
  songArtist.innerText = artist
  audio.src = `./assets/musics/${song}.mp3`
  musicCover.src = `./assets/covers/${song}.jpg`
}

function playSong() {
  player.classList.add('playing')
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
  audio.play()
}

function pauseSong() {
  player.classList.remove('playing')
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
  audio.pause()
}

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex], artists[songIndex])
  playSong()
}

function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex], artists[songIndex])
  playSong()
}

function updateProgess(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercentage = (currentTime / duration) * 100

  progressBar.style.setProperty('--width', `${progressPercentage}%`)
  songLastingTime.innerText = convertSecondsIntoMinutes(currentTime)
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

function convertSecondsIntoMinutes(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60)
  let seconds = Math.trunc(timeInSeconds - minutes * 60)
  let time = `0${minutes}:${seconds}`
  if (seconds <= 9) time = `0${minutes}:0${seconds}`
  return time
}

playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('playing')

  if (isPlaying) {
    pauseSong()
  } else playSong()
})

pauseBtn.addEventListener('click', pauseSong)

prevBtn.addEventListener('click', prevSong)

nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgess)

audio.addEventListener('ended', nextSong)

audio.onloadedmetadata = () => {
  songTotalTime.innerText = convertSecondsIntoMinutes(audio.duration)
}

progressBar.addEventListener('click', setProgress)
