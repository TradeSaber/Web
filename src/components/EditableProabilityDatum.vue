<template>
    <div class="editable-probability-datum">
        <div class="field">
            <label>Prob</label>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { ProbabilityDatum } from '../types'

@Component
export default class EditableProbabilityDatum extends Vue {
    @Prop() public datum!: ProbabilityDatum
}

</script>