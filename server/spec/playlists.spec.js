import { CreatePlaylistUseCase, DeletePlaylistUseCase, UpdatePlaylistUseCase, GetPlaylistUseCase } from '../src/domain/playlist.js';
import { CreatePlaylistUseCaseRequest, DeletePlaylistUseCaseRequest, UpdatePlaylistUseCaseRequest, GetPlaylistUseCaseRequest } from '../src/domain/ucio/playlist.js';
import { CreatePlaylistUseCaseValidate, DeletePlaylistUseCaseValidate, UpdatePlaylistUseCaseValidate, GetPlaylistUseCaseValidate } from '../src/infrastructure/provider/validate/playlist.js';
import { CreatePlaylistUseCaseRepository, DeletePlaylistUseCaseRepository, UpdatePlaylistUseCaseRepository, GetPlaylistUseCaseRepository } from '../src/infrastructure/provider/repository/playlist.js';
import { readFileSync, writeFileSync } from 'fs'

describe("O uso de playlist", () => {
    var originalTimeout;
    var usecase;
    var ucReq;
    var validate;
    var repository;
    var response;
    let newPlaylist = {
        id: 35,
        name: "Rap Naruto",
        image: "",
        accountID: 1,
        category: "Rap",
        musics: ["Rap da Akatsuki", "Essa dor que eu causei"]
    };
    let wrongPlaylist = {
        id: 35,
        name: "",
        image: "",
        accountID: 1,
        category: "Rap",
        musics: ["Rap dos Hokages", "O ninja mais forte"]
    };

    beforeAll(() => {
        process.stdout.write("playlist-service: ");
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
      
    function createPlaylist(){
        ucReq = new CreatePlaylistUseCaseRequest(newPlaylist.name, newPlaylist.image, newPlaylist.accountID,newPlaylist.category);    
        validate = new CreatePlaylistUseCaseValidate();
        repository = new CreatePlaylistUseCaseRepository();
        usecase = new CreatePlaylistUseCase(validate, repository);
        response = usecase.createPlaylist(ucReq);
        return response
    }

    function deletePlaylist(){
        ucReq = new DeletePlaylistUseCaseRequest(nextIntPlaylists()-1);    
        validate = new DeletePlaylistUseCaseValidate();
        repository = new DeletePlaylistUseCaseRepository();
        usecase = new DeletePlaylistUseCase(validate, repository);
        response = usecase.deletePlaylist(ucReq);
        return response
    }


    //TESTES CRIAÇÃO PLAYLIST

    it("validate createPlaylists validando playlist correta", () => {
        ucReq = new CreatePlaylistUseCaseRequest(newPlaylist.name,newPlaylist.image,newPlaylist.accountID,newPlaylist.category);    
        validate = new CreatePlaylistUseCaseValidate();
        expect(validate.createPlaylist(ucReq)).toBe(null);
    })    

    it("validate createPlaylists validando playlist sem nome", () => {
        ucReq = new CreatePlaylistUseCaseRequest(wrongPlaylist.name,wrongPlaylist.image,wrongPlaylist.accountID,wrongPlaylist.category);    
        validate = new CreatePlaylistUseCaseValidate();
        expect(validate.createPlaylist(ucReq)).toBe('O nome da playlist não pode ser vazio.');
    })    

    it("criação de uma playlist", () => {
        expect(createPlaylist().error).toBe(null);
        deletePlaylist();
    })

    //TESTES ATUALIZAÇÃO DE UMA PLAYLIST

    it("validate updatePlaylists validando playlist correta", () => {
        createPlaylist();
        ucReq = new UpdatePlaylistUseCaseRequest((nextIntPlaylists()-1), newPlaylist.name, newPlaylist.image, newPlaylist.category, newPlaylist.musics, newPlaylist.accountID);    
        validate = new UpdatePlaylistUseCaseValidate();
        expect(validate.updatePlaylist(ucReq)).toBe(null);
        deletePlaylist();
    })    
  
    it("validate updatePlaylists validando playlist sem nome", () => {
        createPlaylist();
        ucReq = new UpdatePlaylistUseCaseRequest((nextIntPlaylists()-1), wrongPlaylist.name, "", wrongPlaylist.category, wrongPlaylist.musics, wrongPlaylist.accountID);    
        validate = new UpdatePlaylistUseCaseValidate();
        expect(validate.updatePlaylist(ucReq)).toBe('O nome da playlist não pode ser vazio.');
        deletePlaylist();
    })    

    it("atualização de uma playlist", () => {
        createPlaylist();
        ucReq = new UpdatePlaylistUseCaseRequest((nextIntPlaylists()-1), newPlaylist.name, "", newPlaylist.category, newPlaylist.musics, newPlaylist.accountID);    
        validate = new UpdatePlaylistUseCaseValidate();
        repository = new UpdatePlaylistUseCaseRepository();
        usecase = new UpdatePlaylistUseCase(validate, repository);
        response = usecase.updatePlaylist(ucReq);
        expect(response.error).toBe(null);
        deletePlaylist();
    })


    it("atualização de uma playlist adiconando músicas", () => {
        createPlaylist();
        ucReq = new UpdatePlaylistUseCaseRequest((nextIntPlaylists()-1), newPlaylist.name, "", newPlaylist.category, ["ninja mais forte", "rap dos hokages"], newPlaylist.accountID);    
        validate = new UpdatePlaylistUseCaseValidate();
        repository = new UpdatePlaylistUseCaseRepository();
        usecase = new UpdatePlaylistUseCase(validate, repository);
        response = usecase.updatePlaylist(ucReq);
        expect(response.playlist.musics).toEqual(["ninja mais forte", "rap dos hokages"]);
        deletePlaylist();
    })

    it("atualização de uma playlist removendo músicas", () => {
        createPlaylist();
        ucReq = new UpdatePlaylistUseCaseRequest((nextIntPlaylists()-1), newPlaylist.name, "", newPlaylist.category, [], newPlaylist.accountID);    
        validate = new UpdatePlaylistUseCaseValidate();
        repository = new UpdatePlaylistUseCaseRepository();
        usecase = new UpdatePlaylistUseCase(validate, repository);
        response = usecase.updatePlaylist(ucReq);
        expect(response.playlist.musics).toEqual([]);
        deletePlaylist();
    })

    //TESTES DELETANDO PLAYLIST

    it("validate deletePlaylist validando playlist correta", () => {
        createPlaylist();
        ucReq = new DeletePlaylistUseCaseRequest(nextIntPlaylists()-1);    
        validate = new DeletePlaylistUseCaseValidate();
        expect(validate.deletePlaylist(ucReq)).toBe(null);
        deletePlaylist();
    })    
  
    it("validate deletePlaylist validando playlist sem id", () => {
        createPlaylist();
        ucReq = new DeletePlaylistUseCaseRequest(null);    
        validate = new DeletePlaylistUseCaseValidate();
        expect(validate.deletePlaylist(ucReq)).toBe('O identificador de playlist não pode ser vazio.');
        deletePlaylist();
    })    

    it("deletando playlist", () => {
        createPlaylist();
        expect(deletePlaylist().error).toBe(null);
    })
  
    //TESTE FUNÇÃO AUXILIAR GET PLAYLIST

    it("validate getPlaylist validando playlist correta", () => {
        createPlaylist();
        ucReq = new GetPlaylistUseCaseRequest((nextIntPlaylists()-1));    
        validate = new GetPlaylistUseCaseValidate();
        expect(validate.getPlaylist(ucReq)).toBe(null);
        deletePlaylist();
    })    
  
    it("validate getPlaylist validando playlist sem id", () => {
        createPlaylist();
        ucReq = new GetPlaylistUseCaseRequest(null);    
        validate = new GetPlaylistUseCaseValidate();
        expect(validate.getPlaylist(ucReq)).toBe('O identificador da playlist não pode ser vazio.');
        deletePlaylist();
    })    

    it("retornando playlist", () => {
        createPlaylist();
        ucReq = new GetPlaylistUseCaseRequest((nextIntPlaylists()-1));    
        validate = new GetPlaylistUseCaseValidate();
        repository = new GetPlaylistUseCaseRepository();
        usecase = new GetPlaylistUseCase(validate, repository);
        response = usecase.getPlaylist(ucReq);
        expect(response.error).toBe(null);
        deletePlaylist();
    })    

  })