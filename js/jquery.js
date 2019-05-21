$(function() {

  var pokstas;

  $(function() {
    $(window).keypress(function(e) {
      var key = e.which;
      if (key === 82) {
        onLoadWOSelect($('.target').find(":selected").text())
      }
      // console.log(key);
    });
  });

  $(document).on('click', '.search-list li', function() {
    // alert('Element ' + $(this).html() + ' was clicked');
    saveToList('.joke-list', $(this).html());
  })

  $('input').keyup(function() {
    if ($('input').val().length > 2) {
      $('.search-list').empty();
      searchByKey($('input').val());
    }
  })

  $("button").click(function() {
    saveToList('.joke-list', pokstas);
  })

  $(".target").mouseup('change', function() {
    var open = $(this).data("isopen");
    if (open) {
      onLoadWOSelect($(this).val());
    }
    $(this).data("isopen", !open);
  })

  function saveToList(listToSave, textToSave) {
    $(listToSave).append($("<li>").html(textToSave));
  }

  function onLoad() {
    $.ajax({
      method: 'GET',
      url: 'https://api.chucknorris.io/jokes/random'
    }).done(function(data) {
      $('.random-joke').text(data.value);
      pokstas = data.value;
      loadSelect();
    })
  }

  function onLoadWOSelect(categories) {
    $.ajax({
      method: 'GET',
      url: 'https://api.chucknorris.io/jokes/random?category=' + categories
    }).done(function(data) {
      $('.random-joke').text("Pokstas is kategorijos: " + categories + " " + data.value);
      pokstas = data.value;
    })
  }


  function loadSelect() {
    $.ajax({
      method: 'GET',
      url: 'https://api.chucknorris.io/jokes/categories'
    }).done(function(data) {
      for (var i in data) {
        $('.target').append($("<option>").html(data[i]));
      }


    })
  }

  function searchByKey(searchText) {
    $.ajax({
      method: 'GET',
      url: `https://api.chucknorris.io/jokes/search?query=${searchText}`
    }).done(function(data) {
      for (var i in data.result) {
        saveToList('.search-list', data.result[i].value)
      }
    })
  }


  onLoad();
});
