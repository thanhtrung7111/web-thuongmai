// export const setCacheData = async (key, data) => {
//   let url = "http://localhost:5173/";
//   let names = await caches.keys();
//   console.log(names);
//   const cacheStorage = await caches.open("data");

//   // Fetching that particular cache data
//   const cachedResponse = await cacheStorage.match(url);

//   // console.log(cachedResponse.body);
//   let dataa = await cachedResponse?.json();
//   let pushData = new Response(
//     JSON.stringify({
//       ...dataa,
//       [key]: data,
//     })
//   );

//   cacheStorage.put("http://localhost:5173/", pushData);
// };

// export const getCacheData = async (key) => {
//   let url = "http://localhost:5173/";
//   let names = await caches.keys();
//   const cacheStorage = await caches.open("data");

//   // Fetching that particular cache data
//   const cachedResponse = await cacheStorage.match(url);

//   // console.log(cachedResponse.body);
//   let dataa = await cachedResponse?.json();
//   if (dataa != null && Object.keys(dataa).indexOf(key) >= 0) {
//     return dataa[`${key}`];
//   }

//   return null;
// };

// export const deleteCacheData = async () => {
//   caches.delete("data");
// };
