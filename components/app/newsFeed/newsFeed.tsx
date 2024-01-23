import { View, StyleSheet, Image, ActivityIndicator } from "react-native"
import axios from "axios"
import { useEffect, useState } from "react"

import UserActions from "../userActions/userActions"
import PostDotMenu from "../postDotMenu/postDotMenu"
import ReadMore from "../readMoreText/readMoreText"
import TextBold from "../textComponent/textBold/textBold"
import TextRegular from "../textComponent/textRegular/textRegular"

import { stripHtmlTags, RPH, RPW } from "../../../constants/utils"

interface Sizes {
    file: string;
    width: number;
    height: number;
    'mime-type': string;
    filesize: number;
}

interface Meta {
    width: number;
    height: number;
    sizes: {
        'bb-media-activity-image': Sizes;
        'bb-media-photos-album-directory-image': Sizes;
        'bb-media-photos-album-directory-image-medium': Sizes;
        'bb-media-photos-popup-image': Sizes;
    };
}

interface AttachmentData {
    full: string;
    thumb: string;
    media_album_cover: string;
    media_photos_directory_page: string;
    media_theatre_popup: string;
    activity_thumb: string;
    meta: Meta;
}

interface MediaId {
    id: number;
    blog_id: number;
    attachment_id: number;
    user_id: number;
    title: string;
    description: string;
    album_id: number;
    group_id: number;
    activity_id: number;
    message_id: number;
    hide_activity_actions: boolean;
    privacy: string;
    menu_order: number;
    date_created: string;
    attachment_data: AttachmentData;
}

interface MediaIds extends Array<MediaId> { }

interface UserAvatar {
    full: string;
    thumb: string;
}

interface ResponseItem {
    comment_count: number;
    content_stripped: string;
    date: string;
    favorite_count: number;
    favorited: boolean;
    id: number;
    link: string;
    name: string;
    title: string;
    user_avatar: UserAvatar;
    user_id: number;
    bp_media_ids: MediaIds;
}

const NewsFeed = () => {
    const name: string = "Aleksandar Marinov "
    const [newsFeedPosts, setNewsFeedPosts] = useState<ResponseItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const apiUrl = "https://bosnett.com/wp-json/buddyboss/v1/activity";

        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl)
                setNewsFeedPosts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData()
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {newsFeedPosts.map((post, index) => {
                const title = post.title;
                const sanitizedTitle = stripHtmlTags(title)
                const imageUri = post.bp_media_ids?.[0]?.attachment_data?.full;

                return (
                    <View style={styles.postContainer} key={index}>
                        <View style={styles.dotsContainer}>
                            <PostDotMenu direction="right" />
                        </View>
                        <View style={styles.post}>
                            <View style={styles.circle}>
                                <Image style={styles.roundImg} source={{ uri: (post.user_avatar)["thumb"] }} />
                            </View>
                            <View style={styles.textContainer}>
                                <View style={styles.postTextContainer}>
                                    <TextBold fontSize={13} color="#5F6373">
                                        {sanitizedTitle}
                                    </TextBold>
                                </View>
                                <TextRegular fontSize={9} color="#5F6373">
                                    2 hours ago
                                </TextRegular>
                            </View>
                        </View>
                        <View style={styles.readmoreContainer}>
                            <ReadMore text={post.content_stripped} />
                        </View>
                        {post.bp_media_ids && (
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: imageUri }} style={{ width: 421, height: 177 }} />
                            </View>
                        )}
                        <View style={!post.bp_media_ids ? { paddingTop: RPH(1) } : { paddingTop: 0 }}>
                            <UserActions />
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

export default NewsFeed

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: RPW(11.5),
        justifyContent: "center",
        alignItems: "center"
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(5.5)
    },
    container: {
        flexDirection: "column",
        gap: RPH(1.2),
        position: "relative"
    },
    readmoreContainer: {
        paddingRight: RPW(5),
        paddingLeft: 30,
        paddingTop: RPH(.6)
    },
    imageContainer: {
        marginTop: RPH(1.2),
        marginBottom: RPH(1.8),
    },
    dotsContainer: {
        position: "absolute",
        right: RPW(2),
        top: RPH(.2)
    },
    postContainer: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        backgroundColor: "#fff",
        paddingVertical: RPH(2.3),
        position: "relative",
        borderLeftWidth: 0
    },
    postTextContainer: {
        flexDirection: "row",
        paddingRight: RPW(5)
    },
    post: {
        paddingLeft: RPW(7.2),
        flexDirection: "row",
        alignContent: "center"
    },
    textContainer: {
        justifyContent: "center",
        paddingLeft: RPW(2.5),
        paddingBottom: RPH(1.8),
        flex: 1
    }
})