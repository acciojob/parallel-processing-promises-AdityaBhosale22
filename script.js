const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

function downloadImages(imgArray) {
  loading.style.display = "block";
  errorDiv.innerText = "";
  output.innerHTML = "";

  const imagePromises = imgArray.map(imgObj => downloadImage(imgObj.url));

  return Promise.all(imagePromises)
    .then((loadedImages) => {
      loading.style.display = "none";
      loadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      loading.style.display = "none";
      errorDiv.innerText = error.message;
      console.error(error);
    });
}

btn.addEventListener("click", () => {
  downloadImages(images);
});