<template>
    <div id="youtube-video">
        <div class="row">
            <div class="col-md-3 mb-3" v-for="(video, i) in videos.items" :key="i">
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" :src="'https://www.youtube.com/embed/'+video.videoID" allowfullscreen></iframe>
                </div>
                <p class="mt-1">{{ video.title }}</p>
            </div>
        </div>

        <ul class="pagination">
            <li class="page-item" :class="[ videos.prevPageToken ? '' : 'disabled' ]">
                <button class="page-link" @click.prevent="goTo(videos.prevPageToken)">Previous</button>
            </li>
            <li class="page-item" :class="[ videos.nextPageToken ? '' : 'disabled' ]">
                <button class="page-link" @click.prevent="goTo(videos.nextPageToken)">Next</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { getVideos } from '../../helper/youtubeRepo';

export default {
    name: "YoutubeVideo",
    props: ['videos'],
    methods: {
        async goTo(token){
            try {
                const res = await getVideos(this.videos.channelID, token);
                this.changeVideos(res);
            } catch (error) {
                console.log(error);
            }
        },
        changeVideos(newVideos){
            this.$emit('update:videos', newVideos);
        }
    }
}
</script>

