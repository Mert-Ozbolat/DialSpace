import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import SQLite from 'react-native-sqlite-storage';
import { Colors } from '../../theme/colors';
import Avatar from '../contacts/avatar';
import { convertFullName } from '../../utils/functions';
import { sizes } from '../../utils/constants';
const db = SQLite.openDatabase({
    name: 'ContactsDatabase',
});


const ResentItem = ({ item }) => {
    const [user, setUser] = useState();
    const getUser = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM users WHERE id=${item.resent_id}`,
                [],
                (sqlTxn, response) => {
                    if (response.rows.length > 0) {

                        for (let i = 0; i < response.rows.length; i++) {
                            let item = response.rows.item(i);
                            setUser(item);
                        }

                    }

                },
                error => console.log('hata', error.message),
            );
        });
    };
    useEffect(() => {
        getUser()
        console.log(response.rows.length)
    }, []);
    return (
        <Pressable
            style={styles.container}>

            <View style={styles.avatarContainer}>
                {user ? (
                    <Avatar name={user.name ?? ''} surname={user.surname ?? ''} size={sizes.SMALL} />
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{user ? convertFullName(user?.name, user?.surname) : null}</Text>
                <Text style={styles.job}>{user?.phone}</Text>
            </View>

        </Pressable>
    )
}

export default ResentItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        margin: 5,
        color: Colors.WHITE
    },
    job: {
        fontSize: 14,
        color: Colors.GRAY,
        margin: 5,
    },
    infoContainer: {
        flex: 4
    },
    avatarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }


})