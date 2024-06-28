export async function fetchImage(url, token) {
  let result = "";
  await fetch(url, {
    method: "GET",
    headers: {
      TOKEN: token,
    },
  })
    .then((response) => {
      // console.log(response);
      return response.blob();
    })
    .then((blob) => {
      result = URL.createObjectURL(blob);
    })
    .catch((e) => {
      return e;
    });

  return result;
}
