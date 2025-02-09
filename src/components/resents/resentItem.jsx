import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { Colors } from '../../theme/colors';
import Avatar from '../contacts/avatar';
import { convertFullName } from '../../utils/functions';
import { sizes } from '../../utils/constants';
import { CallIncoming, CallOutgoing } from 'iconsax-react-native';



const db = SQLite.openDatabase({
    name: 'ContactsDatabase',
});

const ResentItem = ({ item }) => {
    const [user, setUser] = useState(null);

    const getUser = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM users WHERE id=?`,
                [item.resent_id],
                (sqlTxn, response) => {
                    console.log('Rows length:', response.rows.length);
                    if (response.rows.length > 0) {
                        let userData = response.rows.item(0);
                        setUser(userData);
                    }
                },
                error => console.log('Hata:', error.message),
            );
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Pressable style={styles.container}>
            <View style={styles.avatarContainer}>
                {user && (
                    <Avatar
                        name={user.name ?? ''}
                        surname={user.surname ?? ''}
                        size={sizes.SMALL}
                    />
                )}
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.name}>
                    {user ? convertFullName(user.name, user.surname) : 'Bilinmiyor'}
                </Text>
                <Text style={styles.job}>{item?.date}</Text>
            </View>

            <View style={styles.callTypeContainer}>
                {
                    item?.callType == 'incoming' ?
                        <CallIncoming name="add" size={28} color={Colors.RED} />
                        :
                        <CallOutgoing name="add" size={28} color={Colors.GREEN} />
                }
            </View>
        </Pressable>
    );
};

export default ResentItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        margin: 5,
        color: Colors.BLACK,
    },
    job: {
        fontSize: 14,
        color: Colors.GRAY,
        margin: 5,
    },
    infoContainer: {
        flex: 4,
    },
    avatarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    callTypeContainer: {
        marginHorizontal: 10

    }
});