const player = {
    positionX: 0,
    positionY: 0,
    positionYOffset: 200,
    shipImage: null,
    speed: 10,
    direction: '',
    topRight: 0,
    topLeft: 0,
    shooting: false,
    bullet: null,
    bulletX: 0,
    imageWidth: 140,
    imageHeight: 180,
    isEnemyReached: false,
    isReachedByEnemy: false,
    bulletOffsetX: 0,
    playerKilled: false,
    start: () => {
        player.shipImage = new Image()
        player.shipImage.src = 'img/basic_ship.png'
        player.positionX =
            parseInt(canvasWidth / 2) - parseInt(player.imageWidth / 2)
        player.positionY = parseInt(canvasHeight - player.positionYOffset)
        player.topMovement = 20
        player.bulletOffsetX = parseInt(player.imageWidth / 2)
        player.shooting = false
        player.playerKilled = false

        document.addEventListener('keydown', player.doAction)
        document.addEventListener('keyup', player.stop)
    },
    checkEnemyReached: () => {
        if (
            playerY <= this.positionY &&
            playerX >= this.positionX &&
            playerX <= this.positionX + this.width
        ) {
            return true
        }
        return false
    },
    die: () => {
        enemies.killAllEnemies()
        player.playerKilled = true
    },
    doAction: key => {
        switch (key.code) {
            case 'ArrowLeft':
                player.left()
                break
            case 'ArrowRight':
                player.right()
                break
            case 'Space':
                player.shoot()
                break
        }
    },
    stop: key => {
        if (key.code === 'Space') {
            //player.shoot()
        } else {
            if (
                (key.code === 'ArrowLeft' && player.direction === 'L') ||
                (key.code === 'ArrowRight' && player.direction === 'R')
            ) {
                player.direction = ''
            }
        }
    },
    shoot: () => {
        bullet.start(player.positionX + player.bulletOffsetX, player.positionY)
        player.shooting = true
        playerShootSound.play()

        /* Inicializamos la posición X del láser cada vez que disparamos,
           así, al movernos, no se desplazará a su vez junto con la nave*/
        player.bulletX = player.positionX + player.bulletOffsetX
    },
    right: () => {
        player.direction = 'R'
    },
    left: () => {
        player.direction = 'L'
    },
    update: () => {
        if (
            player.direction === 'R' &&
            player.positionX <=
                player.topRight - player.topMovement - player.imageWidth
        ) {
            player.positionX += player.speed
        }
        if (
            player.direction === 'L' &&
            player.positionX >= player.topMovement
        ) {
            player.positionX -= player.speed
        }

        if (player.shooting) {
            bullet.update()
        }

        // let newBulletY = (bullet.positionY -= bullet.speed)
        // if (player.shooting) {
        //     if (newBulletY < 0) {
        //         newBulletY = player.positionY
        //         player.shooting = false
        //     }
        // }
        // bullet.update(player.bulletX, newBulletY)
    },
    draw: () => {
        const enemyReachedIndex = enemies.checkPlayerReached(
            player.positionX,
            player.positionY,
            player.imageWidth
        )

        player.isReachedByEnemy = enemyReachedIndex >= 0

        if (!player.isReachedByEnemy) {
            context.drawImage(
                player.shipImage,
                player.positionX,
                player.positionY,
                player.imageWidth,
                player.imageHeight
            )
            enemies.draw()

            if (player.shooting) {
                const enemyReachedIndex = bullet.checkEnemyReached()
                player.isEnemyReached = enemyReachedIndex >= 0

                if (!player.isEnemyReached) {
                    enemies.draw()
                } else {
                    player.shooting = false
                    enemies.killEnemy(enemyReachedIndex)
                    score += 100
                    main.drawStats()
                }

                const positionX = bullet.positionX - parseInt(bullet.width / 2)
                bullet.draw(positionX)
            }
        } else {
            enemies.killEnemy(enemyReachedIndex)
            lifes--
            if (score >= 150) {
                score -= 150
            } else {
                score = 0
            }

            playerReachedScound.play()

            if (lifes === 0) {
                player.die()
            }
        }
    },
}
