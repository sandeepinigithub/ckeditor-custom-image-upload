
// export default class Adapter {
//     loader:any;
//     reader:any;
//     config;
//     constructor(loader:any, config:any) {
//       this.loader = loader;
//       this.config = config;
//     }


//   public async upload(): Promise<any> {
//     const value = await this.loader.file;
//     console.log(value);
//         return this.read( value);
//       }

//     read(file:any) {
//       console.log(file);
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();

//         reader.onload = function () {
//           resolve({ default: reader.result });
//         };

//         reader.onerror = function (error) {
//           reject(error);
//         };

//         reader.onabort = function () {
//           reject();
//         };
//         reader.readAsDataURL(file);
//       });
//     }

//     abort() {
//       if (this.reader) {
//         this.reader.abort();
//       }
//     }
//   }



export default class Adapter {
  loader: any;
  config: any;

  constructor(loader: any, config: any) {
    this.loader = loader;
    this.config = config;
  }

  public async upload(): Promise<any> {
    const file = await this.loader.file;
    console.log(file);
    return this.uploadFile(file);
  }

  private async uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://34.207.243.8:3000/api/fileUpload', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ZjY0ODQ0NTJmNjU1NGJjN2Q4NTZjMiIsImlhdCI6MTcyOTQyNTQ1N30.qWr1t0mXbvLUX2iXwIOon0lDVTMpR_v9c32hxvYLc4c'
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const result = await response.json();
      console.log(result);

      // Assuming the response contains a 'url' field with the uploaded image URL
      return {
        default: result.data?.imageUrl // Return the image URL here
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  abort() {
    // Add abort logic if needed
  }
}

