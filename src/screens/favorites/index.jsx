import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import defaultScreenStyle from '../../styles/defaultScreenStyle'
import SQLite from 'react-native-sqlite-storage';
import { setContacts, setPending } from '../../store/slice/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorites } from '../../store/slice/favoritesSlice';

const db = SQLite.openDatabase({
    name: 'ContactsDatabase',
});

const Favorites = () => {

    const dispatch = useDispatch();
    const { favorites } = useSelector(state => state.favorites);


    const createFavoritesTable = () => {
        db.transaction(txn => {
            txn.executeSql(
                'CREATE Table IF NOT EXISTS favorites(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), surname VARCHAR(100), phone INTEGER, email VARCHAR(500), address VARSHAR(1000), job VARCHAR(100))',
                [],
                (sqlTxn, res) => console.log('Favorites tablo oluştu'),
                error => console.log('hata', error.message),
            );
        });
    };


    const getFavorites = () => {
        dispatch(setPending(true))
        db.transaction(txn => {
            txn.executeSql(
                'SELECT * FROM favorites',
                [],
                (sqlTxn, response) => {
                    if (response.rows.length > 0) {
                        let users = []
                        for (let i = 0; i < response.rows.length; i++) {
                            let item = response.rows.item(i);
                            users.push(item)
                        }
                        dispatch(setFavorites(users));
                    }
                },
                error => {
                    error => console.log('hata', error.message);
                    dispatch(setPending(false))
                }
            );
        });
    };


    useEffect(() => {
        return () => {
            createFavoritesTable()
            getFavorites()
        }
    }, [])


    return (
        <View style={defaultScreenStyle.container} >
            <FlatList
                ListEmptyComponent={<Text>Henuz kayıt yok</Text>}
                keyExtractor={(item) => item.id.toString()}
                data={favorites}
                renderItem={({ item }) =>
                    <View>
                        <Text>{item.name} {item.surname}</Text>
                        <Text>{item.phone}</Text>
                    </View>}
            />
        </View>
    )
}

export default Favorites