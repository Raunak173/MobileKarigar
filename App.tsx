import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Home from './pages/Home';
import {LayoutDataProvider, useLayoutData} from './LayoutContext';
import ViewShot from 'react-native-view-shot';
import axios from 'axios';
import RNFS from 'react-native-fs';
import base64 from 'react-native-base64';

const App = () => {
  return (
    <LayoutDataProvider>
      <AppContent />
    </LayoutDataProvider>
  );
};

const AppContent = () => {
  const {layoutData} = useLayoutData();
  const viewShotRef = useRef();

  const base64toBlob = base64Data => {
    const sliceSize = 512;
    const byteCharacters = base64.decode(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: 'image/jpeg'});
  };

  const captureLayout = async () => {
    try {
      // Capture the screenshot
      const screenshotUri = await viewShotRef.current.capture();

      console.log('layout', layoutData);
      console.log('uri', screenshotUri);

      // Convert local file URI to a base64 string and then to a Blob
      const base64Data = await RNFS.readFile(screenshotUri, 'base64');
      const blob = base64toBlob(base64Data);

      // Prepare form data
      const formData = new FormData();
      formData.append('screenshot', blob);
      formData.append('socketId', 'bLaOU3OO5CxA+2BkmmXMgQ==');
      formData.append('name', 'Raunak');
      formData.append('pageId', '1');
      formData.append('appVersion', '1.0.0');
      formData.append('tag', '1');
      formData.append('components', JSON.stringify(layoutData));

      // Send POST request
      const response = await axios.post(
        'https://stag-pointsystem.nudgenow.com/api/v1/pages/pg/upload/screenshot',
        formData,
        {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ3YWRlMDU2ZGRlYmY1MWY5NjY1NGEiLCJjbGllbnRJZCI6IjY0ZDdhZGUwNTZkZGViZjUxZjk2NjU0YSIsInJvbGUiOiJvd25lciIsImlhdCI6MTcwMTY4OTY4MywiZXhwIjoxNzA0MjgxNjgzfQ.Fu2JdSR1yUICzV_pyr03fQa_8W5_OzDXtEmQLfxCwA8',
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error in captureLayout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
        <Home />
        <TouchableOpacity style={styles.captureButton} onPress={captureLayout}>
          <Text style={{color: 'white'}}>Capture Layout</Text>
        </TouchableOpacity>
      </ViewShot>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    right: 20,
  },
});
