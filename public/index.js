var app = function () {
  
  var baseUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=';
  var dateInput = document.querySelector( '#date-input' );
  
  dateInput.addEventListener( 'input', function(){
    var date = this.value;
    console.log( date );
    if ( date === "" ) return
    var requestUrl = baseUrl + date + "&" + "&api_key=" + apiKey();
    makeRequest( requestUrl, requestComplete );
  });

  

}

var makeRequest = function( url, callback ) {
  var request = new XMLHttpRequest();
  request.open( 'GET', url );
  request.addEventListener( 'load', callback );
  request.send();
}

var requestComplete = function() {
  if ( this.status !== 200 ) return;

  var jsonString = this.responseText;
  var neos = JSON.parse( jsonString );
  neos = neos.near_earth_objects;
  var dates = Object.keys( neos );
  dates.sort();
  console.log( dates );
  populateSelect( dates, neos );
}

var populateSelect = function( dates, neos ){
  var daySelect = document.querySelector( '#day-select' );
  
  while( daySelect.firstChild ) { 
    daySelect.removeChild( daySelect.firstChild )
  }
  
  var option = document.createElement( 'option' );
  option.innerText = "Choose a day to display";
  daySelect.appendChild( option );
  daySelect.options[0].disabled = true;
  
  for ( var date of dates ){
    option = document.createElement( 'option' );
    option.value = date;
    option.innerText = date;
    daySelect.appendChild( option )
  }

  daySelect.addEventListener( 'change', function(){ 
    var filteredNeos = neos[ daySelect.value ];
    daySelected( filteredNeos ) 
  });

}

var daySelected = function( filteredNeos ){
  console.log( filteredNeos );
  renderNeos( filteredNeos );
}

window.addEventListener('load', app)
