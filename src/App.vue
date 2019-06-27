<template>
  <div id="app" class="container mt-4">
    <!-- Search Bar -->
    <div class="row">
      <div class="col-md-4">
        <h4>Search by Youtube ID..</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Search..." v-model="q" @keyup.enter="searchYoutubeID">
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <span v-if="Object.keys(credentials).length">
      <YoutubeProfile :credentials="credentials"/>
      <YoutubeVideo class="mt-4" :videos.sync="videos" />
    </span>
  </div>
</template>

<script>
import YoutubeProfile from './components/YoutubeProfile.vue';
import YoutubeVideo from './components/YoutubeVideo';
import { getYoutubeProfile, getVideos } from '../helper/youtubeRepo';

export default {
  name: 'app',
  data() {
    return {
      q: null,
      credentials: [],
      videos: [],
    }
  },
  components: {
    YoutubeProfile,
    YoutubeVideo
  },
  methods: {
    async searchYoutubeID(){
      try{
        // Get Youtube Profile
        const res = await getYoutubeProfile(this.q);
        this.credentials = res;

        // Get Videos
        const videos = await getVideos(this.q, '');
        this.videos = videos;
      } catch ($e) {
        alert("Youtube ID tidak ditemukan.");
      }

      this.q = '';
    }
  }
}
</script>
