<template>
  <div>
    <ul>
      <li v-for="(todo, inx) in appLocales" :key=inx >
        {{ todo }}
      </li>
    </ul>
    {{ getRoutes }}
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';

import { piniaState } from 'src/stores/piniaState';
import { piniaGetters } from 'src/stores/piniaGetters';
import { counter2 } from 'src/stores/counter2';

import {
  defineComponent,
  PropType,
  computed,
  ref,
  toRef,
  Ref,
} from 'vue';
import { Todo, Meta } from './models';

export default defineComponent({
  name: 'ExampleComponent2',
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      default: () => []
    }
  },
  setup (props) {
    return { ...toRef(props, 'todos') };
  },
  computed: {
    ...mapState(piniaState, ['appLocales']),
    ...mapState(piniaGetters, ['getRoutes']),
  },
  methods: {
  }
});
</script>
