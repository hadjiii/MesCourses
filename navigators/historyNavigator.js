import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from '../screens/history';
import HistoryDetailsScreenn from '../screens/historyDetails';

const Stack = createNativeStackNavigator();

export default function HistoryNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Historique" component={HistoryScreen} />
			<Stack.Screen
				name="Détails historique"
				component={HistoryDetailsScreenn}
			/>
		</Stack.Navigator>
	);
}
