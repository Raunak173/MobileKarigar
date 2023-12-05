const {remote} = require('webdriverio');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const appiumConfig = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: 'Android', // or 'iOS'
    deviceName: 'Pixel_7_Pro_API_33', // replace with your device's name
    app: '../android/app/build/outputs/apk/debug/app-debug.apk',
    automationName: 'UiAutomator2',
  },
};

async function captureLayout() {
  const driver = await remote(appiumConfig);

  try {
    const uiHierarchy = await driver.getPageSource();
    const screenshot = await driver.takeScreenshot();

    await sendDataToApi({uiHierarchy, screenshot});
  } catch (error) {
    console.error('Error in capturing layout:', error);
    throw error;
  } finally {
    await driver.deleteSession();
  }
}

async function sendDataToApi(data) {
  const formData = new FormData();
  const screenshotBuffer = Buffer.from(data.screenshot, 'base64');
  formData.append('screenshot', screenshotBuffer, 'screenshot.png');

  // Add other form fields
  formData.append('socketId', 'bLaOU3OO5CxA+2BkmmXMgQ==');
  formData.append('name', 'Snehil');
  formData.append('pageId', '1');
  formData.append('appVersion', '1.0.0');
  formData.append('tag', '1');
  formData.append('components', JSON.stringify([]));

  try {
    const response = await axios.post(
      'https://stag-pointsystem.nudgenow.com/api/v1/pages/pg/upload/screenshot',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ3YWRlMDU2ZGRlYmY1MWY5NjY1NGEiLCJjbGllbnRJZCI6IjY0ZDdhZGUwNTZkZGViZjUxZjk2NjU0YSIsInJvbGUiOiJvd25lciIsImlhdCI6MTcwMTY4OTY4MywiZXhwIjoxNzA0MjgxNjgzfQ.Fu2JdSR1yUICzV_pyr03fQa_8W5_OzDXtEmQLfxCwA8',
        },
      },
    );
    console.log('Data sent to API:', response.status);
  } catch (error) {
    console.error('Error sending data to API:', error);
    throw error;
  }
}

module.exports = {captureLayout};
