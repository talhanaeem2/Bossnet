const homeUrl = 'https://app.bosnett.com/api/v1/';

enum Apis {
    friendsApi = `https://bosnett.com/wp-json/buddyboss/v1/members`,
    groupsApi = `https://bosnett.com/wp-json/buddyboss/v1/groups`,
    loginApi = `${homeUrl}login`,
    signupApi = `${homeUrl}signup`,
    profileApi = `${homeUrl}profile`,
    newsFeedApi = `https://bosnett.com/wp-json/buddyboss/v1/activity`,
}

export default Apis