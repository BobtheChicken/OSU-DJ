var bg;
var game;

var lastkick = 0;


(function () {

  var
    AUDIO_FILE = '../songs/psy',
    waveform = document.getElementById( 'waveform' ),
    ctx = waveform.getContext( '2d' ),
    dancer, kick;

  /*
   * Dancer.js magic
   */
  Dancer.setOptions({
    flashSWF : '../../lib/soundmanager2.swf',
    flashJS  : '../../lib/soundmanager2.js'
  });

  dancer = new Dancer();
  kick = dancer.createKick({
    onKick: function () {
      ctx.strokeStyle = '#ff0077';
      console.log("time: " + Date.now() + " last: " + lastkick);
      if(Date.now() > lastkick + 20)
      {
        game.rootScene.removeChild(bg);
        bg = new Bg(getRandomInt(1,24));
        console.log("kick");
        lastkick = Date.now();
      }
    },
    offKick: function () {
      ctx.strokeStyle = '#666';
    }
  }).on();

  dancer
    .load({ src: AUDIO_FILE, codecs: ['mp3' ]})
    .waveform( waveform, { strokeStyle: '#666', strokeWidth: 2 });

  Dancer.isSupported() || loaded();
  !dancer.isLoaded() ? dancer.bind( 'loaded', loaded ) : loaded();

  /*
   * Loading
   */

  function loaded () {
    var
      loading = document.getElementById( 'loading' ),
      anchor  = document.createElement('A'),
      supported = Dancer.isSupported(),
      p;

    anchor.appendChild( document.createTextNode( supported ? 'Play!' : 'Close' ) );
    anchor.setAttribute( 'href', '#' );
    loading.innerHTML = '';
    loading.appendChild( anchor );

    if ( !supported ) {
      p = document.createElement('P');
      p.appendChild( document.createTextNode( 'Your browser does not currently support either Web Audio API or Audio Data API. The audio may play, but the visualizers will not move to the music; check out the latest Chrome or Firefox browsers!' ) );
      loading.appendChild( p );
    }

    anchor.addEventListener( 'click', function () {
      dancer.play();
      document.getElementById('loading').style.display = 'none';
    });
  }

  // For debugging
  window.dancer = dancer;

})();










enchant();

window.onload = function(){
    game = new Core(screen.width*2, screen.height*2);
    game.fps = 60;
    game.scale = 0.5;
    for(var i = 1; i < 25; i++)
    {
      game.preload("images/"+i+".png");
    }


    Bg = Class.create(Sprite, { // declare a custom class called Bear
        initialize:function(image){ // initialize the class (constructor)
            Sprite.call(this,1280,720); // initialize the sprite
            this.image = game.assets["images/"+image+".png"];
            this.scaleX = (screen.width*2)/1280;
            this.scaleY = (screen.height*2)/720;
            this.x = (screen.width*2 - 1280)/2;
            this.y = (screen.height*2 - 720)/2;
            this.frame = 5;
            game.rootScene.addChild(this);


        },
        onenterframe:function()
        { // enterframe event listener

        }
    });


    game.onload = function(){
        bg = new Bg(2);
    };
    game.start();
};



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
