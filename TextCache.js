var TextCache = Object.assign({}, GameObject, {
  init: function(state) {
    this.props = {
      name: 'TextAmmo',
      type: 'text',
      font: '18px Arial',
      x: 230,
      y: 25
    };
  },
  stateToProp: function(game) {
    this.props.text = game.state.cache;
  },
  onEnterFrame: function(game) {
    if (game.state.cache <= 0) {
      game.setState({cache: 0});
    }
  }
});
