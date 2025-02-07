import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getInitials } from '../../utils/functions';
import { Colors } from '../../theme/colors';
import { height, sizes, width } from '../../utils/constants';

const Avatar = ({ name, surname, size = sizes.MEDIUM }) => {
    const setSize = () => {
        switch (size) {
            case sizes.SMALL:
                return {
                    width: width * 0.1,
                    height: width * 0.1,
                };
            case sizes.MEDIUM:
                return {
                    width: width * 0.2,
                    height: width * 0.2,
                };
            case sizes.LARGE:
                return {
                    width: width * 0.3,
                    height: width * 0.3,
                };

            default:
                return {
                    width: width * 0.2,
                    height: width * 0.2,
                };
        }
    };
    return (
        <View style={[styles.container, setSize()]}>
            <Text style={styles.name}>{getInitials(name, surname)}</Text>
        </View>
    );
};

export default Avatar;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: Colors.SOFTGRAY,
        borderRadius: 100,
    },
    name: {
        color: Colors.BLACK,
        fontWeight: 'bold',
        fontSize: 18,
    },
});