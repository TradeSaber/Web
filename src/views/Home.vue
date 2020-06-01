<template>
    <div class="home">
        <article v-if="showBetaWarning" class="message is-warning">
            <div class="message-header">
                <p>Warning</p>
                <button class="delete" aria-label="delete" @click="warningXClicked()"/>
            </div>
            <div class="message-body">
                Thank you for checking out TradeSaber! Currently the service as a whole is in beta so do not expect things to work 100%.
            </div>
        </article>
        <div class="tile is-ancestor">
            <div class="tile is-8 is-parent">
                <div class="tile is-child box">
                    <p class="title">News</p>
                    <p>There is currently no news.</p>
                </div>
            </div>
            <div class="tile is-parent">
                <div class="tile is-child box">
                    <p class="title">Supporters</p>
                    <p>There are current no supporters.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
    private showBetaWarning = true

    warningXClicked() {
        this.showBetaWarning = false
    }
}
</script>
