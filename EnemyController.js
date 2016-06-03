var EnemyController = Object.assign({}, GameObject, {
  init: function(state) {
    this.props = { name: 'EnemyController', type: 'ctrl' };
  },
  stateToProp: function(game) {
    // this.props.text = game.state.ammor;
  },
  onEnterFrame: function(game) {
    var self = this;
    var frameRateLimit = 200;
    if (!this.props.interval) {
      this.props.interval = setTimeout(() => {
        game.connect(Enemy({
          type: 'rect',
          x: getRandomInt(10, (game.state.stage.width - 30)),
          y: -15,
          w: 25,
          h: 25
        }));

        this.props.interval = undefined;
      }, frameRateLimit);
    }
  }
});
