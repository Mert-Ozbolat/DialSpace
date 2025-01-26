import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CONTACTS, FAVORITES, RESENTS } from '../utils/routes';
import Resents from '../screens/resents';
import Contacts from '../screens/contacts';
import Favorites from '../screens/favorites';
import TabBarIcon from '../components/router/tabBarIcon';

const Tab = createBottomTabNavigator();

function Tabnavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => (
                    <TabBarIcon name={route.name} color={color} size={size} />
                ),
                tabBarActiveTintColor: '#344CB7',
                tabBarInactiveTintColor: '#7E99A3',
            })}>
            <Tab.Screen name={RESENTS} component={Resents} />
            <Tab.Screen name={CONTACTS} component={Contacts} />
            <Tab.Screen name={FAVORITES} component={Favorites} />
        </Tab.Navigator>
    );
}

export default Tabnavigator