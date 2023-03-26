export interface Product {

    featuredImage:{
        url: string
    };
    id?: string; 
    prices:{
        max:{
            amount:string, 
            currencyCode: string, 
        }
        min:{
            amount:string, 
            currencyCode: string, 
        }
    };
    tags: [];
    title: string; 
    totalInventory: number; 
    tracksInventory: boolean; 
    position: number; 
    marginLeft?: number; 
    size?: string; 
    average?: number,
    starts: number, 
}   