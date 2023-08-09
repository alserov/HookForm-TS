export interface IShippingField {
    email : string,
    name : string,
    address : {
        street : string,
        country: string,
        city : string
    }
}


export interface IOption {
    value : string,
    label: string
}