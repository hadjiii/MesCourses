import React from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

const DATA = [
	{ date: '21/12/2023', total: 108 },
	{ date: '20/11/2023', total: 76 },
	{ date: '01/10/2023', total: 208 },
	{ date: '10/09/2023', total: 84 }
];

export default function HistoryScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<FlatList
				data={DATA}
				keyExtractor={item => item.date}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => navigation.push('Détails historique')}
					>
						<View style={styles.item}>
							<Text style={styles.itemTitle}>Date: {item.date}</Text>
							<Text style={styles.itemTitle}>Total: {item.total} euros</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { padding: 16 },
	item: {
		fontSize: 20,
		padding: 8,
		marginBottom: 8,
		backgroundColor: 'white',
		borderColor: 'coral',
		borderWidth: 1,
		borderRadius: 5
	},
	itemTitle: {
		fontSize: 16
	}
});
