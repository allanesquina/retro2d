class Bullet extends GameObject {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onEnterFrame(game) {
    this.props.y = this.props.y - 10;
    if (this.props.y + this.props.h < 0) {
      this.disconnect();
    }
  }
}
