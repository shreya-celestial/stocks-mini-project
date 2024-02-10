const data = {
  search_metadata: {
    id: "63a6ecdbde983400ad3d6ad0",
    status: "Success",
    json_endpoint:
      "https://serpapi.com/searches/17a37f452a7755fd/63a6ecdbde983400ad3d6ad0.json",
    created_at: "2022-12-24 12:13:15 UTC",
    processed_at: "2022-12-24 12:13:15 UTC",
    google_finance_url:
      "https://www.google.com/finance/quote/GOOGL:NASDAQ?hl=en",
    raw_html_file:
      "https://serpapi.com/searches/17a37f452a7755fd/63a6ecdbde983400ad3d6ad0.html",
    total_time_taken: 1.65,
  },
  search_parameters: {
    engine: "google_finance",
    q: "GOOGL:NASDAQ",
    hl: "en",
  },
  markets: {
    us: [
      {
        stock: ".DJI:INDEXDJX",
        link: "https://www.google.com/finance/quote/.DJI:INDEXDJX",
        serpapi_link:
          "https://serpapi.com/search.json?engine=google_finance&hl=en&q=.DJI%3AINDEXDJX",
        name: "Dow Jones",
        price: 33203.93,
        price_movement: {
          percentage: 0.53422594,
          value: 176.4414,
          movement: "Up",
        },
      },
    ],
    europe: [
      {
        stock: "DAX:INDEXDB",
        link: "https://www.google.com/finance/quote/DAX:INDEXDB",
        serpapi_link:
          "https://serpapi.com/search.json?engine=google_finance&hl=en&q=DAX%3AINDEXDB",
        name: "DAX",
        price: 13940.93,
        price_movement: {
          percentage: 0.19303751,
          value: 26.859375,
          movement: "Up",
        },
      },
    ],
    asia: [
      {
        stock: "NI225:INDEXNIKKEI",
        link: "https://www.google.com/finance/quote/NI225:INDEXNIKKEI",
        serpapi_link:
          "https://serpapi.com/search.json?engine=google_finance&hl=en&q=NI225%3AINDEXNIKKEI",
        name: "Nikkei 225",
        price: 26235.25,
        price_movement: {
          percentage: 1.0284461,
          value: 272.61914,
          movement: "Down",
        },
      },
    ],
    currencies: [
      {
        stock: "EUR-USD",
        link: "https://www.google.com/finance/quote/EUR-USD",
        serpapi_link:
          "https://serpapi.com/search.json?engine=google_finance&hl=en&q=EUR-USD",
        name: "EUR / USD",
        price: 1.0666499999999999,
        price_movement: {
          percentage: 0.018746777897546796,
          value: 0.00019999999999997797,
          movement: "Down",
        },
      },
    ],
    crypto: [
      {
        stock: "BTC-USD",
        link: "https://www.google.com/finance/quote/BTC-USD",
        serpapi_link:
          "https://serpapi.com/search.json?engine=google_finance&hl=en&q=BTC-USD",
        name: "Bitcoin",
        price: 16827.100000000002,
        price_movement: {
          percentage: 0.2974274610781385,
          value: 49.900000000001455,
          movement: "Up",
        },
      },
    ],
    futures: [
      {
        stock: "YMW00:CBOT",
        link: "https://www.google.com/finance/quote/YMW00:CBOT",
        serpapi_link:
          "https://serpapi.com/search.json?engine=google_finance&hl=en&q=YMW00%3ACBOT",
        name: "Dow Futures",
        price: 33352.0,
        currency: "USD",
        price_movement: {
          percentage: 0.43363044,
          value: 144.0,
          movement: "Up",
        },
      },
    ],
  },
  graph: [
    {
      price: 87.09,
      currency: "USD",
      date: "Dec 23 2022, 09:30 AM UTC-05:00",
      volume: 4819,
    },
    {
      price: 87.1,
      currency: "USD",
      date: "Dec 23 2022, 09:31 AM UTC-05:00",
      volume: 3824,
    },
    {
      price: 88.19,
      currency: "USD",
      date: "Dec 23 2022, 09:32 AM UTC-05:00",
      volume: 103213,
    },
  ],
  summary: {
    title: "Alphabet Inc Class A",
    stock: "GOOGL",
    exchange: "NASDAQ",
    price: "$89.23",
    extracted_price: 89.23,
    currency: "$",
    price_movement: {
      percentage: 1.6750242,
      value: 1.4700012,
      movement: "Up",
    },
    market: {
      trading: "After Hours",
      price: "$89.05",
      extracted_price: 89.05,
      currency: "$",
      price_movement: {
        percentage: 0.2,
        value: 0.18,
        movement: "Down",
      },
    },
    extensions: ["Closed: Dec 23, 7:59:31 PM GMT-5", "USD", "NASDAQ"],
  },
  knowledge_graph: {
    key_stats: {
      tags: [
        {
          text: "Most active",
          link: "https://www.google.com/finance/markets/most-active",
          serpapi_link:
            "https://serpapi.com/search.json?engine=google_finance_markets&hl=en&trend=most-active",
          description:
            "One of the most heavily traded stocks during the last trading session",
        },
        {
          text: "Stock",
          description:
            "Ownership of a fraction of a corporation and the right to claim a share of the corporation's assets and profits equal to the amount of stock owned",
        },
        {
          text: "US listed security",
          description: "Listed on NASDAQ",
        },
      ],
      stats: [
        {
          label: "Previous close",
          description: "The last closing price",
          value: "$87.76",
        },
        {
          label: "Day range",
          description:
            "The range between the high and low prices over the past day",
          value: "$87.07 - $89.55",
        },
        {
          label: "Year range",
          description:
            "The range between the high and low prices over the past 52 weeks",
          value: "$83.34 - $151.55",
        },
      ],
      climate_change: {
        score: "A-",
        link: "https://www.cdp.net/en/responses/7616",
      },
    },
    about: [
      {
        title: "About",
        description: {
          snippet:
            "Alphabet Inc. is an American multinational technology conglomerate holding company headquartered in Mountain View, California. It was created through a restructuring of Google on October 2, 2015, and became the parent company of Google and several former Google subsidiaries. Alphabet is the world's third-largest technology company by revenue and one of the world's most valuable companies. It is one of the Big Five American information technology companies, alongside Amazon, Apple, Meta and Microsoft.\nThe establishment of Alphabet Inc. was prompted by a desire to make the core Google business \"cleaner and more accountable\" while allowing greater autonomy to group companies that operate in businesses other than Internet services. Founders Larry Page and Sergey Brin announced their resignation from their executive posts in December 2019, with the CEO role to be filled by Sundar Pichai, also the CEO of Google. Page and Brin remain employees, board members, and controlling shareholders of Alphabet Inc. ",
          link: "https://en.wikipedia.org/wiki/Alphabet_Inc.",
          link_text: "Wikipedia",
        },
        info: [
          {
            label: "CEO",
            value: "Sundar Pichai",
            link: "https://www.google.com/search?q=Sundar%20Pichai&hl=en-US",
          },
          {
            label: "Founded",
            value: "Oct 2, 2015",
          },
          {
            label: "Headquarters",
            value: "Mountain View, CaliforniaUnited States",
            link: "https://www.google.com/maps/place/1600%20Amphitheatre%20Pkwy%2C%20Mountain%20View%2C%20California%2C%20United%20States?hl=en-US",
          },
        ],
      },
    ],
  },
  news_results: [
    {
      title: "Top news",
      items: [
        {
          title:
            "Why Isn't Warren Buffett Buying Alphabet (Google) Stock Hand Over Fist?",
          link: "https://www.fool.com/investing/2022/12/22/warren-buffett-isnt-buying-alphabet-google-stock/",
          source: "The Motley Fool",
          date: "2 days ago",
          thumbnail:
            "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ2w2781KGgwAz8HpB-tKa4j7SkT7mOfrGSsmCDZcJr-cEadbMoJ5sMUP8Le2I",
        },
      ],
    },
    {
      title: "Interviews",
      items: [
        {
          title:
            "We want to be a responsible local firm, assist in Digital India vision: Google CEO Sundar Pichai",
          link: "https://m.economictimes.com/tech/technology/we-want-to-be-a-responsible-local-firm-assist-in-digital-india-vision-sundar-pichai/articleshow/96379536.cms",
          source: "The Economic Times",
          date: "3 days ago",
        },
      ],
    },
    {
      title: "Why GOOG Stock Is a Value Trap for 2023",
      link: "https://investorplace.com/market360/2022/12/goog-stock-it-could-be-sideways-from-here-in-2023/",
      source: "InvestorPlace",
      date: "3 days ago",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8uSFVASgsUQ_5SyR-rk46KRWKtjXLH1fIovQx3SdcKBrLNlaQwYyv2DOeJc",
    },
  ],
  financials: [
    {
      title: "Income Statement",
      results: [
        {
          date: "Sep 2022",
          table: [
            {
              title: "Revenue",
              description:
                "The total amount of income generated by the sale of goods or services related to the company's primary operations",
              value: "69.09B",
              change: "6.10%",
            },
          ],
        },
      ],
    },
    {
      title: "Balance Sheet",
      results: [
        {
          date: "Sep 2022",
          table: [
            {
              title: "Cash and short-term investments",
              description:
                "Investments that are relatively liquid and have maturities between 3 months and one year",
              value: "116.26B",
              change: "-18.13%",
            },
          ],
        },
      ],
    },
    {
      title: "Cash Flow",
      results: [
        {
          date: "Sep 2022",
          table: [
            {
              title: "Net income",
              description:
                "Company’s earnings for a period net of operating costs, taxes, and interest",
              value: "13.91B",
              change: "-26.54%",
            },
          ],
        },
      ],
    },
  ],
  discover_more: [
    {
      title: "You may be interested in",
      items: [
        {
          stock: ".DJI:INDEXDJX",
          link: "https://www.google.com/finance/quote/.DJI:INDEXDJX",
          name: "Dow Jones Industrial Average",
          price: "33,203.93",
          extracted_price: 33203.93,
          price_movement: {
            percentage: 0.53,
            movement: "Up",
          },
        },
      ],
    },
    {
      title: "People also search for",
      items: [
        {
          stock: "AMZN:NASDAQ",
          link: "https://www.google.com/finance/quote/AMZN:NASDAQ",
          name: "Amazon.com, Inc.",
          price: "$85.25",
          extracted_price: 85.25,
          currency: "$",
          price_movement: {
            percentage: 1.74,
            movement: "Up",
          },
        },
      ],
    },
  ],
};

export default data;
