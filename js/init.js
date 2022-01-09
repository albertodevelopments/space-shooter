/** Cosntantes y variables globales del juego */
const login = document.getElementById('login')
const endOfGame = document.getElementById('end-of-game')

const nextLevel = document.getElementById('next-level')
const lose = document.getElementById('lose')

const nameElement = document.getElementById('name')

const winText = document.getElementById('win-text')
const loseText = document.getElementById('lose-text')

const nextLevelText = document.getElementById('next-level__text')

const loginForm = document.getElementById('login__form')
const newGameForm = document.getElementById('end-of-game__form')
const nextLevelButton = document.getElementById('next-level-btn')

const scoreElement = document.getElementById('score')
const lifesElement = document.getElementById('lifes')
const recordElement = document.getElementById('record')
const levelElement = document.getElementById('level')

const load = document.getElementById('load')

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight

let maxEnemiesSpawned
let enemiesSpawnSpeed
let lifes
let bigScore = 0
let score = 0
let level = 1

let playerShootSound
let playerReachedScound
let enemyReachedScound
let gameLostSound
let endOfLevelSound

const init = {
    start: () => {
        canvas.classList.add('canvas')
        canvas.width = canvasWidth
        canvas.height = canvasHeight

        endOfGame.style.display = 'none'
        login.style.display = 'none'

        /** Inicializamos nivel y obtenemos sus datos*/
        levels.init(level)

        maxEnemiesSpawned = levels.maxEnemiesSpawned
        enemiesSpawnSpeed = levels.enemiesSpawnSpeed
        level = levels.levelNumber
        lifes = levels.lifes

        /** Inicializamos los sonidos y la música ambiente */
        const music = new Howl({
            src: ['../music/background.ogg'],
            loop: true,
        })
        music.play()

        playerShootSound = new Howl({
            src: ['../sounds/player_shoot.wav'],
            loop: false,
        })
        playerReachedScound = new Howl({
            src: ['../sounds/player-reached.wav'],
            loop: false,
        })
        enemyReachedScound = new Howl({
            src: ['../sounds/enemy-reached.wav'],
            loop: false,
        })
        gameLostSound = new Howl({
            src: ['../sounds/lose.wav'],
            loop: true,
        })
        endOfLevelSound = new Howl({
            src: ['../sounds/end-of-level.wav'],
            loop: true,
        })
    },
    loadLevel: name => {
        return JSON.parse(localStorage.getItem(name))
    },
}
