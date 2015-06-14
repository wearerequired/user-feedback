/**
 * Feedback.js Script.
 *
 * @package   User_Feedback
 * @author    Pascal Birchler <pascal@required.ch>
 * @license   GPL-2.0+
 * @link      https://github.com/wearerequired/user-feedback/
 * @copyright 2015 required gmbh
 */

// Load required modules
var userFeedbackModel = require('models/model');
var AppView = require('views/app');

jQuery(document).ready(function ($) {
  // Only run if Canvas is supported
  if (!!window.HTMLCanvasElement) {
    // Run Boy Run
    var appView = new AppView({model: userFeedbackModel});
    appView.render();
  }
});
