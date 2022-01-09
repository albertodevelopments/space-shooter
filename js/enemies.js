const Enemy = function (x, y, imgSource, speed) {
    this.positionX = x
    this.positionY = y
    this.image = new Image()
    this.image.src = imgSource
    this.width = 60
    this.height = 60
    this.speed = speed

    this.update = (x, y) => {
        this.positionX = x
        this.positionY = y
    }

    this.draw = () => {
        context.drawImage(
            this.image,
            this.positionX,
            this.positionY,
            this.width,
            this.height
        )
    }
}

const ExplosionParticle = function (x, y, size, speedX, speedY) {
    this.positionX = x
    this.positionY = y
    this.image = new Image()
    this.image.src = 'img/particle.png'
    this.width = size
    this.height = size
    this.speedX = speedX
    this.speedY = speedY

    this.update = () => {
        this.positionX += this.speedX
        this.positionY += this.speedY
    }

    this.draw = () => {
        context.drawImage(
            this.image,
            this.positionX,
            this.positionY,
            this.width,
            this.height
        )
    }
}

const enemies = {
    listOfEnemies: [],
    particles: [],
    gameStopped: false,
    start: () => {
        enemies.listOfEnemies = []
        enemies.particles = []
        enemies.endSpawningEnemies = false
    },
    spawnEnemies: () => {
        let counter = 0
        const timer = setInterval(() => {
            const initialX =
                100 + Math.floor(Math.random() * (canvasWidth - 200))

            let enemySpeed = Math.random()
            if (enemySpeed <= 0.1) {
                enemySpeed = 0.1
            }
            if (enemySpeed >= 0.9) {
                enemySpeed = 0.9
            }
            counter++

            enemies.createEnemy(initialX, 0, 'img/asteroid01.png', enemySpeed)

            if (enemies.gameStopped || counter === maxEnemiesSpawned) {
                enemies.endSpawningEnemies = true
                enemies.listOfEnemies = []
                enemies.particles = []
                clearInterval(timer)
            }
        }, enemiesSpawnSpeed)
    },
    createEnemy: (x, y, imgSource, speed) => {
        enemies.listOfEnemies.push(new Enemy(x, y, imgSource, speed))
    },
    move: () => {
        enemies.listOfEnemies.forEach(enemy => {
            const positionX = enemy.positionX
            const positionY = (enemy.positionY += enemy.speed)

            // console.log(positionX, positionY)
            enemy.update(positionX, positionY)
        })
    },
    checkPlayerReached: (playerX, playerY, playerWidth) => {
        let enemyReachingIndex = -1
        enemies.listOfEnemies.every((enemy, index) => {
            /* Comprobamos que la coordenada y del enemigo sea mayor que la
               del jugador y que la coordenada x del jugador esté entre la 
               coordenada x del enemigo y x + ancho */
            if (
                playerY <= enemy.positionY + parseInt(enemy.height / 2) &&
                enemy.positionX >= playerX &&
                enemy.positionX <= playerX + playerWidth
            ) {
                enemyReachingIndex = index
                return false
            }
            return true
        })

        return enemyReachingIndex
    },
    killEnemy: enemyIndex => {
        if (
            enemies.listOfEnemies.length > 0 &&
            enemies.listOfEnemies[enemyIndex]
        ) {
            for (let i = 0; i <= 8; i++) {
                const enemy = enemies.listOfEnemies[enemyIndex]
                const angle = Math.random() * Math.PI * 2
                const speedX = Math.cos(angle)
                const speedY = Math.sin(angle)

                enemies.particles.push(
                    new ExplosionParticle(
                        enemy.positionX,
                        enemy.positionY,
                        15,
                        speedX,
                        speedY
                    )
                )
            }
            enemies.listOfEnemies.splice(enemyIndex, 1)
        }
    },
    killAllEnemies: () => {
        enemies.listOfEnemies = []
    },
    allEnemyKilled: () => {
        return enemies.listOfEnemies.length === 0
    },
    draw: () => {
        enemies.move()
        enemies.listOfEnemies.forEach((enemy, index) => {
            if (enemy.positionY > canvas.height) {
                enemies.killEnemy(index)
            } else {
                enemy.draw()
            }
        })
        enemies.particles.forEach(particle => {
            particle.update()
            particle.draw()
        })
    },
}
