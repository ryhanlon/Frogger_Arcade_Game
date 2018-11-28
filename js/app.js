/**
 * @description  Enemies our player must avoid
 * @param {x} x position of a Enemybug
 * @param {y} y position of a Enemybug
 * @param {speed} speed of a Enemybug
 */
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances

    // The image/sprite for our enemies, this uses a helper from resources.js
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Collision details
// Enemy.prototype.collision = function() {
	// let enemyXRight = this.x + 50;
	// let enemyXLeft = this.x - 50;
	// let enemyYTop = this.y - 50;
	// let enemyYBottom = this.y + 50;

// 	if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
// 		object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
// // The objects are touching
// }

// 	if (player.x < enemyXRight && player.x > enemyXLeft &&
// 		player.y > enemyYTop  && player.y < enemyYBottom) {
// // The objects are touching
// 		Player.resetPosition();

// }
//
// };

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// Multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for all computers

	this.x += this.speed * dt;
	if (this.x > 707) {
		this.x = -100;
		let someSpeed = Math.floor(Math.random() * 15 + 1 / 2);
		this.speed = 60 * someSpeed;
	}

	// Sides of enemy for collision
	let enemyXRight = this.x + 65;
	let enemyXLeft = this.x - 65;
	let enemyYTop = this.y - 65;
	let enemyYBottom = this.y + 65;

	if (player.x < enemyXRight && player.x > enemyXLeft &&
		player.y > enemyYTop && player.y < enemyYBottom) {
// The objects are touching
		player.resetPosition();
		player.loseMessage();

	}
};


// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
 * @description  Player class, add update(), render() and handleInput() methods
 */
let Player = function() {
    this.sprite = 'images/char-boy.png';
	this.x = 303;
	this.y = 404;
	this.h_step = 101;
	this.v_step = 83;
};


Player.prototype.winMessage = function() {
	const winMessage = `Hooray!  You win!`;

	const messageContainer = document.querySelector('.message-container');
	// messageContainer.classList.remove('remove-message');
	messageContainer.classList.add('show-message');

	const messageHeading = document.querySelector('.message');
	messageHeading.innerText = winMessage;
	// winSound();

};

Player.prototype.loseMessage = function() {
	const loseMessage = `Oh, drats.  The enemy-bug got you!`;

	const messageContainer = document.querySelector('.message-container');
	// messageContainer.classList.remove('remove-message');
	messageContainer.classList.add('show-message');

	const messageHeading = document.querySelector('.message');
	messageHeading.innerText = loseMessage;
	// winSound();

};

Player.prototype.removeGameAlertLoser = function () {
	const message = document.querySelector('.message-container');
	message.classList.remove('show-message');
	message.classList.add('remove-message');
};


Player.prototype.removeButton = function() {
	document.getElementById("playAgain").addEventListener("click", this.removeGameAlertLoser);

};


// When game ends, put player back in starting position
Player.prototype.resetPosition = function() {
	this.winMessage();
	this.removeButton();
	this.x = 303;
	this.y = 404;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Keyboard controller with arrow keys
Player.prototype.handleInput = function (direction) {
	switch (direction) {
		case 'left':
			this.x >= this.h_step ? this.x -= this.h_step : this.x -= 0;
			break;
		case 'right':
			this.x <= (this.h_step * 5) ? this.x += this.h_step : this.x -= 0;
			break;
		case 'up':
			this.y -= this.v_step;
			if (this.y <= 50) {
				// updateView('you win!');
				this.resetPosition();
			}
			break;
		case 'down':
			this.y <= (this.v_step * 4) ? this.y += this.v_step : this.y += 0;
			break;
	}
};

// Objects instantiated
// randomAtor of random speeds for enemy
const randomAtor = () => (Math.floor(Math.random() * 500 + 1 / 3));

let enemyBug1 = new Enemy(-80, 60, randomAtor());
let enemyBug2 = new Enemy(-80, 60 + 80, randomAtor());
let enemyBug3 = new Enemy(-80, 60 + 80 * 2, randomAtor());

// Place all enemy objects in an array called allEnemies
let allEnemies = [enemyBug1, enemyBug2, enemyBug3];

// Place player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (allowedKeys[e.keyCode]) {
		player.handleInput(allowedKeys[e.keyCode]);
	}
});
