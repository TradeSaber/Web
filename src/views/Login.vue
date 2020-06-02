<template>
    <div class="login">
        <p class="title">Login Screen</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {

    created() {
        console.log("Login Component Created")
        console.log(this.$route.query)
        const code = this.$route.query.code
        if (code) {
            this.$store.dispatch('login', code)
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))
        }
    }

}
</script>