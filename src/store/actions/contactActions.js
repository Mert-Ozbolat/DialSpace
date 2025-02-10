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

// Silme işlemi için thunk
const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contact_id, { rejectWithValue }) => {
        try {
            await new Promise((resolve, reject) => {
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
            });
            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Favorilere ekleme işlemi için thunk
const addToFavorites = createAsyncThunk(
    'favorites/addToFavorites',
    async (contact, { rejectWithValue, dispatch }) => {
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
                            rejectWithValue(error.message);
                        }
                    );
                });
            });

            dispatch(getFavorites());
            return contact;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export { deleteContact, addToFavorites };
