import * as fs from 'fs';
import * as path from 'path';
import https from 'https';

// Unsplash API Configuration
const UNSPLASH_ACCESS_KEY = 'tDwkSxh006dsmrdRgeejGLdt4u76WGa_7XbV44p8mmc';
const IMAGE_BASE_PATH = path.join(process.cwd(), 'public', 'images');
const DATA_PATH = path.join(process.cwd(), 'data');

// Ensure directories exist
function ensureDirectories() {
  if (!fs.existsSync(IMAGE_BASE_PATH)) {
    fs.mkdirSync(IMAGE_BASE_PATH, { recursive: true });
  }
  if (!fs.existsSync(path.join(IMAGE_BASE_PATH, 'yachts'))) {
    fs.mkdirSync(path.join(IMAGE_BASE_PATH, 'yachts'), { recursive: true });
  }
  if (!fs.existsSync(path.join(IMAGE_BASE_PATH, 'destinations'))) {
    fs.mkdirSync(path.join(IMAGE_BASE_PATH, 'destinations'), { recursive: true });
  }
  if (!fs.existsSync(path.join(IMAGE_BASE_PATH, 'services'))) {
    fs.mkdirSync(path.join(IMAGE_BASE_PATH, 'services'), { recursive: true });
  }
}

// Download image from URL
function downloadImage(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete partial file
        reject(err);
      });
    }).on('error', reject);
  });
}

// Fetch images from Unsplash
async function fetchUnsplashImages(
  query: string,
  count: number,
  orientation: 'landscape' | 'portrait' = 'landscape'
): Promise<string[]> {
  const params = new URLSearchParams({
    query,
    count: count.toString(),
    orientation,
    per_page: count.toString(),
  });

  const url = `https://api.unsplash.com/search/photos?${params}`;

  return new Promise((resolve, reject) => {
    https.get(
      url,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      },
      (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          try {
            const json = JSON.parse(data);
            const imageUrls = json.results.map(
              (photo: any) =>
                `${photo.urls.raw}&w=1920&h=1080&fit=crop&q=85`
            );
            resolve(imageUrls);
          } catch (error) {
            reject(error);
          }
        });
      }
    );
  });
}

// Image categories configuration
const imageConfig = {
  yachts: [
    { keyword: 'luxury yacht sailing', count: 5 },
    { keyword: 'superyacht interior', count: 4 },
  ],
  destinations: [
    { keyword: 'mediterranean sea coastline', count: 4, name: 'mediterranean' },
    { keyword: 'greek islands beach', count: 3, name: 'greek-islands' },
    { keyword: 'french riviera beach nice', count: 3, name: 'french-riviera' },
    { keyword: 'adriatic coast dalmatia', count: 3, name: 'adriatic' },
    { keyword: 'caribbean beach turquoise', count: 3, name: 'caribbean' },
  ],
  services: [
    { keyword: 'yacht management luxury', count: 8, name: 'yacht-management' },
    { keyword: 'charter boat sailing', count: 3, name: 'charter-management' },
    { keyword: 'yacht insurance protection', count: 3, name: 'yacht-insurance' },
    { keyword: 'luxury boat marketing', count: 3, name: 'yacht-marketing' },
    { keyword: 'luxury yacht sales', count: 3, name: 'sales-management' },
    { keyword: 'marina berth dock', count: 3, name: 'berths-for-sale' },
    { keyword: 'nautical supplies equipment', count: 3, name: 'procurement' },
    { keyword: 'professional yacht crew', count: 3, name: 'crew-services' },
  ],
};

// Download and save images for yachts
async function downloadYachtImages() {
  console.log('\n📥 Downloading Yacht Images...\n');
  const yachtDir = path.join(IMAGE_BASE_PATH, 'yachts');
  const downloadedImages: string[] = [];

  for (const config of imageConfig.yachts) {
    try {
      console.log(`Fetching ${config.count} images for: ${config.keyword}`);
      const imageUrls = await fetchUnsplashImages(config.keyword, config.count);

      for (let i = 0; i < imageUrls.length; i++) {
        const fileName = `yacht-${downloadedImages.length + i + 1}.jpg`;
        const filePath = path.join(yachtDir, fileName);

        console.log(`  ✓ Downloading: ${fileName}`);
        await downloadImage(imageUrls[i], filePath);
        downloadedImages.push(`/images/yachts/${fileName}`);
      }
    } catch (error) {
      console.error(`Error downloading yacht images:`, error);
    }
  }

  return downloadedImages;
}

// Download and save images for destinations
async function downloadDestinationImages() {
  console.log('\n📥 Downloading Destination Images...\n');
  const destDir = path.join(IMAGE_BASE_PATH, 'destinations');
  const downloadedImages: Record<string, string[]> = {};

  for (const config of imageConfig.destinations) {
    try {
      console.log(`Fetching ${config.count} images for: ${config.keyword}`);
      const imageUrls = await fetchUnsplashImages(config.keyword, config.count);

      downloadedImages[config.name] = [];

      for (let i = 0; i < imageUrls.length; i++) {
        const fileName = `${config.name}-${i + 1}.jpg`;
        const filePath = path.join(destDir, fileName);

        console.log(`  ✓ Downloading: ${fileName}`);
        await downloadImage(imageUrls[i], filePath);
        downloadedImages[config.name].push(`/images/destinations/${fileName}`);
      }
    } catch (error) {
      console.error(`Error downloading destination images:`, error);
    }
  }

  return downloadedImages;
}

