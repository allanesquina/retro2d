var player = Object.assign({}, GameObject, {
  init: function(state) {
    this.props = {
      name: 'Player',
      isShoting: false,
      type: 'rect',
      x: 0,
      y: 270,
      w: 30,
      h:30
    };
  },
  onEnterFrame: function(game) {
    var speed = 10;
    var self = this;
    var frameRateLimit = 40;

    if (this.props.isShooting) {
      if (!this.props.interval) {
        this.props.interval = setTimeout(() => {
          if (game.state.ammo > 0) {
            game.setState({ammo: game.state.ammo - 1});

            game.connect(bullet({
              type: 'rect',
              x: this.props.x + ((this.props.w / 2) - (5/2)),
              y: (game.state.stage.height - this.props.h),
              w: 5,
              h: 8
            }));

            this.props.interval = undefined;
          }
        }, frameRateLimit);
      }
    }

    if (this.props.isWalkingToLeft) {
      if (this.props.x + this.props.w > this.props.w) {
        this.props.x = this.props.x - speed;
      } else {
        this.props.x = 0;
      }
    }

    if (this.props.isWalkingToRight) {
      if (this.props.x + this.props.w < game.state.stage.width) {
        this.props.x = this.props.x + speed;
      } else {
        this.props.x = game.state.stage.width - this.props.w;
      }
    }
  },
  onKeyUp: function(e, game) {
    // Space or D
    if (e.keyCode === 32 || e.keyCode === 68) {
      this.props.isShooting = false;
    }
    //right
    if (e.keyCode === 39 || e.keyCode === 76) {
      this.props.isWalkingToRight = false;
    }
    //left
    if (e.keyCode === 37 || e.keyCode === 72) {
      this.props.isWalkingToLeft = false;
    }
  },
  onKeyPress: function(e, game) {
    // Space or D
  },
  onKeyDown: function(e, game) {
    var space = this.props.h;
    //right
    if (e.keyCode === 39 || e.keyCode === 76) {
      this.props.isWalkingToRight = true;
    }
    //left
    if (e.keyCode === 37 || e.keyCode === 72) {
      this.props.isWalkingToLeft = true;
    }
    // B
    if (e.keyCode === 66) {
      if (game.state.cache > 300) {
        game.setState({
          ammo: game.state.ammo + 100,
          cache: game.state.cache - 300
        });
      }
    }
    //up
    // if (e.keyCode === 38 || e.keyCode === 75) {
    //   this.props.y = this.props.y - space;
    // }
    // //down
    // if (e.keyCode === 40 || e.keyCode === 74) {
    //   this.props.y = this.props.y + space;
    // }
    if (e.keyCode === 77) {
      game.setState({msg: 'HAAAAAAAAAAAAAAAAAAAAAAAA'});
      this.disconnect();
    }

    if (e.keyCode === 32 || e.keyCode === 68) {
      this.props.isShooting = true;      // Space or D
    }
  }
});
