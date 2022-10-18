import request from "request-promise";
import { CmdRest } from "../src/delivery/api/rest/cmd/cmd.js";
import { readFileSync, writeFileSync } from 'fs'


const url = "http://localhost:8077";

describe("O servidor", () => {
  var server;
  var client;
  var order;
  let newPlaylist = {
    name: "Rap Naruto",
    image: "",
    accountID: 1,
    category: "Rap"
};
  var newOrder = {
    clientId: 0,
    restaurantName: "San Paolo",
    address: {
        postal_code: 12345-678,
        address: "Rua AloAlo",
        district: "Bairro Triste",
        city: "Recife",
        state: "PE",
        complement: "Apt 302"
    },
    items: [
        {
            qt: 3,
            description: "sorvete",
            price: 13
        }
    ],
    cost: 39.00,
    deliveryTax: 2.00
  };

  beforeAll(() => {
    new CmdRest().server();
    process.stdout.write("server-services: ");
  });
      
  afterAll(() => {
    console.log('\n');
  });

  function writeDB(tableName,updatedTable) {
    let data = readFileSync('./src/infrastructure/internal/database/database.json')
    let db = JSON.parse(data)
    db[tableName] = updatedTable
    writeFileSync('./src/infrastructure/internal/database/database.json', JSON.stringify(db))
}


function readDB(table) {
    let data = readFileSync('./src/infrastructure/internal/database/database.json')
    let db = JSON.parse(data)
    return db[table]
}


function readPlaylists(){
    return readDB('playlists')
}

function nextInt(table) {

    let maxIndex = 1
    if (table.length === 0 || (table.length === 1 && table[0] === null) ) return 1 
    for (let i = 0; i<table.length; i = i+1) {
        if (maxIndex <= table[i].id) {
            maxIndex = table[i].id + 1
        }
    }
    return maxIndex
}

function nextIntPlaylists(){
    return nextInt(readPlaylists());
}
  it("cadastra uma nova playlist", () => {
    var options = {
      method: 'POST', 
      uri: (url + '/createPlaylist'), 
      body: newPlaylist, 
      json: true
    };
    const proxInt = nextIntPlaylists()-1;
    return request(options)
      .then(body => {
        expect(body.name).toBe(newPlaylist.name);
        const proxInt = nextIntPlaylists()-1;
        options = {
            method: 'DELETE', 
            uri: (url + `/deletePlaylist`),
            body: { id : proxInt},
            json: true
          };
          return request(options)
            .then(body => expect(body).toBe(null))
            .catch(e => expect(e).toEqual(null));
        
    })
    .catch(e => expect(e).toEqual(null));
  });

  it("testando getPlaylist", () => {
    var options = {
        method: 'POST', 
        uri: (url + '/createPlaylist'), 
        body: newPlaylist, 
        json: true
      };
      const proxInt = nextIntPlaylists()-1;
      return request(options)
        .then(body => {
          expect(body.name).toBe(newPlaylist.name);
          const proxInt = nextIntPlaylists()-1;
          options = {
              method: 'POST', 
              uri: (url + `/getPlaylist`),
              body: { id : proxInt},
              json: true
            };
            return request(options)
                .then(body =>{
                    expect(body.id).toBe(proxInt);
                    options = {
                        method: 'DELETE', 
                        uri: (url + `/deletePlaylist`),
                        body: { id : proxInt},
                        json: true
                      };
                      return request(options)
                        .then(body => expect(body).toBe(null))
                        .catch(e => expect(e).toEqual(null));
                })
            .catch(e => expect(e).toEqual(null));
          
      })
      .catch(e => expect(e).toEqual(null));
    })   

    it("exclui uma nova playlist", () => {
        var options = {
          method: 'POST', 
          uri: (url + '/createPlaylist'), 
          body: newPlaylist, 
          json: true
        };
        const proxInt = nextIntPlaylists()-1;
        return request(options)
          .then(body => {
            expect(body.name).toBe(newPlaylist.name);
            const proxInt = nextIntPlaylists()-1;
            options = {
                method: 'DELETE', 
                uri: (url + `/deletePlaylist`),
                body: { id : proxInt},
                json: true
              };
              return request(options)
                .then(body => expect(body).toBe(null))
                .catch(e => expect(e).toEqual(null));
            
        })
        .catch(e => expect(e).toEqual(null));
      });
    

})