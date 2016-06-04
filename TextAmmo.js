class AmmoComponent extends GameObject {
  constructor(props) {
    super(props);
    this.props = props;
  }
  stateToProp(game) {
    this.props.text = game.state.ammo;
  }

  onEnterFrame(game) {
    if (game.state.ammo === 0) {
      game.setState({ammo: 0});
    }
  }
}
