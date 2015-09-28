FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('libraryApp', { content: "appHome"});
    },
    //subscriptions: function(params) {
    //
    //    this.register('myC', Meteor.subscribe('accountingTrips'));
    //    console.log('subscribing to accounting trips')
    //
    //}
});


FlowRouter.route('/action/:template', {
    action: function(params, queryParams) {
        BlazeLayout.render('libraryApp', { content: FlowRouter.getParam("template")});
    },
    //subscriptions: function(params) {
    //
    //    this.register('myC', Meteor.subscribe('accountingTrips'));
    //    console.log('subscribing to accounting trips')
    //
    //}
});


FlowRouter.route('/checkin', {
    action: function(params, queryParams) {
        BlazeLayout.render('libraryApp', { content: "appCheckin"});
    },
    //subscriptions: function(params) {
    //
    //    this.register('myC', Meteor.subscribe('accountingTrips'));
    //    console.log('subscribing to accounting trips')
    //
    //}
});
