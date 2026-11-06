const youtubeId = "UZHbPTnrfGQ";

export const quantityBreaksVideo = {
  path: "/resources/shopify-quantity-breaks-video",
  guidePath: "/resources/shopify-quantity-breaks-guide",
  title: "Shopify Quantity Breaks: Set Up and Test with MultiTier Discounts",
  description:
    "Set up Shopify quantity breaks in MultiTier Discounts and test 2 eligible units at 10% off and 3 or more at 15% off, from product page to checkout.",
  uploadDate: "2026-11-05T08:28:43-08:00",
  duration: "PT3M40S",
  runtime: "3:40",
  embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?playsinline=1`,
  watchUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  poster: {
    src: "/images/shopify-quantity-breaks-video-poster.jpg",
    width: 1280,
    height: 720,
    alt: "Fieldnote Supply demo product page with the Quantity Tiers widget",
  },
  chapters: [
    ["0:00", "The quantity-break offer"],
    ["0:20", "Start a quantity-break campaign"],
    ["0:41", "Select the eligible product"],
    ["1:11", "Set the 10% and 15% tiers"],
    ["1:40", "Review and save an inactive draft"],
    ["2:10", "Test the product-page widget"],
    ["2:41", "Verify the cart and checkout"],
    ["3:05", "Test discount removal and exclusions"],
  ],
} as const;
