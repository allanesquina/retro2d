class EnemyController extends GameObject {
  constructor(props) {
    super(props);
    this.props = props;
  }

  // init(state) {
  //   this.props = { name: 'EnemyController', type: 'ctrl' };
  // }

  stateToProp(game) {
    // this.props.text = game.state.ammo;
  }

  onEnterFrame(game) {
    let frameRateLimit = 200;
    if (!this.props.interval) {
      this.props.interval = setTimeout(() => {
        game.connect(new Enemy({
          type: 'rect',
          x: getRandomInt(10, (game.globalState.stage.width - 30)),
          y: -15,
          w: 25,
          h: 25
        }));

        game.connect(new EnemyShake({
          type: 'rect',
          x: getRandomInt(10, (game.globalState.stage.width - 30)),
          y: 0,
          w: 10,
          h: 10,
          speed: getRandomInt(1, 13)
        }));
        this.props.interval = undefined;
      }, frameRateLimit);
    }
  }
}
