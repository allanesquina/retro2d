class EnemyController extends GameObject {
  constructor(props) {
    super(props);
    this.props = props;
    this.enemyOptions = ['Ninja', 'Paranoid', 'UFO', 'Saboteur'];
  }

  // init(state) {
  //   this.props = { name: 'EnemyController', type: 'ctrl' };
  // }

  stateToProp(game) {
    // this.props.text = game.state.ammo;
  }

  onEnterFrame(game) {
    let frameRateLimit = 300;
    if (!this.props.interval) {
      this.props.interval = setTimeout(() => {
        game.connect(new Enemy({
          type: 'sprite',
          sprite: 'img/' + this.enemyOptions[getRandomInt(0, 4)] + '.png',
          x: getRandomInt(10, (game.globalState.stage.width - 30)),
          y: -15,
          w: 32,
          h: 32,
          sx: 0,
          sy: 0
        }));
        this.props.interval = undefined;
      }, frameRateLimit);
    }
  }
}
