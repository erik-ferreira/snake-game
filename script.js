window.onload = function () {
  let cnv = document.getElementById("cnv");
  let ctx = cnv.getContext("2d");
  let scoreResult = document.getElementById("score");
  document.addEventListener("keydown", (event) =>
    clickedKeyboard(event.keyCode)
  );

  const speed = 1;
  let speedX = (speedAxisY = 0);

  // posições da cabeça da cobrinha
  let snakeHandPositionX = 10;
  let snakeHandPositionY = 15;

  let pieceSize = 15; // tamanho da peça
  let totalNumberOfPieces = 25; // quantidade de peças

  // Posição da maçã
  let applePositionX = (applePositionY = Math.floor(Math.random() * 21));

  let moveLeft = (moveUp = moveDown = moveRight = false);
  let left = 37,
    up = 38,
    right = 39,
    down = 40;

  setInterval(startGame, 1000 / 10);
  setInterval(moveSnake, 1000 / 15);

  let trail = []; // rastro
  let tail = 5; // rabo da cobra
  let score = 0; // número de scores

  function startGame() {
    snakeHandPositionX += speedX;
    snakeHandPositionY += speedAxisY;
    if (snakeHandPositionX < 0) {
      snakeHandPositionX = totalNumberOfPieces - 1;
    }
    if (snakeHandPositionX > totalNumberOfPieces - 1) {
      snakeHandPositionX = 0;
    }
    if (snakeHandPositionY < 0) {
      snakeHandPositionY = totalNumberOfPieces - 1;
    }
    if (snakeHandPositionY > totalNumberOfPieces - 1) {
      snakeHandPositionY = 0;
    }

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.fillStyle = "#f00";
    ctx.fillRect(
      applePositionX * pieceSize,
      applePositionY * pieceSize,
      pieceSize,
      pieceSize
    );

    ctx.fillStyle = "#13B413";
    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(
        trail[i].x * pieceSize,
        trail[i].y * pieceSize,
        pieceSize - 1,
        pieceSize - 1
      );
      if (
        trail[i].x == snakeHandPositionX &&
        trail[i].y == snakeHandPositionY
      ) {
        //game over
        moveRight = moveLeft = moveUp = moveDown = false;
        tail = 5;
        score = 0;
        speedX = speedAxisY = 0;
      }
      scoreResult.innerHTML = `${score}`;
    }

    if (
      snakeHandPositionX == applePositionX &&
      snakeHandPositionY == applePositionY
    ) {
      tail++;
      score++;
      applePositionX = Math.floor(Math.random() * totalNumberOfPieces);
      applePositionY = Math.floor(Math.random() * totalNumberOfPieces);
    }
    trail.push({
      x: snakeHandPositionX,
      y: snakeHandPositionY,
    });

    while (trail.length > tail) {
      trail.shift();
    }
  }

  function clickedKeyboard(key) {
    if (key == left) {
      if (moveRight) {
      } else {
        moveLeft = true;
        moveRight = false;
        moveUp = false;
        moveDown = false;
      }
    }
    if (key == up) {
      if (moveDown) {
      } else {
        moveUp = true;
        moveDown = false;
        moveRight = false;
        moveLeft = false;
      }
    }
    if (key == right) {
      if (moveLeft) {
      } else {
        moveRight = true;
        moveLeft = false;
        moveUp = false;
        moveDown = false;
      }
    }
    if (key == down) {
      if (moveUp) {
      } else {
        moveDown = true;
        moveUp = false;
        moveLeft = false;
        moveRight = false;
      }
    }
  }

  function moveSnake() {
    if (moveLeft == true) {
      speedX = -speed;
      speedAxisY = 0;
    }
    if (moveUp == true) {
      speedX = 0;
      speedAxisY = -speed;
    }
    if (moveRight == true) {
      speedX = speed;
      speedAxisY = 0;
    }
    if (moveDown == true) {
      speedX = 0;
      speedAxisY = speed;
    }
  }

  function mobileCheck() {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  const isMobileBrowser = mobileCheck();
  if (isMobileBrowser) {
    const divContentButtons = document.getElementById("content-buttons");

    divContentButtons.innerHTML = `
      <button type="button" id="up">
        C
      </button>

      <div>
        <button type="button" id="left">E</button>
        <button type="button" id="down">D</button>
        <button type="button" id="right">R</button>
      </div>
    `;

    // botões na tela
    document.getElementById("up").addEventListener("click", (event) => {
      clickedKeyboard(38);
    });

    document.getElementById("left").addEventListener("click", (event) => {
      clickedKeyboard(37);
    });

    document.getElementById("down").addEventListener("click", (event) => {
      clickedKeyboard(40);
    });

    document.getElementById("right").addEventListener("click", (event) => {
      clickedKeyboard(39);
    });
  }
};
