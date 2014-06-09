module.exports = function (handlers, app, catchAll) {
  /* Tell the express app to listen for each API request handler */
  function registerHandler (handler) {
    app[handler.method].apply(app, handler.getRegisterParams() );
  }

  /* Register the custom actions first */
  handlers.filter(function (handler) {
    return handler.isCustom;
  }).forEach(registerHandler);

  /* Register the rest */
  handlers.filter(function (handler) {
    return !handler.isCustom;
  }).forEach(registerHandler);

  if (typeof catchAll === 'function') app.all('/api/*', catchAll);
};
