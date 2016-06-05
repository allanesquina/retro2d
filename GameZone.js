class GameZone {
  constructor() {
    this.state = {};
    this.objs = {};
    this.objectsIndexes = new Array(20000);
    this.objectsIndexesLength = 0;
    this.connect = this.connect.bind(this);
    this.availableKeys = ['a', 'b', 'c', 'd'];
    this.availableKeysCount = 0;
  }

  connect(gameObject) {
    const index = this.getNextAvailableIndex();
    const key = this.getAvailableKey() + index;

    this.objectsIndexesLength = this.objectsIndexesLength + 1;
    this.objs[key] = gameObject;
    this.objectsIndexes[index] = key;
    this.availableKeysCount++;

    gameObject.setDisconnectFn(() => {
      delete this.objs[key];
      this.objectsIndexes[index] = null;
      this.objectsIndexesLength = this.objectsIndexesLength - 1;
    });
  }

  getAvailableKey() {
    if (this.availableKeysCount > 3) {
      this.availableKeysCount = 0;
    }
    return this.availableKeys[this.availableKeysCount];
  }

  getNextAvailableIndex() {
    const indexes = this.objectsIndexes;
    const l = indexes.length;
    for (let i = 0; i < l; i++) {
      if (!indexes[i] ) {
          return i;
      }
    }
  }

  setState(newState) {
    for (var k in newState) {
      if (newState.hasOwnProperty(k)) {
        this.state[k] = newState[k];
      }
    }
  }


}
