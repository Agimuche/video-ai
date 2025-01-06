const API_KEY = 'YOUR_PICTORY_API_KEY'; // Replace with your actual Pictory API key

document.getElementById('generate-btn').addEventListener('click', function() {
    const textInput = document.getElementById('text-input').value;
    const loading = document.getElementById('loading');
    const outputVideo = document.getElementById('output-video');

    // Show loading spinner
    loading.style.display = 'block';

    // Make API call to Pictory
    fetch('https://api.pictory.ai/v1/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ text: textInput })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Hide loading spinner
        loading.style.display = 'none';

        if (data.videoUrl) {
            outputVideo.src = data.videoUrl; // Set the video source to the generated video URL
            outputVideo.load();
            outputVideo.play();
        } else {
            console.error('Video generation failed:', data);
            alert('Failed to generate video. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        loading.style.display = 'none';
        alert('An error occurred while generating the video. Please try again.');
    });
});
