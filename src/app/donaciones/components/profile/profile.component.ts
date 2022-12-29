import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Output('image') public image: EventEmitter<any> = new EventEmitter();
  @Input('previsualizacion')  public previsualizacion : string = "";
    private file : any;
    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
    }
    loadImage(event: any){
      const fileImage = event.target.files[0];
      this.extraerBase64(fileImage).then( (image : any) => {
        this.previsualizacion = image.base;
        //console.log(image);
      })
      this.file = fileImage;
      this.image.emit(this.file);
    }

    extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = error => {
          resolve({
             base: null
          });
        };

      } catch (e) {
        reject(null)
        // return null;
      }
    });

    clearImage(){
      this.previsualizacion = "";
    }
}
