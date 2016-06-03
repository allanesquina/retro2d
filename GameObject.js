var GameObject = {
  setDisconnectFn: function(fn) {
    this.disconnect = fn;
  },
  render: function(ctx, state) {
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
};
