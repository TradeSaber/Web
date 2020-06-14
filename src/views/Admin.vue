<template>
    <div class="admin">
        <nav class="tabs">
            <div class="container">
                <ul>
                    <li v-bind:class="{ 'is-active': viewActive }"><a v-on:click="setViewTab()">View</a></li>
                    <li v-bind:class="{ 'is-active': createActive }"><a v-on:click="setCreateTab()">Create</a></li>
                    <li><a>Modify</a></li>
                    <li><a>User Management</a></li>
                </ul>
            </div>
        </nav>
        <ViewItems v-if="viewActive" />
        <Upload v-if="createActive" />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import Upload from '../components/Upload.vue'
import ViewItems from '../components/ViewItems.vue'

@Component({
    components: {
        Upload,
        ViewItems
    }
})
export default class Admin extends Vue {
    
    private viewActive = true
    private createActive = false
    private modifyActive = false
    private userActive = false

    setViewTab() {
        this.viewActive = true
        this.createActive = false
        this.modifyActive = false
        this.userActive = false
    }

    setCreateTab() {
        this.viewActive = false
        this.createActive = true
        this.modifyActive = false
        this.userActive = false
    }
}

</script>

<style>
* {
  scrollbar-width: thin;
  scrollbar-color: black black;
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: gray;
}
*::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 0px;
  border: 3px solid transparent;
}
</style>