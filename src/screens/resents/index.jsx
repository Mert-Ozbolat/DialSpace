import { View, Text, FlatList } from 'react-native'
import defaultScreenStyle from '../../styles/defaultScreenStyle'
import SQLite from 'react-native-sqlite-storage';
import { useState, useEffect } from 'react';
import ResentItem from '../../components/resents/resentItem';
const db = SQLite.openDatabase({
    name: 'ContactsDatabase',
});
const Resents = () => {
    const [resents, setResents] = useState([])
    const getResents = () => {
        db.transaction(txn => {
            txn.executeSql(
                'SELECT * FROM resents',
                [],
                (sqlTxn, response) => {
                    if (response.rows.length > 0) {
                        let resents = []
                        for (let i = 0; i < response.rows.length; i++) {
                            let item = response.rows.item(i);
                            resents.push(item)
                        }
                        setResents(resents);
                    }
                },
                error => console.log('hata', error.message),
            );
        });
    };

    useEffect(() => {
        getResents()

    }, [])
    return (
        <View style={defaultScreenStyle.container}>
            <FlatList data={resents}
                renderItem={({ item }) => <ResentItem item={item} />} />
        </View>
    )
}

export default Resents