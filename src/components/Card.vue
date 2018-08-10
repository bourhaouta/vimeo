<template>
    <div class="card is-flex">
        <div class="card-left">
            <a class="card-author embed:square has-background:gray" :href="video.user.link" target="_blank" :title="video.user.name">
                <img class="card-author:image" :src="video.user.pictures.sizes[1].link" :alt="video.user.name">
            </a>
        </div>
        <div class="card-right">
            <a class="card-title" :href="video.link" target="_blank" v-html="video.name"></a>
            <p class="card-description" v-html="video.description"></p>
            <ul class="card-stats">

                <li class="card-stats:plays" >{{ video.stats.plays | numeralFormat('0a') }}</li>
                <li class="card-stats:comments">{{ video.metadata.connections.comments.total | numeralFormat('0a') }}</li>
                <li class="card-stats:likes">{{ video.metadata.connections.likes.total | numeralFormat('0a') }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            video: Object
        }
    }
</script>

<style lang="stylus" scoped>
    .card
        margin-bottom 15px
        padding 30px 30px 20px
        border-radius 3px
        background-color #fff
        box-shadow 0 2px 4px 0 rgba(#000, .1)

    .card-left
        flex 0 0 60px
        margin-right 20px
        width 60px

    .card-title
        color rgba(#000, .85)
        font-weight bold
        font-size 18px

    .card-description
        $font-size = 13px
        $line-height = 17px
        $max-lines = 4

        display -webkit-box
        overflow hidden
        margin-top 10px
        max-height $line-height * $max-lines
        color rgba(#000, .55)
        text-overflow ellipsis
        font-size $font-size
        line-height $line-height
        -webkit-line-clamp $max-lines
        -webkit-box-orient vertical

    .card-stats
        display flex
        margin-top 15px
        padding-top 15px
        border-top 1px solid rgba(#000, .05)
        color rgba(#000, .35)
        font-weight bold
        font-size 13px

        li
            &:not(:last-child)
                margin-right 45px

    li[class^=card-stats]:before
        margin-right 7px
        color rgba(#000, .75)
        font-weight normal
        font-family 'Ionicons'

    .card-stats\\:plays:before
        content '\f425'

    .card-stats\\:comments:before
        content '\f3fa'

    .card-stats\\:likes:before
        content '\f443'

    .card-author
        size 55px
        border-radius 50%
</style>
