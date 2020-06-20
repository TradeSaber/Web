<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64 is-2by3">
                <img :src="coverURL">
            </p>
        </figure>
        <div class="media-content">
            <div class="content is-small">
                <h1>{{ pack.name }}</h1>
                <p>{{ pack.description }}</p>
                <p>Cards In Pack: {{ pack.count }}</p>
            </div>
        </div>
        <div class="media-right">
            <a class="icon" v-on:click="copyId()">
                <i class="far fa-copy"></i>
            </a>
        </div>
    </article>
</template>

<script lang="ts">

import { Pack } from '../types'
import { API_URL } from '../variables'
import { Component, Prop, Vue } from 'vue-property-decorator'

import copy from 'copy-to-clipboard'

@Component
export default class PackP extends Vue {
    @Prop() private pack!: Pack
    private coverURL: string = API_URL + this.pack.coverurl

    copyId() {
        copy(this.pack.id)
    }
}

</script>