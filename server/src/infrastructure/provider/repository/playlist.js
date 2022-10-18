import { createPlaylist, deletePlaylist, downloadPlaylist, getPlaylist, listPlaylistFollowers, listPlaylists, listPlaylistsByCategory, listPlaylistsByName, listPlaylistsByRelevance, updatePlaylist, updatePlaylistFollowers } from '../../internal/playlist.js'

class CreatePlaylistUseCaseRepository {
    createPlaylist(name, image, accountID, category) {
        return createPlaylist(name, image, accountID, category)
    }
}

class GetPlaylistUseCaseRepository {
    getPlaylist(id) {
        return getPlaylist(id)
    }
}

class UpdatePlaylistUseCaseRepository {
    updatePlaylist(playlist) {
        return updatePlaylist(playlist)
    }

    getPlaylist(id) {
        return getPlaylist(id)
    }
}

class DeletePlaylistUseCaseRepository {
    deletePlaylist(id) {
        return deletePlaylist(id)
    }
}

class ListPlaylistsByNameUseCaseRepository {
    listPlaylistsByName(accountID) {
        return listPlaylistsByName(accountID)
    }
}

class ListPlaylistsByRelevanceUseCaseRepository {
    listPlaylistsByRelevance(accountID) {
        return listPlaylistsByRelevance(accountID)
    }
}

class DownloadPlaylistUseCaseRepository {
    downloadPlaylist(id) {
        return downloadPlaylist(id)
    }
}

class ListPlaylistsUseCaseRepository {
    listPlaylists() {
        return listPlaylists()
    }
}

class ListPlaylistsByCategoryUseCaseRepository {
    listPlaylistsByCategory(category) {
        return listPlaylistsByCategory(category)
    }
}

class ListPlaylistFollowersUseCaseRepository {
    listPlaylistFollowers(id) {
        return listPlaylistFollowers(id)
    }
}

class UpdatePlaylistFollowersUseCaseRepository {
    updatePlaylistFollowers(id,followers, accountID) {
        return updatePlaylistFollowers(id,followers, accountID)
    }
}

export {
    CreatePlaylistUseCaseRepository,
    GetPlaylistUseCaseRepository,
    UpdatePlaylistUseCaseRepository,
    DeletePlaylistUseCaseRepository,
    ListPlaylistsByNameUseCaseRepository,
    ListPlaylistsByRelevanceUseCaseRepository,
    DownloadPlaylistUseCaseRepository,
    ListPlaylistsUseCaseRepository,
    ListPlaylistsByCategoryUseCaseRepository,
    ListPlaylistFollowersUseCaseRepository,
    UpdatePlaylistFollowersUseCaseRepository
}