import { StyleSheet } from 'react-native'

import AuthContainerInterface from './interfaces/AuthContainerInterface';
import { RPH, RPW } from '../../../constants/utils';
import { LinearGradient } from 'expo-linear-gradient';

const AuthContainer = ({ children }: AuthContainerInterface) => {
    return (
        <LinearGradient
            colors={['#FFF', 'rgba(221, 249, 249, 0.48)', 'rgba(212, 178, 211, 0.00)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0.1694, 0.5649, 1.1252]}
            style={styles.container}
        >
            {children}
        </LinearGradient>
    )
}

export default AuthContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: RPW(10),
        paddingVertical: RPH(4)
    },
});