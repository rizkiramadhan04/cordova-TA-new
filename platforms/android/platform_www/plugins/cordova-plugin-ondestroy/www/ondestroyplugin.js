cordova.define("cordova-plugin-ondestroy.OnDestroyPlugin", function(require, exports, module) {
module.exports = function () {
 exports.setEventListener = function (callback) {
  cordova.exec (callback, undefined, "OnDestroyPlugin", "setEventListener", [])
 }
 return exports
} ()

});
