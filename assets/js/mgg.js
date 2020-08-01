function loadPage(el){
    $('#preloader').show();
    $.ajax ({
        url : $(el).attr('link'),
        method : 'GET',
        success : function(resp){
          $(el).closest('ul').find('li.active').removeClass('active');
          $('#main-page-container').empty().html(resp);
          $(el).closest('li').addClass('active');
          $('#preloader').hide();
        }
    });
  }