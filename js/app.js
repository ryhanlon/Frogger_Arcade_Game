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

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for all computers

	this.x += this.speed * dt;
	// if (this.x > 707) {
	// 	this.x = -100;
	// 	let someSpeed = Math.floor(Math.random() * 4 + 1);
	// 	this.speed = 60 * someSpeed;
	// }
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

// When game ends, put player back in starting position
Player.prototype.resetPosition = function() {
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
