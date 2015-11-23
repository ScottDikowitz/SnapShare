(function(){

  var _user = {};
  var CHANGE_EVENT = 'CHANGE';
  var UserStore = window.UserStore = $.extend( {},  EventEmitter.prototype);
  UserStore.all = function(){
    return _user;
  };

  UserStore.addChangeListener = function(callback){
    this.on(CHANGE_EVENT, callback);
  };

  UserStore.removeChangeListener = function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  };

  UserStore.resetUser = function(user){
      _user = user;
  };

  UserStore.dispatcherID = AppDispatcher.register(function(payload){
      if(payload.actionType === UserConstants.USER_RECEIVED){
        UserStore.resetUser(payload.user);
        UserStore.emit(CHANGE_EVENT);
      }
      else if(payload.actionType === UserConstants.USER_POSTS_RECEIVED){
        UserStore.resetUser(payload.user);
        UserStore.emit(CHANGE_EVENT);
      }
    });

})();
