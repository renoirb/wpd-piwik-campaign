<?php

/**
 * WPD's Piwik campaign URL builder utility
 *
 * Copy of Piwik's URL utility [0], simplified
 * for WPD's purposes and to be embeded within WPD
 * pages.
 *
 * [0]: https://piwik.org/docs/tracking-campaigns/url-builder/
 *
 * canonical: https://gist.github.com/renoirb/6991866
 *
 * @author  Renoir Boulanger <renoir@w3.org>
 **/

header('Cache-Control: no-store, no-cache, must-revalidate');

// Since we did not mention the 'h' GET parameter
// specifying the it is assumed we want to include
// the form in the current document, therefore
// we will provide it right here. The manager will
// handle the rest.
if(!isset($_GET['h'])) {
  header("Content-type: text/javascript");
  die(file_get_contents('include.js'));
}

/**
 * List domain names that are allowed to be accessed cross-origin
 *
 * @var array
 */
$allowedHosts = array(
                  'docs.webplatform.org',
                  'blog.webplatform.org'
                );

// Constants
define('HOST', $_SERVER['SERVER_NAME']);
define('PROTOCOL', (!empty($_SERVER['HTTPS']))?'https':'http');

// Initial values
$allowed_referer_pass = false;


// MUST have h GET parameter, matching $allowedHosts array
// We also will use this variable to set appropriate Access-Control* HTTP header
// If it returns bool false, it is fine, since the hostname will obviously make the XHR fail anyway
$allowed_hostname = (in_array($_GET['h'], $allowedHosts))?$_GET['h']:FALSE;
header('Access-Control-Allow-Origin: '.PROTOCOL.'://'.$allowed_hostname);

// MUST have a referrer, and be part of $allowedHosts array
if(!empty($_SERVER['HTTP_REFERER'])) {
  $allowed_referer_pass = (in_array(parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST), $allowedHosts))?true:false;
}

// If ANY of the two tests fails, we block everything
if($allowed_referer_pass === FALSE || $allowed_hostname === FALSE){
  header('HTTP/1.1 412 Precondition Failed');
  die('Disallowed host');
}

/* ************************ /CORS ************************ */



?>
<datalist id="campaignTypeList">
  <option value="DocSprint-CITY-201401" />
  <option value="WPW-" />
  <option value="Announce-" />
</datalist>
<datalist id="campaignKeywordList">
  <option value="Twitter" />
  <option value="Facebook" />
  <option value="GPlus" />
  <option value="GuestPost" />
  <option value="InPerson" />
</datalist>
<script src="<?php echo '//'.HOST; ?>/campaign/assets/generateurl.js"></script>
<form name="urlBuilder">
  <table>
    <tbody>
      <tr>
        <td>
          <label for="website">Page URL</label>
        </td>
        <td>
          <input id="website" placeholder="Address to a WebPlatform Docs page" readonly />
        </td>
      </tr>
      <tr>
        <td>
          <label for="campaignName">Campaign name</label>
        </td>
        <td>
          <input class="behavior-cleanup" id="campaignName" list="campaignTypeList" placeholder="Campaign name, URL friendly please" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="campaignKeyword">Campaign keyword</label>
        </td>
        <td>
          <input class="behavior-cleanup" id="campaignKeyword" list="campaignKeywordList" placeholder="Keyword to differentiate channel" /> <span class="form-description"> (optional) Used to track the keyword, or sub-category</span>
        </td>
      </tr>
      <tr>
        <td>
          <input type="submit" value="Generate URL" />
        </td>
        <td>
          <input class="behavior-highlight" id="generatedUrl" placeholder="Click Generate Url" /> <span class="form-description"> Use this URL in your Campaigns. Adjust keyword for newsletter, Facebook Ads or tweets</span>
        </td>
      </tr>
    </tbody>
  </table>
</form>
