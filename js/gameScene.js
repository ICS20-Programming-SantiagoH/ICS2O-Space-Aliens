/* global Phaser */

// Copyright (c) 2023 Hewett All rights reserved
//
// Created by: Santiago Hewett
// Created on: June 2023
// This is the Game scene

/** 
* This class is the Game Scene
*/
class GameScene extends Phaser.Scene {
  
  //Soccer net creation
  createNet () {
    const netXLocation = Math.floor(Math.random() * 1920) + 1 //This will get a random number between 1 and 1920
    
    let netXVelocity = Math.floor(Math.random() * 50) +1 //This will get a random number between 1 and 50;
    
    netXVelocity *= Math.round(Math.random()) ? 1 : -1 //This will make 50% of the cases negative
    
    const anNet = this.physics.add.sprite(netXLocation, -100, 'net')
    anNet.body.velocity.y = 200
    anNet.body.velocity.x = netXVelocity
    this.netGroup.add(anNet)
  }

  /** 
  * This method is the construtor
  */
  constructor() {
    super({ key: 'gameScene' })
    //set to false
    this.fireBall = false
    //set to null
    this.ship = null
    this.gameOverText = null
    this.highScoreText = null
    //set to zero
    this.highScore = 0
    this.score = 0
    //set sixe, font and position of text
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
    this.highScoreTextStyle = { font: '65px Arial', fill: '#FF7F50', align: 'center' }
    this.scoreTextStyle = { font: '65px Arial', fill: '#FF7F50', align: 'center' }
  }
  
  /** 
  * Can be defined on your own Scenes.
  * This method is called by the Scene Manager when the scene starts,
  *  before preload() and create().
  *@param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  init(data) {
    this.cameras.main.setBackgroundColor('#0x5f6e7a')
    
     // Retrieve high score from local storage
    const storedHighScore = localStorage.getItem('highScore')
    if (storedHighScore) {
      this.highScore = parseInt(storedHighScore)
    }
  }
  
  /** 
  * Can be defined on your own Scenes.
  * Use it to load assets.
  */
  preload() {
    console.log('Game Scene')

    //Images
    this.load.image('startBackground', './images/soccerPitch.avif')
    this.load.image('ship', './images/messi_ship_head.png')
    this.load.image('ball', './images/soccer_ball.png')
    this.load.image('net', './images/Soccer_Goal.png')
    

    //sounds
    this.load.audio('laser', './sounds/suiii.wav')
    this.load.audio('goal', './sounds/goal_sound.wav')
    this.load.audio('bomb', './sounds/messi_getting_hit.wav')
    this.load.audio('music', './sounds/music.wav')
  }

  /** 
  * Can be defined on your own Scenes.
  * Use it to create your game objects.
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start() 
  */
  create(data) {
    // Soundtrack
    const song = this.sound.add('music')
  song.loop = true
  song.play()
    
    //Background
    this.background = this.add.image(0, 0, 'startBackground').setScale(5.0)
    this.background.setOrigin(0, 0)

    //Score
    this.scoreText = this.add.text(10, 10, 'Goals: ' + this.score.toString(), this.scoreTextStyle)

    // High score text
    this.highScoreText = this.add.text(10, 70, 'High Score: ' + this.highScore.toString(), this.highScoreTextStyle);

    //Ship
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.50)

    //group for ball
    this.ballGroup = this.physics.add.group()

    // group for net
    this.netGroup = this.add.group()
    this.createNet()
    this.createNet()

    // Function to create an defender
  const createNet = () => {
    const netXLocation = Math.floor(Math.random() * 1920) * 1;
    let netXVelocity = Math.floor(Math.random() * 50) + 1;
    netXVelocity *= Math.round(Math.random()) ? 1 : -1;

    const anNet = this.physics.add.sprite(netXLocation, -100, 'net');
    anNet.body.velocity.y = 200;
    anNet.body.velocity.x = netXVelocity;
    anNet.setScale(1.00);

    this.netGroup.add(anNet);
  };

