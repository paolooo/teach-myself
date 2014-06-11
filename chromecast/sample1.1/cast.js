(function(exports){
  var log = function(msg) {
    console.log(msg);
    $("#log").append(msg + "<br >");
  };

  var ChromeCast = {
    session: null,
    init: function() {
      log('init chromecast');
      var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
      var sessionRequest = new chrome.cast.SessionRequest(applicationID);
      var apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionListener.bind(this), this.receiverListener.bind(this));

      chrome.cast.initialize(apiConfig, this.onSuccess, this.onError);
      this.bindEvents();
    },

    bindEvents: function() {
      var that = this;
      $(".chrome.cast").bind('click', function(){
        that.launchApp();
      });
    },

    onMediaDiscovered: function(how, media) {
      log('onMediaDiscovered > how, media: ' + how + ', ' + media);
    },

    launchApp: function() {
      chrome.cast.requestSession(this.onRequestSessionSuccess.bind(this), this.onError.bind(this));
    },

    sessionListener: function(e) {
      log('sessionListener > sessionId: ' + e.sessionId);
      this.session = e;
      if (this.session.media.length != 0) {
        this.onMediaDiscovered('sessionListener', this.session.media[0]);
      }
      this.session.addMediaListener(this.onMediaDiscovered.bind(this, 'addMediaListener'));
      this.session.addUpdateListener(this.sessionUpdateListener.bind(this));
    },

    receiverListener: function(e) {
      if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
        log("receiver found");
      } else {
        log("receiver list empty");
      }
    },

    activateCast: function() {
      $('.chrome.cast').addClass('active');
    },

    deactiveCast: function() {
      $('.chrome.cast').removeClass('active');
    },

    onRequestSessionSuccess: function(e) {
      this.session = e;
      this.activateCast();

      this.session.addUpdateListener(this.sessionUpdateListener.bind(this));
      this.session.addMediaListener(this.onMediaDiscovered.bind(this, 'addMediaListener'));

      if (this.session.media.length != 0) {
        this.onMediaDiscovered('onRequestSession', this.session.media[0]);
      }
    },

    onSuccess: function(e) {
      log("onSuccess > e: " + e);
    },

    onError: function(e) {
      log("onError > e: " + e.code + ', ' + e.description);
    },

    sessionUpdateListener: function(isAlive) {
      log('sessionUpdateListener > isAlive?: ' + isAlive);
    }
  };


  exports['__onGCastApiAvailable'] = function(loaded, errorInfo) {
    if (loaded) {
      ChromeCast.init();
    } else {
      log(errorInfo);
    }
  };

})(window);

