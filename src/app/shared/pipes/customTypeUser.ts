import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'typeUser' })

export class CustomTypeUser implements PipeTransform{
    transform(value: any): string {
        let tmp = value;
        let res = "";
        if(tmp == "1"){
            res = "Administrador"
        }
        else{
            res = "Cliente"
        }
        return res;
    }

}