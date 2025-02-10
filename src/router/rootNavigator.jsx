import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ADDNEWCONTACT, CALLING, CONTACTDETAIL, FAVORITES, TABNAVIGATOR, UPDATECONTACT } from '../utils/routes';
import Tabnavigator from './tabNavigator';
import ContactDetail from '../screens/contacts/contactDetail';
import { Colors } from '../theme/colors';
import Calling from '../screens/calling';
import AddContact from '../screens/contacts/addContact';
import { Pressable, View } from 'react-native';
import { Edit, Star1, Trash } from 'iconsax-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, deleteContact } from '../store/actions/contactActions';
import UpdateContact from '../screens/contacts/updateContact';
import Favorites from '../screens/favorites';

const Stack = createNativeStackNavigator();

function RootNavigator() {

    const dispatch = useDispatch();
    const { isFavorite } = useSelector(state => state.favorites);

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
                                onPress={() => dispatch(deleteContact(route.params.contact.id))}
                                style={{ marginRight: 20 }}>
                                <Trash name="trash" color={Colors.RED} size={25} />
                            </Pressable>

                            <Pressable
                                onPress={() => navigation.navigate(UPDATECONTACT, { contact: route.params.contact })}
                                style={{ marginRight: 15 }}>
                                <Edit name="edit" color={Colors.BLUE} size={25} />
                            </Pressable>

                            <Pressable
                                onPress={() => dispatch(addToFavorites(route.params.contact))}
                                style={{ marginRight: 15 }}>
                                {
                                    isFavorite ? <Star1 name="star" color={Colors.YELLOW} size={25} variant="Bold" /> :
                                        <Star1 name="star" color={Colors.YELLOW} size={25} />
                                }
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

            <Stack.Screen options={{
                headerShown: false
            }} name={UPDATECONTACT} component={UpdateContact} />

            <Stack.Screen options={{
                headerShown: false
            }} name={FAVORITES} component={Favorites} />

        </Stack.Navigator>
    );
}

export default RootNavigator