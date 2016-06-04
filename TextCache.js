class TextCache extends GameObject {
  constructor(props) {
    super(props);
    this.props = props;
  }

  stateToProp(game) {
    this.props.text = game.state.cache;
  }

  onEnterFrame(game) {
    if (game.state.cache <= 0) {
      game.setState({cache: 0});
    }
  }
}
