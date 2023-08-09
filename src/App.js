import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const GameScene = {
  preload() {
  },
  create() {
    this.ball = this.physics.add.image(0,0, "ball");
    // invisible wall on bottom
    this.wall1 = this.physics.add.image(200,375,"wall1");
    this.wall1.displayWidth=400
    this.wall1.displayHeight=50;
    this.wall1.setImmovable(true);
    this.physics.add.collider(this.ball,this.wall1);
    this.wall1.setAlpha(0);
    //
    // invisible wall on top
    this.wall2 = this.physics.add.image(200,20,"wall2");
    this.wall2.displayWidth=400
    this.wall2.displayHeight=50;
    this.wall2.setImmovable(true);
    this.physics.add.collider(this.ball,this.wall2);
     this.wall2.setAlpha(0);
    //
    // // invisible wall on left
    this.wall3 = this.physics.add.image(20,200,"wall3");
    this.wall3.displayWidth=50
    this.wall3.displayHeight=400;
    this.wall3.setImmovable(true);
    this.physics.add.collider(this.ball,this.wall3);
    this.wall3.setAlpha(0);
    // //
    // // invisible wall on right
    this.wall4 = this.physics.add.image(375,200,"wall4");
    this.wall4.displayWidth=50
    this.wall4.displayHeight=400;
    this.wall4.setImmovable(true);
    this.physics.add.collider(this.ball,this.wall4);
     this.wall4.setAlpha(0);
    //
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(250,250)
  },
  update() {

  }
};
const App = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 400,
      height: 400,
      backgroundColor: '#00BFFF',
      scale: {
        mode: Phaser.Scale,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
      scene: GameScene,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
    };
    gameRef.current = new Phaser.Game(config);
    return () => {
    gameRef.current.destroy(true);
    };
  }, []);

  const handleClick = (xPosition, yposition) => {

    const scene = gameRef.current.scene.scenes[0];
    const distanceX = xPosition - scene.ball.x;
     const distanceY = yposition - scene.ball.y;

    const angle = Math.atan2(distanceY, distanceX);

    const speed = 500; 
    const xVelocity = Math.cos(angle) * speed;
    const yVelocity = Math.sin(angle) * speed;  
    scene.ball.setVelocity(xVelocity, yVelocity);
  };

  return (
    <div >
      <button onClick={()=>handleClick(100,0)} className='button1'>click me 1</button>
      <button onClick={()=>handleClick(300,0)} className='button2'>click me 2</button>
      <button onClick={()=>handleClick(400,100)} className='button3'>click me 3</button>
      <button onClick={()=>handleClick(400,300)} className='button4'>click me 4</button>
      <button onClick={()=>handleClick(300,400)} className='button5'>click me 5</button>
      <button onClick={()=>handleClick(100,400)} className='button6'>click me 6</button>
      <button onClick={()=>handleClick(0,100)}className='button7'>click me 7</button>
      <button onClick={()=>handleClick(0,300)}className='button8'>click me 8</button>
    </div>
  );
};

export default App;