// Download and save images for services
async function downloadServiceImages() {
  console.log('\n📥 Downloading Service Images...\n');
  const servDir = path.join(IMAGE_BASE_PATH, 'services');
  const downloadedImages: Record<string, string[]> = {};

  for (const config of imageConfig.services) {
    try {
      console.log(`Fetching ${config.count} images for: ${config.keyword}`);
      const imageUrls = await fetchUnsplashImages(config.keyword, config.count);

      downloadedImages[config.name] = [];

      for (let i = 0; i < imageUrls.length; i++) {
        const fileName = `${config.name}-${i + 1}.jpg`;
        const filePath = path.join(servDir, fileName);

        console.log(`  ✓ Downloading: ${fileName}`);
        await downloadImage(imageUrls[i], filePath);
        downloadedImages[config.name].push(`/images/services/${fileName}`);
      }
    } catch (error) {
      console.error(`Error downloading service images:`, error);
    }
  }

  return downloadedImages;
}

// Update yachts.json with downloaded images
async function updateYachtsData(yachtImages: string[]) {
  console.log('\n📝 Updating yachts.json...\n');
  const yachtsPath = path.join(DATA_PATH, 'yachts.json');

  if (!fs.existsSync(yachtsPath)) {
    console.warn('yachts.json not found, skipping update');
    return;
  }

  const data = JSON.parse(fs.readFileSync(yachtsPath, 'utf-8'));

  // Assign images to yachts
  const yachtsArray = data.yachts;
  let imageIndex = 0;

  for (const yacht of yachtsArray) {
    yacht.images = [];
    for (let i = 0; i < 5; i++) {
      if (imageIndex < yachtImages.length) {
        yacht.images.push(yachtImages[imageIndex++]);
      } else {
        // Cycle back if we run out of images
        imageIndex = 0;
        yacht.images.push(yachtImages[imageIndex++]);
      }
    }
  }

  fs.writeFileSync(yachtsPath, JSON.stringify(data, null, 2));
  console.log('✓ yachts.json updated successfully');
}

// Update destinations.json with downloaded images
async function updateDestinationsData(
  destImages: Record<string, string[]>
) {
  console.log('\n📝 Updating destinations.json...\n');
  const destPath = path.join(DATA_PATH, 'destinations.json');

  if (!fs.existsSync(destPath)) {
    console.warn('destinations.json not found, skipping update');
    return;
  }

  const data = JSON.parse(fs.readFileSync(destPath, 'utf-8'));

  // Map destination slugs to downloaded images
  const slugMap: Record<string, string> = {
    'mediterranean': 'mediterranean',
    'greek-islands': 'greek-islands',
    'french-riviera': 'french-riviera',
    'adriatic': 'adriatic',
    'caribbean': 'caribbean',
  };

  for (const destination of data.destinations) {
    const key = slugMap[destination.slug];
    if (key && destImages[key]) {
      destination.image = destImages[key][0]; // Main image
      destination.gallery = destImages[key]; // All gallery images
    }
  }

  fs.writeFileSync(destPath, JSON.stringify(data, null, 2));
  console.log('✓ destinations.json updated successfully');
}

// Update service data in page.tsx
async function updateServicesData(
  serviceImages: Record<string, string[]>
) {
  console.log('\n📝 Updating services in page.tsx...\n');
  const pagePath = path.join(
    process.cwd(),
    'app',
    '[locale]',
    'services',
    '[slug]',
    'page.tsx'
  );

  if (!fs.existsSync(pagePath)) {
    console.warn('services page.tsx not found, skipping update');
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // Update each service with its images
  const serviceMap: Record<string, string> = {
    'yacht-management': 'yacht-management',
    'charter-management': 'charter-management',
    'yacht-insurance': 'yacht-insurance',
    'yacht-marketing': 'yacht-marketing',
    'sales-management': 'sales-management',
    'berths-for-sale': 'berths-for-sale',
    'procurement': 'procurement',
    'crew-services': 'crew-services',
  };

  for (const [serviceName, key] of Object.entries(serviceMap)) {
    if (serviceImages[key]) {
      const images = serviceImages[key];
      const heroImage = images[0];

      // Simple string replacement for heroImage
      const searchStr = `'${serviceName}': {`;
      if (content.includes(searchStr)) {
        const idx = content.indexOf(searchStr);
        const section = content.substring(idx, idx + 1000);

        // Replace heroImage URL
        const updated = section.replace(
          /heroImage:\s*['"]https?:\/\/[^'"]+['"]/,
          `heroImage: '${heroImage}'`
        );

        content = content.substring(0, idx) + updated + content.substring(idx + section.length);
      }
    }
  }

  fs.writeFileSync(pagePath, content);
  console.log('✓ Services page.tsx updated successfully');
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Image Download Process...');
    console.log('========================================\n');

    ensureDirectories();

    // Download all images
    const yachtImages = await downloadYachtImages();
    const destImages = await downloadDestinationImages();
    const serviceImages = await downloadServiceImages();

    // Update data files
    await updateYachtsData(yachtImages);
    await updateDestinationsData(destImages);
    await updateServicesData(serviceImages);

    console.log('\n========================================');
    console.log('✅ Image Download Process Complete!\n');
    console.log('Summary:');
    console.log(`  📷 Yacht Images: ${yachtImages.length}`);
    console.log(`  📍 Destination Images: ${Object.values(destImages).flat().length}`);
    console.log(`  🎯 Service Images: ${Object.values(serviceImages).flat().length}`);
    console.log('\n✨ All images have been downloaded and integrated!');
  } catch (error) {
    console.error('❌ Error during image download:', error);
    process.exit(1);
  }
}

main();
