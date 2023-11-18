import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyListScreen from './screens/myList';
import ManageListScreen from './screens/manageList';
import SettingsScreen from './screens/settings';
import ScannerScreen from './screens/scanner';
import HistoryScreenNavigator from './navigators/historyNavigator';

const Tab = createBottomTabNavigator();

export default function App() {
	const [list, setList] = useState([
		{ category: 'Fruits', data: ['Oranges', 'Bananes', 'Pommes'] },
		{ category: 'Légumes', data: ['Carottes', 'Tomates', 'Avocats'] },
		{
			category: 'Protéines',
			data: ['Poisson', 'Viandes', 'Boites de sardines']
		},
		{ category: 'Fruits', data: ['Oranges', 'Bananes', 'Pommes'] },
		{ category: 'Légumes', data: ['Carottes', 'Tomates', 'Avocats'] },
		{
			category: 'Protéines',
			data: ['Poisson', 'Viandes', 'Boites de sardines']
		}
	]);

	const createHandler = newItem => {
		setList(currentList => {
			const index = currentList.findIndex(
				item => item.category === newItem.category
			);

			if (index === -1) {
				return [
					...currentList,
					{ category: newItem.category, data: newItem.articles.split(',') }
				];
			} else {
				const updatedItem = {
					...currentList[index]
				};
				updatedItem.data.push(...newItem.articles.split(','));

				const items = [...currentList];
				items[index] = updatedItem;

				return items;
			}
		});
	};

	const deleteHandler = ({ category, article }) => {
		setList(currentList => {
			const newList = [...currentList];
			const index = currentList.findIndex(cat => cat.category === category);
			newList[index].data = newList[index].data.filter(art => art !== article);

			if (newList[index].data.length === 0) {
				newList.splice(index, 1);
			}

			return newList;
		});
	};

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Ma liste') {
							iconName = focused ? 'list' : 'list-outline';
						} else if (route.name === 'Gérer') {
							iconName = focused ? 'create' : 'create-outline';
						} else if (route.name === 'Historique') {
							iconName = focused ? 'cart' : 'cart-outline';
						} else if (route.name === 'Scanner') {
							iconName = focused ? 'qr-code' : 'qr-code-outline';
						} else if (route.name === 'Réglages') {
							iconName = focused ? 'cog' : 'cog-outline';
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: 'tomato',
					tabBarInactiveTintColor: 'gray'
				})}
			>
				<Tab.Screen name="Ma liste">
					{props => <MyListScreen {...props} items={list} />}
				</Tab.Screen>
				<Tab.Screen name="Gérer">
					{props => (
						<ManageListScreen
							{...props}
							createHandler={createHandler}
							deleteHandler={deleteHandler}
							items={list}
						/>
					)}
				</Tab.Screen>
				<Tab.Screen
					name="Historique"
					component={HistoryScreenNavigator}
					options={{ headerShown: false }}
				/>
				<Tab.Screen name="Scanner" component={ScannerScreen} />
				<Tab.Screen name="Réglages" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
