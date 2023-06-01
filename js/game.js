/* Global Phaser */

// Copyright (c) 2023 Hewett All rights reserved
//
// Created by: Santiago Hewett
// Created on: May 2023
// This is the phaser3 configuration file

// Scene import statements
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import MenuScene from "./menuScene.js"

// Create the new scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()

/** 
* Start Phaser Game.
*/
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  // Set background color
  backgroundColor: 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
    // We place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
}

const game = new Phaser.Game(config)
// console.log(game)

// Load scenes
// Note: Remember any "key" is global and CAN NOT be reused!
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)
game.scene.add("menuScene", menuScene)

// The start scene
game.scene.start("splashScene")