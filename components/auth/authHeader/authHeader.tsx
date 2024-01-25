import { View, StyleSheet, TouchableOpacity } from 'react-native'

import Icons from '../../../constants/icons';

const AuthHeader = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer}>
                {Icons.backIcon}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
                {Icons.crossIcon}
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