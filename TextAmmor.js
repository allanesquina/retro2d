var AmmorComponent = Object.assign({}, GameObject, {
  init: function(state) {
    this.props = {
      name: 'TextAmmor',
      type: 'text',
      font: '18px Arial',
      x: 430,
      y: 25
    };
  },
  stateToProp: function(game) {
    this.props.text = game.state.ammor;
  },
  onEnterFrame: function(game) {
    if (game.state.ammor === 0) {
      game.setState({ammor: 0});
    }
  }
});
