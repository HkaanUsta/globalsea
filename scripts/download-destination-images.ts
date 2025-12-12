import * as fs from 'fs';
import * as path from 'path';
import https from 'https';

// Unsplash API Configuration
const UNSPLASH_ACCESS_KEY = 'tDwkSxh006dsmrdRgeejGLdt4u76WGa_7XbV44p8mmc';
const IMAGE_BASE_PATH = path.join(process.cwd(), 'public', 'images', 'destinations');
const DESTINATIONS_JSON_PATH = path.join(process.cwd(), 'data', 'destinations.json');

// Ensure directories exist
function ensureDirectories() {
  if (!fs.existsSync(IMAGE_BASE_PATH)) {
    fs.mkdirSync(IMAGE_BASE_PATH, { recursive: true });
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
    ).on('error', reject);
  });
}

// Download images for a destination or subdestination
async function downloadImagesForDestination(
  name: string,
  slug: string,
  isSubDestination: boolean = false
): Promise<boolean> {
  const prefix = isSubDestination ? '  ' : '';

  try {
    // Create search query for better results
    let searchQuery = `${name} yacht sailing coast`;
    let imageUrls = await fetchUnsplashImages(searchQuery, 4);

    // Try progressively simpler queries
    if (imageUrls.length === 0) {
      console.log(`${prefix}⚠️  No images found with query "${searchQuery}"`);
      searchQuery = `${name} ocean sailing`;
      console.log(`${prefix}🔄 Trying with: "${searchQuery}"`);
      imageUrls = await fetchUnsplashImages(searchQuery, 4);
    }

    if (imageUrls.length === 0) {
      searchQuery = `${name} sea yacht`;
      console.log(`${prefix}🔄 Trying with: "${searchQuery}"`);
      imageUrls = await fetchUnsplashImages(searchQuery, 4);
    }

    if (imageUrls.length === 0) {
      searchQuery = `yacht nature coast`;
      console.log(`${prefix}🔄 Trying with generic: "${searchQuery}"`);
      imageUrls = await fetchUnsplashImages(searchQuery, 4);
    }

    if (imageUrls.length === 0) {
      console.log(`${prefix}✗ No images found for ${name}`);
      return false;
    }

    // Download main image
    const mainImagePath = path.join(IMAGE_BASE_PATH, `${slug}-1.jpg`);
    await downloadImage(imageUrls[0], mainImagePath);
    console.log(`${prefix}✓ Downloaded main image: ${slug}-1.jpg`);

    // Download gallery images
    for (let i = 1; i < imageUrls.length; i++) {
      const galleryImagePath = path.join(IMAGE_BASE_PATH, `${slug}-${i + 1}.jpg`);
      await downloadImage(imageUrls[i], galleryImagePath);
      console.log(`${prefix}✓ Downloaded gallery image: ${slug}-${i + 1}.jpg`);
    }

    return true;
  } catch (error) {
    console.error(`${prefix}✗ Error downloading images for ${name}:`, error);
    return false;
  }
}

// Download destination images
async function downloadDestinationImages() {
  ensureDirectories();

  // Read destinations.json
  const destinationsData = JSON.parse(
    fs.readFileSync(DESTINATIONS_JSON_PATH, 'utf-8')
  );

  console.log(`Found ${destinationsData.destinations.length} destinations`);

  for (const destination of destinationsData.destinations) {
    const destinationName = destination.name.en;
    const slug = destination.slug;

    console.log(`\nProcessing: ${destinationName}`);

    // Download main destination images
    await downloadImagesForDestination(destinationName, slug, false);

    // Download subdestination images if they exist
    if (destination.subDestinations && destination.subDestinations.length > 0) {
      console.log(`  Found ${destination.subDestinations.length} sub-destinations`);

      for (const subDest of destination.subDestinations) {
        const subName = subDest.name.en;
        const subSlug = subDest.slug;

        console.log(`  Processing sub-destination: ${subName}`);
        await downloadImagesForDestination(subName, subSlug, true);

        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Add delay to respect API rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n✓ All destination images downloaded successfully!');
  console.log('\nRun: npm run update-destination-paths');
}

// Run the script
downloadDestinationImages().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
