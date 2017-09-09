var renderNeos = function( neos ){
  var canvas = document.getElementById( 'main-canvas' );
  var context = canvas.getContext( '2d' );

  var maxDistanceKM = getMaxDistanceKM( neos );
  var minDistanceKM = getMinDistanceKM( neos, maxDistanceKM );

  var maxDistanceText = document.querySelector( '#max-distance' );
  maxDistanceText.innerText = "Maximum NEO distance from Earth = " + ( maxDistanceKM / 1E6 ) + " million km."

  var minDistanceText = document.querySelector( '#min-distance' );
  minDistanceText.innerText = "Minimum NEO distance from Earth = " + ( minDistanceKM / 1E6 ) + " million km."
  
  // clear canvas, fill black
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // add Earth
  var earth = document.createElement( 'img' );
  earth.src = 'https://i.ytimg.com/vi/tZtFXFH-vtk/hqdefault.jpg';
  earth.addEventListener( 'load', function(){
    context.drawImage( earth, -60, (canvas.height/2) - 60, 120, 120 );
  });

  // add Sol
  var sol = document.createElement( 'img' );
  sol.src = 'http://ak6.picdn.net/shutterstock/videos/5135864/thumb/1.jpg';
  sol.addEventListener( 'load', function(){
    context.drawImage( sol, canvas.width - 100, (canvas.height/2) - 100, 200, 200)
  });

  // draw central line
  context.lineWidth = 1;
  context.beginPath();  
  context.moveTo( 0, canvas.height/2 );
  context.strokeStyle = 'red';
  context.lineTo( canvas.width, canvas.height/2 );
  context.stroke();

  // mean Sol distance
  var solDistanceKM = 149E6;

  // draw each NEO
  var counter = 0;
  var staggerText = 1;
  context.font = "20px Arial";
  for ( var neo of neos ){
    var thisDistanceKM = ( neo.close_approach_data[0].miss_distance.kilometers ) * 1.0;
    var thisDistancePX = canvas.width * ( thisDistanceKM / solDistanceKM );
    
    if ( neo.is_potentially_hazardous_asteroid ){
      var colour = 'red'; 
    } else {
      var colour = 'blue';
    }

    context.beginPath();
    context.strokeStyle = colour;
    context.arc(thisDistancePX, canvas.height/2, 10, 0, 2 * Math.PI);
    context.fillStyle = colour;
    context.fill();
    context.stroke();
    
    if ( staggerText > 0 ){
      context.fillText( counter, thisDistancePX - 5, ( canvas.height / 2 ) + 30 );
    } else {
      context.fillText( counter, thisDistancePX - 5, ( canvas.height / 2 ) - 20 );
    }

    counter++;
    staggerText *= -1
    
  }

}

var getMaxDistanceKM = function( neos ){
  var maxDistanceKM = 0.0;
  neos.forEach( function( neo ) {
    var thisDistanceKM = ( neo.close_approach_data[0].miss_distance.kilometers ) * 1.0;
    if ( thisDistanceKM > maxDistanceKM ) maxDistanceKM = thisDistanceKM;
  });
  return maxDistanceKM;
}

var getMinDistanceKM = function( neos, maxDistanceKM ){
  var minDistanceKM = maxDistanceKM;
  neos.forEach( function( neo ) {
    var thisDistanceKM = ( neo.close_approach_data[0].miss_distance.kilometers ) * 1.0;
    if ( thisDistanceKM < minDistanceKM ) minDistanceKM = thisDistanceKM;
  });
  return minDistanceKM;
}

