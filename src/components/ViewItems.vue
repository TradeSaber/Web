<template>
    <div class="viewitems">
        <div class="button" v-on:click="loadSeries()">

        </div>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <CardC v-for="card in allCards" v-bind:key="card.id" v-bind:bruh="card.name" :card="card"/>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <p class="title">Hi</p>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <p class="title">Hi</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import axios from 'axios'
import { Card, Series, Pack } from '../types'
import { API_URL } from '../variables'
import CardC from '../components/CardC.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        CardC
    }
})
export default class ViewItems extends Vue {
    
    private allSeries: Series[] = []
    private allPacks: Pack[] = []
    private allCards: Card[] = []

    async loadSeries() {
        const response = await axios({ url: API_URL + '/series/all', method: 'GET' })
        if (response.status === 200) {
            this.allSeries = response.data
            this.loadPacks()
        }
    }

    async loadPacks() {
        const response = await axios({ url: API_URL + '/packs/all', method: 'GET'})
        if (response.status === 200) {
            this.allPacks = response.data
            this.loadCards()
        }
    }

    async loadCards() {
        this.allCards = []
        for (let i = 0; i < this.allSeries.length; i++) {
            const response = await axios({ url: API_URL + '/cards/series/' + this.allSeries[i].id })
            if (response.status === 200) {
                this.allCards.push(response.data)
            }
        }
        console.log(this.allSeries)
        console.log(this.allPacks)
        console.log(this.allCards)
    }
}

</script>