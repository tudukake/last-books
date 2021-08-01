import { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';

export const ReadIsbn = (props) => {
  const [text, setText] = useState('');

  const findOrCreateCaptureCanvas = () => {
    let captureCanvas = document.getElementById('capture_canvas');
    if (!captureCanvas) {
      captureCanvas = document.createElement('canvas');
      captureCanvas.width = 300;
      captureCanvas.height = 225;
      captureCanvas.id = 'capture_canvas';
    }
    return captureCanvas;
  };

  const findOrCreateVideoTag = () => {
    let video = document.querySelector('video');
    if (!video) {
      video = document.createElement('video');
      video.setAttribute('contrals', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('style', 'display:none');
      document.getElementById('vc').appendChild(video);
    }
    return video;
  };

  const updateVideoCanvas = () => {
    requestAnimationFrame(updateVideoCanvas);

    const video = document.querySelector('video');
    if (!video) return;

    const videoCanvas = document.getElementById('video_canvas');
    if (!videoCanvas) return;

    const context = videoCanvas.getContext('2d');
    context.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
    context.strokeRect(20, 40, 250, 40);
  };

  const startCamera = async () => {
    const constraints = {
      audio: false,
      video: {
        width: 300,
        height: 225,
        facingMode: 'environment',
      },
    };

    const captureCanvas = document.getElementById('capture_canvas');
    if (captureCanvas) {
      captureCanvas.remove();
    }

    const video = findOrCreateVideoTag();

    const videoCanvas = document.createElement('canvas');
    videoCanvas.width = 300;
    videoCanvas.height = 225;
    videoCanvas.id = 'video_canvas';
    document.getElementById('vc').appendChild(videoCanvas);

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
    } catch (err) {
      console.log(err);
    }
  };

  const captureCamera = async (worker) => {
    const video = document.querySelector('video');
    if (!video) return;

    const videoCanvas = document.getElementById('video_canvas');
    if (!videoCanvas) return;

    const captureCanvas = findOrCreateCaptureCanvas();
    const context = captureCanvas.getContext('2d');
    context.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
    const url = captureCanvas.toDataURL('image/png');

    // canvasから文字認識
    const {
      data: { text },
    } = await worker.recognize(url);

    const regex = /[0-9]{13}/;
    const result = text.match(regex);

    if (result) {
      setText(text);
      videoCanvas.remove();
      props.setIsCamera(false);
    }
  };

  const initWorker = async () => {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789',
    });
    setInterval(() => {
      captureCamera(worker);
    }, 2000);
  };

  useEffect(() => {
    if (props.isCamera) {
      requestAnimationFrame(updateVideoCanvas);
      initWorker();
      startCamera();
    } else {
      const videoCanvas = document.getElementById('video_canvas');
      if (videoCanvas) {
        videoCanvas.remove();
      }
    }
  }, [props.isCamera]);

  return (
    <div id='vc' style={{ textAlign: 'center' }}>
      <pre>
        <h1>{text}</h1>
      </pre>
    </div>
  );
};
