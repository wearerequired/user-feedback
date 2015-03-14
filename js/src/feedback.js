/* global jQuery, user_feedback, Backbone, _ */

/**
 * Feedback.js Script.
 *
 * @package   User_Feedback
 * @author    Pascal Birchler <pascal@required.ch>
 * @license   GPL-2.0+
 * @link      https://github.com/wearerequired/user-feedback/
 * @copyright 2015 required gmbh
 */

// Everything is wrapped in here. We don't want to pollute the global namespace, right?
var UserFeedback = (function (Backbone, $) {
  /**
   * Detect browser name + version. Example: Chrome 40, Internet Explorer 12.
   *
   * A utility function we need later on.
   *
   * @see http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
   */
  navigator.saysWho = (function () {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'Internet Explorer ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR\/(\d+)/)
      if (tem != null) return 'Opera ' + tem[1];
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();

  // Create the model class via Backbone (which sets up things like prototype objects correctly).
  var UserFeedbackModel = Backbone.Model.extend({});
  var userFeedbackModel = new UserFeedbackModel;

  // Create the view for our feedback button
  var UserFeedbackButton = Backbone.View.extend({
    tagName  : 'div',
    className: 'user-feedback-button-view',
    template : _.template(
        document.getElementById('user-feedback-template-button').innerHTML,
        user_feedback.templates.button
    ),

    initialize: function () {
    },

    render: function () {
      this.$el.html(this.template);
      this.delegateEvents();

      return this;
    },

    events: {
      'click #user-feedback-init-button': 'toggleInitButton',
    },

    toggleInitButton: function () {
      this.trigger('toggleInitButton');
      return this;
    }
  });

  // Create the view for the bar at the bottom of the screen
  var UserFeedbackBar = Backbone.View.extend({
    tagName  : 'div',
    className: 'user-feedback-bottombar-view',
    template : _.template(
        document.getElementById('user-feedback-template-bottombar').innerHTML,
        user_feedback.templates.bottombar
    ),

    initialize: function () {
      this.model.on("change:currentWizardStep", this.changeStep, this);
    },

    render: function () {
      this.$el.html(this.template);
      this.changeStep();
      return this;
    },

    events: {
      'click .user-feedback-button-help': 'toggleWizard'
    },

    toggleWizard: function () {
      this.trigger('toggleWizard');
    },

    changeStep: function () {
      _.each(this.$el.find('.user-feedback-bar-step'), function (el) {
        if ($(el).attr('data-step') <= this.model.get('currentWizardStep')) {
          $(el).removeClass('hidden');
        } else {
          $(el).addClass('hidden');
        }
      }, this);
    }
  });

  // A DRY Base view we can build upon
  var WizardStep = Backbone.View.extend({
    render: function () {
      this.$el.html(this.template);
      this.delegateEvents();

      return this;
    },

    nextStep: function () {
    }
  });

  // Step 1: Tell us your name
  var WizardStep1 = WizardStep.extend({
    className: 'user-feedback-wizard-step-1',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-1').innerHTML,
        user_feedback.templates.wizardStep1
    ),

    nextStep: function () {
      this.model.set('userName', $(document.getElementById('user-feedback-user-name')).val());
      this.model.set('userEmail', $(document.getElementById('user-feedback-user-email')).val());
    }

  });

  // Step 2: Submit Feedback (with "do not show again" checkbox)
  var WizardStep2 = WizardStep.extend({
    className: 'user-feedback-wizard-step-2',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-2').innerHTML,
        user_feedback.templates.wizardStep2
    ),

    render: function () {
      this.$el.html(this.template);
      this.delegateEvents();

      var name = ( this.model.get('userName') != '' ) ? this.model.get('userName') : user_feedback.user.name;
      this.$el.find('p:first-of-type').append(name);

      return this;
    },

    nextStep: function () {
      this.model.set('doNotShowInfoAgain', $(document.getElementById('user-feedback-do-not-show-again')).is(":checked"));
    }
  });

  // Step 3: Write your message
  var WizardStep3 = WizardStep.extend({
    className: 'user-feedback-wizard-step-3',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-3').innerHTML,
        user_feedback.templates.wizardStep3
    ),

    nextStep: function () {
      this.model.set('userMessage', $(document.getElementById('user-feedback-message')).val());
    }
  });

  // View for the canvas
  var CanvasView = Backbone.View.extend({
    template: _.template(document.getElementById('user-feedback-template-wizard-step-4-canvas').innerHTML),

    initialize: function () {
      this.highlighted = [];
      this.annotationCount = 0;
    },

    events: {
      'mouseup #user-feedback-canvas'        : 'mouseUp',
      'mousedown #user-feedback-canvas'      : 'mouseDown',
      'mousemove #user-feedback-canvas'      : 'mouseMoveClick',
      'click #user-feedback-canvas'          : 'mouseMoveClick',
      'click .user-feedback-annotation-close': 'removeAnnotation',
      'mouseleave #user-feedback-canvas'     : 'redraw'
    },

    render: function () {
      this.$el.html(this.template);
      this.delegateEvents();

      this.canvas = this.$el.find('#user-feedback-canvas')[0];
      this.rect = {};

      // @see http://stackoverflow.com/questions/18462303/incorrect-mouse-coordinates-when-drawing-on-canvas
      this.canvas.width = $(document).width();
      this.canvas.height = $(document).height();
      $(this.canvas).width($(document).width()).height($(document).height());
      this.ctx = this.canvas.getContext('2d');
      this.redraw();

      return this;
    },

    mouseUp: function () {
      this.drag = false;

      var dtop = this.rect.startY,
          dleft = this.rect.startX,
          dwidth = this.rect.w,
          dheight = this.rect.h;

      if (dwidth == 0 || dheight == 0) return;

      if (dwidth < 0) {
        dleft += dwidth;
        dwidth *= -1;
      }
      if (dheight < 0) {
        dtop += dheight;
        dheight *= -1;
      }

      if (dtop + dheight > $(document).height())
        dheight = $(document).height() - dtop;
      if (dleft + dwidth > $(document).width())
        dwidth = $(document).width() - dleft;


      $('#user-feedback-annotations').append(_.template(
          document.getElementById('user-feedback-template-wizard-step-4-annotation').innerHTML,
          {
            id       : this.annotationCount,
            top      : dtop,
            left     : dleft,
            width    : dwidth,
            height   : dheight,
            close    : user_feedback.templates.wizardStep4Annotation.close,
            closeAria: user_feedback.templates.wizardStep4Annotation.closeAria
          }
      ));
      this.annotationCount++;

      this.redraw();
      this.rect.w = 0;
    },

    mouseDown: function (e) {
      this.rect.startX = e.pageX - $(e.target).offset().left;
      this.rect.startY = e.pageY - $(e.target).offset().top;
      this.rect.w = 0;
      this.rect.h = 0;
      this.drag = true;
    },

    mouseMoveClick: function (e) {
      this.redraw();
      var tmpHighlighted = [];

      $(this.canvas).css('cursor', 'crosshair');

      _.each($('* :not(body,script,iframe,div,section,.user-feedback-button,.user-feedback-modal *)'), function (el) {
        if (e.pageX > $(el).offset().left && e.pageX < $(el).offset().left + $(el).width() && e.pageY > $(el).offset().top + parseInt($(el).css('padding-top'), 10) && e.pageY < $(el).offset().top + $(el).height() + parseInt($(el).css('padding-top'), 10)) {
          tmpHighlighted.push($(el));
        }
      }, this);

      var $toHighlight = tmpHighlighted[tmpHighlighted.length - 2]; // todo: or -1 ?

      if ($toHighlight && !this.drag) {
        $(this.canvas).css('cursor', 'pointer');

        var _x = $toHighlight.offset().left - 2,
            _y = $toHighlight.offset().top - 2,
            _w = $toHighlight.width() + parseInt($toHighlight.css('padding-left'), 10) + parseInt($toHighlight.css('padding-right'), 10) + 6,
            _h = $toHighlight.height() + parseInt($toHighlight.css('padding-top'), 10) + parseInt($toHighlight.css('padding-bottom'), 10) + 6;

        this.drawlines(_x, _y, _w, _h);
        this.ctx.clearRect(_x, _y, _w, _h);

        _.each($('.user-feedback-annotation'), function (el) {
          this.ctx.clearRect(parseInt($(el).css('left'), 10), parseInt($(el).css('top'), 10), $(el).width(), $(el).height());
        }, this);

        if (e.type == 'click' && e.pageX == this.rect.startX && e.pageY == this.rect.startY) {
          $('#user-feedback-annotations').append(_.template(
              document.getElementById('user-feedback-template-wizard-step-4-annotation').innerHTML,
              {
                id       : this.annotationCount,
                top      : _y,
                left     : _x,
                width    : _w,
                height   : _h,
                close    : user_feedback.templates.wizardStep4Annotation.close,
                closeAria: user_feedback.templates.wizardStep4Annotation.closeAria
              }
          ));
          this.highlighted.push(this.annotationCount);
          this.annotationCount++;
          this.redraw();
        }
      }

      if (this.drag && e.type == 'mousemove') {
        $('#user-feedback-highlighter').css('cursor', 'default');

        this.rect.w = (e.pageX - $('#user-feedback-canvas').offset().left) - this.rect.startX;
        this.rect.h = (e.pageY - $('#user-feedback-canvas').offset().top) - this.rect.startY;

        this.ctx.clearRect(0, 0, $('#user-feedback-canvas').width(), $('#user-feedback-canvas').height());
        this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
        this.ctx.fillRect(0, 0, $('#user-feedback-canvas').width(), $('#user-feedback-canvas').height());

        _.each($('.user-feedback-annotation'), function (el) {
          el = $(el);
          this.drawlines(parseInt(el.css('left'), 10), parseInt(el.css('top'), 10), el.width(), el.height());
        }, this);

        this.drawlines(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
        this.ctx.clearRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);

        _.each($('.user-feedback-annotation'), function (el) {
          el = $(el);
          this.ctx.clearRect(parseInt(el.css('left'), 10), parseInt(el.css('top'), 10), el.width(), el.height());
        }, this);
      }
    },

    removeAnnotation: function (e) {
      $(e.currentTarget).parent().remove();
      this.redraw();
    },

    drawlines: function (x, y, w, h) {
      // set our styles for the rectangle
      this.ctx.strokeStyle = user_feedback.canvas_options.strokeStyle;
      this.ctx.shadowColor = user_feedback.canvas_options.shadowColor;
      this.ctx.shadowOffsetX = user_feedback.canvas_options.shadowOffsetX;
      this.ctx.shadowOffsetY = user_feedback.canvas_options.shadowOffsetY;
      this.ctx.shadowBlur = user_feedback.canvas_options.shadowBlur;
      this.ctx.lineJoin = user_feedback.canvas_options.lineJoin;
      this.ctx.lineWidth = user_feedback.canvas_options.lineWidth;

      this.ctx.strokeRect(x, y, w, h);

      // reset styles again
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      this.ctx.shadowBlur = 0;
      this.ctx.lineWidth = 1;
    },

    redraw: function (border) {
      var that = this;

      border = typeof border !== 'undefined' ? border : true;
      this.ctx.clearRect(0, 0, $('#user-feedback-canvas').width(), $('#user-feedback-canvas').height());
      this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
      this.ctx.fillRect(0, 0, $('#user-feedback-canvas').width(), $('#user-feedback-canvas').height());

      $('.user-feedback-annotation').each(function () {
        if (border) {
          that.drawlines(parseInt($(this).css('left'), 10), parseInt($(this).css('top'), 10), $(this).width(), $(this).height());
        }
        that.ctx.clearRect(parseInt($(this).css('left'), 10), parseInt($(this).css('top'), 10), $(this).width(), $(this).height());
      });
    }
  });

  // Step 4: Highlight areas
  var WizardStep4 = WizardStep.extend({
    className: 'user-feedback-wizard-step-4',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-4').innerHTML,
        user_feedback.templates.wizardStep4
    ),

    events: {
      'click .user-feedback-button-screen-capture': 'screenCapture'
    },

    initialize: function () {
      this.canvasView = new CanvasView({model: userFeedbackModel});
    },

    render: function () {
      this.$el.html(this.template).append(this.canvasView.render().el);
      this.delegateEvents();

      return this;
    },

    screenCapture: function (e) {
      var that = this;

      // Hide UI before taking the screenshot
      $('#user-feedback-bottombar').hide();
      $('.user-feedback-modal').hide();

      html2canvas($('body'), {
        onrendered: function (canvas) {
          that.canvasView.redraw();
          var _canvas = $('<canvas id="user-feedback-canvas-tmp" width="' + $(document).width() + '" height="' + $(window).height() + '"/>').hide().appendTo('body');
          var _ctx = _canvas.get(0).getContext('2d');
          _ctx.drawImage(canvas, 0, $(document).scrollTop(), $(document).width(), $(window).height(), 0, 0, $(document).width(), $(window).height());

          that.model.set('userScreenshot', _canvas.get(0).toDataURL());
          $('#user-feedback-canvas-tmp').remove();

          // Show UI again
          $('#user-feedback-bottombar').show();
          $('.user-feedback-modal').show();

          that.trigger('nextStep');
        }
      });
    }
  })

  // Step 5: Overview
  var WizardStep5 = WizardStep.extend({
    className: 'user-feedback-wizard-step-5',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-5').innerHTML,
        user_feedback.templates.wizardStep5
    ),

    render: function () {
      this.$el.html(this.template);
      this.delegateEvents();

      this.fillInTheData();

      return this;
    },

    fillInTheData: function () {
      var email = ( this.model.get('userEmail') != '' ) ? this.model.get('userEmail') : user_feedback.user.email;
      var name = ( this.model.get('userName') != '' ) ? this.model.get('userName') : user_feedback.user.name;
      this.$el.find('#user-feedback-overview-user img').attr('src', 'https://secure.gravatar.com/avatar/' + md5(email) + '?d=monsterid&s=90');
      this.$el.find('#user-feedback-overview-user div').append(name);
      this.$el.find('#user-feedback-overview-note').val(this.model.get('userMessage'));

      this.$el.find('#user-feedback-additional-theme').append(user_feedback.theme.name);
      this.$el.find('#user-feedback-additional-browser').append(navigator.saysWho);
      this.$el.find('#user-feedback-additional-template').append(user_feedback.theme.current_template);
      this.$el.find('#user-feedback-additional-language').append(user_feedback.language);

      var screenshot = ( this.model.get('userScreenshot') ) ? this.model.get('userScreenshot') : '';
      this.$el.find('#user-feedback-overview-screenshot-img').attr('src', screenshot);
    },

    nextStep: function () {
      this.trigger('sendData');
    }
  });

  var WizardStep6 = WizardStep.extend({
    className: 'user-feedback-wizard-step-6',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-6').innerHTML,
        user_feedback.templates.wizardStep6
    )
  });

  // Wizard view that holds the individual view for each step
  var UserFeedbackWizard = Backbone.View.extend({
    className: 'user-feedback-wizard-view',
    template : _.template(document.getElementById('user-feedback-template-modal').innerHTML),

    steps: [
      {
        view: new WizardStep1({model: userFeedbackModel})
      },
      {
        view: new WizardStep2({model: userFeedbackModel})
      },
      {
        view: new WizardStep3({model: userFeedbackModel})
      },
      {
        view: new WizardStep4({model: userFeedbackModel})
      },
      {
        view: new WizardStep5({model: userFeedbackModel})
      },
      {
        view: new WizardStep6({model: userFeedbackModel})
      }
    ],

    initialize: function () {
      _.bindAll(this, 'render');
      this.initialStep = 0;

      _.each(this.steps, function (step) {
        this.listenTo(step.view, 'nextStep', this.goToNextStep);
        this.listenTo(step.view, 'sendData', function () {
          this.trigger('sendData');
        });
      }, this);

      // A logged in user doesn't need to provide his name
      if (user_feedback.user.logged_in) {
        this.initialStep++;
        this.model.set('userName', user_feedback.user.name);
        this.model.set('userEmail', user_feedback.user.email);
      }

      // If the cookie is set, let's go straight to the next step
      if (this.initialStep == 1 && document.cookie.indexOf('user_feedback_do_not_show_again') >= 0) {
        this.initialStep++;
      }

      this.model.set('currentWizardStep', this.initialStep);
    },

    render: function () {
      var currentStep = this.steps[this.model.get('currentWizardStep')];
      this.currentView = currentStep.view;

      this.$el.html(this.currentView.render().el);

      return this;
    },

    events: {
      'click .user-feedback-button-previous': 'previousStep',
      'click .user-feedback-button-next'    : 'nextStep',
      'click .user-feedback-button-close'   : 'closeWizard',
      'click .user-feedback-button-done'    : 'closeWizard',
      'click .user-feedback-button-restart' : 'restartWizard'
    },

    previousStep: function (e) {
      e.preventDefault();
      this.goToPreviousStep();
    },

    nextStep: function (e) {
      e.preventDefault();
      this.goToNextStep();
    },

    closeWizard: function (e) {
      e.preventDefault();
      this.model.set('currentWizardStep', this.initialStep);
      this.trigger('reInitialize');
    },

    restartWizard: function (e) {
      e.preventDefault();
      this.model.set('currentWizardStep', this.initialStep + 1);
      this.trigger('toggleBottomBar');
      this.trigger('changeStep', this.model.get('currentWizardStep'));
      this.render();
    },

    goToNextStep: function () {
      if (!this.isLastStep()) {
        this.model.set('currentWizardStep', this.model.get('currentWizardStep') + 1);
        this.currentView.nextStep();

        // If the cookie is set, let's go straight to the next step
        if (this.model.get('currentWizardStep') == 2 && document.cookie.indexOf('user_feedback_do_not_show_again') >= 0) {
          this.model.set('currentWizardStep', 3);
        }

        // todo: make more flexible
        if (this.model.get('currentWizardStep') == 4) {
          this.trigger('toggleBottomBar');
        }

        this.render();
      }
    },

    goToPreviousStep: function () {
      if (!this.isFirstStep()) {
        if (this.model.get('currentWizardStep') == 4) {
          this.trigger('toggleBottomBar');
        }

        this.model.set('currentWizardStep', this.model.get('currentWizardStep') - 1)
        this.render();
      }
    },

    isFirstStep: function () {
      return (this.model.get('currentWizardStep') == 0);
    },

    isLastStep: function () {
      return (this.model.get('currentWizardStep') == this.steps.length - 1);
    }

  });

  // Main application view
  var AppView = Backbone.View.extend({
    el: '#user-feedback-container',

    initialize: function () {
      this.showInitButton = true;
      this.initButton = new UserFeedbackButton({model: userFeedbackModel});
      this.listenTo(this.initButton, 'toggleInitButton', this.toggleInitButton, this);

      this.showBottomBar = true;
      this.bottomBar = new UserFeedbackBar({model: userFeedbackModel});
      this.listenTo(this.bottomBar, 'toggleBottomBar', this.toggleBottomBar, this);
      this.listenTo(this.bottomBar, 'toggleWizard', this.toggleWizard, this);

      this.showWizard = true;
      this.wizard = new UserFeedbackWizard({model: userFeedbackModel});
      this.listenTo(this.wizard, 'toggleBottomBar', this.toggleBottomBar, this);
      this.listenTo(this.wizard, 'reInitialize', this.reInitialize, this);
      this.listenTo(this.wizard, 'sendData', this.send, this);
    },

    toggleInitButton: function () {
      this.showInitButton = !this.showInitButton;
      this.render();
    },

    toggleBottomBar: function () {
      this.showBottomBar = !this.showBottomBar;
      this.render();
    },

    toggleWizard: function () {
      this.showWizard = !this.showWizard;
      this.render();
    },

    reInitialize: function () {
      this.showWizard = true;
      this.showBottomBar = true;
      this.showInitButton = true;
      this.render();
    },

    render: function () {
      this.$el.children().detach();

      // Render our button if it's not toggled or else the wizard
      if (this.showInitButton) {
        this.$el.append(this.initButton.render().el);
      } else {
        // Only show bottom
        if (this.showBottomBar) {
          this.$el.append(this.bottomBar.render().el)
        }
        if (this.showWizard) {
          this.$el.append(this.wizard.render().el);
        }
      }

      return this;
    },

    // Here we send all the data to WordPress
    send: function () {
      if (this.model.get('doNotShowInfoAgain') === true) {
        // Set our "do not show again" cookie
        var date = new Date();
        date.setDate(date.getDate() + 30);
        document.cookie = 'user_feedback_do_not_show_again=1; path=/;expires=' + date.toUTCString();
      }

      // Set up initial post data to be sent
      var post = {};
      post.browser = {};
      post.browser.name = navigator.sayswho;
      post.browser.cookieEnabled = navigator.cookieEnabled;
      post.browser.platform = navigator.platform;
      post.browser.userAgent = navigator.userAgent;
      post.url = document.URL;
      post.theme = user_feedback.theme;
      post.language = user_feedback.language;
      post.message = this.model.get('userMessage');
      post.img = this.model.get('userScreenshot');
      post.user = {
        name : this.model.get('userName'),
        email: this.model.get('userEmail')
      };

      $.post(
          user_feedback.ajax_url,
          {
            'action': 'user_feedback',
            'data'  : post
          }
      )
          .done(function () {
            // todo: success view
            // this.model.set(...);
          })
          .fail(function () {
            // todo: failure view
          });
    }
  });

  var appView = new AppView({model: userFeedbackModel});

  // This gets exposed to the outside
  return {
    app : appView,
    init: function () {
      appView.render();
    }
  };
})(Backbone, jQuery);

jQuery(function ($, undefined) {
  // Only run if Canvas is supported
  if (!!window.HTMLCanvasElement) {
    // Run Boy Run
    UserFeedback.init();
  }
});