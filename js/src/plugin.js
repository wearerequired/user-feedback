/* global user_feedback */

(function ($) {
  'use strict';

  document.addEventListener('DOMContentLoaded',
      function () {
        $.feedback({
          ajaxURL             : user_feedback.ajax_url,
          initButtonText      : user_feedback.button_text,
          initialBox          : document.cookie.indexOf('user_feedback_dont_show_again') < 0,
          tpl                 : {
            description  : user_feedback.tpl.description,
            highlighter  : user_feedback.tpl.highlighter,
            overview     : user_feedback.tpl.overview,
            submitSuccess: user_feedback.tpl.submit_success,
            submitError  : user_feedback.tpl.submit_error
          }
        });
      }, false);
})(jQuery);