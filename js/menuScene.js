/* global Phaser */

// Copyright (c) 2023 Hewett All rights reserved
//
// Created by: Santiago Hewett
// Created on: May 2023
// This is the Menu scene

/** 
* This class is the Menu Scene
*/
class MenuScene extends Phaser.Scene {
  
  /** 
  * This method is the construtor
  */
  constructor() {
    super({ key: 'menuScene' })

    this.menuSceneBackgroundImage = null;
    this.startButton = null;
    this.MENUSONG = null; // Declare the MENUSONG property
    this.instructionsButton = null
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
    console.log('Menu Scene')
    this.load.image('menuSceneBackground', './images/menu_background_image.jpeg')
    this.load.image('startButton', './images/messiButton.png')
    this.load.image('instructionsButton', './images/instruction-button.png')
    this.load.audio('menuMusic', './sounds/menuSceneMusic.wav')
  }

  /** 
  * Can be defined on your own Scenes.
  * Use it to create your game objects.
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start() 
  */
  create(data) {
    // Soundtrack
  this.MENUSONG = this.sound.add('menuMusic')
  this.MENUSONG.loop = true
  this.MENUSONG.play()

    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(1.25)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton').setScale(2.00)
    this.startButton.setInteractive({ useHandCursor: true})
    this.startButton.on('pointerdown', () => this.clickButton())

    this.instructionsButton = this.add.sprite(1920 / 2, 185, 'instructionsButton'); 
  this.instructionsButton.setScale(0.5); 
    this.instructionsButton.setInteractive({ useHandCursor: true });
    this.instructionsButton.on('pointerdown', () => this.clickInstructions());
  }

  /** 
  * Should be oveidden by your own Scenes.
  * This method is called once per game step while the scene is running.
  * @param {number} time - The current time.
  * @parm {number} delta - The delta time in ms since the last frame.
  */
  update(time, delta) {
  }

  clickButton() {
  // Stop the menu music
  this.MENUSONG.stop()
  this.scene.start('gameScene')
  }
  clickInstructions() {
    this.scene.start('instructionsScene')
    this.MENUSONG.stop()
  }
}

export default MenuScene