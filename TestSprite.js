class TestSprite extends GameObject {
  constructor(props) {
    super(props);
    this.props = props;
    this.sprite = new Image();
    this.sprite.src = 'img/Ligher.png';
    this.props = {
      w: 32,
      h: 32,
      y: 0,
      x: 0,
      sx: 0,
      sy: 0
    }

  }

  stateToProp(game) {
    this.props.text = game.state.ammo;
  }

  render(ctx, state) {
    const { sprite, w, h, x, y } = this.props;
    
    ctx.drawImage(
      this.sprite,
      this.props.sx, 0, w, h,
      x, y, w, h
    );

    this.props.sx = this.props.sx > w ? 0 : this.props.sx + w;
  }

  onEnterFrame(game) {
    if (game.state.ammo === 0) {
      game.setState({ammo: 0});
    }
  }
}
