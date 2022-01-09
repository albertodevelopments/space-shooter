const levels = {
    levelNumber: 0,
    enemiesSpawnSpeed: 0,
    maxEnemiesSpawned: 0,
    lifes: 0,
    init: levelNumber => {
        levels.levelNumber = levelNumber
        levels.setLevel()
    },
    setLevel: () => {
        switch (levels.levelNumber) {
            case 1:
                levels.lifes = 5
                levels.enemiesSpawnSpeed = 1000
                levels.maxEnemiesSpawned = 30
                break
            case 2:
                levels.lifes = 4
                levels.enemiesSpawnSpeed = 1000
                levels.maxEnemiesSpawned = 30
                break
            case 3:
                levels.lifes = 3
                levels.enemiesSpawnSpeed = 1000
                levels.maxEnemiesSpawned = 40
                break
            case 4:
                levels.lifes = 3
                levels.enemiesSpawnSpeed = 1100
                levels.maxEnemiesSpawned = 40
                break
            case 5:
                levels.lifes = 3
                levels.enemiesSpawnSpeed = 1100
                levels.maxEnemiesSpawned = 50
                break
            case 6:
                levels.lifes = 2
                levels.enemiesSpawnSpeed = 1100
                levels.maxEnemiesSpawned = 50
                break
            case 7:
                levels.lifes = 2
                levels.enemiesSpawnSpeed = 1200
                levels.maxEnemiesSpawned = 50
                break
            case 8:
                levels.lifes = 2
                levels.enemiesSpawnSpeed = 1200
                levels.maxEnemiesSpawned = 60
                break
            case 9:
                levels.lifes = 1
                levels.enemiesSpawnSpeed = 1250
                levels.maxEnemiesSpawned = 60
                break
            case 10:
                levels.lifes = 1
                levels.enemiesSpawnSpeed = 1250
                levels.maxEnemiesSpawned = 80
                break
        }
    },
}
