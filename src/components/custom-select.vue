<template>
  <div
    @click="toggleOptions"
    v-on-clickaway="closeOptions"
    class="rounded-md pl-3 py-2 flex items-center justify-between relative border-2 border-gray-300 hover:border-blue-400 cursor-pointer"
    :class="[show_options && 'border-blue-400']"
  >
    <div class="mr-1 font-semibold -mt-1 flex items-center capitalize">
      <p class="text-type">
        {{selection}}
        <span class="hidden xs:inline-block">Insurance</span>
      </p>

      <span
        :class="[show_options && 'rotate-icon']"
        class="icon icon-caret-right top-0.5 text-xl relative block ml-2 transition-transform duration-300"
      ></span>
    </div>

    <div
      class="h-48 p-3 bg-white absolute top-full rounded-md mt-1 right-0.5 shadow-md options cursor-pointer"
      v-if="show_options"
    >
      <input
        v-model="search"
        @click.stop
        type="text"
        placeholder="Search insurance"
        class="w-full h-9 outline-none border-2 border-gray-400 rounded-md mb-2 px-2 focus:border-blue-400 text-sm"
      />

      <div
        class="items-wrapper max-h-32 overflow-y-auto cursor-pointer"
        @click.stop
        v-if="filteredOptions.length"
      >
        <div class="flex gap-2 w-full items-center p-1 hover:bg-gray-200 transition duration-200">
          <input
            type="radio"
            v-model="selection"
            @change="$emit('input',selection)"
            name="type"
            value="all"
            id="_all_"
            class="peer"
          />
          <label
            class="text-sm w-full mb-0.5 cursor-pointer capitalize text-gray-700"
            for="_all_"
          >All</label>
        </div>

        <div
          class="flex gap-2 w-full items-center p-1 hover:bg-gray-200 transition duration-200"
          v-for="(option,index) in filteredOptions"
          :key="index"
        >
          <input
            type="radio"
            v-model="selection"
            @change="$emit('input',selection)"
            name="type"
            :value="option"
            :id="option+index"
            class="peer"
          />
          <label
            class="text-sm w-full mb-0.5 cursor-pointer capitalize text-gray-700 peer"
            :for="option+index"
          >{{option}}</label>
        </div>
      </div>

      <div class="empty-state" v-else>
        <img
          class="empty-image"
          src="https://img.freepik.com/free-vector/hand-holding-empty-wallet-with-coin-web-spider-inside-financial-problem-cartoon-illustration-vector_201904-407.jpg?w=740"
          alt="empty"
        />

        <p class="text-sm mt-2 text-gray-500">No Match Found!!!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  name: "CustomSelect",

  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    filteredOptions() {
      let options = [...this.options];
      return options.filter((option) => {
        return option.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  watch: {
    show_options: {
      handler(show) {
        if (!show) this.search = "";
      },
      immediate: true,
    },
  },

  mounted() {
    this.$emit("input", this.selection);
  },

  data() {
    return {
      search: "",
      show_options: false,
      selection: "all",
    };
  },

  methods: {
    toggleOptions() {
      this.show_options = !this.show_options;
    },

    closeOptions() {
      this.show_options = false;
    },
  },

  mixins: [clickaway],
};
</script>

<style scoped>
.options {
  width: 185px;
}
.rotate-icon {
  transform: rotate(90deg);
}

.text-type {
  font-size: 0.78rem;
  position: relative;
  top: 1.5px;
}

.items-wrapper::-webkit-scrollbar {
  width: 2px;
}

.items-wrapper::-webkit-scrollbar-track {
  background: #d1d5db;
}

.items-wrapper::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 60px);
}

.empty-state img {
  width: 75px;
  height: 75px;
}

.peer:checked + label {
  color: #111827;
  font-weight: 600;
}

@media screen and (min-width: 400px) {
  .text-type {
    font-size: 0.9rem;
    top: 1px;
  }
}
@media screen and (min-width: 450px) {
  .text-type {
    font-size: 0.95rem;
    top: 1px;
  }
}
</style>