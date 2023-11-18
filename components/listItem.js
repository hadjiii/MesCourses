import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';

export default function ListItem({
	item,
	category,
	mode = 'show',
	deleteHandler
}) {
	const [isChecked, setChecked] = useState(false);

	return (
		<View style={styles.item}>
			<Text style={styles.itemTitle}>{item}</Text>
			{mode !== 'show' &&
				(mode === 'delete' ? (
					<TouchableOpacity
						onPress={() => deleteHandler({ article: item, category })}
					>
						<Ionicons name="trash" size={20} color="black" />
					</TouchableOpacity>
				) : (
					<Checkbox
						value={isChecked}
						onValueChange={setChecked}
						style={{ borderColor: 'coral' }}
					/>
				))}
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 4,
		padding: 8
	},
	itemTitle: {
		fontSize: 16
	}
});
