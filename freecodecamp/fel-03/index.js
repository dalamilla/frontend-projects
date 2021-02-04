const projectName = 'drum-machine';

$('document').ready(() => {

  $('.drum-pad').each(function () {
    $(this).on('click', function () {
      $(this).children()[0].play();
      $('.lcd').html($(this).attr('id'))
    })
  });

  $(document).on('keydown', function (event) {
    switch (event.which) {
      case 81:
        $('#Q')[0].play();
        $('.lcd').html($('#Q').parent().attr('id'));
        $('#Q').parent().addClass('drumactive');
        break;
      case 87:
        $('#W')[0].play();
        $('.lcd').html($('#W').parent().attr('id'));
        $('#W').parent().addClass('drumactive');
        break;
      case 69:
        $('#E')[0].play();
        $('.lcd').html($('#E').parent().attr('id'));
        $('#E').parent().addClass('drumactive');
        break;
      case 65:
        $('#A')[0].play();
        $('.lcd').html($('#A').parent().attr('id'));
        $('#A').parent().addClass('drumactive');
        break;
      case 83:
        $('#S')[0].play();
        $('.lcd').html($('#S').parent().attr('id'));
        $('#S').parent().addClass('drumactive');
        break;
      case 68:
        $('#D')[0].play();
        $('.lcd').html($('#D').parent().attr('id'));
        $('#D').parent().addClass('drumactive');
        break;
      case 90:
        $('#Z')[0].play();
        $('.lcd').html($('#Z').parent().attr('id'));
        $('#Z').parent().addClass('drumactive');
        break;
      case 88:
        $('#X')[0].play();
        $('.lcd').html($('#X').parent().attr('id'));
        $('#X').parent().addClass('drumactive');
        break;
      case 67:
        $('#C')[0].play();
        $('.lcd').html($('#C').parent().attr('id'));
        $('#C').parent().addClass('drumactive');
        break;
      default:
        break;
    }
  });

  $(document).on('keyup', function () {
    $('.drum-pad').removeClass('drumactive')
    $('.lcd').html("FreeCodeCamp");
  })

  $(document).on('input change', '#volumen', function () {
    $('.clip').prop("volume", $(this).val());
    $('.lcd').html("Volume: " + $(this).val() * 100);
  });

  $('#volumen').mouseleave(function () {
    $('.lcd').html("FreeCodeCamp");
  });
});
