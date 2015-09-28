Template.libraryApp.helpers({
    'activePeeps':function(){
        return Session.get('activeChecks')
    },


})

Template.appCheckin.helpers({
    'trending':function(){
        if(Session.get('trending')){
        return Session.get('trending')
        }else{
            return false
        }
    },
    'worthIt':function(){
        if(this.totalCheckins > 3){
            return true
        }else{
            return false
        }
    },
    'location':function(){
        if(Meteor.user()){
            return Meteor.user().geoData.formatted_address.split(',')[0]
        }else{
            if(Session.get('myGeo')){
            return Session.get('myGeo').formatted_address.split(',')[0]
            }
        }
    }
})

Template.appCheckin.events({
    'click .trending-item':function(event,template){
        Session.set('selectedCat',this._id)
        var checkincount = Profiles.find({date: { $gte: new Date(moment().subtract(1,'hour').format()) },'cat':Session.get('selectedCat'),'intent':FlowRouter.getParam("template")}).fetch()
        console.log(checkincount)
        if(checkincount.length){
            Session.set('activeChecks',true)
        }else{
            Session.set('activeChecks',false)
        }
    }
})

Template.libraryApp.rendered = function(){
    Meteor.call('getTrending',function(err,resp){
      Session.set('trending',resp)
    })
}


Template.actionDefiner.helpers({
    'title':function(){
        return FlowRouter.getParam("template").replace(/-/g,' ').toUpperCase()
    },

})

Template.profileForm.helpers({
    'intention':function(){
        return Session.get('intention')
    },
    'myProfile':function(){
        if(Meteor.user()){
        return Meteor.user().services.facebook
        }else{
            return false
        }

    }
})

Template.appCheckin.helpers({
    'activeSeekers':function(){
        return Profiles.find({date: { $gte: new Date(moment().subtract(1,'hour').format()) }}).count()
    },
    'activeSeekersTotal':function(){
        return Profiles.find({}).count()
    }
})

Template.checkinList.helpers({
    'checkins':function(){
        return Profiles.find({date: { $gte: new Date(moment().subtract(1,'hour').format()) },'cat':Session.get('selectedCat')},{sort:{date:-1}}).fetch()
    },
    'checkinCount':function(){
        return Profiles.find({date: { $gte: new Date(moment().subtract(1,'hour').format())},'cat':Session.get('selectedCat')}).count()
    },
    'cat':function(){
        return Session.get('selectedCat')
    },
    'intention':function(){
        return Session.get('intention').replace(/-/g,' ').toLowerCase()
    },
    //'thisUser':function(){
    //
    //    return Profiles.findOne(Meteor.user()._id)
    //},
    'raw':function(){
        return JSON.stringify(this)
    }
})


Template.whosHereNow.helpers({
    'checkins':function(){
        return Profiles.find({date: { $gte: new Date(moment().subtract(1,'hour').format()) }},{sort:{date:-1}}).fetch()
    },
    'checkinCount':function(){
        return Profiles.find({date: { $gte: new Date(moment().subtract(1,'hour').format())}}).count()
    },
    'cat':function(){
        return Session.get('selectedCat')
    },
    'intention':function(){
        return Session.get('intention').replace(/-/g,' ').toLowerCase()
    },
    'thisUser':function(){

        return Profiles.findOne(Meteor.user()._id)
    },
    'raw':function(){
        return JSON.stringify(this)
    }
})

