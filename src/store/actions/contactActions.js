import SQLite from 'react-native-sqlite-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

const db = SQLite.openDatabase(
    {
        name: 'ContactsDatabase',
        location: 'default',
    },
    () => console.log('Veritabanı açıldı!'),
    error => console.log('Veritabanı açılırken hata oluştu:', error),
);

const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contact_id, { rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            try {
                db.transaction(txn => {
                    txn.executeSql(
                        'DELETE FROM users WHERE id = ?',
                        [contact_id],
                        (sqlTxn, response) => {
                            console.log('Silme işlemi başarılı');
                            resolve(true);
                        },
                        error => {
                            console.log('Hata:', error.message);
                            rejectWithValue(error.message);
                        },
                    );
                });
            } catch (error) {
                rejectWithValue(error.message);
            }
        });
    },
);

export { deleteContact };