'use strict'

const main = {
    stopGame: true,
    start: () => {
        main.gameLost = false
        main.endOfLevel = false
        init.start()
        player.start()
        player.topRight = canvasWidth
        enemies.start()
        enemies.spawnEnemies()
        main.stopGame = false
        enemies.gameStopped = false
        main.drawStats()
    },
    save: () => {
        console.log('bigScore', bigScore)
        const data = {
            bigScore: Math.max(score, bigScore),
            level: level + 1,
        }
        localStorage.setItem(name, JSON.stringify(data))
    },
    drawStats: () => {
        scoreElement.innerHTML = score
        lifesElement.innerHTML = lifes
        levelElement.innerHTML = level
        recordElement.innerHTML = bigScore
    },
    drawEndOfGame: result => {
        endOfGame.style.display = 'flex'
        if (result === 'endOfLevel') {
            lose.style.display = 'none'
            nextLevel.style.display = 'block'
            winText.innerHTML = 'You win!!'
            nextLevelText.innerHTML = `Total Score: ${score}`
        } else {
            nextLevel.style.display = 'none'
            lose.style.display = 'block'
            loseText.innerHTML = 'You lose!!'
        }
        enemies.gameStopped = true
    },
    refreshCanvas: () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight)
    },
    loop: () => {
        if (!main.stopGame) {
            requestAnimationFrame(main.loop)
        }

        main.refreshCanvas()
        player.update()
        player.draw()
        enemies.draw()

        if (player.playerKilled || enemies.endSpawningEnemies) {
            enemies.killAllEnemies()
            if (player.playerKilled) {
                gameLostSound.play()
                main.start()
                main.drawEndOfGame('lose')
            } else {
                endOfLevelSound.play
                main.start()
                main.drawEndOfGame('endOfLevel')

                /** Guardamos el récord */
                main.save()
            }
            cancelAnimationFrame(main.loop)
            main.stopGame = true
        }
        main.drawStats()
    },
}

document.addEventListener('DOMContentLoaded', () => {
    login.style.display = 'flex'
    endOfGame.style.display = 'none'
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvasWidth = canvas.width
    canvasHeight = canvas.height
    main.refreshCanvas()
    player.topRight = window.innerWidth
})

loginForm.addEventListener('submit', e => {
    e.preventDefault()
    if (name.value !== '') {
        login.style.display = 'none'

        name = nameElement.value
        bigScore = 0
        level = 1

        main.start()
        main.loop()
    }
})

load.addEventListener('click', () => {
    const data = init.loadLevel(nameElement.value)
    if (data) {
        name = nameElement.value
        bigScore = data.bigScore
        score = bigScore
        level = data.level

        main.start()
        main.loop()
    }
})

restart &&
    restart.addEventListener('click', () => {
        gameLostSound.stop()
        main.start()
        main.loop()
    })

nextLevelButton.addEventListener('click', () => {
    /** El nuevo nivel ya se habrá guardado al completar el anterior */
    const data = init.loadLevel(nameElement.value)

    if (data) {
        name = nameElement.value
        bigScore = data.bigScore
        score = bigScore
        level = data.level

        main.start()
        main.loop()
    }
})
