export type DateRanges = "daily" | "weekly" | "montly";

export type Type = "repositories" | "developers";

export interface TrendingRepository {
  url: string;
  username: string;
  reponame: string;
  description: string;
  stars: string;
  forks: string;
}

export interface TrendingDeveloper {
  url: string;
  username: string;
  reponame: string;
  description: string;
  stars: string;
  forks: string;
}

export type TrendingItem = TrendingRepository | TrendingDeveloper;
