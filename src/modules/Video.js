import { HTTP } from '../modules/Http'

export const request = (endpoint, params) => {
    return HTTP.get(endpoint, { params }).then(
        response => (response ? response.data : null)
    )
}

export const videos = {
    all: params => request(`channels/top/videos/`, params)
}
