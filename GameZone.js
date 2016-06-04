class GameZone {
  constructor() {
    this.state = {};
    this.objs = [];
    this.connect = this.connect.bind(this);
  }

  connect(gameObject) {
    const index = this.objs.push(gameObject);
    gameObject.setDisconnectFn(() => {
      delete this.objs[index-1];
    });
  }

  setState(newState) {
    for (var k in newState) {
      if (newState.hasOwnProperty(k)) {
        this.state[k] = newState[k];
      }
    }
  }
}
