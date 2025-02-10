import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import ContactItem from '../../components/contacts/contactItem';
import { useDispatch, useSelector } from 'react-redux';
import { setContacts, setPending } from '../../store/slice/contactSlice';
import { Colors } from '../../theme/colors';


const db = SQLite.openDatabase({
    name: 'ContactsDatabase',
});

const Contacts = () => {

    const { contacts, pending } = useSelector(state => state.contacts)
    const dispatch = useDispatch()


    const createContactsTable = () => {
        db.transaction(txn => {
            txn.executeSql(
                'CREATE Table IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), surname VARCHAR(100), phone INTEGER, email VARCHAR(500), address VARSHAR(1000), job VARCHAR(100))',
                [],
                (sqlTxn, res) => console.log('tablo oluştu'),
                error => console.log('hata', error.message),
            );
        });
    };
    const createResentsTable = () => {
        db.transaction(txn => {
            txn.executeSql(
                'CREATE Table IF NOT EXISTS calls (id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(100), resent_id INTEGER, callType VARCHAR(100))',
                [],
                (sqlTxn, res) => console.log('Call tablo oluştu'),
                error => console.log('hata', error.message),
            );
        });
    };

    const getContacts = () => {
        dispatch(setPending(true))
        db.transaction(txn => {
            txn.executeSql(
                'SELECT * FROM users',
                [],
                (sqlTxn, response) => {
                    if (response.rows.length > 0) {
                        let users = []
                        for (let i = 0; i < response.rows.length; i++) {
                            let item = response.rows.item(i);
                            users.push(item)
                        }
                        dispatch(setContacts(users));
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
        createContactsTable();
        createResentsTable();
        getContacts();
    }, []);

    return (
        <View style={defaultScreenStyle.container}>
            {
                pending ?
                    <ActivityIndicator color={Colors.GRAY} />
                    :
                    <FlatList
                        ListEmptyComponent={<Text>Henuz kayıt yok</Text>}
                        data={contacts}
                        renderItem={({ item }) => <ContactItem item={item} />}
                    />
            }
        </View>
    );
};

export default Contacts;