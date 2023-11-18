import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import sharedStyles from '../styles/shared';

export default function SettingsScreen() {
	return (
		<View style={sharedStyles.container}>
			<View style={styles.card}>
				<View style={styles.item}>
					<Text style={styles.title}>Langue</Text>
					<Text>Fr</Text>
				</View>
				<View
					style={{
						height: 1,
						backgroundColor: 'coral',
						width: '100%',
						marginVertical: 8
					}}
				></View>
				<View style={styles.item}>
					<Text style={styles.title}>Mode sombre</Text>
					<Text>Fr</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		paddingVertical: 24,
		paddingHorizontal: 16,
		borderRadius: 5
	},
	title: {
		fontSize: 15,
		fontWeight: '900'
	},
	item: {
		flexDirection: 'row'
	}
});
