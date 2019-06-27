<template>
  <div class="youtube-profile">
    <div class="row">
      <div class="col-md-4">
        <img :src="credentials.thumbnail" :alt="credentials.title" class="img-fluid">
      </div>

        <div class="col-md-8">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td>Youtube ID : {{ credentials.youtubeID }}</td>
              </tr>
              <tr>
                <td>Title : {{ credentials.title }}</td>
              </tr>
              <tr>
                <td>Description : {{ credentials.description }}</td>
              </tr>
              <tr>
                <td>Subscriber : {{ credentials.subscriberCount }}</td>
              </tr>
              <tr>
                <td>Video Count : {{ credentials.videoCount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YoutubeProfile',
  props: ['credentials'],
}
</script>
