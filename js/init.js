/** CONSTANTES Y VARIABLES GLOBALES */

/** Elementos del DOM*/
const startElement = document.getElementById('start-frame')
const endOfGameElement = document.getElementById('end-of-game-frame')

const startFormElement = document.getElementById('start-form')
const nameElement = document.getElementById('name')
const endOfGameTextElement = document.getElementById('end-of-game-text')
const endOfGameTotalScoreElement = document.getElementById('big-score')
const restartElement = document.getElementById('restart')

// const endOfGame = document.getElementById('end-of-game')
// const nextLevel = document.getElementById('next-level')

// const nextLevelText = document.getElementById('next-level__text')

// const newGameForm = document.getElementById('end-of-game__form')
// const nextLevelButton = document.getElementById('next-level-btn')

const scoreElement = document.getElementById('score')
const recordElement = document.getElementById('record')

// const load = document.getElementById('load')

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const enemiesSpawnSpeed = 1000
let username = ''
let bigScore
let score
let music

let playerShootSound
let enemyReachedScound
let gameLostSound
let endOfLevelSound
let background
const backgroundSpeed = 1

let gameLost = false

const init = {
    start: () => {
        /** Inicializamos el canvas */
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        score = 0
        bigScore = 0
        background = new Image()
        background.src = '../img/background.png'

        /** Inicializamos los sonidos y la música ambiente */
        music = new Howl({
            src: ['../music/background.ogg'],
            loop: true,
        })

        playerShootSound = new Howl({
            src: ['../sounds/player_shoot.wav'],
            loop: false,
        })
        enemyReachedScound = new Howl({
            src: ['../sounds/enemy-reached.wav'],
            loop: false,
        })
        gameLostSound = new Howl({
            src: ['../sounds/player-reached.wav'],
            loop: false,
        })
        endOfLevelSound = new Howl({
            src: ['../sounds/end-of-level.wav'],
            loop: true,
        })
    },
}
