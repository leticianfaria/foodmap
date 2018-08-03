$(document).ready(function () {
    $('.intro').delay('4000').slideUp('slow');
    $('.content').delay('4000').fadeIn('slow');

  function insert(restaurantes) {
    restaurantes.forEach(restaurante => {
      $('.content').append('<div class="restaurant"> <h1 class="restaurant-name">' + restaurante.name + '</h1> <p>' + restaurante.description + '</p> <strong>' + restaurante.type + '</strong> </div>');
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
    let inputValue = $('.input').val();
    $('.restaurant-name').each(search);
  })
  function search() {
    if ($(this).text() !== $('.input').val()) {
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
  for ( i of restaurantes ){
    let coords = [];
    coords.push(i.latitude,i.longitude)
    let address = {lat: coords[0], lng: coords[1]}
    var infowindow = new google.maps.InfoWindow({
      content: i.name
    });
    let marker = new google.maps.Marker({           
      position: address, 
      icon: 'assets/marker.png',
      animation: google.maps.Animation.DROP,
      map: map 
      });  
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
  }
}
