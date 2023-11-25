function getServerData(url) {
  return fetch(url);
}

function sendServerRequest(method, url, body = null) {
  return fetch(url, {
    method: method,
    mode: 'no-cors',
    body: body,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}


export { sendServerRequest, getServerData };

