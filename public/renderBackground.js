var renderBackground = function( afterRenderTasks ){

  var canvas = document.getElementById( 'main-canvas' );
  var context = canvas.getContext( '2d' );

  // clear canvas, fill black
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // define an imageLoadCollector
  var ilc = imageLoadCollector( 2, afterRenderTasks );

  // add Earth
  var earth = document.createElement( 'img' );
  earth.src = 'https://i.ytimg.com/vi/tZtFXFH-vtk/hqdefault.jpg';
  earth.addEventListener( 'load', function(){
    context.drawImage( earth, -60, (canvas.height/2) - 60, 120, 120 );
    ilc();
  });

  // add Sol
  var sol = document.createElement( 'img' );
  sol.src = 'http://ak6.picdn.net/shutterstock/videos/5135864/thumb/1.jpg';
  sol.addEventListener( 'load', function(){
    context.drawImage( sol, canvas.width - 100, (canvas.height/2) - 100, 200, 200);
    ilc();
  });

}

//----------------------------------------------------------------------------

function imageLoadCollector( expectedCount, callback ){
  var count = 0;
  return function(){
    count++;
    if ( count === expectedCount ) callback();
  }
}

//----------------------------------------------------------------------------

function drawLine(){
  var canvas = document.getElementById( 'main-canvas' );
  var context = canvas.getContext( '2d' );
  context.lineWidth = 1;
  context.beginPath();  
  context.moveTo( 0, canvas.height/2 );
  context.strokeStyle = 'red';
  context.lineTo( canvas.width, canvas.height/2 );
  context.stroke();
}