Package.describe({
  name: 'library-app',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('standard-minifiers')
  api.use('jaymc:google-reverse-geocode');
  api.use('ecmascript');
  api.use('library-data');
  api.use('templating','client');
  api.use('mdg:geolocation');
  api.use('accounts-facebook');
  api.use('accounts-ui');
  api.use('muicss:mui','client');
  //api.use('artwells:accounts-guest');
  api.use('kadira:blaze-layout');
  api.use('kadira:flow-router');
  api.use('jparker:crypto-base64');
  api.use('momentjs:moment');
  api.use('jeremy:selectize','client');
  api.addFiles('library-app.html','client');
  api.addFiles('library-app-events.js','client');
  api.addFiles('library-app-loadScripts.js','client');
  api.addFiles('library-app-routes.js','client');
  api.addFiles('library-app-helpers.js','client');
  api.addFiles('library-app-server.js','server');
  api.export('CheckIns'); //mongo
  api.export('Profiles'); //mongo


});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('library-app');

});
