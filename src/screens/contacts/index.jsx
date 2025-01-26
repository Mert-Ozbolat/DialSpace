import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import defaultScreenStyle from '../../styles/defaultScreenStyle'
import SQLite from 'react-native-sqlite-storage'


const db = SQLite.openDatabase({
    name: 'ContactsDatabase'
})


const Contacts = () => {

    const [users, setUsers] = useState([])

    const createContactsTable = () => {
        db.transaction(txn => {
            txn.executeSql(
                'CREATE Table IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), surname VARCHAR(100), phone INTEGER, email VARCHAR(500), address VARSHAR(1000), job VARCHAR(100))',
                [],
                (sqlTxn, res) => console.log('tablo oluştu'),
                error => console.log('hata', error.message)
            )
        })
    }


    const getContacts = () => {
        db.transaction(txn => {
            txn.executeSql(
                'SELECT * FROM users',
                [],
                (sqlTxn, res) => {
                    console.log('gelen veriler', res.rows)
                },
                error => console.log('hata', error.message)
            )
        })
    }

    useEffect(() => {
        createContactsTable()
        getContacts()
    }, [])

    return (
        <View style={defaultScreenStyle.container}>
            <FlatList
                data={users}
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
        </View>
    )
}

export default Contacts