<template>
    <div class="upload">
        <div class="columns box">
            <div class="column">
                <div class="form">
                    <p class="title">Create Series</p>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Series Name" v-model="seriesName">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Series Description" v-model="seriesDescription"/>
                        </div>
                    </div>
                    <div class="buttons">
                        <a class="button is-danger" v-on:click="resetSeries()">
                            Reset
                        </a>
                        <a class="button is-success" v-on:click="submitSeries()">
                            Submit
                        </a>
                    </div>
                </div>
            </div>
            <div class="is-divider-vertical"></div>
            <div class="column">
                <div class="form">
                    <p class="title">Create Card</p>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Card Name" v-model="cardName">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Series</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Series ID" v-model="cardSeries">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Card Description" v-model="cardDescription"/>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Master</label>
                        <div class="control">
                            <input class="input" placeholder="Card Master" v-model="cardMaster">
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control is-expanded">
                            <label class="label">Maximum Prints</label>
                            <input class="input" type="number" placeholder="-1" v-model=cardMaximum>
                        </div>
                        <div class="control">
                            <label class="label">Rarity</label>
                            <div class="select">
                                <select v-model="cardRarity">
                                    <option v-bind:value="0">Common</option>
                                    <option v-bind:value="1">Uncommon</option>
                                    <option v-bind:value="2">Rare</option>
                                    <option v-bind:value="3">Legendary</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="cardLocked">
                                Locked (Not available in the public card pool)
                            </label>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Base Probability</label>
                        <div class="control">
                            <input class="input" type="number" placeholder=".05">
                        </div>
                    </div>
                    <div class="field">
                        <div class="file is-boxed">
                            <label class="file-label">
                                <input class="file-input" type="file" ref="cardImage" name="card-cover" accept="image/*" @change="cardFileChange($event.target.files)">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        {{ cardImageName }}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="buttons">
                        <a class="button is-danger" v-on:click="resetCard()">
                            Reset
                        </a>
                        <a class="button is-success" v-on:click="submitCard()">
                            Submit
                        </a>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="form">
                    <p class="title">Create Pack</p>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <div class="control">
                                <input class="input" placeholder="Pack Name" v-model="packName">
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Pack Description" v-model="packDescription"/>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Probability Data JSON</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="JSON..." v-model="packProbabilityData" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Card Count</label>
                        <div class="control">
                            <input class="input" type="number" placeholder="5" v-model="packCount" >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Guaranteed Cards (Seperate By Comma)</label>
                        <div class="control">
                            <input class="input" placeholder="ID1,ID2,ID3" v-model="packCards">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Guaranteed Rarities (Seperate By Comma)</label>
                        <div class="control">
                            <input class="input" placeholder="Legendary,Common" v-model="packRarities">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Theme</label>
                        <div class="control">
                            <input class="input" placeholder="#ffffff" v-model="packTheme">
                        </div>
                    </div>
                    <div class="field">
                        <div class="file is-boxed">
                            <label class="file-label">
                                <input class="file-input" type="file" name="pack-cover" accept="image/*" @change="packFileChange($event.target.files)">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        {{ packImageName }}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="buttons">
                        <a class="button is-danger" v-on:click="resetPack()">
                            Reset
                        </a>
                        <a class="button is-success" v-on:click="submitPack()">
                            Submit
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" v-bind:class="{ 'is-active': modalActive }">
            <div class="modal-background"/>
            <div class="modal-content">
                <div class="box">
                    <p class="title">{{ modalText }}</p>
                    <div class="button" v-if="modalComplete" v-on:click="dismissModal()">
                        Continue
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import axios from 'axios'
import { Rarity } from '../types' 
import { API_URL } from '../variables'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Upload extends Vue {

    private modalActive = false
    private modalComplete = false
    private modalText = 'Uploading...'

    // Series Data
    private seriesName = ''
    private seriesDescription = ''

    // Card Data
    private cardName = ''
    private cardSeries = ''
    private cardDescription = ''
    private cardMaster = ''
    private cardMaximum = -1
    private cardRarity: Rarity = Rarity.Common
    private cardLocked = false
    private cardProbability = .05
    private cardImage: any = null
    private cardImageName = 'Choose a file...'

    // Pack Data
    private packName = ''
    private packDescription = ''
    private packProbabilityData = ''
    private packCount = 5
    private packCards = ''
    private packRarities = ''
    private packTheme = ''
    private packImage: any = null
    private packImageName = 'Choose a file...' 

    resetSeries() {
        this.seriesName = ''
        this.seriesDescription = ''
    }
    
    submitSeries() {
        this.setUploading()

        axios({ url: API_URL + '/series', method: 'POST', data: { name: this.seriesName, description: this.seriesDescription }})
        .then(() => {
            this.setReady('Upload Successful')
            this.resetSeries()
        })
        .catch(err => {
            console.log(err)
            this.setReady('An error has occured while submitting the new series')
        })
    }

    cardFileChange(file: any) {
        this.cardImageName = file[0].name
        this.cardImage = file[0]
    }

    resetCard() {
        this.cardName = ''
        this.cardSeries = ''
        this.cardDescription = ''
        this.cardMaster = ''
        this.cardMaximum = -1
        this.cardRarity = Rarity.Common
        this.cardLocked = false
        this.cardProbability = .05
        this.cardImage = null
        this.cardImageName = 'Choose a file...'
    }

    submitCard() {
        this.setUploading()

        const formData = new FormData()

        formData.append('series', this.cardSeries)
        formData.append('name', this.cardName)
        formData.append('description', this.cardDescription)
        formData.append('master', this.cardMaster)
        formData.append('maxprints', this.cardMaximum.toString())
        formData.append('rarity', this.cardRarity.toString())
        formData.append('locked', this.cardLocked ? 'true' : 'false')
        formData.append('baseprobability', this.cardProbability.toString())
        formData.append('cover', this.cardImage)

        axios({ url: API_URL + '/cards', method: 'POST', data: formData })
        .then(() => {
            this.setReady('Upload Successful')
            this.resetCard()
        })
        .catch(err => {
            console.log(err)
            this.setReady('An error has occured while submitting the new card')
        })
    }

    packFileChange(file: any) {
        this.packImageName = file[0].name
        this.packImage = file[0]
    }

    resetPack() {
        this.packName = ''
        this.packDescription = ''
        this.packProbabilityData = ''
        this.packCount = 5
        this.packCards = ''
        this.packTheme = ''
        this.packRarities = ''
        this.packImage = null
        this.packImageName = 'Choose a file...'
    }

    submitPack() {
        this.setUploading()

        const formData = new FormData()

        formData.append('name', this.packName)
        formData.append('description', this.packDescription)
        formData.append('probData', this.packProbabilityData === '' ? '[]' : this.packProbabilityData)
        formData.append('count', this.packCount.toString())
        formData.append('cardData', this.packCards === '' ? '[]' : JSON.stringify(this.packCards.split(',')))
        formData.append('rarityData', this.packRarities === '' ? '[]' : JSON.stringify(this.packRarities.split(',')))
        formData.append('theme', this.packTheme)
        formData.append('cover', this.packImage)

        axios({ url: API_URL + '/packs', method: 'POST', data: formData })
        .then(() => {
            this.setReady('Upload Successful')
            this.resetPack()
        })
        .catch(err => {
            console.log(err)
            this.setReady('An error has occured while submitting the new pack')
        })
    }

    setUploading() {
        this.modalActive = true
        this.modalComplete = false
        this.modalText = 'Uploading...'
    }

    setReady(text: string) {
        this.modalText = text
        this.modalComplete = true
    }

    dismissModal() {
        this.modalActive = false
    }

}

</script>