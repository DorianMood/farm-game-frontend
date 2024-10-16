export interface RatingItem {
    id: string,
    username: string,
    name: string,
    city?: string,
    ballance: number,
    rank?: number,
}

export interface RatingResponse {
    above: RatingItem[];
    user: {
        id: string;
        username: string;
        ballance?: number;
        createdAt?: string;
        deletedAt?: string;
        name?: string;
        city?: string;
        rank?: number;
    },
    below: RatingItem[];
}

export interface RatingSchema {
    data?: RatingResponse;
    isLoading: boolean;
    error: boolean;
}