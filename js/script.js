document.getElementById('uploadInput').addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.getElementById('imagePlaceholder');
      img.src = e.target.result;

      img.onload = function () {
        // Analyze the image color and set the average color as the background color
        getImageAverageColor(img, function (averageColor) {
          document.body.style.backgroundColor = averageColor;
        });
      };
    };

    reader.readAsDataURL(file);
  }
});

function getImageAverageColor(img, callback) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0, img.width, img.height);

  const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

  let totalRed = 0;
  let totalGreen = 0;
  let totalBlue = 0;

  // Iterate through pixel data to sum up RGB values
  for (let i = 0; i < imageData.length; i += 4) {
    totalRed += imageData[i];
    totalGreen += imageData[i + 1];
    totalBlue += imageData[i + 2];
  }

  // Calculate average RGB values
  const averageRed = Math.round(totalRed / (imageData.length / 4));
  const averageGreen = Math.round(totalGreen / (imageData.length / 4));
  const averageBlue = Math.round(totalBlue / (imageData.length / 4));

  const averageColor = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;
  callback(averageColor);
}
