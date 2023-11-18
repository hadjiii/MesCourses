import React, { useState } from 'react';
import {
	View,
	Text,
	SectionList,
	StyleSheet,
	Button,
	Pressable,
	TextInput,
	Modal
} from 'react-native';
import ListItem from '../components/listItem';

export default function MyListScreen({ navigation, items }) {
	const [started, setStarted] = useState(false);
	const [modalOpened, setModalOpened] = useState(false);

	const finishHandler = () => {
		setModalOpened(true);
	};

	return items.length === 0 ? (
		<View style={{ ...styles.container, ...styles.emptyContainer }}>
			<Text style={{ marginBottom: 8, fontSize: 15, textAlign: 'center' }}>
				Vous n'avez pas encore créé votre liste de courses
			</Text>
			<Button
				color="coral"
				title="Gérer ma liste"
				onPress={() => navigation.navigate('Gérer')}
			/>
		</View>
	) : (
		<View style={{ flex: 1, padding: 16 }}>
			<Modal
				animationType="slide"
				transparent={true}
				style={{ backgroundColor: 'red' }}
				visible={modalOpened}
			>
				<View
					style={{
						padding: 16,
						marginTop: 32
					}}
				>
					<View style={styles.modalView}>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 20,
								fontWeight: 'bold',
								marginBottom: 32
							}}
						>
							Modal opened
						</Text>
						<Text style={{ marginBottom: 8 }}>Montant total des courses</Text>
						<TextInput
							placeholder="Ex: 150 euros"
							style={{
								backgroundColor: 'white',
								padding: 8,
								borderColor: 'black',
								borderRadius: 5,
								borderWidth: 1
							}}
						/>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginTop: 16,
								paddingHorizontal: 16
							}}
						>
							<Button
								title="Annuler"
								color="coral"
								onPress={() => setModalOpened(false)}
							/>
							<Button title="Enregistrer" color="blue" />
						</View>
					</View>
				</View>
			</Modal>

			<View style={{ flex: 1 }}>
				<SectionList
					showsVerticalScrollIndicator={false}
					sections={items}
					keyExtractor={(item, index) => item + index}
					renderSectionHeader={({ section: { category } }) => (
						<Text style={styles.sectionHeader}>{category}</Text>
					)}
					renderItem={({ item }) => (
						<ListItem item={item} mode={started ? 'start' : 'show'} />
					)}
				/>
			</View>
			<View style={styles.createBtn}>
				{started ? (
					<Button title="Terminer" color="coral" onPress={finishHandler} />
				) : (
					<Pressable
						style={{
							backgroundColor: 'coral',
							paddingHorizontal: 8,
							paddingVertical: 4,
							borderRadius: 5
						}}
						onPress={() => setStarted(true)}
					>
						<Text style={{ textAlign: 'center', fontSize: 16 }}>Créer</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	emptyContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container: { padding: 16 },
	sectionHeader: {
		fontSize: 20,
		padding: 8,
		marginBottom: 8,
		backgroundColor: 'coral',
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 5
	},
	createBtn: {
		position: 'absolute',
		right: 16,
		bottom: 16
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	}
});
