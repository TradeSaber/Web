<template>
    
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64 is-2by3">
                <img :src="coverURL()">
            </p>
        </figure>
        <div class="media-content">
            <div class="content is-small">
                <h1>{{ card.name }}</h1>
                <p>{{ card.description }}</p>
                <p>{{ rarityString() }}</p>
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

import { API_URL, BASE_URL } from '../variables'
import { Card, Rarity } from '../types'
import { Component, Prop, Vue } from 'vue-property-decorator'

import copy from 'copy-to-clipboard'

@Component
export default class CardC extends Vue {
    @Prop() private card!: Card
    
    coverURL() {
        console.log(this.card)
        return BASE_URL + this.card.coverURL
    }

    rarityString() {
        return Rarity[this.card.rarity]
    }

    copyId() {
        copy(this.card.id)
    }
}

</script>