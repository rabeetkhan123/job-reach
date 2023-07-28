import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from './components/Home';
import Favourites from './components/Favourites';
import JobDescription from './components/JobDescription';

export default function App() {

  let Stack = createNativeStackNavigator()

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerTitleAlign: 'left',
          headerTitle: 'JobReach'
        }}>
          <Stack.Screen options={{ headerShadowVisible: false, headerRight: () => <Favourites /> }} name='screen1' component={Home} />
          <Stack.Screen options={{ headerShadowVisible: false, headerRight: () => <Favourites /> }} name='screen2' component={JobDescription} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
