import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import Job from './Job';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTailwind } from 'tailwind-rn'

export default function Home({ navigation }) {

    const tailwind = useTailwind()

    const [data, setData] = useState([])
    const [dataFromApi, setDataFromApi] = useState([])
    const [query, setQuery] = useState('computer science')
    const [num_pages, setNum_pages] = useState(1)
    const [location, setLocation] = useState('Texas')
    const [searchText, setSearchText] = useState('')
    const [loader, setLoader] = useState(false)
    const [jobFiltersModal, setJobFiltersModal] = useState(false)
    const [partTimeBg, setPartTimeBg] = useState(false)
    const [fullTimeBg, setFullTimeBg] = useState(false)
    const [internBg, setInternBg] = useState(false)
    const [locationInput, setLocationInput] = useState('')
    const [jobTypeData, setJobTypeData] = useState([])
    const [notConcat, setNotConcat] = useState(false)

    const url = `https://jsearch.p.rapidapi.com/search?query=${query}%20in%20${location}%2C%20USA&page=${num_pages}&num_pages=1`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a29b56f5c0msh9759665dd00ab66p16032cjsnd2a00edc8d27',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    async function getData() {
        setLoader(true)
        let response = await fetch(url, options)
            .then((res) => res.json())
            .then((result) => setDataFromApi(result.data))
        setLoader(false)
    }

    // useEffect(() => {
    //     getData()
    // }, [num_pages, query, location])

    useEffect(() => {
        if (notConcat) {
            setData(data.concat(dataFromApi))
            setNotConcat(false)
        } else {
            setData(dataFromApi)
        }
    }, [dataFromApi])



    function handleSearch() {
        setQuery(searchText)
    }
    function handleLoadMore() {
        setNotConcat(true)
        setNum_pages(num_pages + 1)
        setJobTypeData([])
    }
    async function handlePartTime() {
        setJobFiltersModal(false)
        setPartTimeBg((prev) => !prev)
        if (fullTimeBg == true) { setFullTimeBg(false) }
        if (internBg == true) { setInternBg(false) }

        // await getData()

        let filteredData = data.filter((item) => {
            return item.job_employment_type == 'PARTTIME'
        })
        setJobTypeData(filteredData)
    }
    async function handleFullTime() {
        setJobFiltersModal(false)
        setFullTimeBg((prev) => !prev)
        if (partTimeBg == true) { setPartTimeBg(false) }
        if (internBg == true) { setInternBg(false) }

        // await getData()

        let filteredData = data.filter((item) => {
            return item.job_employment_type == 'FULLTIME'
        })
        setJobTypeData(filteredData)
    }
    async function handleIntern() {
        setJobFiltersModal(false)
        setInternBg((prev) => !prev)
        if (fullTimeBg == true) { setFullTimeBg(false) }
        if (partTimeBg == true) { setPartTimeBg(false) }

        // await getData()

        let filteredData = data.filter((item) => {
            return item.job_employment_type == 'INTERN'
        })
        setJobTypeData(filteredData)
    }

    function handleSetLocation() {
        setLocation(locationInput)
        setJobFiltersModal(false)
    }

    return (
        <>
            <Modal visible={loader} transparent={true}>
                <View style={styles.modalOuterBox}>
                    <View style={styles.modalInnerBox}>
                        <ActivityIndicator size={60} color='black' />
                    </View>
                </View>
            </Modal>

            <Modal visible={jobFiltersModal} transparent={true}>
                <View style={styles.modalOuterBox}>
                    <View style={styles.filtersModalInnerBox}>
                        <Text style={{ textAlign: 'center', fontSize: 23, color: 'white' }}>Job Filters</Text>
                        <View style={styles.jobTypeView}>
                            <Text style={{ color: 'white' }}>Job Type: </Text>
                            <TouchableOpacity style={[styles.jobType, { backgroundColor: partTimeBg ? 'lightblue' : 'white' }]} onPress={handlePartTime}>
                                <Text >Part-Time</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.jobType, { backgroundColor: fullTimeBg ? 'lightblue' : 'white' }]} onPress={handleFullTime}>
                                <Text >Full-Time</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.jobType, { backgroundColor: internBg ? 'lightblue' : 'white' }]} onPress={handleIntern}>
                                <Text >Intern</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.jobTypeView, { width: '79%' }]}>
                                <Text style={{ color: 'white' }}>City: </Text>
                                <TextInput onChangeText={(e) => setLocationInput(e)} style={{ borderRadius: 10, backgroundColor: 'white', width: '82%' }} placeholder='' />
                            </View>
                            <TouchableOpacity onPress={handleSetLocation} style={[styles.jobType, { width: '20%' }]}>
                                <Text style={{ color: 'white', textAlign: 'center' }}>Set</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setJobFiltersModal(false)} style={[styles.jobType, { width: '20%' }]}>
                                <Text style={{ color: 'white', textAlign: 'center' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <ScrollView style={styles.container}>
                <Text style={{ fontSize: 25, marginTop: 20, marginBottom: 15 }}>Hello Adriana</Text>
                <Text style={tailwind('text-xl')}>Welcome</Text>
                <View style={styles.searchInput}>
                    <TextInput style={styles.searchText} placeholder='Search Jobs' onChangeText={(e) => setSearchText(e)} />
                    <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                        <Text style={{ fontSize: 15 }}>Search</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.filtersView}>
                    <TouchableOpacity onPress={() => setJobFiltersModal(true)} style={styles.filterBtn}>
                        <Text>Filters</Text>
                    </TouchableOpacity>
                </View>
                {jobTypeData.length == 0 ?
                    data.map((item, index) => {
                        return <Job key={index} item={item} navigation={navigation} />
                    }) :
                    jobTypeData.map((item, index) => {
                        return <Job key={index} item={item} navigation={navigation} />
                    })
                }
                <TouchableOpacity style={styles.loadMore} onPress={handleLoadMore}>
                    <Text style={{ fontSize: 17, color: 'white' }}>Load More</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    searchText: {
        width: '75%',
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 13,
        shadowColor: 'black',
        fontSize: 15,
        // shadowColor: 'black',
        elevation: 2

    },
    searchBtn: {
        // width: '20%',
        // borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'lightblue',
        elevation: 5

    },
    searchInput: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    loadMore: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'black',
        marginTop: 10
    },
    modalOuterBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalInnerBox: {
        height: 200,
        width: 200,
        justifyContent: 'center'
    },
    jobTypeView: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    jobType: {
        borderWidth: 2,
        borderColor: 'white',
        padding: 5,
        borderRadius: 10,
        marginHorizontal: 2,
        marginVertical: 10
    },
    filtersModalInnerBox: {
        height: 400,
        width: 300,
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 10
    },
    filtersView: {
        alignItems: 'flex-end'
    },
    filterBtn: {
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        paddingHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 10,
        backgroundColor: 'lightblue',
        elevation: 5
    }
});





