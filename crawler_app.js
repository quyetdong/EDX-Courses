function boxBlur(image) {
  const { length: leng } = image;
  const { length: width } = image[0];
  const blurimage = [];

  for (let i = 0, j = 0; i < leng - 2;) {
    console.log(i, j);
    let total = image[i][j] + image[i][j + 1] + image[i][j + 2] +
      image[i + 1][j] + image[i + 1][j + 1] + image[i + 1][j + 2] +
      image[i + 2][j] + image[i + 2][j + 1] + image[i + 2][j + 2];

    if (j === 0) blurimage[i] = [];

    blurimage[i][j] = Math.floor(total / 9);

    console.log(blurimage[i]);
    j += 1;
    if (j >= width - 2) {
      i += 1;
      j = 0;
    }
  }

  return blurimage;
}

image = [[7, 4, 0, 1],
[5, 6, 2, 2],
[6, 10, 7, 8],
[1, 4, 2, 0]];

boxBlur(image);