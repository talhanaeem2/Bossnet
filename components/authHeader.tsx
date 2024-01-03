import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'

const AuthHeader = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer}>
                <Image source={require('../assets/icons/back.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
                <Image source={require('../assets/icons/close.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default AuthHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 30
    },
    iconContainer: {
        alignSelf: 'center',
    },
});