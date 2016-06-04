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
    let frameRateLimit = 150;
    if (!this.props.interval) {
      this.props.interval = setTimeout(() => {
        game.connect(new Enemy({
          type: 'rect',
          x: getRandomInt(10, (game.globalState.stage.width - 30)),
          y: -15,
          w: 25,
          h: 25
        }));

        this.props.interval = undefined;
      }, frameRateLimit);
    }
  }
}
