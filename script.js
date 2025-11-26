// Search Lyrics
async function searchLyrics() {
  const q = document.getElementById("query").value.trim();
  if(!q) return alert("Enter song name!");

  const res = await fetch(`/api/lirik?q=${encodeURIComponent(q)}`);
  const data = await res.json();

  document.getElementById("songImg").src = data.data?.image || '';
  document.getElementById("songTitle").innerText = data.data?.title || 'Not Found';
  document.getElementById("songArtist").innerText = 'Artist: ' + (data.data?.artis || 'Unknown');
  document.getElementById("songRelease").innerText = 'Release: ' + (data.data?.rilis || 'Unknown');
  document.getElementById("songLyrics").innerText = data.data?.lirik || 'Lyrics Not Found!';

  document.getElementById("resultBox").classList.remove("hidden");
  document.getElementById("downloadBtn").style.display = "inline-block";
}

// Download TXT
function downloadLyrics(){
  const text = document.getElementById("songLyrics").innerText;
  const blob = new Blob([text], { type:"text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = document.getElementById("songTitle").innerText + ".txt";
  a.click();
}

// Popup Ad
setTimeout(()=>{ document.getElementById("adPopup").style.display="flex"; },1500);
function closePopup(){ document.getElementById("adPopup").style.display="none"; }
