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

const addToFavorites = createAsyncThunk('favorites/addToFavorites', async (contact, { rejectWithValue }) => {
    try {
        await new Promise((resolve, reject) => {
            db.transaction(txn => {
                txn.executeSql(
                    'INSERT INTO favorites (name, surname, phone, email, address, job) VALUES (?, ?, ?, ?, ?, ?)',
                    [contact.name, contact.surname, contact.phone, contact.email, contact.address, contact.job],
                    (sqlTxn, res) => {
                        console.log('Favoriye eklendi:', contact);
                        resolve(true);
                    },
                    error => {
                        console.log('Hata:', error.message);
                        reject(error.message);
                    }
                );
            });
        });

        return contact;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);


export { deleteContact, addToFavorites };