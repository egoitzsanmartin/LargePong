var canvas;
var ctx;
var ballX;
var ballY;
var dx;
var dy;
var ballRadius;
var paddle1Height;
var paddle1Width;
var paddle1Y;
var paddle1X;
var paddle2Height;
var paddle2Width;
var paddle2Y;
var paddle2X;
var upPressed;
var downPressed;
var wPressed;
var sPressed;
var player1Points;
var player2Points;

function hasieratu() {
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ballX = canvas.width / 2;
ballY = canvas.height / 2;
dx = 2;
dy = -2;
ballRadius = 10;
paddle1Height = 75;
paddle1Width = 10;
paddle1Y = (canvas.height - paddle1Height) / 2;
paddle1X = (canvas.width - paddle1Width);
paddle2Height = 75;
paddle2Width = 10;
paddle2Y = (canvas.height - paddle2Height) / 2;
paddle2X = 0;
upPressed = false;
downPressed = false;
wPressed = false;
sPressed = false;
player1Points = 0;
player2Points = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw, 10);
}

function keyDownHandler(e) {
	if (e.keyCode == 38) {
		upPressed = true;
	}
	if (e.keyCode == 40) {
		downPressed = true;
	}
	if (e.keyCode == 87) {
		wPressed = true;
	}
	if (e.keyCode == 83) {
		sPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 38) {
		upPressed = false;
	}
	if (e.keyCode == 40) {
		downPressed = false;
	}
	if (e.keyCode == 87) {
		wPressed = false;
	}
	if (e.keyCode == 83) {
		sPressed = false;
	}
}

function drawPlayer2Points() {
	ctx.font = "40px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(player2Points, canvas.width - 36, 40);
}

function drawPlayer1Points() {
	ctx.font = "40px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(player1Points, 16, 40);
}

function drawCenterLine() {
	ctx.beginPath();
	ctx.rect(canvas.width / 2, 0, 10, canvas.height);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle1() {
	ctx.beginPath();
	ctx.rect(paddle1X, paddle1Y, paddle1Width, paddle1Height);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle2() {
	ctx.beginPath();
	ctx.rect(paddle2X, paddle2Y, paddle2Width, paddle2Height);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPlayer1Points();
	drawPlayer2Points();
	drawCenterLine();
	drawBall();
	drawPaddle1();
	drawPaddle2();

	if (ballX + dx > canvas.width - ballRadius) {
		if (ballY + ballRadius > paddle1Y && ballY - ballRadius < paddle1Y + paddle1Height) {
			dx = -dx * 1.15;
			dy = dy * 1.15;
			}
		else {
			if (player1Points < 3) {
				player1Points = player1Points + 1;
				dx = 2;
				dy = -2;
				ballX = canvas.width / 2;
				ballY = canvas.height / 2;
				paddle1Y = (canvas.height - paddle1Height) / 2;
				paddle1X = (canvas.width - paddle1Width);
				paddle2Y = (canvas.height - paddle2Height) / 2;
				paddle2X = 0;
			}
			if (player1Points == 3) {
				drawPlayer1Points();
				alert("GAME OVER, Player 1 WINS!");
				document.location.reload();
			}
		}
	}
	if (ballX + dx < ballRadius) {
		if (ballY + ballRadius > paddle2Y && ballY - ballRadius < paddle2Y + paddle2Height) {
			dx = -dx * 1.15;
			dy = dy * 1.15;
		}
		else {
			if (player2Points < 3) {
				player2Points = player2Points + 1;
				dx = 2;
				dy = -2;
				ballX = canvas.width / 2;
				ballY = canvas.height / 2;
				paddle1Y = (canvas.height - paddle1Height) / 2;
				paddle1X = (canvas.width - paddle1Width);
				paddle2Y = (canvas.height - paddle2Height) / 2;
				paddle2X = 0;
			}
			if (player2Points == 3) {
				drawPlayer2Points();
				alert("GAME OVER, Player 2 WINS!");
				document.location.reload();
			}
		}
	}

	if (ballY + dy > canvas.height - ballRadius || ballY + dy < ballRadius) {
		dy = -dy;
	}

	if (downPressed && paddle1Y < canvas.height - paddle1Height) {
		paddle1Y = paddle1Y + 7;
	}
	else if (upPressed && paddle1Y > 0 ) {
		paddle1Y = paddle1Y - 7;
	}

	if (sPressed && paddle2Y < canvas.height - paddle2Height) {
		paddle2Y = paddle2Y + 7;
	}
	else if (wPressed && paddle2Y > 0) {
		paddle2Y = paddle2Y - 7;
	}

	ballX = ballX + dx;
	ballY = ballY + dy;

}
