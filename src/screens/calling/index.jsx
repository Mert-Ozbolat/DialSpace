import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Avatar from '../../components/contacts/avatar'
import { sizes } from '../../utils/constants'


const Calling = ({ route }) => {
    const { contact } = route.params
    return (
        <View style={styles.container}>

            <View style={styles.container}>
                <Avatar name={contact.name} surname={contact.surname} size={sizes.LARGE} />
            </View>

            <View style={styles.container}>

            </View>
        </View>
    )
}

export default Calling

const styles = StyleSheet.create({})