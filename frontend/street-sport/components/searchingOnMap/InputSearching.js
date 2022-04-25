import { useState , useEffect } from 'react';
    
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [latitudeState, setLatitude] = useState(37.425);
    const [longitudeState, setLongitude] = useState(-122.085);

    const [visibleSearchList, setVisibleSearchList] = useState(false);

    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "1b276ccfa98080a05a669e7b807851a75a2a0585";

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: searchValue})
    };

    async function getResponse(){
        let response = await fetch(url, options);
        let content = await response.json();
        setSearchData(content.suggestions);
    }

    const searchInputHandler = (enteredtext) =>{
        setSearchValue(enteredtext);
    };

    useEffect(() => {
        if (searchValue.length > 0){
            getResponse();
        } else {
            setSearchData([]);
        }
    }, [searchValue])

    const InputSearching = props => {
        return(
            <View style={styles.searchInput}>
                <TextInput 
                    style={styles.input}
                    placeholder={"Введите адрес"}
                    onChangeText={searchInputHandler}
                    value={searchValue}
                    onPressIn={()=>{
                    setVisibleSearchList(true);
                    }}
                />
                <View>
                {
                    visibleSearchList ? (
                    <FlatList
                    style={styles.searchContainer}
                    data={searchData}
                    keyExtractor={({id}, index) => id}
                    renderItem={({item}) => (
                    <TouchableOpacity style={styles.searchItems} onPress={() => {
                        if(item.data.geo_lat != null && item.data.geo_lon != null){
                        setLatitude(parseFloat(item.data.geo_lat));
                        setLongitude(parseFloat( item.data.geo_lon));
                        setSearchValue(item.value);
                        setVisibleSearchList(false);
                        }       }}>
                        <Text>{item.value}</Text>
                    </TouchableOpacity>
                    )}
                /> ) : (<View></View>)

                }
                
                </View>
            </View>
        )

    }

    export default InputSearching;