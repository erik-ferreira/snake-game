window.onload = function () {
  let cnv = document.getElementById('cnv')
  let ctx = cnv.getContext('2d')
  let scoreResult = document.getElementById('score')
  document.addEventListener("keydown", clickedKeyboard)

  const speed = 1
  let speedX = speedAxisY = 0
  
  // posições da cabeça da cobrinha
  let snakeHandPositionX = 10
  let snakeHandPositionY = 15
  
  let pieceSize = 15 // tamanho da peça
  let totalNumberOfPieces = 25 // quantidade de peças
  
  // Posição da maçã
  let applePositionX = applePositionY = Math.floor(Math.random() * 21) 
  
  let moveLeft = moveUp = moveDown = moveRight = false
  let left = 37, up = 38, right = 39, down = 40
  
  setInterval(startGame, 1000 / 10)
  setInterval(moveSnake, 1000 / 15)

  let trail = [] // rastro
  let tail = 5 // rabo da cobra
  let score = 0 // número de scores 

  function startGame() {
    
    snakeHandPositionX += speedX
    snakeHandPositionY += speedAxisY
    if (snakeHandPositionX < 0) {
      snakeHandPositionX = totalNumberOfPieces - 1
    }
    if (snakeHandPositionX > totalNumberOfPieces - 1) {
      snakeHandPositionX = 0
    }
    if (snakeHandPositionY < 0) {
      snakeHandPositionY = totalNumberOfPieces - 1
    }
    if (snakeHandPositionY > totalNumberOfPieces - 1) {
      snakeHandPositionY = 0
    }

    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    ctx.fillStyle = "#f00"
    ctx.fillRect(applePositionX * pieceSize, applePositionY * pieceSize, pieceSize, pieceSize)

    ctx.fillStyle = "#13B413"
    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * pieceSize, trail[i].y * pieceSize, pieceSize - 1, pieceSize - 1)
      if (trail[i].x == snakeHandPositionX && trail[i].y == snakeHandPositionY) {
        //game over
        moveRight = moveLeft = moveUp = moveDown = false
        tail = 5
        score = 0
        speedX = speedAxisY = 0
      }
      scoreResult.innerHTML = `${score}`
    }

    if (snakeHandPositionX == applePositionX && snakeHandPositionY == applePositionY) {
      tail++
      score++
      applePositionX = Math.floor(Math.random() * totalNumberOfPieces)
      applePositionY = Math.floor(Math.random() * totalNumberOfPieces)
    }
    trail.push({
      x: snakeHandPositionX,
      y: snakeHandPositionY
    })

    while (trail.length > tail) {
      trail.shift()
    }
  }

  function clickedKeyboard(t) {
    let key = t.keyCode
    if (key == left) {
      if (moveRight) {

      } else {
        moveLeft = true
        moveRight = false
        moveUp = false
        moveDown = false
      }
    } if (t.keyCode == up) {
      if (moveDown) {

      } else {
        moveUp = true
        moveDown = false
        moveRight = false
        moveLeft = false
      }

    } if (t.keyCode == right) {
      if (moveLeft) {

      } else {
        moveRight = true
        moveLeft = false
        moveUp = false
        moveDown = false
      }
    } if (t.keyCode == down) {
      if (moveUp) {

      } else {
        moveDown = true
        moveUp = false
        moveLeft = false
        moveRight = false
      }

    }
  }

  function moveSnake() {
    if (moveLeft == true) {
      speedX = -speed
      speedAxisY = 0
    }
    if (moveUp == true) {
      speedX = 0
      speedAxisY = -speed
    }
    if (moveRight == true) {
      speedX = speed
      speedAxisY = 0
    }
    if (moveDown == true) {
      speedX = 0
      speedAxisY = speed
    }
  }
}