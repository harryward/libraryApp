
Meteor.methods({
    'createCheckin':function(intent,cat){
        return CheckIns.insert({
            'intent':intent,
            'cat':cat,
            'user':this.userId,
            'date':new Date(),
        })
    },
    getTrending:function(){
        var pipeline = [
            {$match:{date: { $gte: new Date(moment().subtract(1,'hour').format()) }}},
            //{$match:{'status':{$nin:['declined','denied']}}},
            {$group: {_id:'$cat',totalCheckins: {$sum: 1}}}
        ];
        var result = Profiles.aggregate(pipeline, {explain: false});
        console.log('checkIns',result)
        return result
    },
    updateLocation:function(locCoords){
    if(this.userId){
        Meteor.users.update({'_id':this.userId},{$set:{'location':locCoords}})
        console.log('location coords updated')
    }
        //Guides.update({'_id':this.userId},{$set:{'locationCoords':locCoords}});
        console.log('location coords updated', locCoords);
    },
    updateGEO:function(geoData){
        if(this.userId){
            Meteor.users.update({'_id':this.userId},{$set:{'geoData':geoData}});
            console.log('geoData  updated', geoData);

        }
    },
    wipeCats:function(){
        var Cats = Categories.find().fetch()
        _.each(Cats,function(e){
            Categories.remove({'_id': e._id})
        })
    },
})
