
let player = new Player({
  name: 'Player',
  isShoting: false,
  type: 'sprite',
  sprite: 'img/Ligher.png',
  x: 0,
  y: 250,
  w: 32,
  h: 32,
  sx: 0,
  sy: 0
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

let testSprite = new TestSprite({
  name: 'Sprite',
  x: 230,
  y: 25
});


// Config
let game = new Game('stage', 500, 300, 15);
let fightZone = new GameZone(game.context);
fightZone.connect(textAmmo);
fightZone.connect(textCache);
fightZone.connect(player);
fightZone.connect(enemyCtr);
// fightZone.connect(testSprite);
fightZone.setState({
  msg: 'Waiting',
  ammo: 10500,
  cache: 1000
});

game.setZone(fightZone);
game.start();
