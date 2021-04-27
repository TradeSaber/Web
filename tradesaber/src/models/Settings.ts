export default interface Settings {
    acceptTrades: boolean
    privacy: InventoryPrivacy
}

export enum InventoryPrivacy {
    Public,
    Private
}