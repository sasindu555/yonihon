import { Experience, Event, Guide, Destination, GuideCategory } from "./types";

export const destinations: Destination[] = [
  { name: "Tokyo", slug: "tokyo" },
  { name: "Asakusa", slug: "asakusa" },
  { name: "Kyoto", slug: "kyoto" },
  { name: "Osaka", slug: "osaka" },
  { name: "Kanazawa", slug: "kanazawa" },
  { name: "Mount Fuji", slug: "mount-fuji" },
];

export const experienceCategories = ["Popular", "Cultural", "Craft", "Food", "Nature"];

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Private Craft Your Own Ring Handmade Experience",
    slug: "private-craft-your-own-ring-handmade-experience",
    shortDescription:
      "Experience making a handmade ring by hammering the texture using the Japanese traditional style called 'Tankin.'",
    description:
      "Experience making a handmade ring by hammering the texture using the Japanese traditional style called 'Tankin.' You will choose your favorite material, thickness, and texture, and then use special hammers and tools to customize your own ring. The entire process takes around 1 hour. Staff will carefully explain the steps and help you take remembrance photos. This workshop is highly recommended for a high-quality gift or souvenir. Embrace your creativity and enjoy our unique experience in Japan.",
    duration: "1h 30m",
    groupSize: "Up to 4",
    language: "Japanese, English",
    experienceType: "Authentic",
    location: "Asakusa, Tokyo",
    destination: "Asakusa",
    category: "Popular",
    price: 3300,
    currency: "¥",
    image:
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-1-600x450.jpg",
    images: [
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-1.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-2.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-3.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-4.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-5.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-6.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-7.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-8.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-9.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-10.jpg",
    ],
    featured: true,
    popular: true,
    rating: 4.8,
    reviewCount: 12,
    meetingPoint:
      "Nane tokyo Asakusa 浅草店, Japan, 111-0032 Tokyo, Taito City, Asakusa, 1-chōme−31−８ 1F",
    cancellationPolicy:
      "Reservations made through YONIHON are free of charge, and no payment is required at the time of booking. If you need to cancel or change your reservation, we kindly ask that you notify us as soon as possible so that the workshop can accommodate other guests. Please contact the workshop directly via Instagram DM or email regarding any cancellations or changes to your reservation.",
    highlights: [
      "Make your own ring using traditional Japanese techniques",
      "Choose your favorite material, thickness, and texture",
      "Take home your handmade ring the same day",
      "English-speaking staff available",
    ],
    included: ["Workshop price", "Guide: English or Japanese"],
    notIncluded: ["Ring engraving options"],
    itinerary: [
      {
        title: "Craft Your Own Ring Workshop",
        description:
          "In this workshop, you can craft your own ring using a hammer to create unique textures. By selecting the material, thickness, shape and texture, you'll be able to design a beautiful piece that reflects your style. We will support you throughout the entire workshop! Skilled craftsmen will polish and clean your ring during the final process. The workshop lasts around 1 hour, and you can take your ring home the same day!",
      },
    ],
    hostName: "Nane Asakusa",
    hostInstagram: "nane.asakusa",
    bookingNote:
      "The prices listed on Viator are minimum starting prices. Final pricing may vary depending on the ring size, material, width, design, and finishing options selected during your workshop.",
  },
];

export const guideCategories: GuideCategory[] = [
  { name: "Food & Restaurants", slug: "food-restaurants", icon: "📘", count: 0 },
  { name: "Hidden Gems", slug: "hidden-gems", icon: "📍", count: 0 },
  { name: "Japanese Culture", slug: "japanese-culture", icon: "🪭", count: 0 },
  { name: "Things to Do in Japan", slug: "things-to-do-in-japan", icon: "📘", count: 0 },
  { name: "Tokyo Travel Guide", slug: "tokyo-travel-guide", icon: "📘", count: 0 },
  { name: "Travel Planning", slug: "travel-planning", icon: "🧳", count: 2 },
  { name: "Travel Tips", slug: "travel-tips", icon: "💡", count: 0 },
  { name: "Unique Experiences", slug: "unique-experiences", icon: "📘", count: 0 },
];

export const popularTags = [
  "Ajisai",
  "Bunkyo City",
  "culture",
  "festival",
  "Flower Festival Tokyo",
  "Hakusan Shrine",
  "Horikiri Iris Garden",
  "Hydrangea Festival",
  "Iris Festival",
  "June Events Tokyo",
];

