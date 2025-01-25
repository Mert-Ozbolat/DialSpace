import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TABNAVIGATOR } from '../utils/routes';
import Tabnavigator from './tabNavigator';

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={TABNAVIGATOR} component={Tabnavigator} />
        </Stack.Navigator>
    );
}

export default RootNavigator