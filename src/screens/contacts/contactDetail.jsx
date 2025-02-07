import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import defaultScreenStyle from '../../styles/defaultScreenStyle'
import Avatar from '../../components/contacts/avatar'
import { convertFullName } from '../../utils/functions'
import { height, sizes } from '../../utils/constants'
import { Colors } from '../../theme/colors'
import CircleIconButton from '../../components/ui/circleIconButton'
import { Call, Messages3, Sms } from 'iconsax-react-native'

const ContactDetail = ({ route }) => {

    const { contact } = route.params
    return (
        <View style={defaultScreenStyle.container}>
            <ScrollView>
                <View style={styles.userContainer}>
                    <Avatar name={contact?.name} surname={contact?.surname} size={sizes.MEDIUM} />
                    <Text style={styles.fullName}>{convertFullName(contact?.name, contact?.surname)}</Text>
                    <Text style={styles.job}>{contact.job}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <CircleIconButton color={Colors.GREEN} icon={<Sms size="32" color="#FFF" variant="Bold" />} />
                    <CircleIconButton color={Colors.PURPEL} icon={<Messages3 size="32" color="#FFF" variant="Bold" />} />
                    <CircleIconButton color={Colors.BLUE} icon={<Call size="32" color="#FFF" variant='Bold' />} />
                </View>


                <View >
                    <View style={styles.infoContainer}>

                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default ContactDetail

const styles = StyleSheet.create({
    userContainer: {
        alignItems: "center",
        height: height * 0.2,
        justifyContent: 'center'
    },
    buttonContainer: {
        alignItems: "center",
        height: height * 0.1,
        justifyContent: 'space-evenly',
        flexDirection: 'row'

    },
    fullName: {
        fontSize: 18,
        fontWeight: '700',
    },
    job: {
        color: Colors.GRAY,
        fontSize: 16
    },
    infoContainer: {
        backgroundColor: Colors.SOFTGRAY,
        borderRadius: 5,
        margin: 5
    },
})

