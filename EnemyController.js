class EnemyController extends GameObject {
  constructor(props) {
    super(props);
    this.props = props;
    this.audio = new Audio('audio/explosion.wav');
    this.audio.volume = .6;
    this.enemyOptions = ['Ninja', 'Paranoid', 'UFO', 'Saboteur'];
  }

  // init(state) {
  //   this.props = { name: 'EnemyController', type: 'ctrl' };
  // }

  stateToProp(game) {
    // this.props.text = game.state.ammo;
  }

  onEnterFrame(game) {
    const time = Date.now() / 1000;
    if (time > this.lastTime + .4) {
      this.lastTime = time;
      game.connect(new Enemy({
        type: 'sprite',
        sprite: 'img/' + this.enemyOptions[getRandomInt(0, 4)] + '.png',
        x: getRandomInt(10, (game.globalState.stage.width - 30)),
        y: -15,
        w: 32,
        h: 32,
        sx: 0,
        sy: 0,
        audio: this.audio
      }));
    }
  }
}
