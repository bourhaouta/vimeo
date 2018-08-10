<template>
  <div id="app">
    <div class="container">
        <div class="brand is-flex has-justify:center">
            <img src="./assets/brand.svg" alt="vimeo logo">
        </div>
        <Timeline/>
    </div>
  </div>
</template>

<script>
    import Timeline from './components/Timeline'

    export default {
        name: 'app',
        components: {
            Timeline
        }
    }
</script>

<style lang="stylus">
    @import 'https://unpkg.com/ionicons@4.3.0/dist/css/ionicons.min.css'

    #app
        padding-bottom 100px
        min-height 100vh
        background-color #fbfbfb

    .brand
        margin 50px 0

    .container
        margin-right auto
        margin-left auto
        padding-right 30px
        padding-left 30px
        max-width 600px

        &:before
        &:after
            display table
            content ''

        &:after
            clear both
</style>
