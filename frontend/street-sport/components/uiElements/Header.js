import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

const Header = (props) => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle:{
        color: 'white',
        fontSize: 18
    }
});

export default Header;