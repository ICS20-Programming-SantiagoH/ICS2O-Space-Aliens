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

    this.ship = null
    this.fireBall = false
    this.score = 0
    this.scoreText = null
    //this.scoreTextStyle = { font: '65px Arial' fill: '#ffffff' align: 'center' }
  }
  
  /** 
  * Can be defined on your own Scenes.
  * This method is called by the Scene Manager when the scene starts,
  *  before preload() and create().
  *@param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  
  /** 
  * Can be defined on your own Scenes.
  * Use it to load assets.
  */
  preload() {
    console.log('Game Scene')

    //Images
    this.load.image('startBackground', './assets/soccerPitch.avif')
    this.load.image('ship', './assets/messi_ship_head.png')
    this.load.image('ball', './assets/soccer_ball.png')
    this.load.image('net', './assets/Soccer_Goal.png')
    

    //sounds
    this.load.audio('laser', './assets/suiii.wav')
    this.load.audio('goal', './assets/goal_sound.wav')
  }

  /** 
  * Can be defined on your own Scenes.
  * Use it to create your game objects.
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start() 
  */
  create(data) {
    //Background
    this.background = this.add.image(0, 0, 'startBackground').setScale(5.0)
    this.background.setOrigin(0, 0)

    //Score
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    //Ship
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.50)

    //group for ball
    this.ballGroup = this.physics.add.group()

    // group for net
    this.netGroup = this.add.group()
    this.createNet()

    // Ball going into net
    this.physics.add.collider(this.ballGroup, this.netGroup, function (ballCollide, netCollide) {
      netCollide.destroy()
      ballCollide.destroy()
      this.sound.play('goal')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createNet()
      this.createNet()
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
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    // Code for ship left
    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 0
      }
    }

    //Code for ship right
    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 1920
      }
    }

    //code for ship up
    if (keyUpObj.isDown === true) {
      this.ship.y -= 15
      if (this.ship.y < 0) {
        this.ship.y = 0
      }
    }

    //code for ship down
    if (keyDownObj.isDown === true) {
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
  }
}

export default GameScene