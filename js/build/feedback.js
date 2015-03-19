(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

// Create the model class via Backbone (which sets up things like prototype objects correctly).
var userFeedbackModel = require(2);

$ = window.jQuery;

// Main application view
var AppView = require(11);

jQuery(document).ready(function ($) {
  // Only run if Canvas is supported
  if (!!window.HTMLCanvasElement) {
    // Run Boy Run
    var appView = new AppView({model: userFeedbackModel});
    appView.render();
  }
});
},{"11":11,"2":2}],2:[function(require,module,exports){
'use strict';

var UserFeedbackModel = Backbone.Model.extend({});
var userFeedbackModel = new UserFeedbackModel;

module.exports = userFeedbackModel
},{}],3:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="user-feedback-bottombar">\n\t<ul id="user-feedback-bar-steps">\n\t\t<li class="user-feedback-bar-step" data-step="1">'+
((__t=( step.one ))==null?'':__t)+
'</li>\n\t\t<li class="user-feedback-bar-step hidden" data-step="2">'+
((__t=( step.two ))==null?'':__t)+
'</li>\n\t\t<li class="user-feedback-bar-step hidden" data-step="3">'+
((__t=( step.three ))==null?'':__t)+
'</li>\n\t</ul>\n\t<button class="user-feedback-button user-feedback-button-help" title="'+
((__t=( button.helpAria ))==null?'':__t)+
'" aria-label="'+
((__t=( button.helpAria ))==null?'':__t)+
'">'+
((__t=( button.help ))==null?'':__t)+
'</button>\n</div>';
}
return __p;
};

},{}],4:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<button\n\t\tid="user-feedback-init-button"\n\t\tclass="user-feedback-button user-feedback-button-gray">\n\t'+
((__t=( label ))==null?'':__t)+
'\n</button>';
}
return __p;
};

},{}],5:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t\t<button class="user-feedback-button user-feedback-button-close" title="'+
((__t=( button.closeAria ))==null?'':__t)+
'" aria-label="'+
((__t=( button.closeAria ))==null?'':__t)+
'">'+
((__t=( button.close ))==null?'':__t)+
'</button>\n\t</div>\n\t<p>'+
((__t=( salutation ))==null?'':__t)+
'</p>\n\n\t<p>'+
((__t=( intro ))==null?'':__t)+
'</p>\n\n\t<p>\n\t\t<input type="text" class="user-feedback-input" id="user-feedback-user-name" placeholder="'+
((__t=( placeholder.name ))==null?'':__t)+
'">\n\t\t<input type="email" class="user-feedback-input" id="user-feedback-user-email" placeholder="'+
((__t=( placeholder.email ))==null?'':__t)+
'">\n\t</p>\n\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-next user-feedback-button-primary">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t\t<button class="user-feedback-button user-feedback-button-next user-feedback-button-secondary">'+
((__t=( button.secondary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],6:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t\t<button class="user-feedback-button user-feedback-button-close" title="'+
((__t=( button.closeAria ))==null?'':__t)+
'" aria-label="'+
((__t=( button.closeAria ))==null?'':__t)+
'">'+
((__t=( button.close ))==null?'':__t)+
'</button>\n\t</div>\n\t<p>'+
((__t=( salutation ))==null?'':__t)+
'</p>\n\n\t<p>'+
((__t=( intro ))==null?'':__t)+
'</p>\n\n\t<p>'+
((__t=( intro2 ))==null?'':__t)+
'</p>\n\n\t<p>\n\t\t<input type="checkbox" value="1" id="user-feedback-do-not-show-again" />\n\t\t<label for="user-feedback-do-not-show-again">'+
((__t=( inputLabel ))==null?'':__t)+
'</label>\n\t</p>\n\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-next user-feedback-button-primary">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],7:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t\t<button class="user-feedback-button user-feedback-button-close" title="'+
((__t=( button.closeAria ))==null?'':__t)+
'" aria-label="'+
((__t=( button.closeAria ))==null?'':__t)+
'">'+
((__t=( button.close ))==null?'':__t)+
'</button>\n\t</div>\n\t<p>\n\t\t<textarea id="user-feedback-message" class="user-feedback-textarea" placeholder="'+
((__t=( placeholder.message ))==null?'':__t)+
'"></textarea>\n\t</p>\n\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-next user-feedback-button-primary">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],8:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t\t<button class="user-feedback-button user-feedback-button-close" title="'+
((__t=( button.closeAria ))==null?'':__t)+
'" aria-label="'+
((__t=( button.closeAria ))==null?'':__t)+
'">'+
((__t=( button.close ))==null?'':__t)+
'</button>\n\t</div>\n\t<p>'+
((__t=( intro ))==null?'':__t)+
'</p>\n\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-primary user-feedback-button-screen-capture">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],9:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-center" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-button user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t</div>\n\t<div id="user-feedback-overview-description">\n\t\t<div id="user-feedback-overview-user">\n\t\t\t<img src="" width="40" height="40" alt="'+
((__t=( user.gravatarAlt ))==null?'':__t)+
'" />\n\t\t\t<div>'+
((__t=( user.by ))==null?'':__t)+
'</div>\n\t\t</div>\n\t\t<textarea id="user-feedback-overview-note" class="user-feedback-textarea"></textarea>\n\t\t<ul class="user-feedback-additional-notes">\n\t\t\t<li id="user-feedback-additional-theme">'+
((__t=( details.theme ))==null?'':__t)+
'</li>\n\t\t\t<li id="user-feedback-additional-browser">'+
((__t=( details.browser ))==null?'':__t)+
'</li>\n\t\t\t<li id="user-feedback-additional-template">'+
((__t=( details.template ))==null?'':__t)+
'</li>\n\t\t\t<li id="user-feedback-additional-language">'+
((__t=( details.language ))==null?'':__t)+
'</li>\n\t\t</ul>\n\t</div>\n\t<div id="user-feedback-overview-screenshot">\n\t\t<img id="user-feedback-overview-screenshot-img" src="" alt="'+
((__t=( screenshotAlt ))==null?'':__t)+
'" />\n\t</div>\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-next user-feedback-button-primary">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t\t<button class="user-feedback-button user-feedback-button-previous user-feedback-button-secondary">'+
((__t=( button.secondary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],10:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-center" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t</div>\n\t<p>'+
((__t=( intro ))==null?'':__t)+
'</p>\n\n\t<p>'+
((__t=( intro2 ))==null?'':__t)+
'</p>\n\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-done user-feedback-button-primary">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t\t<button class="user-feedback-button user-feedback-button-restart user-feedback-button-secondary">'+
((__t=( button.secondary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],11:[function(require,module,exports){
'use strict';

var userFeedbackModel = require(2);

// Create the view for our feedback button
var UserFeedbackButton = require(13);

// Create the view for the bar at the bottom of the screen
var UserFeedbackBar = require(12);

// Wizard view that holds the individual view for each step
var UserFeedbackWizard = require(22);

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

module.exports = AppView;
},{"12":12,"13":13,"2":2,"22":22}],12:[function(require,module,exports){
'use strict';

var template = require(3);

var UserFeedbackBar = Backbone.View.extend({
  tagName  : 'div',
  className: 'user-feedback-bottombar-view',
  template : template(user_feedback.templates.bottombar),

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

module.exports = UserFeedbackBar;
},{"3":3}],13:[function(require,module,exports){
'use strict';

var template = require(4);

var UserFeedbackButton = Backbone.View.extend({
  tagName  : 'div',
  className: 'user-feedback-button-view',
  template : template(user_feedback.templates.button),

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

module.exports = UserFeedbackButton;
},{"4":4}],14:[function(require,module,exports){
'use strict';

var CanvasView = Backbone.View.extend({
  className: 'user-feedback-wizard-step-4-canvas',
  template: _.template('<canvas id="user-feedback-canvas"></canvas><div id="user-feedback-annotations"></div>'),

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
    this.$el.html(this.template());
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
    border = typeof border !== 'undefined' ? border : true;
    this.ctx.clearRect(0, 0, $(this.canvas).width(), $(this.canvas).height());
    this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
    this.ctx.fillRect(0, 0, $(this.canvas).width(), $(this.canvas).height());

    _.each($('.user-feedback-annotation'), function (el) {
      if (border) {
        this.drawlines(parseInt($(el).css('left'), 10), parseInt($(el).css('top'), 10), $(el).width(), $(el).height());
      }
      this.ctx.clearRect(parseInt($(el).css('left'), 10), parseInt($(el).css('top'), 10), $(el).width(), $(el).height());
    }, this);
  }
});

module.exports = CanvasView;
},{}],15:[function(require,module,exports){
'use strict';

var WizardStep = require(21);
var template = require(5);

var WizardStep1 = WizardStep.extend({
  className: 'user-feedback-wizard-step-1',
  template : template(user_feedback.templates.wizardStep1),

  nextStep: function () {
    this.model.set('userName', $(document.getElementById('user-feedback-user-name')).val());
    this.model.set('userEmail', $(document.getElementById('user-feedback-user-email')).val());
  }

});

module.exports = WizardStep1;
},{"21":21,"5":5}],16:[function(require,module,exports){
'use strict';

var WizardStep = require(21);
var template = require(6);

var WizardStep2 = WizardStep.extend({
  className: 'user-feedback-wizard-step-2',
  template : template(user_feedback.templates.wizardStep2),

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

module.exports = WizardStep2;
},{"21":21,"6":6}],17:[function(require,module,exports){
'use strict';

var WizardStep = require(21);
var template = require(7);

var WizardStep3 = WizardStep.extend({
  className: 'user-feedback-wizard-step-3',
  template : template(user_feedback.templates.wizardStep3),

  nextStep: function () {
    this.model.set('userMessage', $(document.getElementById('user-feedback-message')).val());
  }
});

module.exports = WizardStep3;
},{"21":21,"7":7}],18:[function(require,module,exports){
'use strict';

var WizardStep = require(21);
var CanvasView = require(14);
var userFeedbackModel = require(2);
var template = require(8);

var WizardStep4 = WizardStep.extend({
  className: 'user-feedback-wizard-step-4',
  template : template(user_feedback.templates.wizardStep4),

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
});

module.exports = WizardStep4;
},{"14":14,"2":2,"21":21,"8":8}],19:[function(require,module,exports){
'use strict';

var WizardStep = require(21);
var template = require(9);

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

var WizardStep5 = WizardStep.extend({
  className: 'user-feedback-wizard-step-5',
  template : template(user_feedback.templates.wizardStep5),

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

module.exports = WizardStep5;
},{"21":21,"9":9}],20:[function(require,module,exports){
'use strict';

var WizardStep = require(21);
var template = require(10);

var WizardStep6 = WizardStep.extend({
  className: 'user-feedback-wizard-step-6',
  template : template(user_feedback.templates.wizardStep6)
});

module.exports = WizardStep6;
},{"10":10,"21":21}],21:[function(require,module,exports){
'use strict';

var WizardStep = Backbone.View.extend({
  render: function () {
    this.$el.html(this.template);
    this.delegateEvents();

    return this;
  },

  nextStep: function () {
  }
});

module.exports = WizardStep;
},{}],22:[function(require,module,exports){
'use strict';

var WizardStep1 = require(15);
var WizardStep2 = require(16);
var WizardStep3 = require(17);
var WizardStep4 = require(18);
var WizardStep5 = require(19);
var WizardStep6 = require(20);
var userFeedbackModel = require(2);

var UserFeedbackWizard = Backbone.View.extend({
  className: 'user-feedback-wizard-view',
  template : _.template('<div class="user-feedback-modal__container"></div>'),

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
      var step = this.model.get('currentWizardStep') + 1;
      this.currentView.nextStep();

      // If the cookie is set, let's go straight to the next step
      if (step == 1 && document.cookie.indexOf('user_feedback_do_not_show_again') >= 0) {
        step++;
      }

      this.model.set('currentWizardStep', step);

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

module.exports = UserFeedbackWizard;
},{"15":15,"16":16,"17":17,"18":18,"19":19,"2":2,"20":20}]},{},[1]);
