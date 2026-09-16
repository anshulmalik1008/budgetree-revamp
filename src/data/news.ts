export type Release = {
  tag: string;
  title: string;
  summary: string;
  date: string;
  place: string;
  image: string;
};

export const FEATURED_RELEASE: Release = {
  tag: "Product Launch",
  title:
    "Budgetree Launches 14th Edition: One Platform for Employee Rewards, Vouchers & Engagement",
  summary:
    "Budgetree Technology Pvt. Ltd. unveils its 14th Edition platform—unifying employee rewards, food and fuel vouchers, gift cards, incentive campaigns, and real-time budget tracking for enterprises.",
  date: "20 Mar 2026",
  place: "India",
  image: "/images/live/news-14th.jpg",
};

export const RELEASES: Release[] = [
  {
    tag: "Product Launch",
    title: "Budgetree Unveils Gift Card API to Issue Digital Gift Cards from 350+ Brands",
    summary:
      "Enterprises, fintechs, and loyalty platforms can now issue, deliver, and track digital gift cards through Budgetree's REST-based Gift Card API—built for corporate gifting, rewards, and high-volume campaigns.",
    date: "10 Jul 2026",
    place: "India",
    image: "/images/live/news-api.jpg",
  },
  {
    tag: "Company News",
    title: "Budgetree Expands Siripay Gift Cards and Launches Global Marketplace for Corporate Gifting",
    summary:
      "Budgetree announces growth of its Siripay gift-card app and the launch of a global marketplace connecting merchants and customers to broader digital and physical gifting options.",
    date: "22 Sep 2024",
    place: "India",
    image: "/images/live/news-marketplace.jpg",
  },
  {
    tag: "Industry",
    title: "Budgetree Powers Automobile Customer Loyalty with Instant UPI Rewards",
    summary:
      "Budgetree introduces UPI-based loyalty solutions for automobile brands, dealerships, and service centers—delivering real-time cashback and incentives that drive retention and after-sales engagement.",
    date: "25 Mar 2025",
    place: "India",
    image: "/images/live/news-auto.jpg",
  },
  {
    tag: "Insights",
    title: "Budgetree Insights: Digital Rewards and Real-Time Payouts Redefine Corporate Gifting in 2025",
    summary:
      "In its Insights Vol. 13 release, Budgetree outlines how data-driven digital rewards, personalized gift cards, and instant payouts are transforming employee motivation, partner incentives, and customer loyalty.",
    date: "19 Jun 2025",
    place: "India",
    image: "/images/live/news-insights.jpg",
  },
];

export const PRESS_EMAIL = "sales@budgetree.in";
