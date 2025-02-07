import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CONTACTDETAIL, TABNAVIGATOR } from '../utils/routes';
import Tabnavigator from './tabNavigator';
import ContactDetail from '../screens/contacts/contactDetail';
import { Colors } from '../theme/colors';

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
        </Stack.Navigator>
    );
}

export default RootNavigator