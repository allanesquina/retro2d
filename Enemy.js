var Enemy = function(props) {
  return Object.assign({}, GameObject, {
    init: function(state) {
      this.props = props;
    },
    stateToProp: function(game) {
      // this.props.text = game.state.ammo;
    },
    onEnterFrame: function(game) {
      this.props.y = this.props.y + 1;
      if (this.props.y  > game.state.stage.height) {
        this.disconnect();
      }
    },
    onCollision: function(objs, game) {
      var self = this;
      if (objs.length > 0) {
        objs.map(function(obj) {
          if (obj.props.name === 'Bullet') {
            game.setState({cache: game.state.cache + 10});
            self.disconnect();
          }
        });
      }
    }
  });
};
