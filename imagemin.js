import imagemin from 'imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import webp from 'imagemin-webp';

const directory = './public/assets/images';

(async () => {
  const files = await imagemin([directory], {
    destination: directory,
    plugins: [
      pngquant({quality: [0.9, 0.9]}),
      mozjpeg({quality: 90}),
      webp({quality: 90})
    ],
  });
  console.log(files);
})();
