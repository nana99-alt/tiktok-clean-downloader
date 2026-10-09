const form = document.getElementById('downloadForm');
const urlInput = document.getElementById('urlInput');
const submitBtn = document.getElementById('submitBtn');
const statusMessage = document.getElementById('statusMessage');
const resultCard = document.getElementById('resultCard');

const videoPlayer = document.getElementById('videoPlayer');
const authorAvatar = document.getElementById('authorAvatar');
const authorName = document.getElementById('authorName');
const authorUsername = document.getElementById('authorUsername');
const videoTitle = document.getElementById('videoTitle');
const statLikes = document.getElementById('statLikes');
const statComments = document.getElementById('statComments');
const statShares = document.getElementById('statShares');
const btnDownloadNoWm = document.getElementById('btnDownloadNoWm');
const btnDownloadMusic = document.getElementById('btnDownloadMusic');

function showStatus(text, isError = false) {
  statusMessage.className = `max-w-2xl mx-auto mb-6 p-4 rounded-xl text-sm ${
    isError ? 'bg-rose-950/60 border border-rose-800 text-rose-300' : 'bg-cyan-950/60 border border-cyan-800 text-cyan-300'
  }`;
  statusMessage.textContent = text;
  statusMessage.classList.remove('hidden');
}

function clearStatus() {
  statusMessage.classList.add('hidden');
}

function formatNumber(num) {
  if (!num) return '0';
  return new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(num);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const rawUrl = urlInput.value.trim();
  if (!rawUrl) return;

  clearStatus();
  resultCard.classList.add('hidden');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Memproses...</span>';

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: rawUrl })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Gagal memproses video.');
    }

    const video = data.data;

    authorAvatar.src = video.author.avatar || 'https://via.placeholder.com/48';
    authorName.textContent = video.author.nickname;
    authorUsername.textContent = `@${video.author.username}`;
    videoTitle.textContent = video.title || 'Tanpa deskripsi';

    statLikes.textContent = formatNumber(video.stats.likes);
    statComments.textContent = formatNumber(video.stats.comments);
    statShares.textContent = formatNumber(video.stats.shares);

    videoPlayer.src = video.videoNoWatermarkUrl;
    
    const proxyDownloadUrl = `/api/proxy-download?url=${encodeURIComponent(video.videoNoWatermarkUrl)}&filename=tiktok_${video.id}_nowm.mp4`;
    btnDownloadNoWm.href = proxyDownloadUrl;

    if (video.audioUrl) {
      btnDownloadMusic.href = video.audioUrl;
      btnDownloadMusic.classList.remove('hidden');
    } else {
      btnDownloadMusic.classList.add('hidden');
    }

    resultCard.classList.remove('hidden');
  } catch (err) {
    showStatus(err.message, true);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i><span>Proses</span>';
  }
});