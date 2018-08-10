<template>
    <div class="timeline">
        <div class="filters is-flex has-align:center">
            <div class="filter-controller:limit is-relative">
                <label class="label">Limit</label>
                <select v-model="videos.limit" @change="reFetching()">
                    <option
                        v-for="limit in filter.limits"
                        v-text="limit"
                        :selected="limit == videos.limit"
                        :value="limit"
                        :key="limit"></option>
                </select>
            </div>

            <div class="filter-controller:likes">
                <label class="label">User</label>
                <label class="checkbox">
                    <input type="checkbox" v-model="filter.likes">
                    <span>Users that have more than 10 likes.</span>
                </label>
            </div>

            <div class="filter-controller:search">
                <label class="label">Search</label>
                <input type="search" v-model="filter.search" placeholder="Search by description">
            </div>
        </div>
        
        <div v-if="videos.data" class="cards">
            <card v-for="(video, index) in filteredVideos" :video="video" :key="index"></card>
        </div>

        <div v-show="loading" class="button:loader has-width:fluid"></div>
        
        <div class="button:negative has-width:fluid"
                v-if="videos.data"
                v-show="filteredVideos.length <= 0 && !loading">There's no matching videos.</div>
        
        <button class="button:more has-width:fluid"
                v-if="videos.data && !complete"
                v-show="filteredVideos.length > 8 && !loading"
                @click="fetching()">Load more</button>
    </div>
</template>

<script>
    import { videos } from '../modules/Video'
    import Card from '../components/Card'

    export default {
        name: 'Timeline',

        components: {
            Card
        },

        data() {
            return {
                videos: {
                    limit: 10,
                    page: 0,
                    data: null
                },
                complete: false,
                loading: false,
                filter: {
                    limits: [10, 25, 50],
                    likes: false,
                    search: ''
                }
            }
        },

        computed: {
            filteredVideos: function() {
                return this.filtring()
            }
        },

        created() {
            this.fetching()
        },

        methods: {
            fetching() {
                if (!this.complete) {
                    this.loading = true
                    if (this.videos.page == 0) this.videos.data = null
                    videos
                        .all({
                            per_page: this.videos.limit,
                            page: ++this.videos.page
                        })
                        .then(response => {
                            if (!response.paging.next) this.complete = true

                            if (!this.videos.data) {
                                this.videos.data = response.data
                            } else {
                                this._.forEach(response.data, value => {
                                    this.videos.data.push(value)
                                })
                            }

                            this.loading = false
                        })
                        .catch(e => console.log(e))
                }
            },

            filtring() {
                let search = this.filter.search.toLowerCase(),
                    likes = this.filter.likes

                if (!search && !likes) return this.videos.data

                return this.videos.data.filter(item => {
                    if (!item.description) item.description = ''
                    if (likes) {
                        if (
                            item.user.metadata.connections.likes.total > 10 &&
                            item.description.toLowerCase().includes(search)
                        ) {
                            return item
                        }
                    } else {
                        if (item.description.toLowerCase().includes(search)) {
                            return item
                        }
                    }
                })
            },

            reFetching() {
                this.videos.page = 0
                this.fetching()
            }
        }
    }
</script>

<style scoped lang="stylus">
    .button\\:more
    .button\\:loader
    .button\\:negative
        display flex
        justify-content center
        align-items center
        margin-bottom 15px
        height 60px
        border-radius 3px
        background-color #fff
        box-shadow 0 2px 4px 0 rgba(#000, .1)
        text-transform uppercase
        font-weight bold
        font-size 12px

    .button\\:loader:before
        display block
        width 20px
        height 20px
        border-top 2px solid rgba(#000, .15)
        border-right 2px solid rgba(#000, .15)
        border-bottom 2px solid rgba(#000, .15)
        border-left 2px solid rgba(#000, .04)
        border-radius 50%
        content ''
        animation spin 1.1s infinite linear

    @keyframes spin
        0%
            transform rotate(0)

        100%
            transform rotate(359deg)

    [class^=filter-controller]
        display flex
        flex-direction column
        margin-left 15px

        .label
            margin-bottom 5px
            font-weight bold
            font-size 11px

        select
        input[type=search]
            padding 0 10px
            height 38px
            border 1px solid rgba(#000, .1)
            border-radius 3px
            background-color #fff
            font-size 13px

    .filters
        position sticky
        top 0
        z-index 90
        margin 0 -15px
        padding 15px
        width calc(100% + 30px)
        background-color #fbfbfb

    .filter-controller\\:limit
        margin 0

        select
            padding-right 30px
            cursor pointer

        &:before
            position absolute
            right 8px
            bottom 10px
            color rgba(#000, .75)
            content '\f3d0'
            font-weight normal
            font-family 'Ionicons'
            pointer-events none

    .filter-controller\\:likes
        font-size 12px

        input
            margin-right 8px
            -webkit-appearance checkbox

        .checkbox
            display flex
            align-items center
            height 38px
            cursor pointer
            user-select none

    .filter-controller\\:search
        flex 1 0 auto

    .cards
        margin-top 5px
</style>
