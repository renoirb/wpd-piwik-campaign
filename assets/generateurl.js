/**
 * Piwik URL Builder JavaScript code
 *
 * Source: https://piwik.org/wp-content/themes/piwik/js/piwik-site.js?ver=3.5.2
 */

function clearGeneratedURL()
{
var form = document.urlBuilder;
   form.generatedUrl.value='';
}
function generateURL()
{
var form = document.urlBuilder;
   if (!form.website.value
      || form.website.value == "") {
      alert("Please fill in Website URL");
      return;
   }
   console.log(form);
   if (!form.campaignName.value
      || form.campaignName.value == "") {
      alert("Please fill in Campaign Name");
      return;
   }
   var generatedUrl = form.website.value;
   if(generatedUrl.indexOf('http') != 0 )
   {
      generatedUrl = 'http://' + generatedUrl.trim();
   }
   if(generatedUrl.indexOf('/',10) < 0
      && generatedUrl.indexOf("?") < 0)
   {
      generatedUrl += '/';
   }
   var campaignName = encodeURIComponent(form.campaignName.value.trim());
   if(generatedUrl.indexOf("?") > 0 || generatedUrl.indexOf("#") > 0)
   {
      generatedUrl += '&';
   }
   else
   {
      generatedUrl += '?';
   }
   generatedUrl += 'pk_campaign='+campaignName;

   if (form.campaignKeyword.value
      && form.campaignKeyword.value != "") {
      generatedUrl += '&pk_kwd='+encodeURIComponent(form.campaignKeyword.value.trim());
   }
   form.generatedUrl.value = generatedUrl;
   highlight(form.generatedUrl);
}
function highlight(field)
{
   field.focus();
   field.select();
}

$(document).ready(function() {
    String.prototype.trim = function() {
       return this.replace(/^\s+|\s+$/g,"");
    }
});
