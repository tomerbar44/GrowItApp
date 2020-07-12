import * as Location from 'expo-location';

export async function askPermissionFromUser() {
    try {
        let location = {lat:undefined, lon:undefined}
        const { status } = await Location.requestPermissionsAsync()
        // console.log('status = ', status)
        if (status !== 'granted')
            // console.log('not granted')

        location = await Location.getCurrentPositionAsync({})
        // console.log('location = ', location)

    }
    catch (e) {
        // console.log(e.message)
        return location
    }


    return location
}

