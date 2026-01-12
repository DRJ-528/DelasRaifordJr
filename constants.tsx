import { Project, ThemeConfig, GalleryItem } from './types';

export const DELAS_INFO = {
  name: "Delas Raiford Jr.",
  role: "Senior Creative Branding, Design & Direction",
  location: "Yorba Linda, CA",
  phone: "+1 714 485-9211",
  email: "delas@delasraifordjr.com",
  website: "www.delasraifordjr.com",
  linkedin: "linkedin.com/in/delasraifordjr/",
  philosophy: "Directing visual storytelling for global brands. 20+ years of mastery in the creative lifecycle.",
  summary: "Senior level branding and creative professional with over 20 years of experience translating complex business objectives into compelling visual solutions for global brands. A versatile, hands-on leader skilled in managing the entire creative lifecycle — from concept to final execution across print, web, video, and large-scale event campaigns.",
  stats: [
    { label: "Years Creative Experience", value: "20+" },
    { label: "Years Agency Experience", value: "5+" },
    { label: "Years Art Direction", value: "10+" }
  ],
  skills: {
    creatives: ["Art Direction", "Brand Identity", "Strategic Marketing", "Trade Show & Event Design", "Social Media Strategy"],
    software: ["Adobe Creative Cloud", "3D Visualization", "Design Systems Management", "Motion Graphics", "Generative AI Integration"],
    multimedia: ["Studio & Location Photography", "Video Production", "Video Editing", "Environmental Graphics"],
    business: ["Salesforce", "SproutSocial", "SharePoint", "Microsoft 365", "Google Workspace"]
  },
  experience: [
    {
      title: "Senior Graphic Designer",
      company: "Solera Holdings, Inc.",
      location: "Westlake, TX (Remote)",
      period: "Jan 2023 - Sept 2025",
      highlights: [
        "Designed and produced visual assets for key industry trade shows, including large-format booth graphics, keynote presentations, and promotional collateral, ensuring a powerful, consistent and professional brand presence.",
        "Created a high volume of on-brand social media graphics for integrated marketing campaigns designed to improve audience engagement and brand visibility.",
        "Conceptualized and executed a full suite of marketing materials for high-profile product launches to successfully drive lead generation and support sales objectives."
      ]
    },
    {
      title: "Creative & Digital Media Manager",
      company: "Spireon, Inc.",
      location: "Irvine, CA (Remote)",
      period: "May 2017 - Jan 2023",
      highlights: [
        "Directed the end-to-end creative for the company’s presence at major national trade shows, including booth design and all supporting materials, consistently drawing high levels of attendee traffic and interest.",
        "Managed the social media content strategy and visual execution for two corporate brands, successfully growing online communities and establishing a consistent, professional brand voice.",
        "Directed the creative strategy for all print and digital channels, ensuring brand consistency and market differentiation across national advertising campaigns, product catalogs, and sales collateral."
      ]
    },
    {
      title: "Photographer & Graphic Designer",
      company: "Jacuzzi, Inc.",
      location: "Chino Hills, CA",
      period: "Dec 2015 - Aug 2016",
      highlights: [
        "Art directed, managed, and executed product and lifestyle photoshoots, producing high-quality imagery used in national print advertising, social media, and event displays.",
        "Designed print and web assets for both marketing and internal sales departments, ensuring a cohesive brand experience from consumer advertising to sales enablement tools."
      ]
    },
    {
      title: "Senior Graphic Designer & Photographer",
      company: "Top Street Performance, Inc.",
      location: "Santa Fe Springs, CA",
      period: "2014 - 2015",
      highlights: [
        "Leading a 3-person team, provided comprehensive creative support for all marketing and sales initiatives, managing the design and production of advertising, collateral, and product photography.",
        "Ensured brand consistency and quality across all visual materials for the aftermarket automotive parts manufacturer."
      ]
    }
  ],
  certifications: [
    "Generative AI Leader | Google Cert (2025)",
    "Gemini for Google Workspace with GenAI | Google (2025)",
    "Generative AI for Digital Marketing | IBM (2025)",
    "Foundations of UX Design | Google (2023)",
    "Sprout Social Platform | Sprout Social (2022)"
  ],
  education: {
    degree: "Bachelor of Fine Arts (B.F.A.), Graphic Design",
    school: "California State University, Fullerton",
    date: "January 2005"
  }
};

