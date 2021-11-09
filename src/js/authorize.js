const loginBtn = document.getElementById("login-button");

loginBtn.addEventListener("click", () => {
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = 'http://localhost:8080/playlist.html';

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  
  window.location.href = url;
});

