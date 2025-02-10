import { createAsyncThunk } from "@reduxjs/toolkit";
import SQLite from 'react-native-sqlite-storage';




const db = SQLite.openDatabase({
    name: 'ContactsDatabase',
});

const deleteContact = createAsyncThunk("contacts/deleteContact", async (contact_id) => {
    try {
        db.transaction(txn => {
            txn.executeSql(
                `DELETE * FROM users WHERE id=${contact_id}`,
                [],
                (sqlTxn, response) => {
                    if (response.rows.length > 0) {
                        for (let i = 0; i < response.rows.length; i++) {
                            let item = response.rows.item(i);
                            console.log(item)
                        }
                    }
                },
                error => console.log('hata', error.message),
            );
        });
    } catch (error) {
        console.log('hata', error.message)
    }
})



export { deleteContact }