export const guides: Guide[] = [
  {
    id: "1",
    title: "15 Things to Know Before Visiting Japan",
    slug: "15-things-to-know-before-visiting-japan",
    excerpt:
      "Practical Japan travel tips that can save you time, money and unnecessary stress",
    content: `
**Practical Japan travel tips that can save you time, money and unnecessary stress**

Planning your first trip to Japan can feel overwhelming, especially when payment methods, transport systems and local customs work differently from those at home.

These 15 things to know before visiting Japan cover the practical details that can help you avoid common mistakes and enjoy a smoother journey.

Updated for 2026, this guide includes current advice about cash, IC cards, the Japan Rail Pass, internet access, onsen etiquette, luggage forwarding and seasonal weather.

## 1. Carry some cash, even though Japan is becoming more cashless

Cards and mobile payments are now accepted at many hotels, department stores, restaurants and convenience stores. However, cash remains useful at small restaurants, temples, local markets, rural businesses and some ticket machines.

Foreign-issued cards are commonly accepted at Seven Bank ATMs, often found inside 7-Eleven stores, and at many Japan Post Bank ATMs. Card compatibility and operating hours can vary, so bring more than one payment method.

Withdraw or exchange a modest amount of yen after arriving. Keeping a mixture of notes and coins is helpful for small purchases, lockers and machines that do not accept cards.

## 2. Use an IC card for easier transport

A rechargeable IC card can make travelling around Japan much simpler.

Cards such as Suica and PASMO can be used on many participating trains, subways and buses. They can also be used for small purchases at convenience stores, vending machines and other participating businesses.

Instead of calculating the fare for every journey, you normally tap the card when entering and leaving the station.

## 3. Calculate whether the JR Pass is worth it

The nationwide Japan Rail Pass can be useful for travellers making several long-distance JR journeys within a limited period. It is not automatically the cheapest choice for every visitor.

Individual tickets may cost less when your itinerary includes only one or two intercity journeys. A regional rail pass may offer better value if your trip concentrates on one part of Japan.

## 4. Arrange internet access before arrival

Mobile internet is useful for maps, train information, translation, restaurant research and emergency updates.

An eSIM may be suitable when you have an unlocked, compatible phone and want to avoid carrying another device. Pocket Wi-Fi can be practical when several people or devices need to share one connection.

## 5. Learn basic onsen etiquette

Visiting an onsen, or hot-spring bath, can be a memorable part of travelling in Japan. Communal baths have several important rules.

Wash your body thoroughly at the shower area before entering the bath. Swimwear is normally not permitted unless the facility clearly says otherwise. Keep your small towel, hair and belongings out of the water.

## 6. Know when to remove your shoes

Shoes are removed in Japanese homes, traditional inns and certain restaurants, temples, clinics and fitting rooms.

The entrance area where shoes are removed is called a **genkan**. Leave your outdoor shoes on the lower entrance floor and avoid stepping there in your socks or bare feet.

## 7. Tipping is generally unnecessary

Tipping is not a standard part of everyday service in Japan.

Restaurant staff, hotel employees and taxi drivers do not normally expect an additional percentage. Leaving cash on a restaurant table may cause confusion because staff may assume that you forgot it.

## 8. Be considerate on public transport

Trains and buses in Japan can become crowded, but passengers generally try to minimise disruption to others.

Keep your phone on silent, avoid phone calls in ordinary carriages and use headphones at a considerate volume. Let passengers leave before boarding and follow the queue markings on the platform.

## 9. Convenience stores can solve many travel problems

Japanese convenience stores, commonly called **konbini**, are helpful when travelling early, arriving late or staying somewhere with few nearby shops.

## 10. Be prepared to carry your rubbish

Public rubbish bins can be difficult to find in Japan.

Carry a small reusable bag for tissues, wrappers and other personal waste. Bottle and can collection bins are sometimes available beside vending machines.

## 11. Smoke only where it is clearly permitted

Smoking is prohibited in many indoor public places and businesses, except in designated smoking areas that meet the relevant requirements.

## 12. Learn a few useful Japanese phrases

Visitors can travel through major Japanese cities without speaking fluent Japanese. Even so, a few phrases can make everyday interactions easier.

Useful expressions include:
- **Sumimasen:** Excuse me or sorry
- **Arigatou gozaimasu:** Thank you very much
- **Onegaishimasu:** Please
- **Eigo wa hanasemasu ka?:** Do you speak English?

## 13. Understand a few dining customs

Eating out in Japan is generally relaxed, but several customs are useful to know.

Do not place chopsticks vertically in a bowl of rice, and do not pass food directly from one pair of chopsticks to another. Both actions resemble practices associated with Japanese funerals.

## 14. Use luggage forwarding and station storage

Large suitcases can be difficult to manage on crowded trains, station stairs and narrow streets.

Luggage-forwarding services, commonly called **takuhaibin** or **takkyubin**, allow travellers to send bags between many hotels, airports and supported destinations.

## 15. Pack for the season and the region

Japan's climate varies significantly by location.

Tokyo, Kyoto, Hokkaido and Okinawa can experience very different conditions during the same month. Check the forecast for each destination instead of relying on one general forecast for the whole country.
`,
    category: "Travel Planning",
    categorySlug: "travel-planning",
    image:
      "https://yonihon.com/wp-content/uploads/2026/06/ChatGPT-Image-Jun-24-2026-03_16_48-AM-900x600.png",
    author: "Yonihon",
    date: "June 23, 2026",
    readTime: "10 min read",
    featured: true,
    tableOfContents: [
      { title: "Carry Cash", anchor: "1-carry-some-cash-even-though-japan-is-becoming-more-cashless" },
      { title: "Use IC Card", anchor: "2-use-an-ic-card-for-easier-transport" },
      { title: "JR Pass Value", anchor: "3-calculate-whether-the-jr-pass-is-worth-it" },
      { title: "Internet Access", anchor: "4-arrange-internet-access-before-arrival" },
    ],
  },
  {
    id: "2",
    title: "Things to Know Before Visiting Japan",
    slug: "things-to-know-before-visiting-japan",
    excerpt: "Things to Know Before Visiting Japan — Japan is one of the most rewarding countries to visit…",
    content: `
Japan is one of the most rewarding countries to visit. From ancient temples to neon-lit streets, the country offers a unique blend of tradition and modernity.

This guide covers essential information for first-time visitors to Japan, including cultural etiquette, transportation tips, and practical advice for a smooth journey.
    `,
    category: "Travel Planning",
    categorySlug: "travel-planning",
    image:
      "https://yonihon.com/wp-content/uploads/2026/06/djedj-japanese-lantern-5568727-900x600.jpg",
    author: "Yonihon",
    date: "June 1, 2026",
    readTime: "10 min read",
    featured: true,
  },
  {
    id: "3",
    title: "First-Time Visitor's Guide to Japan: Everything You Need to Know",
    slug: "first-time-visitors-guide-to-japan-everything-you-need-to-know",
    excerpt:
      "From ancient temples to neon-lit streets, Japan offers an unforgettable experience for first-time visitors.",
    content: `
From ancient temples to neon-lit streets, Japan offers an unforgettable experience for first-time visitors.

This comprehensive guide covers everything you need to know before your first trip to Japan, including visa requirements, budgeting, packing tips, and must-see destinations.
    `,
    category: "Travel Planning",
    categorySlug: "travel-planning",
    image:
      "https://yonihon.com/wp-content/uploads/2026/06/japan-900x600.jpg",
    author: "Yonihon",
    date: "June 1, 2026",
    readTime: "7 min read",
    featured: true,
  },
];

