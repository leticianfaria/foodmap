$(document).ready(function () {
    $('.intro').delay('4000').slideUp('slow');
    $('.content').delay('4000').fadeIn('slow');

  function insert(restaurantes) {
    restaurantes.forEach((restaurante, index) => {
      $('.content').append('<div id="' + index + '" class="restaurant" data-toggle="modal" data-target="#modal' + index + '"> <h1 class="restaurant-name">' + restaurante.name + '</h1> <p>' + restaurante.description + '</p> <strong>' + restaurante.type + '</strong> </div>');
      $('#' + index).click(function() {
        $('.content').append('<div class="modal" id="modal' + index + '" tabindex="-1" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">'+ restaurante.name +'</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"><img src="' + restaurante.image + '" width="200px" height="200px"><p>' + restaurante.description + '</p> <strong>' + restaurante.type +'</strong> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> </div> </div> </div> </div>');
      });
    });
  }
  insert(restaurantes);
   
  $('.type').each(function () {
    $(this).on('click', function () {
      searchByType($(this).val());
    });
  })

  function searchByType(el) {
    $('strong').each(function () {
      if ($(this).text() !== el) {
        $(this).parent().fadeOut('slow');
      } if ($(this).text() === el) {
        $(this).parent().fadeIn('slow');
      }
    })
  }

  $('.search').on('click', function () {
    $('.restaurant-name').each(search);
  })
  function search() {
    if ($(this).text().toLowerCase() !== $('.input').val().toLowerCase()){
      $(this).parent().fadeOut('slow');
    } if ($(this).text() === $('.input').val()) {
      $(this).parent().fadeIn('slow');
    }
  }
  $('.input').on('input', function () {
    if ($(this).val() === "") {
      $('strong').each(function () {
        $(this).parent().fadeIn('slow');
      });
    }
  })
})

// MAPA
function initMap() {
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: {lat: 
        -23.557567, lng: -46.658615}});
  for ( let i of restaurantes ){
    let coords = [];
    coords.push(i.latitude,i.longitude)
    let address = {lat: coords[0], lng: coords[1]}
    let marker = new google.maps.Marker({           
      position: address, 
      icon: 'assets/marker.png',
      animation: google.maps.Animation.DROP,
      map: map 
      });  
      marker.addListener('click', function() {
        const infowindow = new google.maps.InfoWindow({
          content: i.name
        });
        infowindow.open(map, marker);
      });
  }
}
