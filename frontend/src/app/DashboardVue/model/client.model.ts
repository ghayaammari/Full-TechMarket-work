export class client {
  name: string;
  photoUrl: string;

  constructor(name = '', photoUrl = '') {
    this.name = name;
    this.photoUrl = photoUrl;
  }
}
