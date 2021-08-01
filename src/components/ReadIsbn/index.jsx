import { useEffect, useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';

export const ReadIsbn = () => {
  // const [stream, setStream] = useState(null);
  // const [worker, setWorker] = useState(null);
  // const videoRef = useRef(null);
  const [text, setText] = useState('');

  const findOrCreateCaptureCanvas = () => {
    let captureCanvas = document.getElementById('capture_canvas');
    if (!captureCanvas) {
      captureCanvas = document.createElement('canvas');
      captureCanvas.width = 300;
      captureCanvas.height = 150;
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
    context.strokeRect(110, 55, 180, 90);
  };

  const startCamera = async () => {
    const constraints = {
      audio: false,
      video: {
        width: 300,
        height: 150,
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
    videoCanvas.height = 150;
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
    const c = context.drawImage(
      video,
      0,
      0,
      captureCanvas.width,
      captureCanvas.height
    );
    const url = captureCanvas.toDataURL('image/png');
    console.log(url);

    // canvasから文字認識
    const {
      data: { text },
    } = await worker.recognize(url);
    console.log(text);
    const regex = /[0-9]{13}/;
    const result = text.match(regex);
    console.log(result);
    if (result) {
      setText(text);
      video_canvas.remove();
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
    // setWorker(worker);
    setInterval(() => {
      captureCamera(worker);
    }, 8000);
  };

  /*
  const initStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { width: 500, height: 300 },
    });
    setStream(stream);
  };

  const onRecognizeText = () => {
    const timerId = setInterval(async () => {
      if (videoRef.current === null || !worker) return;

      const c = document.createElement('canvas');
      c.width = 500;
      c.height = 300;
      c.getContext('2d')?.drawImage(videoRef.current, 0, 0, 500, 300);

      // canvasから文字認識
      const {
        data: { text },
      } = await worker.recognize(c);
      setText(text);
    }, 2000);

    return () => clearInterval(timerId);
  };

  // useEffect(() => {
  //   if (!worker) initWorker();
  //   if (!stream) initStream();

  //   if (worker && stream && videoRef.current !== null) {
  //     videoRef.current.srcObject = stream;
  //     const clear = onRecognizeText();
  //     return clear;
  //   }
  // }, [worker, stream]);
*/

  useEffect(() => {
    requestAnimationFrame(updateVideoCanvas);
    initWorker();
  }, []);

  return (
    <div id='vc'>
      {/* <video ref={videoRef} autoPlay /> */}
      <input type='button' value='camera' onClick={startCamera} />
      <pre>
        <h1>{text}</h1>
      </pre>
    </div>
  );
};
