import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Icons from '../../../constants/icons';

import RootStackParamListInterface from '../../../interfaces/RootStackParamListInterface';

const AuthHeader = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer} onPress={goBack}>
                {Icons.backIcon}
            </TouchableOpacity>
        </View>
    )
}

export default AuthHeader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15
    },
    iconContainer: {
        alignSelf: 'flex-start',
    },
});