import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Job(props) {
    return (
        <>
            <TouchableOpacity onPress={() => { return props.navigation.navigate("screen2", { item: props.item }) }} style={styles.container}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{props.item.job_title}</Text>
                <Text style={{ fontSize: 15 }}>{props.item.employer_name}</Text>
                <Text style={{ fontSize: 15 }}>Location: {props.item.job_city}, {props.item.job_state}, {props.item.job_country}</Text>
                <Text style={{ fontSize: 15 }}>Job Type: <Text style={{ fontWeight: 'bold' }}>{props.item.job_employment_type}</Text></Text>
                <Text style={{ fontSize: 13 }}>Posted: {props.item.job_posted_at_datetime_utc.slice(0, 10)}</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'black',
        // borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 2,
        marginVertical: 10,
        marginHorizontal: 1,
        backgroundColor: 'lightblue'
    },
});
