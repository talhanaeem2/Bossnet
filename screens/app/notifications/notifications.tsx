import { View } from "react-native"

import MainWapper from "../../../components/app/mainWrapper/mainWrapper"
import TextBold from "../../../components/app/textComponent/textBold/textBold"
import { LinearGradient } from "expo-linear-gradient"

const Notifications = () => {
    return (
        <MainWapper isHeader={true} icon={true} headerText="Notifications">
            <LinearGradient
                colors={['rgba(39, 60, 255, 0.20)', 'rgba(0, 163, 255, 0.20)']}
            >
                <View style={{ paddingHorizontal: 22, paddingVertical: 8 }}>
                    <TextBold fontSize={16}>New</TextBold>
                </View>
            </LinearGradient>
        </MainWapper>
    )
}

export default Notifications