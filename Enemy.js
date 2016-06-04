class Enemy extends GameObject {
  constructor(props) {
    super(props);
    this.props = props;
  }

  stateToProp(game) {
    // this.props.text = game.state.ammo;
  }

  onEnterFrame(game) {
    this.props.y = this.props.y + 1;
    if (this.props.y  > game.globalState.stage.height) {
      this.disconnect();
    }
  }

  onCollision(objs, game) {
    if (objs.length > 0) {
      objs.map((obj) => {
        if (obj.props.name === 'Bullet') {
          game.setState({cache: game.state.cache + 10});
          this.disconnect();
          obj.disconnect();
        }
      });
    }
  }
}
