import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './src/router/rootNavigator'
import { Provider } from 'react-redux'
import * as eva from "@eva-design/eva"
import { ApplicationProvider } from '@ui-kitten/components'
import store from "./src/store"
const App = () => {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  )
}

export default App