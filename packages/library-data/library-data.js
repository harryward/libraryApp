Locations = new Mongo.Collection("locations");
Categories = new Mongo.Collection("categories");
CheckIns = new Mongo.Collection("checkins");
Profiles = new Mongo.Collection("profiles");

//api.export("Categories")
//api.export("CheckIns")
//api.export("Locations")

//Meteor.methods({
//    insertTrip:function(trip){
//        console.log('trip inserted ',trip);
//        return 'trip insert method worked'
//    },
//    updateTrip: function(tripId,trip){
//        //TODO add security check here
//        console.log(trip)
//        Trips.update({'_id':tripId},{$set:trip})
//        return Trips.findOne(tripId)
//    }
//});