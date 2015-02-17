/* global user_feedback */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded',
      function () {
        jQuery.feedback({
          ajaxURL             : user_feedback.ajax_url,
          initButtonText      : user_feedback.button_text,
          initialBox          : true,
          showDescriptionModal: true,
          tpl                 : {
            description  : user_feedback.tpl.description,
            highlighter  : user_feedback.tpl.highlighter,
            overview     : user_feedback.tpl.overview,
            submitSuccess: user_feedback.tpl.submit_success,
            submitError  : user_feedback.tpl.submit_error
          },
          onClose             : function () {
            window.location.reload();
          }
        });
      }, false);
})();