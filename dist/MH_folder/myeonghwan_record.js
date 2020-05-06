var audio = document.querySelector('audio'); 
function captureMicrophone(callback) { 
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia; 
    navigator.getUserMedia({audio: true}, callback, function (error) { 
        alert('Unable to access your microphone.'); 
         console.error(error); 
    }); 
} 


function stopRecordingCallback() { 
    var blob = recorder.getBlob(); 
    audio.src = URL.createObjectURL(blob); 
    audio.play(); 
    recorder.microphone.stop(); 
    createAudioElement(window.URL.createObjectURL(blob)); 
} 


var recorder; // globally accessible 
document.getElementById('btn-start-recording').onclick = function () { 
    this.disabled = true; 
    captureMicrophone(function (microphone) { 
        audio.src = URL.createObjectURL(microphone); 
        audio.play(); 
        recorder = RecordRTC(microphone, { 
            type: 'audio', 
            recorderType: StereoAudioRecorder, 
            numberOfAudioChannels: 1, // or leftChannel:true 
            desiredSampRate: 16000 
        }); 
        recorder.startRecording(); 
        // release microphone on stopRecording
        recorder.microphone = microphone; 
        document.getElementById('btn-stop-recording').disabled = false; 
        }); 
    }; 
    document.getElementById('btn-stop-recording').onclick = function () { 
    this.disabled = true; 
    recorder.stopRecording(stopRecordingCallback); 
    document.getElementById('btn-start-recording').disabled = false; 
}; 




function createAudioElement(blobUrl) { 
    const downloadEl = document.createElement('a'); 
    downloadEl.style = 'display: block'; 
    downloadEl.innerHTML = 'download'; 
    downloadEl.download = 'audio.wav'; 
    downloadEl.href = blobUrl; 
    const audioEl = document.createElement('audio'); 
    audioEl.controls = true; 
    const sourceEl = document.createElement('source'); 
    sourceEl.src = blobUrl; 
    sourceEl.type = 'audio/wav'; 
    audioEl.appendChild(sourceEl); 
    document.body.appendChild(audioEl); 
    document.body.appendChild(downloadEl); 
}
