import { View, Text } from 'react-native'
import React from 'react'
import { CONTACTS, FAVORITES, RESENTS } from '../../utils/routes'
import { Book1, Clock, Personalcard, Star1 } from 'iconsax-react-native'

const TabBarIcon = ({ name, focused, size, color }) => {
    switch (name) {
        case RESENTS:
            return <Clock size={size} color={color} />
        case CONTACTS:
            return <Book1 size={size} color={color} />
        case FAVORITES:
            return <Star1 size={size} color={color} />
        default:
            return <Star1 size={size} color={color} />
    }
}

export default TabBarIcon