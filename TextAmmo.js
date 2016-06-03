var AmmoComponent = Object.assign({}, GameObject, {
  init: function(state) {
    this.props = {
      name: 'TextAmmo',
      type: 'text',
      font: '18px Arial',
      x: 430,
      y: 25
    };
  },
  stateToProp: function(game) {
    this.props.text = game.state.ammo;
  },
  onEnterFrame: function(game) {
    if (game.state.ammo === 0) {
      game.setState({ammo: 0});
    }
  }
});
