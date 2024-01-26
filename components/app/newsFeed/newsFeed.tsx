import { View, StyleSheet, Image, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, Modal } from "react-native"
import axios from "axios"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"

import UserActions from "../userActions/userActions"
import PostDotMenu from "../postDotMenu/postDotMenu"
import ReadMore from "../readMoreText/readMoreText"
import TextBold from "../textComponent/textBold/textBold"
import TextRegular from "../textComponent/textRegular/textRegular"

import { stripHtmlTags, RPH, RPW } from "../../../constants/utils"

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface"
import ResponseItemInterface from "./interfaces/responseItemInterface"

const NewsFeed = () => {
    const [newsFeedPosts, setNewsFeedPosts] = useState<ResponseItemInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalImageUri, setModalImageUri] = useState<string | null>(null);

    const toggleModal = (uri: string) => {
        setModalImageUri(uri);
        setIsModalVisible(!isModalVisible);
    };

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

    const handleLongPress = (index: number) => {
        const updatedPosts = [...newsFeedPosts];

        updatedPosts.forEach((post, i) => {
            if (i !== index && post.showOverlay) {
                post.showOverlay = false;
            }
        });

        updatedPosts[index].showOverlay = true;
        setNewsFeedPosts(updatedPosts);
    };

    const handleCloseOverlay = (index: number) => {
        const updatedPosts = [...newsFeedPosts];
        updatedPosts[index].showOverlay = false;
        setNewsFeedPosts(updatedPosts);
    };

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
                const userId = post.user_id;
                const postId = post.id;
                return (
                    <TouchableWithoutFeedback key={index} onPress={() => handleCloseOverlay(index)}>
                        <View style={styles.postContainer}>
                            <View style={styles.dotsContainer}>
                                <PostDotMenu />
                            </View>
                            <View style={styles.post}>
                                <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
                                    <View style={styles.circle}>
                                        <Image style={styles.roundImg} source={{ uri: (post.user_avatar)["thumb"] }} />
                                    </View>
                                </TouchableOpacity>
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
                                <TouchableOpacity style={styles.imageContainer} onPress={() => toggleModal(imageUri)}>
                                    <Image source={{ uri: imageUri }} style={{ width: 421, height: 177 }} />
                                </TouchableOpacity>
                            )}
                            <View style={!post.bp_media_ids ? { paddingTop: RPH(1) } : { paddingTop: 0 }}>
                                <UserActions showOverlay={post.showOverlay} onLongPress={() => handleLongPress(index)} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })}
            <Modal visible={isModalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                        <View style={styles.modalContent}>
                            {modalImageUri && <Image source={{ uri: modalImageUri }} style={styles.modalImage} />}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
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
        marginBottom: RPH(1.8)
    },
    dotsContainer: {
        position: "absolute",
        right: RPW(2.5),
        top: RPH(.5)
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})