/* global Phaser */

// Copyright (c) 2023 Hewett All rights reserved
//
// Created by: Santiago Hewett
// Created on: May 2023
// This is the splash scene

/** 
* This class is the Splash Scene
*/
class SplashScene extends Phaser.Scene {
  
  /** 
  * This method is the construtor
  */
  constructor() {
    super({ key: "splashScene" })

    this.splashSceneBackgroundImage = null
  }

  /** 
  * Can be defined on your own Scenes.
  * This method is called by the Scene Manager when the scene starts,
  *  before preload() and create().
  *@param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  init(data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }

  /** 
  * Can be defined on your own Scenes.
  * Use it to load assets.
  */
  preload() {
    console.log("Splash Scene")
    this.load.image("splashSceneBackgound", "./assets/splashSceneImage.png")
  }

  /** 
  * Can be defined on your own Scenes.
  * Use it to create your game objects.
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start() 
  */
  create(data) {
    this.splashSceneBackgroundImage = this.add.spite(
      0,
      0,
      "splashSceneBackgound"
    )
    this.splashSceneBackgroundImage.x = 1920 / 2 
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  /** 
  * Should be oveidden by your own Scenes.
  * This method is called once per game step while the scene is running.
  * @param {number} time - The current time.
  * @parm {number} delta - The delta time in ms since the last frame.
  */
  update(time, delta) {
    if (time > 3000) {
      this.scene.switch("titleScene")
    }
  }
}

export default SplashScene