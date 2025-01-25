import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CONTACTS, FAVORITES, RESENTS } from '../utils/routes';
import Resents from '../screens/resents';
import Contacts from '../screens/contacts';
import Favorites from '../screens/favorites';

const Tab = createBottomTabNavigator();

function Tabnavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name={RESENTS} component={Resents} />
            <Tab.Screen name={CONTACTS} component={Contacts} />
            <Tab.Screen name={FAVORITES} component={Favorites} />
        </Tab.Navigator>
    );
}

export default Tabnavigator