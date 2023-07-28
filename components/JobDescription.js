import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function JobDescription(props) {

    let item = props.route.params.item
    let logo = item ? { uri: item.employer_logo } : null;

    if (!item) {
        // Handle the case where item is null or undefined
        return <Text>Error: No job information available.</Text>;
    }


    return (
        <>
            <ScrollView style={{ margin: 15 }} showsVerticalScrollIndicator={false}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View>
                        <Text style={{ width: 230, fontSize: 22 }}>{item.job_title}</Text>
                        <Text style={{ width: 200, fontSize: 13 }}>Company: {item.employer_name}</Text>
                    </View>
                    <Image style={{ height: 100, width: 100 }} source={logo} />
                </View>
                <Text style={{ marginVertical: 10 }}><Text style={{ fontWeight: 'bold' }}>Salary: </Text>{item.job_min_salary} - {item.job_max_salary ? item.job_max_salary : 'Not mentioned'} {item.job_salary_currency}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Company Site: </Text>{item.employer_website != null ? item.employer_website : ''}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Company Type: </Text>{item.employer_company_type != null ? item.employer_company_type : ''}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Job Published By: </Text>{item.job_publisher}</Text>
                <Text style={{ marginVertical: 10 }}><Text style={{ fontWeight: 'bold' }}>Experience Required: </Text>{item.job_required_experience.required_experience_in_months ? item.job_required_experience.required_experience_in_months : '0'} months </Text>
                <Text style={{ marginVertical: 10 }}>{item.job_description}</Text>
                {/* <Text style={{ marginVertical: 10 }}>Skills: {skills}</Text> */}
                {/* <Text style={{ marginVertical: 10 }}><Text style={{ fontWeight: 'bold' }}>Benefits: </Text>{item.job_benefits[0]}, {item.job_benefits[1]}, {item.job_benefits[2]}, {item.job_benefits[3]}, {item.job_benefits[4]}, {item.job_benefits[5]} </Text> */}
                <Text style={{ marginVertical: 10 }}><Text style={{ fontWeight: 'bold' }}>Apply on Link: </Text>{item.job_google_link}</Text>
                <Text style={{ marginVertical: 10 }}><Text style={{ fontWeight: 'bold' }}>Job Expiring on </Text>{item.job_offer_expiration_datetime_utc ? item.job_offer_expiration_datetime_utc.slice(0, 10) : ''}</Text>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {

    },
});
