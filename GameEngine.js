class Game {
  constructor(id, w, h, frameSkip) {
    this.canvas = document.getElementById(id || 'stage');
    this.context = this.canvas.getContext('2d');
    this.state = {
      stage: {
        height: h,
        width: w,
        frameSkip
      }
    };

    this.render = this.render.bind(this);
    this.walkThroughGameObjects = this.walkThroughGameObjects.bind(this);

    this.bindEvents();
    window.context = this.context;
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
      this.walkThroughGameObjects((obj, i) => {
        (obj.onKeyDown && obj.onKeyDown(e, this.getGameEventObject()));
      });
    });

    document.addEventListener('keyup', (e) => {
      this.walkThroughGameObjects((obj, i) => {
        (obj.onKeyUp && obj.onKeyUp(e, this.getGameEventObject()));
      });
    });

    document.addEventListener('keypress', (e) => {
      this.walkThroughGameObjects((obj, i) => {
        (obj.onKeyPress && obj.onKeyPress(e, this.getGameEventObject()));
      });
    });
  }

  cicle() {
    window.requestAnimationFrame(this.render);
  }

  render() {
    if (!this.interval) {
      this.interval = setTimeout(() => {
        this.interval = null;
        this.context.clearRect(0, 0, this.state.stage.width, this.state.stage.height);
        this.walkThroughGameObjects((obj, i) => {
          (obj.stateToProp && obj.stateToProp(this.getGameEventObject()));
          (obj.onEnterFrame && obj.onEnterFrame(this.getGameEventObject()));
          obj.render(this.context, this.state);
          (obj.onCollision && obj.onCollision(this.collisionCalc(obj, i), this.getGameEventObject()));
        });
      }, this.state.stage.frameSkip);
    }

    this.cicle();
  }

  walkThroughGameObjects(fn) {
    const gameIndexes = this.zone.objectsIndexes;
    const gameIndexesLength = this.zone.objectsIndexesLength;
    const objs = this.zone.objs;
    const margin = this.state.stage.frameSkip === 0 ? 300 : 60;
    let i = 0;
    let j = 0;
    let n = 0;

    for (; j < gameIndexesLength; i += 1) {
      const obj = objs[gameIndexes[i]];
      if (obj) {
        fn(obj, i, j, n);
        j++;
      } else {
        n++;
        if(n >= margin) {
          j++;
        }
      }
    }
  }

  setZone(zone) {
    this.zone = zone;
  }

  setState(newState) {
    for (var k in newState) {
      if (newState.hasOwnProperty(k)) {
        this.state[k] = newState[k];
      }
    }
  }


  collisionCalc(target, index) {
    let out = [];
    this.walkThroughGameObjects((obj, i) => {
      if (
        (target.props.x + target.props.w) >= obj.props.x &&
        target.props.x <= (obj.props.x + obj.props.w) &&
        target.props.y <= (obj.props.y + obj.props.h) &&
        (target.props.y + target.props.h) >= obj.props.y &&
        index !== i
      ) {
        out.push(obj);
      }
    });
    return out;
  }

};
