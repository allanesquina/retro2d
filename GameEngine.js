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

    this.render = this.render.bind(this);
    this.gameObjectInteration = this.gameObjectInteration.bind(this);

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
      const indexes = this.zone.objectsIndexes;
      const objs = this.zone.objs;
      this.zone.objectsIndexes.map((key) => {
        const obj = objs[key];
        if (obj) {
          (obj.onKeyDown && obj.onKeyDown(e, this.getGameEventObject()));
        }
      });
    });

    document.addEventListener('keyup', (e) => {
      const indexes = this.zone.objectsIndexes;
      const objs = this.zone.objs;
      this.zone.objectsIndexes.map((key) => {
        const obj = objs[key];
        if (obj) {
          (obj.onKeyUp && obj.onKeyUp(e, this.getGameEventObject()));
        }
      });
    });

    document.addEventListener('keypress', (e) => {
      const indexes = this.zone.objectsIndexes;
      const objs = this.zone.objs;
      this.zone.objectsIndexes.map((key) => {
        const obj = objs[key];
        if (obj) {
          (obj.onKeyPress && obj.onKeyPress(e, this.getGameEventObject()));
        }
      });
    });
  }

  cicle() {
    window.requestAnimationFrame(this.render);
  }

  render() {
    // const { indexes, indexesLength, objs } = this.zone;
    this.context.clearRect(0, 0, this.state.stage.width, this.state.stage.height);
    const indexes = this.zone.objectsIndexes;
    const indexesLength = this.zone.objectsIndexesLength;
    const objs = this.zone.objs;

    for (let i = 0, j = 0; j < this.zone.objectsIndexesLength; i++) {
      const obj = objs[indexes[i]];
      if (obj) {
        (obj.stateToProp && obj.stateToProp(this.getGameEventObject()));
        (obj.onEnterFrame && obj.onEnterFrame(this.getGameEventObject()));
        obj.render(this.context, this.state);
        (obj.onCollision && obj.onCollision(this.collisionCalc(obj, i, indexes), this.getGameEventObject()));
        j++;
      }
    }

    this.cicle();
  }

  gameObjectInteration(fn) {
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

  collisionCalc(target, index, indexes) {
    const gameIndexes = this.zone.objectsIndexes;
    const gameIndexesLength = this.zone.objectsIndexesLength;
    const objs = this.zone.objs;
    let out = [];

    for (let i = 0, j = 0; j < gameIndexesLength; i++) {
      const obj = objs[gameIndexes[i]];
      if (obj) {
        if (
          (target.props.x + target.props.w) >= obj.props.x &&
          target.props.x <= (obj.props.x + obj.props.w) &&
          target.props.y <= (obj.props.y + obj.props.h) &&
          (target.props.y + target.props.h) >= obj.props.y &&
          index !== i
        ) {
          out.push(obj);
        }
        j++;
      }
    }
    return out;
  }

};
