import { View, StyleSheet } from 'react-native'

import AuthContainerInterface from './interfaces/AuthContainerInterface';

const AuthContainer = ({ children }: AuthContainerInterface) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default AuthContainer

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8FB',
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 25,
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 30
    },
});