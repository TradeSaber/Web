<template>
    <div class="profile">
        <router-link to="/admin" class="button" v-if="isAdmin">
            Go To Admin Page
        </router-link>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { ShareSaberRole } from '../types'

@Component
export default class Profile extends Vue {
    get isAdmin() {
        return ((this.$store.getters.user.role & ShareSaberRole.Admin) === ShareSaberRole.Admin)
    }
}

</script>