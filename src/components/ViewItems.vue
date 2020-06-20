<template>
    <div class="viewitems">
        <div class="button is-centered" v-on:click="loadSeries()">
            Load
        </div>
        <hr/>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <SeriesS v-for="series in allSeries" v-bind:key="series.id" v-bind:series="series"/>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <PackP v-for="pack in allPacks" v-bind:key="pack.id" v-bind:pack="pack"/>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <div class="field has-addons">
                        <div class="control">
                            <input class="input" type="text" placeholder="5ed1e7beb3badf0c30049e30" v-model="cardSearchSeriesId">
                        </div>
                        <div class="control">
                            <a class="button is-info" v-on:click="loadCardsFromSeries()">
                                Search Cards By Series
                            </a>
                        </div>
                    </div>
                    <CardC v-for="card in loadedCards" v-bind:key="card.id" v-bind:card="card"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import axios from 'axios'
import { API_URL } from '../variables'
import CardC from '../components/CardC.vue'
import PackP from '../components/PackP.vue'
import { Card, Series, Pack } from '../types'
import SeriesS from '../components/SeriesS.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        CardC,
        PackP,
        SeriesS
    }
})
export default class ViewItems extends Vue {
    
    private allSeries: Series[] = []
    private allPacks: Pack[] = []
    private loadedCards: Card[] = []

    private cardSearchSeriesId = ""

    async loadSeries() {
        const response = await axios({ url: API_URL + '/series/all', method: 'GET' }).catch()
        if (response.status === 200) {
            this.allSeries = response.data
            this.loadPacks()
        }
    }

    async loadPacks() {
        const response = await axios({ url: API_URL + '/packs/all', method: 'GET'}).catch()
        if (response.status === 200) {
            this.allPacks = response.data
        }
    }

    async loadCardsFromSeries() {
        if (this.cardSearchSeriesId !== "") {
            const response = await axios({ url: API_URL + '/cards/series/' + this.cardSearchSeriesId, method: 'GET' })
            this.cardSearchSeriesId = ""
            this.loadedCards = []
            if (response.status === 200) {
                this.loadedCards = response.data
            }
        }
    }
}

</script>