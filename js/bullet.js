const bullet = {
    positionX: 0,
    positionY: 0,
    start: (x, y) => {
        bullet.positionX = x
        bullet.positionY = y
        bullet.image = new Image()
        bullet.image.src = 'img/player_bullet.png'
        bullet.width = 15
        bullet.speed = 20
    },
    update: () => {
        bullet.positionY -= bullet.speed
    },
    checkEnemyReached: () => {
        let enemyReachedIndex = -1
        enemies.listOfEnemies.forEach((enemy, index) => {
            /* Comprobamos que la coordenada y del proyetil sea menor que la
               del enemigo y que la coordenada x esté entre la coordenada x
               del enemigo y x + ancho */
            if (
                bullet.positionY <= enemy.positionY + enemy.height &&
                bullet.positionX >= enemy.positionX &&
                bullet.positionX <= enemy.positionX + enemy.width
            ) {
                enemyReachedScound.play()
                enemyReachedIndex = index
            }
        })

        return enemyReachedIndex
    },
    draw: positionX => {
        context.drawImage(
            bullet.image,
            positionX,
            bullet.positionY,
            bullet.width,
            bullet.image.height
        )
    },
}
