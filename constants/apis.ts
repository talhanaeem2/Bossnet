const baseUrl = 'https://app.bosnett.com/api/v1/';

enum Apis {
    friendsApi = `https://bosnett.com/wp-json/buddyboss/v1/members`,
    groupsApi = `https://bosnett.com/wp-json/buddyboss/v1/groups`,
    loginApi = `${baseUrl}login`,
    signupApi = `${baseUrl}signup`,
    profileApi = `${baseUrl}profile`,
    newsFeedApi = `${baseUrl}/users/feed-post`,
    accountRecoveryEmail = `${baseUrl}password/email`,
    accountVerificationCode = `${baseUrl}password/verify-otp`,
    accountChangePassword = `${baseUrl}reset/password`,
    homeUrl = 'https://app.bosnett.com/',
    uploadMedia = `${baseUrl}users/media-file`,
    userComments = `${baseUrl}users/comments`,
    userSubComments = `${baseUrl}users/sub-comments`
}

export default Apis