// Search Lyrics
async function searchLyrics() {
    const q = document.getElementById("query").value.trim();
    if (!q) return alert("Enter song name!");

    try {
        const res = await fetch(`/api/lirik?q=${encodeURIComponent(q)}`);
        const data = await res.json();

        // Handle null/undefined safely
        const songData = data.data || {};
        document.getElementById("songImg").src = songData.image || 'https://telegra.ph/file/e7a4414620ce6da03bb02.jpg';
        document.getElementById("songTitle").innerText = songData.title || 'Not Found';
        document.getElementById("songArtist").innerText = 'Artist: ' + (songData.artis || 'Unknown');
        document.getElementById("songRelease").innerText = 'Release: ' + (songData.rilis || 'Unknown');
        document.getElementById("songLyrics").innerText = songData.lirik || 'Lyrics Not Found!';

        document.getElementById("resultBox").classList.remove("hidden");
        document.getElementById("downloadBtn").style.display = "inline-block";

    } catch (err) {
        console.error(err);
        alert("Error fetching lyrics. Try again!");
    }
}

// Download TXT
function downloadLyrics() {
    const text = document.getElementById("songLyrics").innerText;
    if (!text) return alert("No lyrics to download!");

    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = document.getElementById("songTitle").innerText + ".txt";
    a.click();
}

// Popup Ad
setTimeout(() => {
    const ad = document.getElementById("adPopup");
    if(ad) ad.style.display = "flex";
}, 1500);

function closePopup() {
    const ad = document.getElementById("adPopup");
    if(ad) ad.style.display = "none";
}
