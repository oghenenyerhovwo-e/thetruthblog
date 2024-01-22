import {
  businessImg,
  entertainmentImg,
  featuresImg,
  internationalImg,
  newsImg,
  politicsImg,
  sportsImg,
  technologyImg,
} from "@/assets"

const data = [
    {
      "_id": 1,
      "title": "The Future of Renewable Energy",
      "headline": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Vestibulum vehicula tincidunt diam, nec fringilla urna finibus nec.",
      "author": "EcoWatcher",
      "datePublished": "2024-01-01T09:30:00Z",
      "category": ["Technology", "Features"],
      "content": "<div><p>Exploring the latest innovations in renewable energy.</p><blockquote>Experts believe that renewable sources will dominate the energy landscape.</blockquote><p>Details on breakthrough technologies and their impact on sustainability.</p></div>",
      "image": technologyImg,
      "source": "GreenTech Today",
      "tags": ["Renewable Energy", "Sustainability", "Innovations"],
      "comments": [
        {
          "_id": 101,
          "username": "GreenLover",
          "email": "green@example.com",
          "text": "This is fantastic news for the environment!",
          "datePublished": "2024-02-01T10:00:00Z"
        },
        {
          "_id": 102,
          "username": "TechGeek",
          "email": "techgeek@example.com",
          "text": "How can individuals contribute to the transition to renewable energy?",
          "datePublished": "2024-02-01T11:30:00Z"
        }
      ],
      "seoMetaData": {
        "metaTitle": "The Future of Renewable Energy - GreenTech Today",
        "metaDescription": "Exploring the latest innovations in renewable energy and their impact on sustainability.",
        "metaKeywords": ["Renewable Energy", "Sustainability", "Innovations"]
      },
      "numberOfSocialMediaShares": 120,
    },
    {
        "_id": 2,
        "title": "Political Landscape in 2024",
        "headline": "Fusce tincidunt augue ut elit lacinia, at tristique nulla hendrerit. Integer aliquet leo ut semper vestibulum. Vivamus malesuada sagittis urna, a iaculis odio fringilla eu.",
        "author": "PoliticalAnalyst",
        "datePublished": "2024-02-05T15:45:00Z",
        "category": ["Politics", "News"],
        "content": "<div><p>An analysis of the current political landscape and key events shaping the year.</p><blockquote>Experts discuss the impact of recent policy changes on various sectors.</blockquote><p>Insights into upcoming elections and geopolitical shifts.</p></div>",
        "image": politicsImg,
        "source": "PolicyWatch",
        "tags": ["Politics", "Elections", "Geopolitics"],
        "comments": [
          {
            "_id": 201,
            "username": "PoliticalObserver",
            "email": "observer@example.com",
            "text": "This is a crucial year for political developments!",
            "datePublished": "2024-02-05T16:30:00Z"
          },
          {
            "_id": 202,
            "username": "DebateEnthusiast",
            "email": "debater@example.com",
            "text": "I would love to see more discussions on these topics.",
            "datePublished": "2024-02-05T17:15:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Political Landscape in 2024 - PolicyWatch",
          "metaDescription": "An analysis of the current political landscape and key events shaping the year.",
          "metaKeywords": ["Politics", "Elections", "Geopolitics"]
        },
        "numberOfSocialMediaShares": 90
      },     
      {
        "_id": 3,
        "title": "Entertainment Buzz: Latest Movies and Trends",
        "headline": "Nunc nec semper justo. Curabitur rhoncus nibh ut velit dignissim, at sagittis libero dictum. Quisque ut efficitur odio. In hac habitasse platea dictumst.",
        "author": "Cinephile",
        "datePublished": "2024-02-10T12:00:00Z",
        "category": ["Entertainment", "Features"],
        "content": "<div><p>Exploring the latest movie releases and entertainment trends.</p><blockquote>Critics' reviews on must-watch films and popular cultural phenomena.</blockquote><p>Insights into the evolving landscape of the entertainment industry.</p></div>",
        "image": entertainmentImg,
        "source": "FilmInsider",
        "tags": ["Movies", "Entertainment", "Cultural Trends"],
        "comments": [
          {
            "_id": 301,
            "username": "MovieBuff",
            "email": "moviebuff@example.com",
            "text": "I'm excited to check out these new releases!",
            "datePublished": "2024-02-10T13:30:00Z"
          },
          {
            "_id": 302,
            "username": "CulturalExplorer",
            "email": "culture@example.com",
            "text": "This article captures the essence of current cultural shifts.",
            "datePublished": "2024-02-10T14:15:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Entertainment Buzz: Latest Movies and Trends - FilmInsider",
          "metaDescription": "Exploring the latest movie releases and entertainment trends.",
          "metaKeywords": ["Movies", "Entertainment", "Cultural Trends"]
        },
        "numberOfSocialMediaShares": 180
      },
      {
        "_id": 4,
        "title": "International Business Trends: Global Markets 2024",
        "headline": "Sed feugiat, ligula id sodales tincidunt, augue nisi commodo tortor, eget consequat risus sapien eget est. Phasellus vel massa at nunc dictum volutpat.",
        "author": "GlobalBusinessInsider",
        "datePublished": "2024-02-15T09:00:00Z",
        "category": ["Business", "International"],
        "content": "<div><p>An in-depth analysis of current trends in international business and global markets.</p><blockquote>Insights into the economic impact of geopolitical events and trade agreements.</blockquote><p>Strategies for businesses navigating the complexities of the global economy.</p></div>",
        "image": businessImg,
        "source": "GlobalBizReview",
        "tags": ["Business", "Global Markets", "Economic Trends"],
        "comments": [
          {
            "_id": 401,
            "username": "GlobalInvestor",
            "email": "investor@example.com",
            "text": "This is valuable information for making investment decisions.",
            "datePublished": "2024-02-15T10:30:00Z"
          },
          {
            "_id": 402,
            "username": "TradeEnthusiast",
            "email": "trade@example.com",
            "text": "How will trade policies affect international businesses in the coming months?",
            "datePublished": "2024-02-15T11:15:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "International Business Trends: Global Markets 2024 - GlobalBizReview",
          "metaDescription": "An in-depth analysis of current trends in international business and global markets.",
          "metaKeywords": ["Business", "Global Markets", "Economic Trends"]
        },
        "numberOfSocialMediaShares": 150
      },     
      {
        "_id": 5,
        "title": "Advancements in Space Exploration: The Next Frontier",
        "headline": "Proin consequat, lectus sit amet fermentum efficitur, sapien metus luctus elit, et commodo elit urna vel est. Integer non nunc vel quam eleifend ullamcorper.",
        "author": "SpaceEnthusiast",
        "datePublished": "2024-02-20T14:30:00Z",
        "category": ["Science", "Technology", "International"],
        "content": "<div><p>Exploring recent breakthroughs in space exploration and the future of interstellar travel.</p><blockquote>Experts discuss plans for upcoming space missions and collaborations between nations.</blockquote><p>The impact of space advancements on scientific knowledge and international cooperation.</p></div>",
        "image": technologyImg,
        "source": "SpaceNewsDaily",
        "tags": ["Space Exploration", "Science", "International Collaboration"],
        "comments": [
          {
            "_id": 501,
            "username": "Stargazer",
            "email": "stargazer@example.com",
            "text": "Exciting times for space enthusiasts!",
            "datePublished": "2024-02-20T15:00:00Z"
          },
          {
            "_id": 502,
            "username": "ScienceLover",
            "email": "science@example.com",
            "text": "How will these advancements contribute to our understanding of the universe?",
            "datePublished": "2024-02-20T16:00:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Advancements in Space Exploration: The Next Frontier - SpaceNewsDaily",
          "metaDescription": "Exploring recent breakthroughs in space exploration and the future of interstellar travel.",
          "metaKeywords": ["Space Exploration", "Science", "International Collaboration"]
        },
        "numberOfSocialMediaShares": 200
      },
      {
        "_id": 6,
        "title": "Health and Wellness: Latest Trends and Research",
        "headline": "Vivamus ac tortor vitae felis luctus posuere. Pellentesque quis odio at risus posuere tristique. Nulla facilisi. Mauris et urna nec odio imperdiet tincidunt.",
        "author": "WellnessExpert",
        "datePublished": "2024-02-25T11:00:00Z",
        "category": ["Health", "Features"],
        "content": "<div><p>Exploring the latest trends in health and wellness, backed by scientific research.</p><blockquote>Experts discuss the impact of lifestyle choices on overall well-being and preventive healthcare measures.</blockquote><p>Insights into emerging technologies and approaches in the health and wellness industry.</p></div>",
        "image": featuresImg,
        "source": "WellnessToday",
        "tags": ["Health", "Wellness", "Preventive Healthcare"],
        "comments": [
          {
            "_id": 601,
            "username": "HealthyLiving",
            "email": "health@example.com",
            "text": "This is valuable information for maintaining a healthy lifestyle.",
            "datePublished": "2024-02-25T11:30:00Z"
          },
          {
            "_id": 602,
            "username": "WellnessExplorer",
            "email": "wellness@example.com",
            "text": "How can individuals incorporate these trends into their daily lives?",
            "datePublished": "2024-02-25T12:15:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Health and Wellness: Latest Trends and Research - WellnessToday",
          "metaDescription": "Exploring the latest trends in health and wellness, backed by scientific research.",
          "metaKeywords": ["Health", "Wellness", "Preventive Healthcare"]
        },
        "numberOfSocialMediaShares": 160
      },
      {
        "_id": 7,
        "title": "Exploring Culinary Wonders: Global Food Festivals",
        "headline": "Duis euismod justo id nulla bibendum, in tristique elit ultrices. Suspendisse potenti. Quisque vitae bibendum nisl. Sed ullamcorper vel odio eget fringilla.",
        "author": "FoodExplorer",
        "datePublished": "2024-03-01T18:45:00Z",
        "category": ["Food", "Entertainment", "International"],
        "content": "<div><p>Discovering unique and diverse cuisines showcased at global food festivals.</p><blockquote>Chefs and food enthusiasts share their experiences and favorite dishes from around the world.</blockquote><p>A journey into the cultural and culinary richness of international food events.</p></div>",
        "image": internationalImg,
        "source": "FoodieGlobe",
        "tags": ["Food", "Culinary Exploration", "International Cuisine"],
        "comments": [
          {
            "_id": 701,
            "username": "FoodieAdventurer",
            "email": "foodie@example.com",
            "text": "I can't wait to attend some of these festivals!",
            "datePublished": "2024-03-01T19:15:00Z"
          },
          {
            "_id": 702,
            "username": "CulturalFoodie",
            "email": "culturefood@example.com",
            "text": "How do these festivals contribute to cultural exchange?",
            "datePublished": "2024-03-01T20:00:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Exploring Culinary Wonders: Global Food Festivals - FoodieGlobe",
          "metaDescription": "Discovering unique and diverse cuisines showcased at global food festivals.",
          "metaKeywords": ["Food", "Culinary Exploration", "International Cuisine"]
        },
        "numberOfSocialMediaShares": 180
      },
      {
        "_id": 8,
        "title": "Sports Highlights: Thrilling Moments of the Season",
        "headline": "Aliquam erat volutpat. Integer id tortor vel justo consectetur tristique. Aenean in nulla eget leo posuere eleifend. Vivamus nec ligula non purus bibendum pulvinar.",
        "author": "SportsFanatic",
        "datePublished": "2024-03-07T14:00:00Z",
        "category": ["Sports", "Entertainment"],
        "content": "<div><p>Recapping the most thrilling moments and standout performances in the sports season.</p><blockquote>Highlights from memorable games and competitions across different sports.</blockquote><p>Insights into emerging talents and records broken during the season.</p></div>",
        "image": sportsImg,
        "source": "SportsInsider",
        "tags": ["Sports", "Highlights", "Athletes"],
        "comments": [
          {
            "_id": 801,
            "username": "SportsEnthusiast",
            "email": "sports@example.com",
            "text": "These moments make being a sports fan so exciting!",
            "datePublished": "2024-03-07T14:30:00Z"
          },
          {
            "_id": 802,
            "username": "GameAnalysis",
            "email": "analysis@example.com",
            "text": "Analyzing the strategic moves that led to these highlights would be fascinating.",
            "datePublished": "2024-03-07T15:15:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Sports Highlights: Thrilling Moments of the Season - SportsInsider",
          "metaDescription": "Recapping the most thrilling moments and standout performances in the sports season.",
          "metaKeywords": ["Sports", "Highlights", "Athletes"]
        },
        "numberOfSocialMediaShares": 220
      },
      {
        "_id": 9,
        "title": "Tech Gadgets: Future Innovations Unveiled",
        "headline": "Phasellus sit amet libero non elit malesuada ultrices. Fusce euismod dapibus diam vel fermentum. Curabitur non risus vitae nunc consequat fermentum in at ipsum.",
        "author": "TechGeek",
        "datePublished": "2024-03-12T11:30:00Z",
        "category": ["Technology", "Features"],
        "content": "<div><p>Showcasing the latest and most innovative tech gadgets set to revolutionize the market.</p><blockquote>Insights into cutting-edge technologies and their potential impact on daily life.</blockquote><p>Exploring the intersection of design, functionality, and technological advancements.</p></div>",
        "image": technologyImg,
        "source": "GadgetTrends",
        "tags": ["Technology", "Gadgets", "Innovations"],
        "comments": [
          {
            "_id": 901,
            "username": "TechEnthusiast",
            "email": "tech@example.com",
            "text": "I can't wait to get my hands on these gadgets!",
            "datePublished": "2024-03-12T12:00:00Z"
          },
          {
            "_id": 902,
            "username": "FutureTech",
            "email": "futuretech@example.com",
            "text": "How will these innovations shape the future of technology?",
            "datePublished": "2024-03-12T13:00:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Tech Gadgets: Future Innovations Unveiled - GadgetTrends",
          "metaDescription": "Showcasing the latest and most innovative tech gadgets set to revolutionize the market.",
          "metaKeywords": ["Technology", "Gadgets", "Innovations"]
        },
        "numberOfSocialMediaShares": 180
      },
      {
        "_id": 10,
        "title": "Global Perspectives: Cultural Exchanges in 2024",
        "headline": "Etiam eu efficitur turpis. Sed hendrerit, quam a gravida volutpat, elit orci scelerisque dui, ac accumsan ligula sapien eu sem. Nunc ultricies efficitur arcu eu vestibulum.",
        "author": "CulturalExplorer",
        "datePublished": "2024-03-18T15:45:00Z",
        "category": ["International", "Features"],
        "content": "<div><p>Exploring the impact of cultural exchanges on societies worldwide in the current year.</p><blockquote>Insights into collaborative projects, festivals, and initiatives fostering cross-cultural understanding.</blockquote><p>Highlighting stories of individuals contributing to a more interconnected world.</p></div>",
        "image": internationalImg,
        "source": "GlobalConnections",
        "tags": ["Cultural Exchanges", "International Relations", "Global Unity"],
        "comments": [
          {
            "_id": 1001,
            "username": "CulturalDiplomat",
            "email": "diplomat@example.com",
            "text": "These initiatives are essential for fostering peace and understanding.",
            "datePublished": "2024-03-18T16:15:00Z"
          },
          {
            "_id": 1002,
            "username": "GlobalCitizen",
            "email": "global@example.com",
            "text": "How can individuals actively participate in cultural exchange programs?",
            "datePublished": "2024-03-18T17:00:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Global Perspectives: Cultural Exchanges in 2024 - GlobalConnections",
          "metaDescription": "Exploring the impact of cultural exchanges on societies worldwide in the current year.",
          "metaKeywords": ["Cultural Exchanges", "International Relations", "Global Unity"]
        },
        "numberOfSocialMediaShares": 150
      },
      {
        "_id": 11,
        "title": "Breaking Discoveries in Medical Research",
        "headline": "Morbi id velit vel nunc fermentum ullamcorper. In hac habitasse platea dictumst. Maecenas sit amet mauris eu odio dapibus convallis. Suspendisse potenti.",
        "author": "MedicalResearcher",
        "datePublished": "2024-03-23T13:15:00Z",
        "category": ["Health", "News"],
        "content": "<div><p>Highlighting recent breakthroughs and discoveries in the field of medical research.</p><blockquote>Insights into promising treatments, experimental therapies, and advancements in understanding diseases.</blockquote><p>Exploring the potential impact on healthcare and patient outcomes.</p></div>",
        "image": newsImg,
        "source": "HealthInsights",
        "tags": ["Medical Research", "Healthcare", "Scientific Discoveries"],
        "comments": [
          {
            "_id": 1101,
            "username": "HealthResearcher",
            "email": "healthresearch@example.com",
            "text": "These discoveries could revolutionize the medical field!",
            "datePublished": "2024-03-23T13:45:00Z"
          },
          {
            "_id": 1102,
            "username": "PatientAdvocate",
            "email": "advocate@example.com",
            "text": "How can patients benefit from these advancements?",
            "datePublished": "2024-03-23T14:30:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Breaking Discoveries in Medical Research - HealthInsights",
          "metaDescription": "Highlighting recent breakthroughs and discoveries in the field of medical research.",
          "metaKeywords": ["Medical Research", "Healthcare", "Scientific Discoveries"]
        },
        "numberOfSocialMediaShares": 190
      },
      {
        "_id": 12,
        "title": "Environmental Conservation: Protecting Biodiversity",
        "headline": "Vestibulum consectetur quam vitae urna fermentum, in iaculis ipsum pulvinar. Proin condimentum, lacus eget laoreet hendrerit, turpis augue malesuada nulla.",
        "author": "EnvironmentalActivist",
        "datePublished": "2024-03-28T10:00:00Z",
        "category": ["Environment", "Features"],
        "content": "<div><p>Examining efforts and initiatives aimed at preserving biodiversity and combating environmental challenges.</p><blockquote>Stories of successful conservation projects, wildlife protection, and sustainable practices.</blockquote><p>Raising awareness about the importance of preserving ecosystems for future generations.</p></div>",
        "image": featuresImg,
        "source": "GreenPlanet",
        "tags": ["Environmental Conservation", "Biodiversity", "Sustainability"],
        "comments": [
          {
            "_id": 1201,
            "username": "EcoWarrior",
            "email": "ecowarrior@example.com",
            "text": "These stories inspire me to contribute to environmental conservation!",
            "datePublished": "2024-03-28T10:30:00Z"
          },
          {
            "_id": 1202,
            "username": "WildlifeEnthusiast",
            "email": "wildlife@example.com",
            "text": "How can individuals actively participate in conservation efforts?",
            "datePublished": "2024-03-28T11:15:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Environmental Conservation: Protecting Biodiversity - GreenPlanet",
          "metaDescription": "Examining efforts and initiatives aimed at preserving biodiversity and combating environmental challenges.",
          "metaKeywords": ["Environmental Conservation", "Biodiversity", "Sustainability"]
        },
        "numberOfSocialMediaShares": 220
      },
      {
        "_id": 13,
        "title": "The Art of Travel: Exploring Hidden Gems",
        "headline": "Nulla facilisi. Duis vel enim euismod, accumsan libero vitae, ultrices justo. Vivamus eu nunc nec felis efficitur commodo at at augue.",
        "author": "TravelExplorer",
        "datePublished": "2024-04-02T15:45:00Z",
        "category": ["Travel", "Features"],
        "content": "<div><p>Uncovering lesser-known travel destinations, cultural experiences, and hidden gems around the world.</p><blockquote>Insights into unique traditions, local cuisines, and off-the-beaten-path adventures.</blockquote><p>Encouraging travelers to embrace the diversity of global cultures and create meaningful connections.</p></div>",
        "image": featuresImg,
        "source": "WanderlustJourney",
        "tags": ["Travel", "Cultural Exploration", "Hidden Gems"],
        "comments": [
          {
            "_id": 1301,
            "username": "AdventurousSoul",
            "email": "adventurous@example.com",
            "text": "These destinations are now on my travel bucket list!",
            "datePublished": "2024-04-02T16:15:00Z"
          },
          {
            "_id": 1302,
            "username": "CulturalNomad",
            "email": "nomad@example.com",
            "text": "How can travelers contribute to the preservation of these hidden gems?",
            "datePublished": "2024-04-02T17:00:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "The Art of Travel: Exploring Hidden Gems - WanderlustJourney",
          "metaDescription": "Uncovering lesser-known travel destinations, cultural experiences, and hidden gems around the world.",
          "metaKeywords": ["Travel", "Cultural Exploration", "Hidden Gems"]
        },
        "numberOfSocialMediaShares": 180
      },     
      {
        "_id": 14,
        "title": "Innovations in Education: Future Learning Trends",
        "headline": "Curabitur vel risus eu quam malesuada malesuada. Etiam ac justo in sapien fermentum bibendum. Nunc eget condimentum velit, vitae bibendum nisl.",
        "author": "EdTechEnthusiast",
        "datePublished": "2024-04-08T13:30:00Z",
        "category": ["Education", "Technology"],
        "content": "<div><p>Exploring the latest innovations in education technology and future trends shaping the learning landscape.</p><blockquote>Insights into personalized learning, virtual classrooms, and the integration of artificial intelligence in education.</blockquote><p>How educators and students are adapting to technological advancements for enhanced learning experiences.</p></div>",
        "image": technologyImg,
        "source": "EdTechInsights",
        "tags": ["Education", "EdTech", "Learning Trends"],
        "comments": [
          {
            "_id": 1401,
            "username": "EduTechie",
            "email": "edutechie@example.com",
            "text": "These innovations have the potential to transform the way we learn!",
            "datePublished": "2024-04-08T14:00:00Z"
          },
          {
            "_id": 1402,
            "username": "StudentPerspective",
            "email": "student@example.com",
            "text": "How can students actively engage with these new learning technologies?",
            "datePublished": "2024-04-08T15:00:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Innovations in Education: Future Learning Trends - EdTechInsights",
          "metaDescription": "Exploring the latest innovations in education technology and future trends shaping the learning landscape.",
          "metaKeywords": ["Education", "EdTech", "Learning Trends"]
        },
        "numberOfSocialMediaShares": 210
      },
      {
        "_id": 15,
        "title": "Fashion Forward: Trends for the upcoming Season",
        "headline": "Aenean ultrices elit vitae erat interdum, eu dignissim turpis ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        "author": "Fashionista",
        "datePublished": "2024-04-15T14:15:00Z",
        "category": ["Fashion", "Entertainment"],
        "content": "<div><p>Showcasing the latest fashion trends, designer collections, and style inspirations for the upcoming season.</p><blockquote>Insights into sustainable fashion choices, emerging designers, and cultural influences on fashion.</blockquote><p>Encouraging readers to express themselves through diverse and evolving fashion choices.</p></div>",
        "image": entertainmentImg,
        "source": "StyleInsider",
        "tags": ["Fashion", "Style", "Trends"],
        "comments": [
          {
            "_id": 1501,
            "username": "FashionEnthusiast",
            "email": "fashion@example.com",
            "text": "I can't wait to update my wardrobe with these trends!",
            "datePublished": "2024-04-15T14:45:00Z"
          },
          {
            "_id": 1502,
            "username": "TrendWatcher",
            "email": "trendwatcher@example.com",
            "text": "How can individuals stay informed about the ever-changing fashion landscape?",
            "datePublished": "2024-04-15T15:30:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "Fashion Forward: Trends for the upcoming Season - StyleInsider",
          "metaDescription": "Showcasing the latest fashion trends, designer collections, and style inspirations for the upcoming season.",
          "metaKeywords": ["Fashion", "Style", "Trends"]
        },
        "numberOfSocialMediaShares": 180
      },
      {
        "_id": 16,
        "title": "The Future of Work: Remote Collaboration Strategies",
        "headline": "Aenean ultrices elit vitae erat interdum, eu dignissim turpis ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        "author": "WorkplaceInnovator",
        "datePublished": "2024-04-22T11:30:00Z",
        "category": ["Business", "Technology"],
        "content": "<div><p>Examining the future of work and strategies for effective remote collaboration in modern workplaces.</p><blockquote>Insights into virtual team building, digital communication tools, and the evolving nature of workspaces.</blockquote><p>Navigating the challenges and opportunities of a more flexible and remote-oriented work culture.</p></div>",
        "image": businessImg,
        "source": "WorkplaceTrends",
        "tags": ["Future of Work", "Remote Collaboration", "Digital Workspaces"],
        "comments": [
          {
            "_id": 1601,
            "username": "RemoteWorker",
            "email": "remoteworker@example.com",
            "text": "These insights are crucial for adapting to the changing work environment.",
            "datePublished": "2024-04-22T12:00:00Z"
          },
          {
            "_id": 1602,
            "username": "WorkplaceInnovatorFan",
            "email": "innovatorfan@example.com",
            "text": "How can organizations foster a sense of collaboration in remote teams?",
            "datePublished": "2024-04-22T13:00:00Z"
          }
        ],
        "seoMetaData": {
          "metaTitle": "The Future of Work: Remote Collaboration Strategies - WorkplaceTrends",
          "metaDescription": "Examining the future of work and strategies for effective remote collaboration in modern workplaces.",
          "metaKeywords": ["Future of Work", "Remote Collaboration", "Digital Workspaces"]
        },
        "numberOfSocialMediaShares": 220
      },                                                      
  ]
  
export default data