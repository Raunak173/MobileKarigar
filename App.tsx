import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Image,
} from 'react-native';
import Home from './pages/Home';
import {LayoutDataProvider, useLayoutData} from './LayoutContext';
import ViewShot from 'react-native-view-shot';
import axios from 'axios';

const App = () => {
  const [isDeepLink, setIsDeepLink] = useState(true);
  useEffect(() => {
    const handleDeepLink = event => {
      setIsDeepLink(true);
      let data = Linking.parse(event.url);
      return (
        <LayoutDataProvider>
          <AppContent isDeepLink={isDeepLink} />
        </LayoutDataProvider>
      );
    };

    Linking.addEventListener(
      'https://nudge-mobile-connect.web.app/?socketId=64d7ade056ddebf51f96654a&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ3YWRlMDU2ZGRlYmY1MWY5NjY1NGEiLCJjbGllbnRJZCI6IjY0ZDdhZGUwNTZkZGViZjUxZjk2NjU0YSIsInJvbGUiOiJvd25lciIsImlhdCI6MTcwMTY1NjIyOSwiZXhwIjoxNzA0MjQ4MjI5fQ.ZOrCH6EYIeom2WdsohWgD1vTm5g0eMINny1aVbUHsMk&prefixKey=nudge-64d7ade056ddebf51f96654a',
      handleDeepLink,
    );

    return () => {
      // Linking.removeEventListener('mobilekarigar://home', handleDeepLink);
    };
  }, []);

  return (
    <LayoutDataProvider>
      <AppContent isDeepLink={isDeepLink} />
    </LayoutDataProvider>
  );
};

const AppContent = ({isDeepLink}) => {
  const {layoutData} = useLayoutData();
  const viewShotRef = useRef();

  let widthX, heightY;
  const getImageSize = uri => {
    Image.getSize(
      uri,
      (width, height) => {
        console.log(`Width: ${width}, Height: ${height}`);
        widthX = width;
        heightY = height;
        // You can also perform other actions with width and height here
      },
      error => {
        console.error(`Could not get image size: ${error}`);
      },
    );
  };

  const captureLayout = async () => {
    try {
      // Capture the screenshot
      const screenshotUri = await viewShotRef.current.capture();

      console.log('layout', layoutData);
      console.log('uri', screenshotUri);

      getImageSize(screenshotUri);

      // Prepare form data
      const formData = new FormData();
      formData.append('screenshot', {
        uri: screenshotUri,
        type: 'image/png',
        name: 'screenshot.png',
      });
      // formData.append('screenshot', fileInput.files[0]);
      formData.append('properties', JSON.stringify({screenSize: `1080x1920`}));
      formData.append('socketId', '64d7ade056ddebf51f96654a');
      formData.append('name', 'Raunak');
      formData.append('pageId', Date.now());
      formData.append('appVersion', '1.0.0');
      formData.append('tag', '1');
      formData.append('components', layoutData);

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
      <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
        <Home />
        {isDeepLink && (
          <TouchableOpacity
            style={styles.captureButton}
            onPress={captureLayout}>
            <Text style={{color: 'white'}}>Capture Layout</Text>
          </TouchableOpacity>
        )}
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
