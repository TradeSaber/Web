<template>
    <article class="media">
        <div class="media-content">
            <div class="content is-small">
                <h1>{{ series.name }}</h1>
                <p>{{ series.description }}</p>
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

import { Series } from '../types'
import { API_URL } from '../variables'
import { Component, Prop, Vue } from 'vue-property-decorator'

import copy from 'copy-to-clipboard'

@Component
export default class SeriesS extends Vue {
    @Prop() private series!: Series

    copyId() {
        copy(this.series.id)
    }
}

</script>