export interface RatingItem {
    "id": string,
    "username": string,
    "name": string,
    "city"?: string,
    "ballance": number
}

export interface RatingResponse {
    above: RatingItem[];
    user: {
        id: string;
        username: string;
        ballance?: number;
        createdAt?: string;
        name?: string;
        city?: string;
    },
    below: RatingItem[];
}

export interface RatingSchema {
    data?: RatingResponse;
    isLoading: boolean;
    error: boolean;
}