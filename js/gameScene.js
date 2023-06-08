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
    this.load.image('missile', './assets/soccer_ball_missile.png')
    this.load.image('net', './assets/Soccer_Goal.png')

    //sound
    this.load.audio('laser', './assets/suiii.wav')
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

    //Ship
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.50)

    //group for Missile
    this.missileGroup = this.physics.add.group()

    // group for net
    this.netGroup = this.add.group()
    this.createNet()
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

    //code for missiles
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        //fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile').setScale(0.5)
        this.missileGroup.add(aNewMissile)
        this.sound.play('laser')
      }
    }

    if (keySpaceObj.isUp === true){
      this.fireMissile = false
    }

    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) {
        item.destroy()
      }
    })
  }
}

export default GameScene