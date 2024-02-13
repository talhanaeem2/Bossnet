import useSliceSelector from './hooks/useSliceSelector';

import AppStack from './navigation/appStack';
import AuthStack from './navigation/authStack';

const WithAuthentication = () => {
    const isAuthenticated = useSliceSelector(state => state.auth.isAuthenticated);

    return (
        <>
            {isAuthenticated ? <AppStack /> : <AuthStack />}
        </>
    )
}

export default WithAuthentication;