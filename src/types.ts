export type DateRanges = "daily" | "weekly" | "montly";

export type Type = "repositories" | "developers";

export type TrendingRepository = {
  author: string
  avatar: string
  name: string
  url: string
  description: string
  language: string
  color: string
  stars: number
  forks: number
  builtBy: any
  periodStars: number
};

export type TrendingDeveloper = {
  username: string
  name: string
  type: string
  url: string
  sponsorUrl: string | undefined
  avatar: string
  repo: any
};

export type TrendingItem = TrendingRepository | TrendingDeveloper;
