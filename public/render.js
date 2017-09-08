var render = function( neos ){
  console.log("Got to render")
  var canvas = document.getElementById( 'main-canvas' );
  var context = canvas.getContext( '2d' );


  context.clearRect(0, 0, canvas.width, canvas.height);

  context.lineWidth = 2;
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.moveTo( 0, 100 );
  context.strokeStyle = 'red';
  context.lineTo( 1000, 100 )
  context.stroke();

  var earth = document.createElement( 'img' );
  earth.src = 'https://i.ytimg.com/vi/tZtFXFH-vtk/hqdefault.jpg'
  earth.addEventListener( 'load', function(){
    context.drawImage( earth, -40, 60, 80, 80 );
  })

}