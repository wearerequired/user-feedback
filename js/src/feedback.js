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

  // A utility function we need later on
  /**
   * Detect browser name + version. Example: Chrome 40, Internet Explorer 12
   * @see http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
   */
  navigator.sayswho = (function () {
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
      this.model.set('showWizard', true);
    },

    render: function () {
      this.$el.html(this.template);
      return this;
    },

    events: {
      'click .user-feedback-button-help': 'toggleWizard'
    },

    toggleWizard: function () {
      this.trigger('toggleWizard');
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

  var WizardStep2 = WizardStep.extend({
    className: 'user-feedback-wizard-step-2',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-2').innerHTML,
        user_feedback.templates.wizardStep2
    ),

    render: function () {

      // If the cookie is set, let's go straight to the next step
      if (document.cookie.indexOf('user_feedback_do_not_show_again') >= 0) {
        this.model.set('nextStep', this.model.get('nextStep') + 1);
        return this;
      }

      this.$el.html(this.template);
      this.delegateEvents();

      return this;
    },

    nextStep: function () {
      this.model.set('doNotShowInfoAgain', $(document.getElementById('user-feedback-do-not-show-again')).is(":checked"));
    }
  });

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

  var CanvasView = Backbone.View.extend({
    template: _.template(document.getElementById('user-feedback-template-wizard-step-4-canvas').innerHTML),

    initialize: function () {
      this.highlighted = [];
      this.tmpHighlighted = [];
      this.hidx = 0;
    },

    render: function () {
      this.$el.html(this.template);

      // @see http://stackoverflow.com/questions/18462303/incorrect-mouse-coordinates-when-drawing-on-canvas
      this.$el.find('#user-feedback-canvas')[0].width = $(document).width();
      this.$el.find('#user-feedback-canvas')[0].height = $(document).height();
      this.$el.find('#user-feedback-canvas').width($(document).width()).height($(document).height());
      this.ctx = this.$el.find('#user-feedback-canvas')[0].getContext('2d');
      this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
      this.ctx.fillRect(0, 0, $('window').width(), $('window').height());

      this.rect = {};

      var that = this;

      // todo: move to initialize()

      $(document).on('mousedown', '#user-feedback-canvas', function (e) {
        that.rect.startX = e.pageX - $(this).offset().left;
        that.rect.startY = e.pageY - $(this).offset().top;
        that.rect.w = 0;
        that.rect.h = 0;
        that.drag = true;
      });

      $(document).on('mouseup', function () {
        that.drag = false;

        var dtop = that.rect.startY,
            dleft = that.rect.startX,
            dwidth = that.rect.w,
            dheight = that.rect.h;

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

        $('#user-feedback-helpers').append('<div class="user-feedback-helper" data-time="' + Date.now() + '" style="position:absolute;top:' + dtop + 'px;left:' + dleft + 'px;width:' + dwidth + 'px;height:' + dheight + 'px;z-index:30000;"></div>');

        that.redraw();
        that.rect.w = 0;

      });

      $(document).on('mousemove', function (e) {
        if (!that.drag) {
          return;
        }

        $('#user-feedback-highlighter').css('cursor', 'default');

        that.rect.w = (e.pageX - $('#user-feedback-canvas').offset().left) - that.rect.startX;
        that.rect.h = (e.pageY - $('#user-feedback-canvas').offset().top) - that.rect.startY;

        that.ctx.clearRect(0, 0, $('#user-feedback-canvas').width(), $('#user-feedback-canvas').height());
        that.ctx.fillStyle = 'rgba(102,102,102,0.5)';
        that.ctx.fillRect(0, 0, $('#user-feedback-canvas').width(), $('#user-feedback-canvas').height());
        $('.user-feedback-helper').each(function () {
          that.drawlines(parseInt($(this).css('left'), 10), parseInt($(this).css('top'), 10), $(this).width(), $(this).height());
        });
        that.drawlines(that.rect.startX, that.rect.startY, that.rect.w, that.rect.h);
        that.ctx.clearRect(that.rect.startX, that.rect.startY, that.rect.w, that.rect.h);
        $('.user-feedback-helper').each(function () {
          that.ctx.clearRect(parseInt($(this).css('left'), 10), parseInt($(this).css('top'), 10), $(this).width(), $(this).height());
        });
      });

      var highlighted = [],
          tmpHighlighted = [],
          hidx = 0;

      $(document).on('mousemove click', '#user-feedback-canvas', function (e) {
        that.redraw();
        tmpHighlighted = [];

        $('#user-feedback-canvas').css('cursor', 'crosshair');

        $('* :not(body,script,iframe,div,section,.user-feedback-button,#user-feedback-module *)').each(function () {
          if ($(this).attr('data-highlighted') === 'true')
            return;

          if (e.pageX > $(this).offset().left && e.pageX < $(this).offset().left + $(this).width() && e.pageY > $(this).offset().top + parseInt($(this).css('padding-top'), 10) && e.pageY < $(this).offset().top + $(this).height() + parseInt($(this).css('padding-top'), 10)) {
            tmpHighlighted.push($(this));
          }
        });

        var $toHighlight = tmpHighlighted[tmpHighlighted.length - 2]; // todo: or -1 ?

        if ($toHighlight && !that.drag) {
          $('#user-feedback-canvas').css('cursor', 'pointer');

          var _x = $toHighlight.offset().left - 2,
              _y = $toHighlight.offset().top - 2,
              _w = $toHighlight.width() + parseInt($toHighlight.css('padding-left'), 10) + parseInt($toHighlight.css('padding-right'), 10) + 6,
              _h = $toHighlight.height() + parseInt($toHighlight.css('padding-top'), 10) + parseInt($toHighlight.css('padding-bottom'), 10) + 6;

          that.drawlines(_x, _y, _w, _h);
          that.ctx.clearRect(_x, _y, _w, _h);

          $('.user-feedback-helper').each(function () {
            that.ctx.clearRect(parseInt($(this).css('left'), 10), parseInt($(this).css('top'), 10), $(this).width(), $(this).height());
          });

          if (e.type == 'click' && e.pageX == that.rect.startX && e.pageY == that.rect.startY) {
            $('#user-feedback-helpers').append('<div class="user-feedback-helper" data-highlight-id="' + hidx + '" data-time="' + Date.now() + '" style="top:' + _y + 'px;left:' + _x + 'px;width:' + _w + 'px;height:' + _h + 'px"></div>');
            highlighted.push(hidx);
            ++hidx;
            that.redraw();
          }
        }
      });

      $(document).on('mouseleave', 'body,#user-feedback-canvas', function () {
        that.redraw();
      });

      $(document).on('mouseenter', '.user-feedback-helper', function () {
        that.redraw();
      });

      $(document).on('mouseenter mouseleave', '.user-feedback-helper', function (e) {
        if (that.drag)
          return;

        that.rect.w = 0;
        that.rect.h = 0;

        if (e.type === 'mouseenter') {
          $(this).css('z-index', '30001');
          $(this).append('<div class="user-feedback-helper-inner" style="width:' + ($(this).width() - 2) + 'px;height:' + ($(this).height() - 2) + 'px;position:absolute;margin:1px;"></div>');
          $(this).append('<div id="user-feedback-close"></div>');
          $(this).find('#user-feedback-close').css({
            'top' : -1 * ($(this).find('#user-feedback-close').height() / 2) + 'px',
            'left': $(this).width() - ($(this).find('#user-feedback-close').width() / 2) + 'px'
          });
        } else {
          $(this).css('z-index', '30000');
          $(this).children().remove();
          if ($(this).attr('data-type') == 'blackout') {
            that.redraw();
          }
        }
      });

      $(document).on('click', '#user-feedback-close', function () {
        $(this).parent().remove();
        that.redraw();
      });

      return this;
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

      $('.user-feedback-helper').each(function () {
        if (border) {
          that.drawlines(parseInt($(this).css('left'), 10), parseInt($(this).css('top'), 10), $(this).width(), $(this).height());
        }
        that.ctx.clearRect(parseInt($(this).css('left'), 10), parseInt($(this).css('top'), 10), $(this).width(), $(this).height());
      });
    },
  });

  var WizardStep4 = WizardStep.extend({
    className: 'user-feedback-wizard-step-4',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-4').innerHTML,
        user_feedback.templates.wizardStep4
    ),

    initialize: function () {
      this.canvasView = new CanvasView({model: userFeedbackModel});
    },

    render: function () {
      this.$el.html(this.template).append(this.canvasView.render().el);
      this.delegateEvents();

      return this;
    },

    nextStep: function () {
      var that = this;

      // todo: hide bottombar and modal before taking the "screenshot" and show them afterwards
      html2canvas($('body'), {
        onrendered: function (canvas) {
          that.canvasView.redraw();
          var _canvas = $('<canvas id="user-feedback-canvas-tmp" width="' + $(document).width() + '" height="' + $(window).height() + '"/>').hide().appendTo('body');
          var _ctx = _canvas.get(0).getContext('2d');
          _ctx.drawImage(canvas, 0, $(document).scrollTop(), $(document).width(), $(window).height(), 0, 0, $(document).width(), $(window).height());

          that.model.set('userScreenshot', _canvas.get(0).toDataURL());
          $('#user-feedback-canvas-tmp').remove();

          that.model.set('nextStep', that.model.get('nextStep') + 1);
        }
      });
    }
  })

  var WizardStep5 = WizardStep.extend({
    className: 'user-feedback-wizard-step-5',
    template : _.template(
        document.getElementById('user-feedback-template-wizard-step-5').innerHTML,
        user_feedback.templates.wizardStep5
    ),

    render: function () {
      this.$el.html(this.template);
      this.delegateEvents();

      this.model.set('hideBottomBar', true);

      return this;
    },

    nextStep: function () {
      this.model.set('sendData', true);
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

    events: {
      'click .user-feedback-button-previous': 'previousStep',
      'click .user-feedback-button-next'    : 'nextStep',
      'click .user-feedback-button-close'   : 'closeWizard'
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
      this.trigger('toggleWizard');
      this.restart();
    },

    initialize: function () {
      _.bindAll(this, 'render');
      this.currentStep = 0;

      // A logged in user doesn't need to provide his name
      if (user_feedback.user.logged_in) {
        this.currentStep = 1;
        this.model.set('userName', user_feedback.user.name);
        this.model.set('userEmail', user_feedback.user.email);
      }
    },

    render: function () {
      this.renderCurrentStep();

      return this;
    },

    restart: function () {
      this.currentStep = 0;
    },

    renderCurrentStep: function () {
      var currentStep = this.steps[this.currentStep];
      this.currentView = currentStep.view;

      this.$el.html(this.currentView.render().el);
    },

    goToNextStep: function () {
      if (!this.isLastStep()) {
        this.currentStep += 1;
        this.currentView.nextStep(); // Trigger next step function in subview
        this.renderCurrentStep();
      }
    },

    goToPreviousStep: function () {
      if (!this.isFirstStep()) {
        this.currentStep -= 1;
        this.renderCurrentStep();
      }
    },

    isFirstStep: function () {
      return (this.currentStep == 0);
    },

    isLastStep: function () {
      return (this.currentStep == this.steps.length - 1);
    }

  });

// Main application view
  var AppView = Backbone.View.extend({
    el: '#user-feedback-container',

    initialize: function () {
      this.showInitButton = true;
      this.initButton = new UserFeedbackButton({model: userFeedbackModel});
      this.listenTo(this.initButton,'toggleInitButton', this.toggleInitButton, this);

      this.showBottomBar = true;
      this.bottomBar = new UserFeedbackBar({model: userFeedbackModel});
      this.listenTo(this.bottomBar, 'toggleBottomBar', this.toggleBottomBar, this);
      this.listenTo(this.bottomBar, 'toggleWizard', this.toggleWizard, this);

      this.showWizard = true;
      this.wizard = new UserFeedbackWizard({model: userFeedbackModel});
      this.listenTo(this.wizard, 'toggleWizard', this.toggleWizard, this);

      this.model.on('change:sendData', this.send, this);
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

    render: function () {
      this.$el.empty();

      // Render our button if it's not toggled or else the wizard
      if (this.showInitButton) {
        this.$el.append(this.initButton.render().el);
      } else {
        // Only show bottom
        if (this.showBottomBar) {
          this.$el.append(this.bottomBar.render().el)
        }
        this.$el.append(this.wizard.render().el);
      }

      return this;
    },

    // Here we send all the data to WordPress
    send: function () {
      if (this.model.get('doNotShowInfoAgain') === true) {
        // todo: uncomment after development
        // Set our "do not show again" cookie
        /*var date = new Date();
         date.setDate(date.getDate() + 30);
         document.cookie = 'user_feedback_do_not_show_again=1; path=/;expires=' + date.toUTCString();
         */
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
      post.user = {
        name : this.model.get('userName'),
        email: this.model.get('userEmail')
      };
      post.message = this.model.get('userMessage');

      // todo: get the image
      post.img = '';

      $.post(
          {
            'url'   : user_feedback.ajax_url,
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

})
(Backbone, jQuery);

jQuery(function ($, undefined) {
  // Only run if Canvas is supported
  if (!!window.HTMLCanvasElement) {
    // Run Boy Run
    UserFeedback.init();
  }
});