
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  trustedUrl: any = '';

  constructor (private domsanitizer: DomSanitizer){

  }

  transform(value: string): SafeUrl {
    //console.log("0pipe");
    //console.log(value);
    //value = 'https://www.mimorton.com/imglink/' + value.substr(3);
    value = 'https://www.mimorton.com/imglink/' + value;
    //console.log("1pipe");
    //console.log(value);
    //value = 'file://' + value;
    //value =  value.substr(3);
    value = value.replace('\\','/');
    value = value.replace('\\','/');
    //value = 'https://www.mimorton.com/imglink/' + value;
    //console.log(value);
    this.trustedUrl = this.domsanitizer.bypassSecurityTrustUrl(value);
   //console.log("Comienza");
   //console.log(this.trustedUrl);
   return this.trustedUrl;

  }

}
