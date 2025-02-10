import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import defaultScreenStyle from '../../styles/defaultScreenStyle'
import { Formik } from 'formik';
import { Input, Button } from '@ui-kitten/components';
import { newContactSchema } from '../../utils/schemas';
import SQLite from 'react-native-sqlite-storage';
import { useDispatch, useSelector } from 'react-redux';



const db = SQLite.openDatabase({
    name: 'ContactsDatabase',
});


const AddContact = () => {

    const { contacts, pending } = useSelector(state => state.contacts)
    const dispatch = useDispatch()

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



    const addNewContact = (values) => {
        db.transaction(txn => {
            txn.executeSql(
                'INSERT INTO users(name,surname,phone,email,address,job) VALUES (?,?,?,?,?,?)',
                [values.name, values.surname, values.phone, values.email, values.address, values.job],
                (sqlTxn, response) => console.log('kisi eklendi'),

                error => console.log('hata', error.message),
            );
        });
    };

    useEffect(() => {
        return () => {
            getContacts()
        }
    }, [])

    return (
        <View style={defaultScreenStyle.container}>
            <ScrollView>
                <Formik
                    initialValues={{
                        name: 'Mert',
                        surname: 'Ozbolat',
                        email: 'mert008@gmail.com',
                        phone: '0533 821 54 66',
                        address: 'Cyprus',
                        job: 'Software Developer',

                    }}
                    onSubmit={values => addNewContact(values)}
                    validationSchema={newContactSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <View>
                            <Input
                                style={styles.Input}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                size='medium'
                                placeholder='Name'
                                label='Name'
                                caption={errors.name}
                                status={errors.name ? 'danger' : 'success'}
                            />


                            <Input
                                style={styles.Input}
                                onChangeText={handleChange('surname')}
                                onBlur={handleBlur('surname')}
                                value={values.surname}
                                size='medium'
                                placeholder='Surname'
                                label='Surname'
                                caption={errors.surname}
                                status={errors.surname ? 'danger' : 'success'}
                            />


                            <Input
                                style={styles.Input}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                size='medium'
                                placeholder='email'
                                label='Email'
                                caption={errors.email}
                                status={errors.email ? 'danger' : 'success'}
                            />


                            <Input
                                style={styles.Input}
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                                size='medium'
                                placeholder='Phone'
                                label='Phone'
                                caption={errors.phone}
                                status={errors.phone ? 'danger' : 'success'}
                            />


                            <Input
                                style={styles.Input}
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                                size='medium'
                                placeholder='Address'
                                label='Address'
                                caption={errors.address}
                                status={errors.address ? 'danger' : 'success'}
                            />

                            <Input
                                style={styles.Input}
                                onChangeText={handleChange('job')}
                                onBlur={handleBlur('job')}
                                value={values.job}
                                size='medium'
                                placeholder='Job'
                                label='Job'
                                caption={errors.job}
                                status={errors.job ? 'danger' : 'success'}
                            />
                            <Button
                                onPress={handleSubmit}
                                style={styles.button}
                                appearance='outline'
                                status='danger'
                            >
                                SAVE
                            </Button>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

export default AddContact

const styles = StyleSheet.create({

    Input: {
        marginVertical: 10
    },
    button: {}
})