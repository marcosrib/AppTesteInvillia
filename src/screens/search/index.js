import React, { useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { CHAVEGOOGLE } from '../../util/chaveGoogle'

const Search = props => {

    const [isFocused, setIsFocused] = useState(false)

    return (<GooglePlacesAutocomplete
        placeholder='Buscar lugares'
        placeholderTextXolor='#333'
        onPress={(data, details) => props.localSelecionado(data, details)}
        query={{
            key: CHAVEGOOGLE,
            language: 'pt'
        }}
        textInputProps={{
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            autoCapitalize: 'none',
            autoCorrect: false
        }}
        listViewDisplayed={isFocused}
        fetchDetails
        enablePoweredByContainer={false}
        styles={{
            container: {
                position: 'absolute',
                top: 60,
                width: '100%'
            },
            textInputContainer: {
                flex: 1,
                backgroundColor: 'transparent',
                height: 54,
                marginHorizontal: 20,
                borderTopWidth: 0,
                borderBottomWidth: 0
            },
            textInput: {
                height: 54,
                margin: 0,
                borderRadius: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                elevation: 5
            },
            listView: {
                borderWidth: 1,
                borderColor: '#ddd',
                backgroundColor: '#fff',
                marginHorizontal: 20,
                elevation: 5,

            },
        }}
    />)
}
export default Search