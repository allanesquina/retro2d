class Game {
  constructor(id, w, h) {
    this.canvas = document.getElementById(id || 'stage');
    this.context = this.canvas.getContext('2d');
    this.state = {
      stage: {
        height: h,
        width: w
      }
    };

    this.objs = [];
    this.render = this.render.bind(this);

    this.bindEvents();
  }

  getGameEventObject() {
    return {
      state: this.zone.state,
      setState: this.zone.setState,
      connect: this.zone.connect,
      globalState: this.state,
      setGlobalState: this.setState,
    };
  }

  bindEvents() {
    document.addEventListener('keydown', (e) => {
      this.objs.map((obj) => {
        (obj.onKeyDown && obj.onKeyDown(e, this.getGameEventObject()));
      });
    });

    document.addEventListener('keyup', (e) => {
      this.objs.map((obj) => {
        (obj.onKeyUp && obj.onKeyUp(e, this.getGameEventObject()));
      });
    });

    document.addEventListener('keypress', (e) => {
      this.objs.map((obj) => {
        (obj.onKeyPress && obj.onKeyPress(e, this.getGameEventObject()));
      });
    });
  }


  cicle() {
    window.requestAnimationFrame(this.render);
  }

  render() {
    this.context.clearRect(0, 0, this.state.stage.width, this.state.stage.height);
    this.objs.map((obj, index) => {
      (obj.stateToProp && obj.stateToProp(this.getGameEventObject()));
      (obj.onEnterFrame && obj.onEnterFrame(this.getGameEventObject()));
      obj.render(this.context, this.state);
      (obj.onCollision && obj.onCollision(this.collisionCalc(obj, index, this.objs), this.getGameEventObject()));
    });
    this.cicle();
  }

  connect(Component) {
    const index = this.objs.push(Component);
    Component.setDisconnectFn(() => {
      delete this.objs[index-1];
    });
  }

  setZone(zone) {
    this.objs = zone.objs;
    this.zone = zone;
  }

  setState(newState) {
    for (var k in newState) {
      if (newState.hasOwnProperty(k)) {
        this.state[k] = newState[k];
      }
    }
  }

  collisionCalc(target, index, objs) {
    return objs.filter((obj, j) => {
      return (
        (target.props.x + target.props.w) >= obj.props.x &&
        target.props.x <= (obj.props.x + obj.props.w) &&
        target.props.y <= (obj.props.y + obj.props.h) &&
        (target.props.y + target.props.h) >= obj.props.y &&
        index !== j
      );
    });
  }
};
