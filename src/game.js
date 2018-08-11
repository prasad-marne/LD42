import {Howl, Howler} from 'howler';
import Player from './player';

const sound = new Howl({src: ['assets/Orbital_Colossus.mp3']})

export default class Game {

  constructor(app, state, onReady = () => {}) {
    this.app = app;
    const initialize = () => {
      // load the texture we need
      PIXI.loader
        .add("fuji", "assets/fuji.jpeg")
        .add("player", "assets/airplane1.png")
        .load((loader, resources) => {

        const centerX = app.renderer.width / 2;
        const centerY = app.renderer.height / 2;
        const player = new Player(
          new PIXI.Sprite(resources.player.texture),
          state,
          centerX,
          centerY
        );
        // This creates a texture from a 'fuji.png' image
        const fuji = new PIXI.Sprite(resources.fuji.texture);

        // Setup the position of the fuji
        fuji.x = app.renderer.width / 2;
        fuji.y = app.renderer.height / 2;

        // Rotate around the center
        fuji.anchor.x = 0.5;
        fuji.anchor.y = 0.5;

        // Add the fuji to the scene we are building
        app.stage.addChild(fuji);
        app.stage.addChild(player.sprite);
        // Listen for frame updates
        app.ticker.add(() => {
          player.updatePosition();
        });
        onReady();
      });
    }
    initialize();
  }

  play () {
    this.app.start();
    sound.play();
  }

  pause() {
    this.app.stop();
    sound.pause();
  }
}