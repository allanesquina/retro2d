class GameObject {
  constructor(props) {
    this.props = props;
  }

  setDisconnectFn(fn) {
    this.disconnect = fn;
  }

  render(ctx, state) {
    switch (this.props.type) {
      case 'rect':
        ctx.fillStyle = '#888';
        ctx.fillRect(this.props.x, this.props.y, this.props.w, this.props.h);
        break;
      case 'text':
        ctx.font = this.props.font;
        ctx.fillText(this.props.text, this.props.x, this.props.y);
        break;
      default:
    }
  }
}
