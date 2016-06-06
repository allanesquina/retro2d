class Player extends GameObject {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onEnterFrame(game) {
    const speed = 8;

    if (this.props.isShooting) {
      const time = Date.now() / 1000;
      if (time > this.lastTime + .051) {
        this.lastTime = time;
        if (game.state.ammo > 0) {
          game.setState({ammo: game.state.ammo - 1});

          game.connect(new Bullet({
            name: 'Bullet',
            type: 'rect',
            x: this.props.x + 15,
            y: (game.globalState.stage.height - this.props.h),
            w: 2,
            h: 4
          }));
          this.props.interval = undefined;
        }
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
      if (this.props.x + this.props.w < game.globalState.stage.width) {
        this.props.x = this.props.x + speed;
      } else {
        this.props.x = game.globalState.stage.width - this.props.w;
      }
    }
  }

  onKeyUp(e, game) {
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
  }

  onKeyPress(e, game) {
    // Space or D
  }

  onKeyDown(e, game) {
    const space = this.props.h;
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
}
