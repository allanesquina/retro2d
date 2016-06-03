(function(window, document) {
  'use strict';

  // Config
  var game = Game('stage', 500, 300);
  game.setState({msg: 'Waiting', ammor: 500, cache: 1000 });
  game.connect(player);
  game.connect(AmmorComponent);
  game.connect(TextCache);
  game.connect(EnemyController);
  game.render();

}(window, document));
