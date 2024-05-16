import { View, StyleSheet, TouchableOpacity, TextInput, Animated, Image, ScrollView, PanResponder } from "react-native"
import { memo, useState } from "react"
import { Path } from "react-native-svg"

import IconContainer from "../../../components/app/common/iconContainer/iconContainer"
import TextBold from "../../../components/app/common/textComponent/textBold/textBold"

import Icons from "../../../constants/icons"
import messages from "../../../constants/messages"
import { RPW, RPH, RFS } from "../../../constants/utils/utils"

import CreatePostProps from "./interfaces/createPostProps"
// import {
//     GiphyContent,
//     GiphyGridView,
//     GiphyMedia,
//     GiphyMediaView,
//     GiphySDK
// } from '@giphy/react-native-sdk'

// const giphyAPIKey = "8vBaJNSyG9oU5fQYvdoUCWiR80lu5BRh"

// GiphySDK.configure({ apiKey: giphyAPIKey })

const CreatePost = (props: CreatePostProps) => {
    const { closeModal, images, removeImage, handleImagePicker } = props

    // const [searchQuery, setSearchQuery] = useState<string>('')
    // const [media, setMedia] = useState<GiphyMedia | null>(null)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextBold fontSize={18}>
                    {messages.createPost}
                </TextBold>
                <TouchableOpacity onPress={() => closeModal()}>
                    {Icons.crossIcon}
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.content}>
                    <View>
                        {Icons.userPlaceholderIcon}
                    </View>
                    <View>
                        <TextBold fontSize={17}>
                            Aldin Mahmutovic
                        </TextBold>
                    </View>
                </View>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={8}
                    placeholder={`${messages.shareMind} Aldin Mahmutovic`}
                />
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleImagePicker("gallery")}>
                    {Icons.galleryIcon}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleImagePicker("camera")}>
                    {Icons.cameraIcon}
                </TouchableOpacity>
                <TouchableOpacity>
                    {Icons.gifIcon}
                </TouchableOpacity>
                <TouchableOpacity>
                    {Icons.atIcon}
                </TouchableOpacity>
                <TouchableOpacity>
                    {Icons.emojiIcon}
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btn}>
                <TextBold fontSize={16} color="#fff">
                    {messages.postBtn}
                </TextBold>
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images && images.map((uri, index) => (
                    <View key={index} style={styles.uploadedImageContainer}>
                        <TouchableOpacity onPress={() => removeImage(index)} style={styles.closeIcon}>
                            <IconContainer width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                                <Path d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </IconContainer>
                        </TouchableOpacity>
                        <Image style={styles.uploadedImage} source={{ uri }} />
                    </View>
                ))}
            </ScrollView>
            {/* <View style={styles.gifContainer}>
                {gifs && gifs.map((item, index) => (
                    <View key={index}>
                        <Image style={styles.uploadedImage} source={{ uri: item.images['original_still'].url }} />
                    </View>
                )
                )}
            </View> */}
            {/* <SafeAreaView>
                <TextInput
                    autoFocus
                    onChangeText={setSearchQuery}
                    placeholder="Search..."
                    value={searchQuery}
                />
                <GiphyGridView
                    content={GiphyContent.search({ searchQuery: searchQuery })}
                    cellPadding={3}
                    style={{ height: 300, marginTop: 24 }}
                    onMediaSelect={(e) => setMedia(e.nativeEvent.media)}
                />
                {media && (
                    <ScrollView
                        style={{
                            aspectRatio: media.aspectRatio,
                            maxHeight: 400,
                            padding: 24,
                            width: '100%',
                        }}
                    >
                        <GiphyMediaView
                            media={media}
                            style={{ aspectRatio: media.aspectRatio }}
                        />
                    </ScrollView>
                )}
            </SafeAreaView> */}
        </View>
    )
}

export default memo(CreatePost)


const styles = StyleSheet.create({
    closeIcon: {
        position: "absolute",
        zIndex: 2,
        top: RPW(.7),
        left: RPH(.4)
    },
    uploadedImage: {
        marginTop: RPH(1.2),
        width: RPW(12.7),
        height: RPH(6.2),
        resizeMode: 'cover',
        borderRadius: 8
    },
    gifContainer: {
        flexDirection: "row",
        flexGrow: 1,
    },
    uploadedImageContainer: {
        justifyContent: "flex-start",
        position: "relative",
        paddingHorizontal: RPW(2.5)
    },
    container: {
        backgroundColor: "#fff",
        marginVertical: RPH(6.5),
        borderRadius: 24,
        marginHorizontal: RPW(6.4),
        paddingVertical: RPH(1.4)
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
        paddingBottom: RPH(.8),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: RPW(4)
    },
    input: {
        color: "rgba(118, 118, 118, 0.77)",
        fontSize: RFS(14),
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    },
    btn: {
        backgroundColor: "#308AFF",
        borderRadius: 12,
        marginHorizontal: RPW(8),
        paddingHorizontal: RPW(2),
        paddingVertical: RPH(1.2),
        marginTop: RPH(1.4),
        alignItems: "center"
    },
    body: {
        paddingHorizontal: RPW(3.8),
        paddingVertical: RPH(1)
    },
    content: {
        flexDirection: "row",
        gap: RPW(1.2),
        alignItems: "center"
    },
    iconContainer: {
        flexDirection: "row",
        gap: RPW(12.2),
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
        paddingBottom: RPH(.6),
        justifyContent: "center"
    }
})