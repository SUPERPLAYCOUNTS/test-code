document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const previewVideo = document.getElementById('preview');
    const resolutionSelect = document.getElementById('resolution');
    const audioOptionsSelect = document.getElementById('audioOptions');
    const statusP = document.getElementById('status');
    const downloadWebmBtn = document.getElementById('downloadWebmBtn');
    const downloadSection = document.getElementById('downloadSection');

    let mediaRecorder;
    let recordedChunks = [];
    let recordingTimeout;
    let stream;

    const resolutions = {
        "240p": { width: 426, height: 240 },
        "360p": { width: 640, height: 360 },
        "480p": { width: 854, height: 480 },
        "720p": { width: 1280, height: 720 },
        "1080p": { width: 1920, height: 1080 },
        "1440p": { width: 2560, height: 1440 },
        "2160p": { width: 3840, height: 2160 },
        "4320p": { width: 7680, height: 4320 }
    };

    function updateUIForRecording(isRecording) {
        startBtn.disabled = isRecording;
        stopBtn.disabled = !isRecording;
        resolutionSelect.disabled = isRecording;
        audioOptionsSelect.disabled = isRecording;
        if (!isRecording) {
            statusP.textContent = "Ready to record.";
        }
    }

    function stopAllTracks() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
    }

    startBtn.addEventListener('click', async () => {
        const selectedResolution = resolutions[resolutionSelect.value];
        const audioChoice = audioOptionsSelect.value;

        const videoConstraints = {
            width: { ideal: selectedResolution.width, max: selectedResolution.width },
            height: { ideal: selectedResolution.height, max: selectedResolution.height },
            frameRate: { ideal: 30, max: 60 }
        };

        let audioStream = null;
        let displayStream = null;

        try {
            statusP.textContent = "Requesting permissions...";
            previewVideo.style.display = 'none';
            downloadSection.style.display = 'none';
            recordedChunks = [];

            displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: videoConstraints,
                audio: (audioChoice === 'system' || audioChoice === 'both')
            });

            if (audioChoice === 'mic' || audioChoice === 'both') {
                const micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                audioStream = micStream;
            }

            const tracks = [...displayStream.getVideoTracks()];
            if (audioStream) {
                audioStream.getAudioTracks().forEach(track => tracks.push(track));
            }
            if (audioChoice === 'system' || (audioChoice === 'both' && displayStream.getAudioTracks().length > 0)) {
                if (!audioStream || audioChoice === 'system') {
                    displayStream.getAudioTracks().forEach(track => tracks.push(track));
                } else if (audioChoice === 'both' && audioStream && displayStream.getAudioTracks().length > 0) {
                    const displayAudioTrack = displayStream.getAudioTracks()[0];
                    if (displayAudioTrack && !tracks.find(t => t.id === displayAudioTrack.id)) {
                        tracks.push(displayAudioTrack);
                    }
                }
            }

            stream = new MediaStream(tracks);

            const mimeTypes = [
                'video/webm;codecs=vp9,opus',
                'video/webm;codecs=vp8,opus',
                'video/webm'
            ];
            const supportedMimeType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type));

            if (!supportedMimeType) {
                statusP.textContent = "No supported video format found for recording.";
                console.error("No supported MIME type for MediaRecorder");
                stopAllTracks();
                return;
            }

            mediaRecorder = new MediaRecorder(stream, { mimeType: supportedMimeType });

            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: supportedMimeType.split(';')[0] });
                const url = URL.createObjectURL(blob);
                previewVideo.src = url;
                previewVideo.style.display = 'block';
                statusP.textContent = "Recording stopped. Preview available.";
                downloadSection.style.display = 'block';

                downloadWebmBtn.onclick = () => {
                    const a = document.createElement('a');
                    a.href = url;
                    const timestamp = new Date().toISOString().replace(/:|\.|T|Z/g, '-').slice(0, -1);
                    a.download = `recording-${timestamp}.webm`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                };
                updateUIForRecording(false);
                stopAllTracks();
            };

            stream.getVideoTracks()[0].onended = () => {
                if (mediaRecorder && mediaRecorder.state === "recording") {
                    stopBtn.click();
                }
            };

            mediaRecorder.start();
            statusP.textContent = "Recording in progress... (Max 30 minutes)";
            updateUIForRecording(true);

            recordingTimeout = setTimeout(() => {
                if (mediaRecorder && mediaRecorder.state === "recording") {
                    statusP.textContent = "Recording automatically stopped after 30 minutes.";
                    stopBtn.click();
                }
            }, 30 * 60 * 1000);

        } catch (error) {
            console.error('Error starting screen recording:', error);
            if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                statusP.textContent = "Error: Permission to access screen or microphone was denied. Please grant permissions and try again.";
            } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
                statusP.textContent = "Error: No compatible screen or audio input devices found.";
            }
            else {
                statusP.textContent = "Failed to start recording. See console for details.";
            }
            updateUIForRecording(false);
            stopAllTracks();
        }
    });

    stopBtn.addEventListener('click', () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
        }
        clearTimeout(recordingTimeout);
    });

    updateUIForRecording(false);
    previewVideo.style.display = 'none';
    downloadSection.style.display = 'none';
});