export const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const id = (match && match[2].length === 11) ? match[2] : null;
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : url;
};

export const getYouTubeThumbnail = (url: string) => {
  if (!url) return "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const id = (match && match[2].length === 11) ? match[2] : null;
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800";
};

export const THEMES: ThemeConfig[] = [
  {
    id: 'architect-mono',
    name: "Editorial Mono",
    tagline: "Stark Leadership",
    description: "High-contrast aesthetic emphasizing professional rigor and brand clarity.",
    colors: { primary: "#000", secondary: "#FFF", accent: "#ef4444", bg: "#FAFAFA", text: "#000" },
    typography: { header: "Inter", body: "JetBrains Mono" },
    style: 'brutal'
  },
  {
    id: 'architect-kinetic',
    name: "Kinetic Direction",
    tagline: "Fluid Narrative",
    description: "Motion-driven experience showcasing the energy of modern digital branding.",
    colors: { primary: "#0F172A", secondary: "#64748B", accent: "#3b82f6", bg: "#020617", text: "#f8fafc" },
    typography: { header: "Inter", body: "Inter" },
    style: 'kinetic'
  },
  {
    id: 'architect-refined',
    name: "Refined Vision",
    tagline: "Quiet Authority",
    description: "Minimalist, sophisticated approach focusing on spatial harmony and editorial elegance.",
    colors: { primary: "#111827", secondary: "#4B5563", accent: "#111827", bg: "#FFFFFF", text: "#111827" },
    typography: { header: "Playfair Display", body: "Inter" },
    style: 'refined'
  }
];

export const PROJECTS: Project[] = [
  {
    title: "SCON23 + Sylectus",
    category: "Strategic Redesign",
    images: [
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/696163b33ad30b123fa5a0fc_SCON23Image.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69618125138d40e16b0c4c77_SCON23WindowCling-2.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961824691db9d9c37d24307_SCON23WindowCling-3.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/696180120199f907a9a0e97e_SCON23Deck2-1.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69618012b79c3fdfc681a9e0_SCON23Deck2-2.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961801204e40efec1247edf_SCON23Deck2-3.jpg"
    ],
    description: "Comprehensive site rebrand and user conference collateral using strategic photography.",
    challenge: "Modernize a logistics platform website (Sylectus) while maintaining trust with their long-standing user base during a major conference (SCON23).",
    solution: "Leveraged high-impact photoshoot imagery and campaign guidelines to create a sophisticated, tech-forward user conference experience.",
    metrics: "Full Site Migration"
  },
  {
    title: "Newport Brass Lifestyle Presentation",
    category: "Luxury Positioning",
    images: [
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961935f3b6bb4f4444b67e1_2010NewportBrass-Contemporary-Shot1.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69618fc97716f7e77567676d_2010Ginger-Bath1A.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69618fa1c406aebbc3942f2c_DRaiford-LN002.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69618c50361d122b0ab5e386_NewportBrassCatalog.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69618bcdb54258893f770a60_NewportBrassBrochure.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69618d8410fe0597bc14f34d_NewportBrassAd.jpg"
    ],
    description: "High-end catalog direction and marketing systems for national luxury fixtures.",
    challenge: "Elevate product photography catalog and develop lifestyle books and sales assets that showcase 23+ custom finish options.",
    solution: "Coordinated sophisticated showroom photography with refined editorial typography to position the brand as the 'Designer's Choice' in luxury plumbing.",
    metrics: "National Market Reach"
  },
  {
    title: "Top Street Performance Brand Ecosystem",
    category: "Identity Systems",
    images: [
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961ea0fbbb1e3a828f0575e_TSP-BrandGuide.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961a52875d094fbdacee6ca_TSPBrandGuide2015.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961a52929561d978b29b090_TSPCatalog2015.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961e1574ccb72909da73cfe_NewProductPromo-JM6509.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961a64414995e146b9813e5_TSPCooling-C0315.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961e6fe17de8c1cfbf6150d_TSP_GPLB_D3D-2715.jpg",
      "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961a5286fdd6ef7d9cf2951_TSPSiteSEMA_MockUp.jpg"
    ],
    description: "Masterbrand creation and launch strategy for performance automotive components.",
    challenge: "Standardize a disjointed product line into a cohesive 'Masterbrand' guide for the aftermarket performance parts market.",
    solution: "Created the TSP Master Brand and Logo guide, integrating product and events photography with aggressive, high-impact performance marketing.",
    metrics: "Brand Identity Standardized"
  }
];

