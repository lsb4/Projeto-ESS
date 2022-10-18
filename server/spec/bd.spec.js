import { createPlaylist, deletePlaylist, downloadPlaylist, getPlaylist, updatePlaylist } from '../src/infrastructure/internal/playlist.js'
import { uploadMusic, deleteMusic, getMusic } from '../src/infrastructure/internal/music.js'
import { readFileSync, writeFileSync } from 'fs'

describe("O uso do banco de dados", () => {
    var originalTimeout;
    let newPlaylist = {
        id: 0,
        name: "Rap Naruto",
        image: "",
        accountID: 1,
        musics: [],
        followers: [],
        relevance: 0,
        category: "Rap"
    };
    let updatedPlaylist = {
        id: 0,
        name: "Openings One Piece",
        image: "",
        accountID: 1,
        musics: [],
        followers: [],
        relevance: 0,
        category: "Rap"
    };
    let existentPlaylist = {
        id:34,
        name:"pipipi popopo",
        image:"/images/youtube.png",
        accountID:1,
        musics:[],
        followers:[],
        relevance:0,
        category:"teste 2"
    };
    let newMusic = {
        id: undefined,
        image:"https://projeto-ess-sharkmusic-bucket.s3.sa-east-1.amazonaws.com/tobi.jpg",
        name:"tipo madara",
        owner:"Jonga Doido",
        album:"MHRAP",
        releaseDate:"21 de jul. de 1945",
        duration:"3:25"
    };
    let updatedMusic = {
        id: undefined,
        image:"https://projeto-ess-sharkmusic-bucket.s3.sa-east-1.amazonaws.com/tobi.jpg",
        name:"tipo madara",
        owner:"Jonga Doido",
        album:"MHRAP",
        releaseDate:"21 de jul. de 1945",
        duration:"3:25",
        accountID:[2,3],
        url: ''
    };

    beforeAll(() => {
        process.stdout.write("database-services: ");
    })

    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    })

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
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

    function readMusics(){
        return readDB('musics')
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

    function nextIntMusics(){
        return nextInt(readMusics());
    }
      

    it("testando getPlaylist", () => {
          expect(getPlaylist(nextIntPlaylists()-1)).toEqual(readPlaylists()[readPlaylists().length-1]);
    })    

    it("testando createPlaylist", () => {
        createPlaylist(newPlaylist.name, newPlaylist.image, newPlaylist.accountID, newPlaylist.category)
        var proxInt = nextIntPlaylists()-1;
        expect(getPlaylist(proxInt)).toEqual(readPlaylists()[readPlaylists().length-1]);
        deletePlaylist(proxInt);
    })    

    it("testando deletePlaylist", () => {
        createPlaylist(newPlaylist.name, newPlaylist.image, newPlaylist.accountID, newPlaylist.category)
        var proxInt = nextIntPlaylists()-1;
        newPlaylist.id = proxInt;
        expect(getPlaylist(proxInt)).toEqual(newPlaylist);
        deletePlaylist(proxInt);
        expect(getPlaylist(proxInt)).toBe(null)
    })    

    it("testing updatePlaylist", () => {
        createPlaylist(newPlaylist.name, newPlaylist.image, newPlaylist.accountID, newPlaylist.category)
        newPlaylist.name = "Openings One Piece";
        var proxInt = nextIntPlaylists()-1;
        newPlaylist.id = proxInt;
        updatedPlaylist.id = proxInt;
        updatePlaylist(newPlaylist)
        expect(getPlaylist(proxInt)).toEqual(updatedPlaylist);
        deletePlaylist(proxInt);
    })    

    it("testing uploadMusic", () => {
        uploadMusic(newMusic.image, newMusic.name, newMusic.owner, newMusic.album, newMusic.releaseDate, newMusic.duration, [2, 3], '')
        var proxInt = nextIntMusics()-1;
        expect(getMusic(proxInt)).toEqual(readMusics()[readMusics().length-1]);
        deleteMusic(proxInt);
    })   
    
    it("testing getMusic", () => {
        expect(getMusic(nextIntMusics()-1)).toEqual(readMusics()[readMusics().length-1]);
  })    

  it("testando deleteMusic", () => {
    uploadMusic(newMusic.image, newMusic.name, newMusic.owner, newMusic.album, newMusic.releaseDate, newMusic.duration, undefined, undefined)
    var proxInt = nextIntMusics()-1;
    newMusic.id = proxInt;
    expect(getMusic(proxInt)).toEqual(newMusic);
    deleteMusic(proxInt);
    expect(readMusics()[proxInt]).toEqual(undefined)
})    

  })