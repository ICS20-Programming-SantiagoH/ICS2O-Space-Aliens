/* global Phaser */

// Copyright (c) 2023 Santiago Hewett All rights reserved
//
// Created by: Santiago Hewett
// Created on: June 2023
// This is the Title Scene

/** 
* This class is the Title Scene
*/
class TitleScene extends Phaser.Scene {

  /** 
  * This method is the construtor
  */
  constructor () {
    super({ key: 'titleScene' })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' }
  }

  /** 
  * Can be defined on your own Scenes.
  * This method is called by the Scene Manager when the scene starts,
  *  before preload() and create().
  *@param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  /** 
  * Can be defined on your own Scenes.
  * Use it to load assets.
  */
  preload () {
    console.log('Title Scene')
    this.load.image('titleSceneBackground', './images/soccer_screen_image.jpg')
  }

  /** 
  * Can be defined on your own Scenes.
  * Use it to create your game objects.
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start() 
  */
  create (data) {
    //position and size of the backgound image
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(3.00)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

    //size and origin of text
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Messi just being the best', this.titleSceneTextStyle).setOrigin(0.5).setScale(0.8)
  }

  /** 
  * Should be overridden  by your own Scenes.
  * This method is called once per game step while the scene is running.
  * @param {number} time - The current time.
  * @parm {number} delta - The delta time in ms since the last frame.
  */
  update (time, delta) {
    if (time > 10000) {
      this.scene.switch('menuScene')
    }
  }
}

export default TitleScene