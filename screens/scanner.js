import React, { useState, useEffect } from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import sharedStyles from '../styles/shared';
import { getProduct } from '../api/openFoodFacts';

export default function ScannerScreen() {
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [barCodeResult, setBarcodeResult] = useState(null);
	const [foundProduct, setFoundProduct] = useState(null);

	useEffect(() => {
		if (barCodeResult) {
			getProduct(barCodeResult.data).then(product => setFoundProduct(product));
		}
	}, [barCodeResult]);

	if (permission && permission.granted) {
		return (
			<View style={sharedStyles.container}>
				<Camera
					type={CameraType.back}
					style={styles.camera}
					barCodeScannerSettings={{
						barCodeTypes: [
							BarCodeScanner.Constants.BarCodeType.ean8,
							BarCodeScanner.Constants.BarCodeType.ean13
						]
					}}
					onBarCodeScanned={result => setBarcodeResult(result)}
				></Camera>

				{foundProduct ? (
					<View style={styles.result}>
						<Text style={styles.label}>
							Nom du produit:{' ' + foundProduct.product.product_name}
						</Text>
						<Text style={styles.label}>
							Nutriscore:
							{new String(
								' ' + foundProduct.product.nutrition_grades
							).toUpperCase()}
						</Text>
						<Image
							style={styles.image}
							source={{ uri: foundProduct.product.image_front_small_url }}
						/>
					</View>
				) : null}
			</View>
		);
	} else {
		return (
			<View style={sharedStyles.container}>
				<Button title="Activer la caméra" onPress={requestPermission} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	camera: {
		width: '100%',
		height: 200,
		alignSelf: 'center'
	},
	result: {
		flex: 1,
		marginTop: 32
	},
	label: {
		fontSize: 20
	},
	image: {
		alignSelf: 'center',
		marginTop: 16,
		width: 200,
		height: 200,
		resizeMode: 'contain',
		borderRadius: 5
	}
});
