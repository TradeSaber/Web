<template>
    
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64 is-2by3">
                <img src="https://localhost:44307/images/5ed7e7d493de41511484d269.png">
            </p>
        </figure>
        <div class="media-content">
            <div class="content is-small">
                <h1>{{ card.name }}</h1>
                <p>{{ card.description }}</p>
                <p>{{ card.rarity }}</p>
                <p>{{ bruh }}</p>
                <div class="button" v-on:click="clickTest()"></div>
            </div>
        </div>
        <div class="media-right">
            <a class="icon">
                <i class="far fa-id-card"></i>
            </a>
            <a class="icon">
                <i class="far fa-copy"></i>
            </a>
        </div>
    </article>
    
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { Card } from '../types'

@Component
export default class CardC extends Vue {
    @Prop() private card!: Card
    @Prop() private bruh!: string

    clickTest() {
        console.log(this.card)
    }
}

</script>