    // Create a timer event to call createAlien every 2 seconds
  const netTimer = this.time.addEvent({
    delay: 2000,
    callback: createNet,
    callbackScope: this,
    loop: true
  });

    // Ball going into net
    this.physics.add.collider(this.ballGroup, this.netGroup, function (ballCollide, netCollide) {
      netCollide.destroy()
      ballCollide.destroy()
      this.sound.play('goal')
      this.score = this.score + 1
      this.scoreText.setText('Goals: ' + this.score.toString())
      this.createNet()
      this.createNet()
    }.bind(this))

    // A net hitting Messi
this.physics.add.collider(this.ship, this.netGroup, function (ballCollide, netCollide) {
  // Disable the space bar
    const keySpaceObj = this.input.keyboard.addKey('SPACE')
    keySpaceObj.enabled = false; 
  
  this.sound.play('bomb')
  song.pause('music')
    this.physics.pause()
      netCollide.destroy()
      ballCollide.destroy()
  this.score = 0
  this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
  this.gameOverText.setInteractive({ useHandCursor: true })
  this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    }.bind(this))
    
  }

  /** 
  * Should be overridden  by your own Scenes.
  * This method is called once per game step while the scene is running.
  * @param {number} time - The current time.
  * @parm {number} delta - The delta time in ms since the last frame.
  */
  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keyUpObj = this.input.keyboard.addKey('UP')
    const keyDownObj = this.input.keyboard.addKey('DOWN')
    const keyAObj = this.input.keyboard.addKey('A')
    const keyDObj = this.input.keyboard.addKey('D')
    const keyWObj = this.input.keyboard.addKey('W')
    const keySObj = this.input.keyboard.addKey('S')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    //move with arrow keys
    // Code for ship left with left arrow
    if (keyLeftObj.isDown === true) {
      this.ship.setFlipX(false)
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
    }

    //Code for ship right with right arrow
    if (keyRightObj.isDown === true) {
      this.ship.setFlipX(true);
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }

    //code for ship up wih up arrow
    if (keyUpObj.isDown === true) {
      this.ship.y -= 15
      if (this.ship.y < 0) {
        this.ship.y = 0
      }
    }

    //code for ship down with down arrow
    if (keyDownObj.isDown === true) {
      this.ship.y += 15
      if (this.ship.y > 1920) {
        this.ship.y = 1920
      }
    }

// move with letters
     // Code for ship left with A
    if (keyAObj.isDown === true) {
      this.ship.setFlipX(false)
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
    }

    //Code for ship right with D
    if (keyDObj.isDown === true) {
      this.ship.setFlipX(true)
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }

    //code for ship up with W
    if (keyWObj.isDown === true) {
      this.ship.y -= 15
      if (this.ship.y < 0) {
        this.ship.y = 0
      }
    }

    //code for ship down with S
    if (keySObj.isDown === true) {
      this.ship.y += 15
      if (this.ship.y > 1920) {
        this.ship.y = 1920
      }
    }
    
    //code for balls
    if (keySpaceObj.isDown === true) {
      if (this.fireBall === false) {
        //fire ball
        this.fireBall = true
        const aNewBall = this.physics.add.sprite(this.ship.x, this.ship.y, 'ball').setScale(0.5)
        this.ballGroup.add(aNewBall)
        this.sound.play('laser')
      }
    }

    if (keySpaceObj.isUp === true){
      this.fireBall = false
    }

    this.ballGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) {
        item.destroy()
      }
    })
    
    //If statment for high score
    if (this.score > this.highScore) {
      this.highScore = this.score
      this.highScoreText.setText('High Score: ' + this.highScore.toString())

      // Store the new high score in local storage
      localStorage.setItem('highScore', this.highScore.toString())
    }
  }
}

export default GameScene