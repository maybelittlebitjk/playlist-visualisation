function getAccessToken() {
  const hash = window.location.hash;
  const hashWithoutHash = hash.substring(1);

  const params = hashWithoutHash.split('&');
  const keyValues = params.map(param => param.split('='));

  const accessToken = keyValues[0][1];
  return accessToken;
};

function getPlaylist(playlist_id) {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}`;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  };
  return fetch(url, { headers }).then((response) => response.json());
};

function renderPlaylist(playlist_id) {
  const container = document.getElementById('tracks');
  const audioPlayer = document.getElementById('player');
  


  getPlaylist(playlist_id).then(playlist => {
    const tracks = playlist.tracks.items;

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i].track;

      const playlistItem = document.createElement('div');
      playlistItem.classList.add('playlist-item');

      const playlistItemImg = document.createElement('img');
      playlistItemImg.classList.add('playlist-item-img');
      playlistItemImg.setAttribute('src', track.album.images[0].url);

      const playlistItemTitle = document.createElement('div');
      playlistItemTitle.classList.add('playlist-item-title');
      playlistItemTitle.innerHTML = track.name;

      playlistItem.addEventListener('click', () => {
          if (currentlyActive === track.id) {
            audioPlayer.pause();
            currentlyActive = null;
            playlistItem.classList.remove('active');
          } else {
            if (currentlyActive) {
              document.querySelector('.active').classList.remove('active');
            }
            currentlyActive = track.id;
            playlistItem.classList.add('active');

            // Play if preview available
          if (track.preview_url) {
            audioPlayer.setAttribute('src', track.preview_url);
            audioPlayer.play();
          } else {
            audioPlayer.pause();
          }
        }
      });

      playlistItem.appendChild(playlistItemImg);
      playlistItem.appendChild(playlistItemTitle);
      container.appendChild(playlistItem);
    }
  });
};

let currentlyActive;
renderPlaylist('6zwEB5cOdIATkqx5Fe7sOb');