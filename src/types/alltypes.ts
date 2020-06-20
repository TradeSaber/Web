export enum Status {
    Anonymous,
    Loading,
    LoggedIn
}

export enum ShareSaberRole {
    None = 0,
    Verified = 1,
    Trusted = 2,
    Supporter = 4,
    Admin = 8,
    Owner = 16
}

export enum Rarity {
    Common = 0,
    Uncommon = 1,
    Rare = 2,
    Legendary = 3
}

export interface ProbabilityDatum {
    id: string;
    probabilityboost: number;
}

export interface DiscordUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
}

export interface User {
    banned: boolean;
    discordid: string;
    role: ShareSaberRole;
    profile: DiscordUser;
    inventory: string[];
    unopenedpacks: string[];
}

export interface Card {
    id: string;
    series: string;
    name: string;
    description: string;
    master: string;
    maxprints: number;
    rarity: Rarity;
    locked: boolean;
    baseprobability: number;
    coverURL: string;
}

export interface Pack {
    id: string;
    name: string;
    description: string;
    count: number;
    lockedcardpool: ProbabilityDatum[];
    guaranteedcards: string[];
    guaranteedrarities: Rarity[];
    theme: string;
    coverurl: string;
}

export interface Series {
    id: string;
    name: string;
    description: string;
}