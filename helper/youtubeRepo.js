import axios from 'axios';

const API_TOKEN = ''; // Your Api Token

const getYoutubeProfile = id => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${API_TOKEN}&id=${id}`)
        .then(res => {
            if(res.data.items.length == 0){
                reject("ID Tidak ditemukan.");
            }
            
            const data = res.data.items[0];

            const credentials = {
                youtubeID: data.id,
                title: data.snippet.title,
                description: data.snippet.description,
                thumbnail: data.snippet.thumbnails.high.url,
                subscriberCount: data.statistics.subscriberCount,
                videoCount: data.statistics.videoCount,
            }

            resolve(credentials);
        })
        .catch(err => {
            reject(err);
        });
    });
}

const getVideos = (id, token) => {
    let pageToken = '';

    if(token){
        pageToken = `&pageToken=${token}`;
    }

    return new Promise((resolve, reject) => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_TOKEN}&channelId=${id}&order=date&maxResults=8${pageToken}`)
        .then(res => {
            const data = res.data;

            if(!data.items.length){
                reject("ID Tidak ditemukan.");
            }

            let result = {
                channelID: id,
                nextPageToken: data.nextPageToken,
                prevPageToken: (data.prevPageToken) ? data.prevPageToken : '', 
                items: []
            }

            data.items.forEach((val, i) => {
                result.items.push({
                    videoID: val.id.videoId,
                    title: val.snippet.title
                });
            });

            resolve(result);
        })
        .catch(err => {
            reject(err);
        });
    });
}

export {
    getYoutubeProfile,
    getVideos
}