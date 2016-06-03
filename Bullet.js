var bullet = function (props) {
  return Object.assign({}, GameObject, {
    init: function(state) {
      this.props = props;
      this.props.name = 'Bullet';
    },
    onEnterFrame: function (game) {
      this.props.y = this.props.y - 20;
      if (this.props.y + this.props.h < 0) {
        this.disconnect();
      }
    }
  });
}
