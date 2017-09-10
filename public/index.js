var app = function () {
  
  var baseUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=';
  var dateInput = document.querySelector( '#date-input' );
  
  renderBackground();

  dateInput.addEventListener( 'input', function(){
    var date = this.value;
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
  renderBackground();
  renderNeos( filteredNeos );
  populateList( filteredNeos );
}

var populateList = function( filteredNeos ){
  var dailyList = document.querySelector( '#daily-neo-list')

  while( dailyList.lastElementChild && dailyList.lastElementChild != dailyList.firstElementChild ) {
    dailyList.removeChild( dailyList.lastElementChild )
  }

  var counter = 0;
  for ( var neo of filteredNeos ){

    var row = document.createElement( 'tr' );
    
    var numberCell = document.createElement( 'td' );
    numberCell.innerText = counter;
    row.appendChild( numberCell );

    var nameCell = document.createElement( 'td' );
    nameCell.innerText = neo.name;
    row.appendChild( nameCell );

    var diameterCell = document.createElement( 'td' );
    diameterCell.innerText = neo.estimated_diameter.kilometers.estimated_diameter_max;
    row.appendChild( diameterCell );

    var distanceCell = document.createElement( 'td' );
    distanceCell.innerText = neo.close_approach_data[0].miss_distance.kilometers;
    row.appendChild( distanceCell );
    
    var speedCell = document.createElement( 'td' );
    speedCell.innerText = neo.close_approach_data[0].relative_velocity.kilometers_per_hour;
    row.appendChild( speedCell );

    dailyList.appendChild( row );

    counter++;
  }
}

window.addEventListener('load', app)
