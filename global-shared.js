if(Meteor.isClient){
    Meteor.subscribe("userData")
}

if(Meteor.isServer){
    Meteor.publish("userData", function () {

      console.log(Meteor.users.find(
           {_id: this.userId},
          {fields: {
              'profile': 1,
              'services': 1,
              'location': 1,
              'geoData': 1,
          }}
      ).fetch())
        return Meteor.users.find(
             {_id: this.userId},
            {fields: {
                'profile': 1,
                'services': 1,
                'location': 1,
                'geoData': 1,
            }}
        );
    });
// code to run on the client globally
    Meteor.users.allow({
        update: function (userId, user, fields, modifier) {
            // can only change your own documents
            Meteor.users.update({_id: userId}, modifier);
            return true;
        },

    });

}