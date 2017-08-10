
if(typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var View = inServer ? require('../../libraries/View') : require('View')
    , template = inServer ? content_appTemplates : require('contentTemplates')
    , _ = require('underscore');

  return View.extend({

    /**
     * Constructor
     *
     * @return {void}
     * @api public
     */

    constructor: function(model) {
      this.model = model;
      if(inClient) {
        this._bindMethods();
      }
    },

    /**
     * Bind methods
     *
     * @return {void}
     * @api private
     */

    _bindMethods: function() {
      _.bindAll(this, '_showDropDown', '_hideDropDown', '_showDropDownMode', '_hideDropDownMode');
    },

    /**
     * Render html
     *
     * @return {String}
     * @autocalled
     */

    toHTML: function() {
      return template['Locales']({
        currentLocale: this.model.get('locale'),
        locales: cf.LANGUAGES,
        currentMode: this.model.get('mode'),
      });
    },

    /**
     * Bind DOM
     *
     * @return {void}
     * @api public
     */

    bindDOM: function() {
      this._setElements();
      this._addMouseInteractions();
    },

    /**
     * Set elements
     *
     * @return {void}
     * @api private
     */

    _setElements: function() {
      this.setElement('.locales');
      this.$dropdown = this.$('.locales-dropdown');
      this.$button = this.$('.locales-button');
      this.$dropdownMode = $('.modes-dropdown');
      this.$modeButton = $('.modes-button');
      this.$mode = $('.modes');
    },

    /**
     * Add mouse interactions
     *
     * @return {void}
     * @api private
     */

    _addMouseInteractions: function() {
      this.$button.on('click', this._showDropDown);
      this.$modeButton.on('click', this._showDropDownMode);
      this.$el.on('click', '.locale', this._changeLocale);
      this.$mode.on('click', '.mode', this._changeMode);
    },

    /**
     * Show dropdown
     *
     * @return {void}
     * @api private
     */

    _showDropDown: function() {
      var _this = this;

      this.$el.addClass('is-active');
      this.$dropdown.css('height', 'auto').css('padding', '10px 0');
      this.$button.off('click', this._showDropDown);

      _.defer(function() {
        $(document).on('click', _this._hideDropDown);
      });
    },

    _showDropDownMode: function() {
      var _this = this;

      this.$mode.addClass('is-active');
      this.$dropdownMode.css('height', 'auto').css('padding', '10px 0');
      this.$modeButton.off('click', this._showDropDownMode);

      _.defer(function() {
        $(document).on('click', _this._hideDropDownMode);
      });
    },

    /**
     * Hide dropdown
     *
     * @return {void}
     * @api private
     */

    _hideDropDown: function(event) {
      var _this = this;

      if($(event.target).parents('.locales-dropdown').length > 0) {
        return;
      }

      this.$el.removeClass('is-active');
      setTimeout(function() {
        _this.$dropdown.css('height', '').css('padding', '0');
      }, 200);

      _.defer(function() {
        _this.$button.on('click', _this._showDropDown);
        $(document).off('click', _this._hideDropDown);
      });
    },

    _hideDropDownMode: function(event) {
      var _this = this;

      if($(event.target).parents('.modes-dropdown').length > 0) {
        return;
      }

      this.$mode.removeClass('is-active');
      setTimeout(function() {
        _this.$dropdownMode.css('height', '').css('padding', '0');
      }, 200);

      _.defer(function() {
        _this.$modeButton.on('click', _this._showDropDownMode);
        $(document).off('click', _this._hideDropDownMode);
      });
    },

    /**
     * Change locale
     *
     * @return {void}
     * @api private
     */

    _changeLocale: function(event) {
      var locale = event.currentTarget.dataset['locale'];

      window.location.pathname = window.location.pathname.replace(/^\/.*?\/(.*)/, '/' + locale + '/$1');
    },

    _changeMode: function(event) {
      var mode = event.currentTarget.dataset['mode'];
      var path = window.location.pathname.split('/');

      path[2] = mode;
      window.location.pathname = path.join('/');
    }
  });
});
