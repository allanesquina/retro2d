let player = new Player({
  name: 'Player',
  isShoting: false,
  type: 'rect',
  x: 0,
  y: 270,
  w: 30,
  h:30
});

let textAmmo = new AmmoComponent({
  name: 'TextAmmo',
  type: 'text',
  font: '18px Arial',
  x: 430,
  y: 25
});


let enemyCtr = new EnemyController({
  name: 'EnemyController',
  type: 'ctrl'
});

let textCache = new TextCache({
  name: 'TextAmmo',
  type: 'text',
  font: '18px Arial',
  x: 230,
  y: 25
});

let fightZone = new GameZone();
fightZone.connect(player);
fightZone.connect(textAmmo);
fightZone.connect(textCache);
fightZone.connect(enemyCtr);
fightZone.setState({
  msg: 'Waiting',
  ammo: 10500,
  cache: 1000
});

// Config
let game = new Game('stage', 500, 300, 10);
game.setZone(fightZone);
game.render();
