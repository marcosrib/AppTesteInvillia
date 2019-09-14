import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Map from '../screens/map/Map'

const MainNavigator = createStackNavigator({
    Map: { screen: Map },
},
    {
        initialRouteName: 'Map',
        defaultNavigationOptions: {
            header: null
        },
    }

);

const Routes = createAppContainer(MainNavigator);

export default Routes;