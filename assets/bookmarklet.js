/**
 * Bookmarklet code
 *
 * To install
 *  * Create a random bookmarklet, edit the URL
 *  * Paste the Bookmarklet code (below)
 *
 * If code change, please regenerate the Bookmarklet code.
 *
 * To regenerate:
 *  * Go to http://chriszarate.github.io/bookmarkleter/
 *  * Paste all the content of this file into the 'Use it' in put field
 *  * Click the 'Convert to bookmarklet'
 *  * Drag and drop the 'link' link at the bottom to your tool bar
 *
 * Bookmarklet:
 * {code}
 *   javascript:(function(){var%20d=document,g=d.createElement('script'),s=d.getElementsByTagName('script')[0];g.type='text/javascript';g.defer=true;g.async=true;g.src='//www.webplatform.org/campaign/include.js';s.parentNode.insertBefore(g,s);})();
 * {code}
 */
var d=document,
    g=d.createElement('script'),
    s=d.getElementsByTagName('script')[0];

    g.type='text/javascript';
    g.defer=true;
    g.async=true;
    g.src='//www.webplatform.org/campaign/include.js';
    s.parentNode.insertBefore(g,s);
