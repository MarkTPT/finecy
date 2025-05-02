import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { storage } from '@/lib/storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import Loader from '@/components/Loader';
import { Toast } from 'toastify-react-native';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import Button from '@/components/Button';
import FA6 from '@expo/vector-icons/FontAwesome6';
import IonIcons from '@expo/vector-icons/Ionicons';
import type InvoiceInfoExtractorPayload from '@/types/InvoiceInfoExtractorPayload';

export default function ScanInvoicePage() {
  const insets = useSafeAreaInsets();

  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();

  const [torchEnabled, setTorchEnabled] = useState(false);

  const [handlingPicture, setHandlingPicture] = useState(false);
  const [statusText, setStatusText] = useState('');

  // Camera permissions are still loading.
  if (!permission) {
    return <View />;
  }

  // Camera permissions are not granted yet..
  if (!permission.granted) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>

        <Button onPress={requestPermission} text="Grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (handlingPicture) {
      return;
    }
    setHandlingPicture(true);

    setStatusText('Saving image');
    console.log(`[InvoiceDetector] Saving image`);

    const photo = await cameraRef.current?.takePictureAsync({
      shutterSound: false,
    });

    if (!photo) {
      Toast.show({
        type: 'error',

        text1: 'Something went wrong',
        text2: 'No photo taken, please try again',
      });

      console.log('[InvoiceDetector] No photo taken');

      setHandlingPicture(false);

      return;
    }

    setStatusText('Resizing image');
    console.log(`[InvoiceDetector] Resizing image`);

    const imgRef = await ImageManipulator.manipulate(photo.uri)
      .resize({
        width: 1024,
      })
      .renderAsync()
      .then((imgRef) => {
        setStatusText('Saving resized image');
        console.log(`[InvoiceDetector] Saving resized image`);

        return imgRef.saveAsync({
          compress: 0.8,
          format: SaveFormat.WEBP,
          base64: true,
        });
      });

    setStatusText('Sending image to server');
    console.log(`[InvoiceDetector] Sending image to server`);

    const { error, data } =
      await supabase.functions.invoke<InvoiceInfoExtractorPayload>(
        'invoice-info-extractor',
        { body: imgRef.base64 },
      );

    setStatusText('Handling server response');
    console.log(`[InvoiceDetector] Handling server response`);

    if (error) {
      const message =
        error instanceof FunctionsHttpError
          ? await error.context.json()
          : error.message;

      console.log(`[InvoiceDetector] Error: ${message}`);

      Toast.show({
        type: 'error',

        text1: 'Something went wrong',
        text2: 'There was an server error, please try again',
      });
    }

    if (!data) {
      console.log('[InvoiceDetector] No data returned from function');

      Toast.show({
        type: 'error',

        text1: 'Something went wrong',
        text2: 'Invoice was not detected, please try again',
      });

      setHandlingPicture(false);

      return;
    }

    console.log('[InvoiceDetector] Invoice data:', data.invoiceData);
    console.log('[InvoiceDetector] Storage data:', data.storageData);

    setStatusText('Invoice detected');
    console.log(`[InvoiceDetector] Invoice detected`);

    Toast.show({
      type: 'success',

      text1: 'Invoice detected',
    });

    setHandlingPicture(false);

    storage.set('detectedInvoicePayload', data);

    router.push('/invoices/add');
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#1B2128' }}>
          <CameraView
            style={{ flex: 1 }}
            ref={cameraRef}
            autofocus="on"
            enableTorch={torchEnabled}
            responsiveOrientationWhenOrientationLocked
          />

          <Pressable
            style={[
              styles.torchBtn,
              torchEnabled && {
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: '#0D6EFD',
              },
            ]}
            onPress={() => setTorchEnabled((prev) => !prev)}
          >
            <IonIcons
              name="flashlight"
              size={24}
              color={torchEnabled ? '#0D6EFD' : 'white'}
            />
          </Pressable>

          <Pressable
            style={styles.captureBtn}
            onPress={takePicture}
            disabled={handlingPicture}
          >
            <FA6 name="camera" size={24} color="white" />
          </Pressable>

          {handlingPicture && <Loader text={statusText} />}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    paddingHorizontal: 20,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },

  captureBtn: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: '-50%' }],

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#0D6EFD',

    width: 75,
    aspectRatio: 1,

    borderRadius: '30%',
  },
  torchBtn: {
    position: 'absolute',
    bottom: 58.5,
    left: 30,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#0D6EFD',

    width: 60,
    aspectRatio: 1,

    borderRadius: '30%',
  },
});
