import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { Add } from 'iconsax-react-native';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import ContactItem from '../../components/contacts/contactItem';

const db = SQLite.openDatabase({
    name: 'ContactsDatabase',
});

const Contacts = () => {
    const [users, setUsers] = useState([]);
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

    const getContacts = () => {
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
                        setUsers(users);
                    }
                },
                error => console.log('hata', error.message),
            );
        });
    };
    const addNewContact = (name, surname, phone, email, address, job) => {
        db.transaction(txn => {
            txn.executeSql(
                'INSERT INTO users(name,surname,phone,email,address,job) VALUES (?,?,?,?,?,?)',
                [name, surname, phone, email, address, job],
                (sqlTxn, response) => console.log('kisi eklendi'),

                error => console.log('hata', error.message),
            );
        });
    };
    useEffect(() => {
        createContactsTable();
        getContacts();
    }, []);

    return (
        <View style={defaultScreenStyle.container}>
            <FlatList
                data={users}
                renderItem={({ item }) => <ContactItem item={item} />}
            />
            <TouchableOpacity
                onPress={() =>
                    addNewContact(
                        'Meryem',
                        'Uludagli',
                        '075567675',
                        'meryemuludagli@gmail.com',
                        'Cyprus',
                        'Software Developer',
                    )
                }
                style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 20,
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 100,
                }}>
                <Add name="add" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default Contacts;