<template>
    <div id="app">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item" href="">
                        <img src="./assets/tradesaber-combo.png">
                    </a>
                    <a role="button" class="navbar-burger" v-bind:class="{ 'is-active': navActive }" aria-label="menu" aria-expanded="false" data-target="mainNavbar" @click="navBurgerClicked()">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="mainNavbar" class="navbar-menu" v-bind:class="{ 'is-active': navActive }">
                    <div class="navbar-start">
                        <router-link to="/" class="navbar-item">
                            Home
                        </router-link>
                        <router-link to="/about" class="navbar-item">
                            About
                        </router-link>
                        <a class="navbar-item">
                            FAQ
                        </a>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                Gallery
                            </a>
                            <div class="navbar-dropdown">
                                <a class="navbar-item">
                                    Packs
                                </a>
                                <a class="navbar-item">
                                    Series
                                </a>
                                <a class="navbar-item">
                                    Cards
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-light">
                                    <strong>Log In</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <section class="section container">
            <router-view />
        </section>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
    private navActive = false

    navBurgerClicked(): void {
        this.navActive = !this.navActive
    }

    
}

</script>