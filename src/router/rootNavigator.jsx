import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CALLING, CONTACTDETAIL, TABNAVIGATOR } from '../utils/routes';
import Tabnavigator from './tabNavigator';
import ContactDetail from '../screens/contacts/contactDetail';
import { Colors } from '../theme/colors';
import Calling from '../screens/calling';

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitle: 'Geri',
                headerTintColor: Colors.BLACK
            }}>
            <Stack.Screen options={{
                headerShown: false
            }} name={TABNAVIGATOR} component={Tabnavigator} />
            <Stack.Screen name={CONTACTDETAIL} component={ContactDetail} />
            <Stack.Screen options={{
                headerShown: false
            }} name={CALLING} component={Calling} />
        </Stack.Navigator>
    );
}

export default RootNavigator