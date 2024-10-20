// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'custom-check';
// }

import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, FocusEvent, BlurEvent } from '@ckeditor/ckeditor5-angular';
import Adapter from './ckeditorAdapter';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public Editor = ClassicEditor;


  public isDisabled = false;
  ckconfig:any;
  public editorData =
    `<p>test image upload</p>`;

  public componentEvents: string[] = [];

  ngOnInit() {
    this.ckconfig = {
      // include any other configuration you want
      extraPlugins: [this.customAdapterPlugin]
    };
  }
  customAdapterPlugin(editor:any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader:any) => {
      return new Adapter(loader, editor.config);
    };
  }
  toggleDisableEditors() {
    this.isDisabled = !this.isDisabled;
  }

  onChange(event: ChangeEvent): void {
    console.log(event.editor.getData());
    this.componentEvents.push('Editor model changed.');
  }

  onFocus(event: FocusEvent): void {
    this.componentEvents.push('Focused the editing view.');
  }

  onBlur(event: BlurEvent): void {
    this.componentEvents.push('Blurred the editing view.');
  }
  onReady(editor:any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader:any) => {

      return new Adapter(loader, editor.config);;
    };

  }
}


