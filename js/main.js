'use strict'

const main = {
    backgroundY: 0,
    start: () => {
        /** Ocultamos los marcos del menú para arrancar el juego */
        endOfGameElement.style.display = 'none'
        startElement.style.display = 'none'
        gameLost = false

        music.play()

        /** Cargamos el récord si lo hay */
        if (localStorage.getItem(username)) {
            bigScore = parseInt(localStorage.getItem(username))
        }
        score = 0
        scoreElement.innerHTML = score
        recordElement.innerHTML = bigScore
        main.backgroundY = -canvas.height

        player.start()
        enemies.start()
        enemies.spawnEnemies()
        main.drawStats()

        if (enemies.listOfEnemies.length > 0) {
            enemies.killAllEnemies()
        }
    },
    saveRecord: () => {
        localStorage.setItem(username, Math.max(score, bigScore))
    },
    drawBackground: () => {
        context.drawImage(
            background,
            0,
            main.backgroundY,
            2 * canvas.width,
            2 * canvas.height
        )
    },
    update: () => {
        main.backgroundY = main.backgroundY + backgroundSpeed
        if (main.backgroundY === 0) main.backgroundY = -canvas.height
    },
    drawStats: () => {
        scoreElement.innerHTML = score
        recordElement.innerHTML = bigScore
    },
    drawEndOfGame: () => {
        endOfGameElement.style.display = 'flex'
        endOfGameTextElement.innerHTML = 'End of Game!'
        endOfGameTotalScoreElement.innerHTML = `${score} points.`
    },
    refreshCanvas: () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
    },
    loop: () => {
        if (!gameLost) {
            requestAnimationFrame(main.loop)
        }

        main.refreshCanvas()
        main.drawBackground()
        main.update()
        player.draw()
        enemies.draw()
        player.update()

        if (player.playerKilled) {
            main.saveRecord()
            if (enemies.listOfEnemies.length > 0) {
                enemies.killAllEnemies()
            }
            gameLostSound.play()
            main.drawEndOfGame()

            cancelAnimationFrame(main.loop)
            gameLost = true
        }
        main.drawStats()
    },
}

document.addEventListener('DOMContentLoaded', () => {
    startElement.style.display = 'flex'
    endOfGameElement.style.display = 'none'
    init.start()
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    main.refreshCanvas()
    player.topRight = window.innerWidth
})

startFormElement &&
    startFormElement.addEventListener('submit', e => {
        e.preventDefault()
        if (username.value !== '') {
            main.start()
            main.loop()
        }
    })

restartElement &&
    restartElement.addEventListener('click', () => {
        main.start()
        main.loop()
    })
