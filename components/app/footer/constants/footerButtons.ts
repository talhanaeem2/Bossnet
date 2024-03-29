import Icons from "../../../../constants/icons";

import FooterButtonsInterface from "../footerButtonsInterface/FooterButtonsInterface";

export const footerButtons: FooterButtonsInterface[] = [
    {
        icon: Icons.newsFeedIcon,
        text: "Newsfeed",
        screenName: "Home"
    },
    {
        icon: Icons.friendsIcon,
        text: "My friends",
        screenName: "Friends"
    },
    {
        icon: Icons.groupsIcon,
        text: "Groups",
        screenName: "Groups"
    },
    {
        icon: Icons.notificationsIcon,
        text: "Notification",
        screenName: "Notifications"
    },
    {
        icon: Icons.userPlaceholderIcon,
        screenName: "Menu"
    }
]