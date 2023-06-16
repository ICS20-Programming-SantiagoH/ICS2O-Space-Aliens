/* global Phaser */ 

// Copyright (c) 2023 Santiago Hewett rights reserved
//
// Created by: Santiago Hewett
// Created on: June 2023
// This is the instructions scene

/** 
* This class is the instructions scene
*/
class InstructionsScene extends Phaser.Scene {
  
  // this is the constructor
  constructor() {
    super({ key: 'instructionsScene' });

    this.background = null
    this.menuButton = null
  }

  init(data) {
    this.cameras.main.setBackgroundColor(0xffffff);
  }

  preload() {
    this.load.image('background', './images/MessiInstructions.jpg')
    this.load.image('menuButton', './images/menuButton.png')
    this.load.audio('instructionsMusic', './sounds/instructionMusic.mp3')
    this.load.audio('instructionsMessi', './sounds/messiInstructions.mp3')
  }

  create(data) {
    //Sound track
    const song = this.sound.add('instructionsMusic');
    song.loop = true
    song.play()

    //Messi speaking
    const speach = this.sound.add('instructionsMessi');
    speach.play()

    this.background = this.add.image(1920 / 2, 1080 / 2, 'background');
    this.background.setOrigin(0.5).setScale(1.90);

   this.menuButton = this.add.sprite(0, 0, 'menuButton'); 
this.menuButton.setScale(0.3);  // Adjust the scale value to make it smaller
this.menuButton.setOrigin(0, 0);  // Set the origin to the top-left corner
this.menuButton.setInteractive({ useHandCursor: true });
this.menuButton.on('pointerdown', () => this.clickBack());

   const instructionsText = this.add.text(1920 / 2, (1080 / 2) + 200, 'Instructions:\n\nUse the arrow keys or WASD to move Messi and press space to shoot soccer balls and hit the soccer nets. Survive and shoot as many soccer nets as you can to get a high score.', {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#00FFFF',
    align: 'center',
    wordWrap: { width: 800, useAdvancedWrap: true }
  });
  instructionsText.setOrigin(0.5);
}

  //Go back to menuScene
 clickBack() {
  this.sound.stopAll() // Stop all sounds
  this.scene.start('menuScene')
  }
}

export default InstructionsScene;