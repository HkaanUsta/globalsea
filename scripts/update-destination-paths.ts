import * as fs from 'fs';
import * as path from 'path';

const DESTINATIONS_JSON_PATH = path.join(process.cwd(), 'data', 'destinations.json');
const IMAGE_BASE_PATH = path.join(process.cwd(), 'public', 'images', 'destinations');

// Check if image file exists
function imageExists(filename: string): boolean {
  return fs.existsSync(path.join(IMAGE_BASE_PATH, filename));
}

// Update destinations.json with downloaded image paths
function updateDestinationPaths() {
  // Read destinations.json
  const destinationsData = JSON.parse(
    fs.readFileSync(DESTINATIONS_JSON_PATH, 'utf-8')
  );

  let updatedCount = 0;
  let skippedCount = 0;

  console.log('Updating destination image paths...\n');

  // Update each destination
  for (const destination of destinationsData.destinations) {
    const slug = destination.slug;
    const destinationName = destination.name.en;

    // Check if images exist for this destination
    const mainImageFile = `${slug}-1.jpg`;

    if (!imageExists(mainImageFile)) {
      console.log(`⚠️  Skipping ${destinationName} - images not found`);
      skippedCount++;
    } else {
      // Update main image path
      destination.image = `/images/destinations/${slug}-1.jpg`;

      // Build gallery array
      const gallery: string[] = [];
      for (let i = 1; i <= 4; i++) {
        const imageFile = `${slug}-${i}.jpg`;
        if (imageExists(imageFile)) {
          gallery.push(`/images/destinations/${slug}-${i}.jpg`);
        }
      }

      // Update gallery
      destination.gallery = gallery;

      console.log(`✓ Updated ${destinationName}`);
      console.log(`  Main image: ${destination.image}`);
      console.log(`  Gallery: ${gallery.length} images`);
      updatedCount++;
    }

    // Update subdestinations if they exist
    if (destination.subDestinations && destination.subDestinations.length > 0) {
      console.log(`  Found ${destination.subDestinations.length} sub-destinations`);

      for (const subDest of destination.subDestinations) {
        const subSlug = subDest.slug;
        const subName = subDest.name.en;
        const subMainImageFile = `${subSlug}-1.jpg`;

        if (!imageExists(subMainImageFile)) {
          console.log(`  ⚠️  Skipping sub-destination ${subName} - images not found`);
          continue;
        }

        // Update sub-destination image path
        subDest.image = `/images/destinations/${subSlug}-1.jpg`;

        console.log(`  ✓ Updated sub-destination ${subName}`);
        console.log(`    Image: ${subDest.image}`);
      }
    }
  }

  // Write updated JSON back to file
  fs.writeFileSync(
    DESTINATIONS_JSON_PATH,
    JSON.stringify(destinationsData, null, 2),
    'utf-8'
  );

  console.log(`\n✓ Successfully updated ${updatedCount} destinations`);
  if (skippedCount > 0) {
    console.log(`⚠️  Skipped ${skippedCount} destinations (images not found)`);
  }
  console.log(`\nDestinations JSON has been updated: ${DESTINATIONS_JSON_PATH}`);
}

// Run the script
updateDestinationPaths();
