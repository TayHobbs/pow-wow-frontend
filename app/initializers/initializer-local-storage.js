import Ember from 'ember';

let LocalStorageProxy = Ember.Object.extend({
  setUpEventListener: (function() {
    return window.addEventListener('localStorageProxy', ((function(_this) {
      return function(localStorageEvent) {
        return _this.notifyPropertyChange(localStorageEvent.key);
      };
    })(this)), false);
  }).on('init'),

  unknownProperty: function(key) {
    return localStorage[key];
  },

  setUnknownProperty: function(key, value) {
    if (Ember.isNone(value)) {
      delete localStorage[key];
    } else {
      localStorage[key] = value;
    }
    this.notifyPropertyChange(key);
    return value;
  },

  clear: function(keyName) {
    this.beginPropertyChanges();
    for (let keyPos = 0; keyPos < localStorage.length; keyPos++) {
      if (localStorage.key(keyPos) === keyName) {
        this.set(localStorage.key(keyPos), null);
      }
    }
    return this.endPropertyChanges();
  }
});

let localStorageProxy = {
  name: 'localStorageProxy',
  initialize: function(container, application) {
    application.register('localStorageProxy:main', LocalStorageProxy);
    application.inject('controller', 'localStorageProxy', 'localStorageProxy:main');
    application.inject('mixin', 'localStorageProxy', 'localStorageProxy:main');
    application.inject('adapter', 'localStorageProxy', 'localStorageProxy:main');
    return application.inject('route', 'localStorageProxy', 'localStorageProxy:main');
  }
};

export default localStorageProxy;
