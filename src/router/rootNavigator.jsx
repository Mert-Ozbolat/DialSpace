import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ADDNEWCONTACT, CALLING, CONTACTDETAIL, TABNAVIGATOR } from '../utils/routes';
import Tabnavigator from './tabNavigator';
import ContactDetail from '../screens/contacts/contactDetail';
import { Colors } from '../theme/colors';
import Calling from '../screens/calling';
import AddContact from '../screens/contacts/addContact';
import { Pressable, View } from 'react-native';
import { Edit, Trash } from 'iconsax-react-native';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../store/actions/contactActions';

const Stack = createNativeStackNavigator();




function RootNavigator() {

    const dispatch = useDispatch();

    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitle: 'Geri',
                headerTintColor: Colors.BLACK
            }}>
            <Stack.Screen options={{
                headerShown: false
            }} name={TABNAVIGATOR} component={Tabnavigator} />

            <Stack.Screen
                options={({ navigation, route }) => ({
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                onPress={() => dispatch(deleteContact(route.params))}
                                style={{ marginRight: 20 }}>
                                <Trash name="add" color={Colors.RED} size={25} />
                            </Pressable>

                            <Pressable
                                onPress={() => navigation.navigate(ADDNEWCONTACT)}
                                style={{ marginRight: 15 }}>
                                <Edit name="add" color={Colors.BLUE} size={25} />
                            </Pressable>
                        </View>
                    ),
                })}
                name={CONTACTDETAIL} component={ContactDetail} />

            <Stack.Screen options={{
                headerShown: false
            }} name={CALLING} component={Calling} />

            <Stack.Screen options={{
                headerShown: false
            }} name={ADDNEWCONTACT} component={AddContact} />
        </Stack.Navigator>
    );
}

export default RootNavigator