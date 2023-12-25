importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.9.0/dist/tf.min.js');

const modelUrl = './models/model.json';

// Trong service_worker.js
async function loadModel() {
    try {
      const model = await tf.loadLayersModel(modelUrl);
      console.log('Model loaded:', model);
      // Gửi model đến content script thông qua tin nhắn
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ action: 'MODEL_LOADED', model });
        });
      });
    } catch (err) {
      console.error('Error loading the model:', err);
    }
  }
  