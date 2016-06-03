function Game(id, w, h) {
  var canvas = document.getElementById(id || 'stage');
  var context = canvas.getContext('2d');
  var state = {
    stage: {
      height: h,
      width: w
    }
  };

  var objs = [];

  function getGameEventObject() {
    return {
      state: state,
      setState: setState,
      connect: connect
    };
  }

  document.addEventListener('keydown', function(e) {
    console.log('keyDown', e.keyCode);
    objs.map(function(obj) {
      (obj.onKeyDown && obj.onKeyDown(e, getGameEventObject()));
    });
  });

  document.addEventListener('keyup', function(e) {
    console.log('keyUp', e.keyCode);
    objs.map(function(obj) {
      (obj.onKeyUp && obj.onKeyUp(e, getGameEventObject()));
    });
  });

  document.addEventListener('keypress', function(e) {
    console.log('keyPress', e.keyCode);
    objs.map(function(obj) {
      (obj.onKeyPress && obj.onKeyPress(e, getGameEventObject()));
    });
  });

  function cicle() {
    window.requestAnimationFrame(render);
  }

  function render() {
    context.clearRect(0, 0, w, h);
    objs.map(function(obj, index) {
      (obj.stateToProp && obj.stateToProp(getGameEventObject()));
      (obj.onEnterFrame && obj.onEnterFrame(getGameEventObject()));
      obj.render(context, state);
      (obj.onCollision && obj.onCollision(collisionCalc(obj, index, objs), getGameEventObject()));
    });
    cicle();
  }

  function connect(Component) {
    var index = objs.push(Component);
    Component.init(state)
    Component.setDisconnectFn(function () {
      delete objs[index-1];
    });
  }

  function setState(newState) {
    for (var k in newState) {
      if (newState.hasOwnProperty(k)) {
        state[k] = newState[k];
      }
    }
  }

  function collisionCalc(target, index, objs) {
    return objs.filter(function(obj, j) {
      return (
        (target.props.x + target.props.w) >= obj.props.x &&
        target.props.x <= (obj.props.x + obj.props.w) &&
        target.props.y <= (obj.props.y + obj.props.h) &&
        (target.props.y + target.props.h) >= obj.props.y &&
        index !== j
      );
    });
  }

  return {
    connect: connect,
    render: cicle,
    setState: setState
  };
};
