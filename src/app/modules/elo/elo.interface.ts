export interface EloRatingDTO {
  rating1: number;
  rating2: number;
  score1: number;
  score2: number;
  k: number;
}

export interface TeamAverageRatingDTO {
  id: string;
  score: number;
  participations: {
    player: {
      rating: number;
    };
  }[];
}