export const eventTypes = [
  "All Events",
  "Cultural Events",
  "Festivals",
  "Fireworks",
  "Flowers",
  "Nature",
  "Seasonal Events",
];

export const events: Event[] = [
  {
    id: "1",
    title: "Tokyo Hydrangea Season｜紫陽花祭り (Ajisai Matsuri)",
    slug: "tokyo-hydrangea-season-ajisai-matsuri",
    excerpt:
      "Experience Tokyo's beautiful hydrangea season as thousands of colorful blooms transform temples, shrines, and gardens across the city.",
    description: `June marks the arrival of hydrangea season in Tokyo, bringing vibrant shades of blue, purple, pink, and white to parks, shrines, temples, and gardens throughout the city.

One of the most popular places to enjoy these beautiful flowers is Hakusan Shrine in Bunkyo City, home to the annual Bunkyo Hydrangea Festival. Visitors can stroll through peaceful pathways lined with thousands of hydrangea plants while experiencing the unique atmosphere of a traditional Japanese shrine.

Hydrangeas bloom during Japan's rainy season, known as "Tsuyu," creating a magical contrast between colorful flowers and misty surroundings. The soft rain often enhances the beauty of the blossoms, making this season especially popular among photographers and nature lovers.`,
    heroImage:
      "https://yonihon.com/wp-content/uploads/2026/06/yamasa-n-pT1ezChewSU-unsplash-600x450.jpg",
    images: [
      "https://yonihon.com/wp-content/uploads/2026/06/diana-bondarenko-jjzRC4axcqI-unsplash-600x450.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/pexels-arlindphotography-33181597-600x450.jpg",
      "https://yonihon.com/wp-content/uploads/2026/06/pexels-francesco-ungaro-4762143-600x450.jpg",
    ],
    startDate: "June 6",
    endDate: "June 14, 2026",
    location: "Bunkyo, Tokyo",
    area: "Bunkyo",
    prefecture: "Tokyo",
    category: "Flowers",
    tags: [
      "Ajisai",
      "Bunkyo City",
      "Flower Festival Tokyo",
      "Hakusan Shrine",
      "Hydrangea Festival",
      "June Events Tokyo",
    ],
    admission: "Free",
    bestFor: "Photographers, Couples, Nature Lovers, Families, Solo Travelers",
    goodFor: "English, Families",
    nearestStation: "Hakusan Station (Toei Mita Line)",
    officialSite:
      "https://hakusanshita.com/bunkyo-ajisaifes_no42/index_en.html",
    whyPeopleLoveIt:
      "Hydrangea season brings a burst of color to Tokyo during the rainy season. Visitors love the peaceful atmosphere, beautiful photography opportunities, and the chance to experience a seasonal Japanese tradition that many international travelers overlook.",
    tipsForVisitors: [
      "Bring an umbrella as June is part of Japan's rainy season.",
      "Visit early in the morning for the best photography conditions.",
      "Wear comfortable walking shoes.",
      "Consider visiting after light rain for the most vibrant flower colors.",
      "Respect shrine etiquette while exploring the grounds.",
    ],
    highlightTitle: "Experience Tokyo's beautiful hydrangea season",
  },
  {
    id: "2",
    title: "Katsushika Iris Festival 2026 Tokyo",
    slug: "katsushika-iris-festival-2026-tokyo-best-iris-flower-festival-in-japan-yonihon",
    excerpt: "Celebrate the beauty of early summer at the Katsushika Iris Festival, one of Tokyo's most beautiful flower events.",
    description: "Celebrate the beauty of early summer at the Katsushika Iris Festival, one of Tokyo's most beautiful flower events. The festival showcases stunning iris flowers in full bloom.",
    heroImage:
      "https://yonihon.com/wp-content/uploads/2026/06/pexels-pixabay-69088-600x450.jpg",
    images: [],
    startDate: "May/Jun 25",
    endDate: "14, 2026",
    location: "Katsushika, Tokyo",
    area: "Katsushika",
    prefecture: "Tokyo",
    category: "Flowers",
    tags: ["Iris Festival", "Flower Festival Tokyo", "June Events Tokyo"],
    admission: "Free",
    bestFor: "Nature Lovers, Families, Photographers",
    goodFor: "English, Families",
    nearestStation: "Horikiri Shobuen Station",
    officialSite: "",
    whyPeopleLoveIt: "The Iris Festival is a spectacular display of color and tradition.",
    tipsForVisitors: ["Visit on a weekday for fewer crowds.", "Bring water and sun protection."],
  },
  {
    id: "3",
    title: "Torigoe Matsuri",
    slug: "torigoe-matsuri",
    excerpt: "Famous for carrying one of Tokyo's heaviest mikoshi (portable shrines) through the streets.",
    description: "Famous for carrying one of Tokyo's heaviest mikoshi (portable shrines) through the streets. This energetic festival is a must-see cultural experience.",
    heroImage:
      "https://yonihon.com/wp-content/uploads/2026/06/pexels-railgunbreaker-33139894-600x450.jpg",
    images: [],
    startDate: "June 6",
    endDate: "June 9, 2026",
    location: "Asakusabashi / Kuramae, Tokyo",
    area: "Asakusabashi",
    prefecture: "Tokyo",
    category: "Cultural Events",
    tags: ["festival", "culture", "Tokyo"],
    admission: "Free",
    bestFor: "Culture Lovers, Photographers, Families",
    goodFor: "English, Families",
    nearestStation: "Asakusabashi Station",
    officialSite: "",
    whyPeopleLoveIt: "The intense energy of carrying the massive mikoshi through narrow streets is an unforgettable sight.",
    tipsForVisitors: ["Arrive early for a good viewing spot.", "Follow the crowd and street instructions."],
  },
  {
    id: "4",
    title: "Sanno Matsuri",
    slug: "sanno-matsuri",
    excerpt: "One of Tokyo's three great Shinto festivals, featuring traditional processions, shrine ceremonies, and cultural performances.",
    description: "One of Tokyo's three great Shinto festivals, featuring traditional processions, shrine ceremonies, and cultural performances.",
    heroImage:
      "https://yonihon.com/wp-content/uploads/2026/06/sanno-matsuru-600x450.jpg",
    images: [],
    startDate: "June 7",
    endDate: "June 17, 2026",
    location: "Akasaka, Tokyo",
    area: "Akasaka",
    prefecture: "Tokyo",
    category: "Cultural Events",
    tags: ["festival", "culture", "Shinto", "Tokyo"],
    admission: "Free",
    bestFor: "Culture Lovers, History Buffs, Families",
    goodFor: "English, Families",
    nearestStation: "Akasaka Station",
    officialSite: "",
    whyPeopleLoveIt: "As one of Tokyo's three great festivals, Sanno Matsuri offers a deep dive into Shinto traditions.",
    tipsForVisitors: ["Check the parade schedule in advance.", "Bring comfortable shoes for following the procession."],
  },
];
