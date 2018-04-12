import React from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';

class Astronomy extends React.Component {
    render() {
        const { data, reload } = this.props;
        const { title, url, explanation, date } = data;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.imageContainer}>
                    <Image
                        style={{width: '80%', height: 200, resizeMode: 'cover'}}
                        source={{uri: url}}
                    />
                </View>
                <Text style={styles.explanation}>{explanation}</Text>
                <Text style={styles.date}>{date}</Text>
                <Button title="重載" onPress={reload} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    title: {
        marginTop: 15,
        fontSize: 16,
        alignSelf: 'center',
    },
    explanation: {
        marginTop: 15,
        fontSize: 12,
        alignSelf: 'center',
    },
    date: {
        marginTop: 15,
        fontSize: 9,
        alignSelf: 'center',
    }
});

export default Astronomy;
