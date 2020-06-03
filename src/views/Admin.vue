<template>
    <div class="admin">
        <Upload />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import Upload from '../components/Upload.vue'

@Component({
    components: {
        Upload
    }
})
export default class Admin extends Vue {
    
}

</script>