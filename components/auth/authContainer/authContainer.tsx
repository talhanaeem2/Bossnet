import { View, StyleSheet } from 'react-native'

import AuthContainerInterface from './interfaces/AuthContainerInterface';
import { RPH, RPW } from '../../../constants/utils';

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
        marginHorizontal: RPW(6.5),
        marginVertical: RPH(6.5),
        borderRadius: 20,
        paddingHorizontal: RPW(10),
        paddingVertical: RPH(4)
    },
});