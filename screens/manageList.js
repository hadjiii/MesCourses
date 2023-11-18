import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	TextInput,
	SectionList,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';

import MyListScreen from './myList';
import ListItem from '../components/listItem';

export default function ManageListScreen({
	items,
	createHandler,
	deleteHandler
}) {
	const [form, setForm] = useState({
		category: { focus: false, valid: false, error: false, value: 'Hello' },
		articles: { focus: false, valid: false, error: false, value: '' }
	});

	const [category, setCategory] = useState('');
	const [articles, setArticles] = useState('');

	return (
		// <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.container}>
			<View style={styles.formcontainer}>
				<Text style={styles.label}>Catégorie de l'article</Text>
				<TextInput
					style={styles.input}
					value={category}
					placeholder="Ex: Epices"
					onChangeText={text => setCategory(text)}
				/>
				<Text style={styles.label}>Nom de l'article</Text>
				<TextInput
					style={styles.input}
					value={articles}
					placeholder="Ex: Poivre, Thym"
					onChangeText={text => setArticles(text)}
				/>
				<View style={styles.btnContainer}>
					<Button
						title="Enregistrer"
						color="coral"
						onPress={() => {
							Keyboard.dismiss();
							createHandler({ category, articles });
						}}
					/>
				</View>
			</View>

			<View style={{ flex: 1 }}>
				<SectionList
					showsVerticalScrollIndicator={false}
					sections={items}
					keyExtractor={(item, index) => item + index}
					renderSectionHeader={({ section: { category } }) => (
						<Text style={styles.sectionHeader}>{category}</Text>
					)}
					renderItem={({ item, section: { category } }) => (
						<ListItem
							item={item}
							category={category}
							mode="delete"
							deleteHandler={deleteHandler}
						/>
					)}
				/>
			</View>
		</View>
		// </TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	formcontainer: {
		marginBottom: 32,
		padding: 8,
		borderRadius: 5,
		borderColor: 'coral',
		borderWidth: 2
	},
	label: {
		marginBottom: 8
	},
	input: {
		backgroundColor: 'white',
		padding: 8,
		marginBottom: 8,
		borderRadius: 5,
		borderWidth: 1
	},
	inputFocus: {
		borderWidth: 2
	},
	inputError: {
		borderColor: 'red',
		borderWidth: 2
	},
	btnContainer: {
		marginTop: 8
	},
	sectionHeader: {
		fontSize: 20,
		padding: 8,
		marginBottom: 8,
		backgroundColor: 'coral',
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 5
	}
});