const requestedVideoEmbedUrl = "https://www.youtube-nocookie.com/embed/FxsqZYG06Kw";

export const GALLERY_ITEMS: GalleryItem[] = [
  // --- PRINT CATEGORY (10 Total) ---
  {
    id: "print-1",
    title: "Sales & Marketing Brochure",
    category: "Print",
    year: "2018 - Spireon, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dc2d07fb0aa366567632c5_Spireon_FleetLocate-GM_Flyer.jpg"
  },
  {
    id: "print-2",
    title: "Trade Show Collateral",
    category: "Print",
    year: "2025 - Solera Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dc2d07fd799f48af78fb64_SD-Guide_Mockup.jpg"
  },
  {
    id: "print-3",
    title: "Marketing Event Sales Poster",
    category: "Print",
    year: "2016 - Jacuzzi, Inc",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/60012c595329ce190a6e87d5_DRaiford_Design-8.jpg"
  },
  {
    id: "print-4",
    title: "Marketing Event Sales Poster",
    category: "Print",
    year: "2016 - Jacuzzi, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/60012f05f6865855850a4135_DRaiford_Design-1.jpg"
  },
  {
    id: "print-5",
    title: "Product Sales Brochure",
    category: "Print",
    year: "2008 - Portobello",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961f81d254adfe5df551416_Portobello_PhoenixBrochure.jpg"
  },
  {
    id: "print-6",
    title: "Magazine Advertisment",
    category: "Print",
    year: "2008 - CCMACS",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6961f81d2ad6dd4c74ab008d_SCUPrintAds.jpg"
  },
  {
    id: "print-7",
    title: "Product Spec Sheet",
    category: "Print",
    year: "2025 - Solera, Inc",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dc2d06117db20f3759a062_Solera_BPT-SpecSheet.jpg"
  },
  {
    id: "print-8",
    title: "Sales Brochure",
    category: "Print",
    year: "2024 - Solera, Inc",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dc2d0650fe6efa64808cc7_SFS_RA-SalesSlick_2025.jpg"
  },
  {
    id: "print-9",
    title: "Event Rollup Banners",
    category: "Print",
    year: "2024 - Solera, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68ddb55f8dde67bf7b227a41_SSHR-Banners_2.jpg"
  },
  {
    id: "print-10",
    title: "Private Event Party Invite",
    category: "Print",
    year: "2024 - Solera, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dd8347f51b5724dbc38bec_Invite-MCE24.jpg"
  },

  // --- DIGITAL CATEGORY (10 Total) ---
  {
    id: "digital-1",
    title: "Event Campaign Socials",
    category: "Digital",
    year: "2025 - Solera, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dd68c33207899a283efb8a_SSHR.jpg"
  },
  {
    id: "digital-2",
    title: "Corporate Socials",
    category: "Digital",
    year: "2025 - Solera, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dd68c3e08dd37fa3126fb9_WIN.jpg"
  },
  {
    id: "digital-3",
    title: "Corporate Holiday Socials",
    category: "Digital",
    year: "2025 - Solera, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dd68c2e524eac1ef981fc8_Holidays.jpg"
  },
  {
    id: "digital-4",
    title: "Event Campaign Email Headers",
    category: "Digital",
    year: "2025 - Solera, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68ddb55fe88db1211f692efb_SSHR-eHeaders_1.jpg"
  },
  {
    id: "digital-5",
    title: "Event Campaign Email Header",
    category: "Digital",
    year: "2024 - Solera, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dd8347fbe9bd3e5fb386fa_EHeader-MCE24-1.jpg"
  },
  {
    id: "digital-6",
    title: "Digital Marketing Banner",
    category: "Digital",
    year: "2015 - Sysonic USA",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69620b4b52120388fb53a5c2_Banner_SYSONIC-01.jpg"
  },
  {
    id: "digital-7",
    title: "Digital Marketing Banner",
    category: "Digital",
    year: "2014 - Top Street Performance",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69620b4a329d782e48f5d8b8_Banner_PRI2014.jpg"
  },
  {
    id: "digital-8",
    title: "Digital Display Ad",
    category: "Digital",
    year: "2018 - Spireon, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69620b4a65787a9da71452f9_SP_DRaiford_FL_FordDemo_Webinar.jpg"
  },
  {
    id: "digital-9",
    title: "Digital Event Display Ad",
    category: "Digital",
    year: "2019 - Spireon, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69620b4a4f106d48d33692f5_SP_FL_HDTWebinar_SMHeader_1000x563_0819.jpg"
  },
  {
    id: "digital-10",
    title: "Event Booth Presentation Deck",
    category: "Digital",
    year: "2024 - Solera, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69621e17cb27286f22c24198_Solera%20Sales%20Deck.jpg"
  },

  // --- PHOTOGRAPHY CATEGORY (10 Total) ---
  {
    id: "photo-1",
    title: "Product Photography (Lifestyle)",
    category: "Photography",
    year: "2016 - Jacuzzi, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6962c85ed64fb7dedca0f165_JHT-DeepSoakNickel-DSC_1120.jpeg"
  },
  {
    id: "photo-2",
    title: "Product Photography (Lifestyle)",
    category: "Photography",
    year: "2012 - Newport Brass, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/60b4069d410a946a2c089261_XX43S-24-PC-DSC_1398.jpg"
  },
  {
    id: "photo-3",
    title: "Product Photography (Lifestyle)",
    category: "Photography",
    year: "2012 - Newport Brass, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/60b4069d4c8cdc26532c0d31_1503-26-DSC_1504.jpg"
  },
  {
    id: "photo-4",
    title: "Product Photography (Studio)",
    category: "Photography",
    year: "2016 - Jacuzzi, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69622f5508352d9ea58df050_SND-DSC_0487-94.jpg"
  },
  {
    id: "photo-5",
    title: "Event Photography",
    category: "Photography",
    year: "2015 - Top Street Performance",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69622f52a0dc00425c90b7f4_GPLB_D3D-041915-1601.jpg"
  },
  {
    id: "photo-6",
    title: "Product Photography (Studio)",
    category: "Photography",
    year: "2014 - Top Street Performance",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69622f551b8df5209174698f_HC6016-a.jpg"
  },
  {
    id: "photo-7",
    title: "Product Photography (Studio)",
    category: "Photography",
    year: "2014 - Top Street Performance",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69622f531c7325da51f3e20c_TaylorWire-Kit1-ai.jpg"
  },
  {
    id: "photo-8",
    title: "Product Photography (Studio)",
    category: "Photography",
    year: "2023 - Spireon, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dc56d479a2e2982bf1eeb7_IntelliScanProVIew-1.jpg"
  },
  {
    id: "photo-9",
    title: "Product Photography (Studio)",
    category: "Photography",
    year: "2024 - Solera, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68dc56d47d75ff008b96c1ab_CamCoach2-1.jpg"
  },
  {
    id: "photo-10",
    title: "Product Photography (Studio)",
    category: "Photography",
    year: "2016 - Jacuzzi, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/60e3f427157a64c9c789a612_DRaiford-JHT_Overhead.jpg"
  },

  // --- VIDEOGRAPHY CATEGORY (07 Total) ---
  {
    id: "video-1",
    title: "Online Video Ad",
    category: "Videography",
    year: "2020 - Athena",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/69632c4b6798963ac5a32132_AthenaThmb.jpg",
    videoUrl: "https://youtu.be/FxsqZYG06Kw?si=--8eueYcIMpEgHP6"
  },
  {
    id: "video-2",
    title: "ATA MCE 2024 Screensaver Video",
    category: "Videography",
    year: "2024 - Solera, Inc.",
    image: getYouTubeThumbnail("https://youtu.be/uA3bUyFzo38"),
    videoUrl: "https://youtu.be/uA3bUyFzo38"
  },
  {
    id: "video-3",
    title: "Newport Brass Behind the Scenes Video",
    category: "Videography",
    year: "2012 - Newport Brass",
    image: getYouTubeThumbnail("https://youtu.be/upZTm-YtfeY"),
    videoUrl: "https://youtu.be/upZTm-YtfeY"
  },
  {
    id: "video-4",
    title: "CAB 2024 Booth Display Screensaver",
    category: "Videography",
    year: "2024 - Solera, Inc.",
    image: getYouTubeThumbnail("https://youtu.be/Dm7E8mVEn0g"),
    videoUrl: "https://youtu.be/Dm7E8mVEn0g"
  },
  {
    id: "video-5",
    title: "Spireon ATI MCE Marketing Video",
    category: "Videography",
    year: "2018 - Spireon, Inc.",
    image: getYouTubeThumbnail("https://youtu.be/wY9kKa8ycTE"),
    videoUrl: "https://youtu.be/wY9kKa8ycTE"
  },
  {
    id: "video-6",
    title: "Spireon Installation Video",
    category: "Videography",
    year: "2017 - Spireon, Inc.",
    image: getYouTubeThumbnail("https://youtu.be/zccINbSi-5M"),
    videoUrl: "https://youtu.be/zccINbSi-5M"
  },
  {
    id: "video-7",
    title: "Spireon Testimonial Interview",
    category: "Videography",
    year: "2017 - Spireon, Inc.",
    image: getYouTubeThumbnail("https://youtu.be/-RqBBkepcYA"),
    videoUrl: "https://youtu.be/-RqBBkepcYA"
  },

  // --- HARD & SOFT GOODS CATEGORY (07 Total) ---
  {
    id: "pkg-1",
    title: "Specialty Event Snack Box",
    category: "Hard & Soft Goods",
    year: "2024 - Solera, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6962e7777e56c11c129b7b87_SoleraCAB24_FiftBox-2c.jpg"
  },
  {
    id: "pkg-2",
    title: "Branded Zippered Hoodie",
    category: "Hard & Soft Goods",
    year: "2015 - Sysonic, USA",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6962f01a91346560dda862e8_SysonicHoodie-2a_fem.jpg"
  },
  {
    id: "pkg-3",
    title: "Car Floor Mat Hanging Packaging Sleeve - DTC",
    category: "Hard & Soft Goods",
    year: "2015 - Sysonic, USA",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6962dccdd4e79bd485aec550_DDD-Header-Card-Blue_MU.jpg"
  },
  {
    id: "pkg-4",
    title: "Car Floor Mat Patterning Design - DTC",
    category: "Hard & Soft Goods",
    year: "2015 - Sysonic, USA",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6962dd5dde18b03c416ce85d_Sysonic_Carmat_3-1.jpg"
  },
  {
    id: "pkg-5",
    title: "White Labeled Product Packaging - DTC",
    category: "Hard & Soft Goods",
    year: "2015 - Top Street Performance",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6962d206246c273d78fbcea9_TSP-WhiteLabel-SWP_Distributor-2.jpg"
  },
  {
    id: "pkg-6",
    title: "Product Packaging - DTC",
    category: "Hard & Soft Goods",
    year: "2009 - ACM Technologies, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6962e171728a23f003d85a12_ACMTech_Cartridgebox-1c.jpg"
  },
  {
    id: "pkg-7",
    title: "Product Packaging - DTC",
    category: "Hard & Soft Goods",
    year: "2012 - Newport Brass, Inc.",
    image: "https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/6962cd7530a74349e48872f2_1839CB-10B-2.jpg"
  }
];