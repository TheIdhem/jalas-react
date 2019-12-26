export function fetchRequest(
  functionName,
  requestBody,
  method = "POST",
  accessToken = null
) {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (accessToken !== null) headers.Authorization = accessToken;
  return fetch("http://localhost:9092/api/v1.0" + functionName, {
    method: method,
    headers,
    body: JSON.stringify(requestBody)
  }).then(res => {
    return new Promise((resolve, reject) => {
      res
        .json()
        .then(responseJSON => {
          if (res.ok) addStatusToResponse(res, responseJSON);
          res.ok ? resolve({ ...responseJSON }) : reject(responseJSON);
        })
        .catch(err => reject(err));
    });
  });
}

export function getRequest(functionName, accessToken = "") {
  let headers = {
    Accept: "application/json",
    Authorization: accessToken
  };
  return fetch("http://localhost:9092/api/v1.0/" + functionName, {
    method: "GET",
    headers
  }).then(res => {
    return new Promise((resolve, reject) => {
      res
        .json()
        .then(responseJSON => {
          res.ok ? resolve(responseJSON) : reject(responseJSON);
        })
        .catch(err => reject(err));
    });
  });
}

function addStatusToResponse(res, responseJSON) {
  if (res.status !== 200) {
    responseJSON.status = JSON.parse(responseJSON.message).status;
  }
  if (res.headers.get("Authorization"))
    responseJSON.accessToken = res.headers.get("Authorization");
}
