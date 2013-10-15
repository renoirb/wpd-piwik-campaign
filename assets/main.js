var campaignManager = (function(){

  const JQUERYFILE = 'http://docs.webplatform.org/w/resources/jquery/jquery.js';
  const AJAXENDPOINT = 'http://www.webplatform.org/campaign/';

  var domainName = document.documentURI.match(/\w+\.webplatform\.org/)[0],
      today = new Date(),
      dateElements = [
            today.getFullYear().toString(),
            (today.getMonth()+1).toString(),
            pad((today.getDay()+1).toString())],
      slugDateMonth = dateElements[0]+dateElements[1],
      slugDateDay = dateElements.join('');

  function pad(n){
    return n<10 ? '0'+n : n
  }

  function prepopulateFields(){
    $('#website').val(document.documentURI);
    $('#campaignName').val(domainName.split('.',1)[0]);
    $('#urlBuilderParent input[placeholder]').css('width','100%');
  }

  function loadBuilder(){
    if(typeof jQuery != 'undefined' && $('body').hasClass('urlBuilder-loaded') === false){
      $('<section id="urlBuilderParent"></section>').prependTo('#page');
      $.ajax(AJAXENDPOINT+'?h='+domainName, {crossDomain: true})
        .done(function(data){
          $('#urlBuilderParent').html($(data));
          window.setTimeout(prepopulateFields, 200);
        }).done(function(){
          $('body').addClass('urlBuilderParent-loaded');
        }).done(function(){
          doReady();
        });
    }
  }

  function doReady() {
    $('#urlBuilderParent').on('submit', 'form', function(event){
        event.preventDefault();
        generateURL()
    });

    $('#urlBuilderParent').on('focus', '#campaignName', function(){
        var dateChecker = /-\d{8}/,
            fieldValue  = $(this).val().replace(dateChecker,'');

        $(this).val(fieldValue + '-' + slugDateDay);
     });

    $('#urlBuilderParent').on('blur', '.behavior-cleanup', function(){
        var formatChecker = /[\s|_]{1,}/g,
            fieldValue    = $(this).val();

        $(this).val(fieldValue.trim().replace(formatChecker,'-'));
    });

    $('#urlBuilderParent').on('click', '.behavior-highlight', function(){
        highlight($(this));
    });
  }

  function checkDependencies() {
    var hasRequirements = false;

    if(typeof window.jQuery == 'undefined') {
        var d=document,
            g=d.createElement('script'),
            s=d.getElementsByTagName('script')[0];

        g.type='text/javascript';
        g.defer=true;
        g.async=true;
        g.src=JQUERYFILE;
        s.parentNode.insertBefore(g,s);
    } else {
      hasRequirements = true;
    }

    if (hasRequirements === false){
      setTimeout(checkDependencies, 10);
    } else {
      loadBuilder();
    }
  }

  try {
    if( $('body').hasClass('urlBuilderParent-loaded') === false) {
      checkDependencies();
    }
  } catch(e) {
    checkDependencies();
  }


}());
