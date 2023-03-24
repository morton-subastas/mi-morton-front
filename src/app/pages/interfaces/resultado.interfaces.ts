import { DecimalPipe } from "@angular/common";

export interface FetchAllComprasResponse{
    count: number;
    next: null;
    previous: null;
    results: SmallResponse[];
}

export interface SmallResponse{
    imagen: string;
bidder: string;
descript: string;
saleno: string;
salename: string;
date: string;
martillo: number;
estate: string;
}

export interface ComprasInterface {
imagen: string;
bidder: string;
descript: string;
saleno: string;
refno: string;
salename: string;
date: string;
martillo: number;
estate: string;
pictpath:string;
}
