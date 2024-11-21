export interface EloRatingInput {
  rating1: number;
  rating2: number;
  score1: number;
  score2: number;
  k: number;
}

export interface TeamAverageRatingInput {
  id: string;
  score: number;
  participations: {
    player: {
      rating: number;
    };
  }[];
}
