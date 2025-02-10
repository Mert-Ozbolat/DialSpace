import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import defaultScreenStyle from '../../styles/defaultScreenStyle'
import { Formik } from 'formik';


const AddContact = () => {
    return (
        <View style={defaultScreenStyle.container}>
            <ScrollView>
                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <Button onPress={handleSubmit} title="Submit" />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

export default AddContact

const styles = StyleSheet.create({})