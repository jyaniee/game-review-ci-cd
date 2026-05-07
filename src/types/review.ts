export type GameGenre = "RPG" | "FPS" | "MOBA" | "Action" | "Adventure" | "Simulation";

export interface GameReview {
    id: number;
    title: string;
    genre: GameGenre;
    rating: number;
    summary: string;
    detail: string;
    recommended: boolean;
}