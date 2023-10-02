import { Injectable } from '@angular/core';
import { client } from '../../model/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clients: client[];

  client!: client;

  constructor() {
    this.clients = [
      { name: 'arwa laouini', photoUrl: '../assets/149071.png' },
      { name: 'user2', photoUrl: '../assets/149071.png' },
      { name: 'user1 ', photoUrl: '../assets/149071.png' },
    ];
  }
  listeclient(): client[] {
    return this.clients;
  }
  ajouterclient(prod: client, photoUrl: string, urls: string[]) {
    this.clients.push(prod);

    this.clients.push(prod);
  }

  supprimerclient(c: client) {
    this.clients = this.clients.filter((client) => client !== c);
  }
}
