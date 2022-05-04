<template>
  <div class="bg-white shadow-inner z-20 max-w-full paginator">
    <div
      class="bg-blue-500 h-1 transition-sizing duration-100"
      :style="{ width: `${getPageProgress}%` }"
    ></div>

    <div
      class="text-center xs:text-left px-3 xs:px-10 md:px-24 xl:px-36 py-3 flex flex-wrap items-center justify-between space-x-15"
    >
      <span
        class="text-sm xl:text-md font-bold mb-3 text-black w-full xs:w-auto xs:mb-0"
      >Page {{ currentPage }}/{{ page_count }}</span>

      <div class="flex justify-center xs:justify-start w-full xs:w-auto items-center space-x-2">
        <router-link
          custom
          v-slot="{ navigate }"
          :to="{
            name: $route.name,
            params: { page: Number($route.params.page) - 1 },
          }"
        >
          <button
            @click="navigate"
            :disabled="isBackDisabled"
            class="group inline-flex items-center border-2 border-gray-300 rounded-md px-1 h-8 transition-colors hover:border-gray-600 disabled:border-gray-300"
          >
            <span
              class="icon icon-caret-left text-2xl font-light"
              :class="isBackDisabled ? 'text-gray-200' : 'text-gray-600'"
            ></span>
          </button>
        </router-link>

        <router-link
          v-for="(page, index) in getPageOptions"
          :key="index"
          :to="{ name: $route.name, params: { page: page } }"
          custom
          v-slot="{ isActive, navigate }"
        >
          <button
            @click="navigate"
            :class="[
              isActive && 'text-gray-50 bg-blue-500 border-transparent',
              !isActive && 'border-gray-300 ',
            ]"
            class="font-medium border-2 px-3 h-8 text-sm flex items-center rounded-md transition-colors hover:border-gray-600"
          >{{ page }}</button>
        </router-link>

        <router-link
          custom
          :to="{
            name: $route.name,
            params: { page: Number($route.params.page) + 1 },
          }"
          v-slot="{ navigate }"
        >
          <button
            @click="navigate"
            :disabled="isNextDisabled"
            class="group inline-flex items-center border-2 border-gray-300 rounded-md px-1 h-8 transition-colors hover:border-gray-600 disabled:border-gray-300"
          >
            <span
              class="icon icon-caret-right text-2xl"
              :class="isNextDisabled ? 'text-gray-200' : 'text-gray-600'"
            ></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paginator",

  props: {
    start_index: {
      type: Number,
      default: 1,
    },

    page_count: {
      type: Number,
      default: 10,
    },

    pagination_size: {
      type: Number,
      default: 4,
    },
  },

  computed: {
    getPageProgress() {
      return (this.currentPage / this.page_count) * 100;
    },

    getPageRange() {
      // number of pages to navigate between at a time
      return Math.min(this.page_count, this.pagination_size);
    },

    getPageOptions() {
      // pages to navigate between at a time, updated each time page_start is updated
      let start = this.page_start;
      let range = this.getPageRange;
      let pages = [];
      for (let i = 0; i < range; i++) {
        pages.push(start + i);
      }
      return pages;
    },

    currentPage() {
      //current page rendered
      return Number(this.$route.params.page);
    },

    getLastPage() {
      // last page of the current page options
      return this.getPageOptions[this.getPageOptions?.length - 1];
    },

    getFirstPage() {
      // first page of the current page options
      return this.getPageOptions[0];
    },

    maxPositiveOffset() {
      // max value to positively offset the current page options
      return Math.abs(this.page_count - this.getLastPage);
    },

    maxNegativeOffset() {
      // max value to negatively offset the current page options
      return this.getFirstPage - 1;
    },

    isNextDisabled() {
      return this.currentPage >= this.page_count;
    },

    isBackDisabled() {
      return this.currentPage <= 1;
    },
  },

  watch: {
    $route: {
      handler(route) {
        let page = Number(route.params.page);
        // calls the setPageStart method when currentPage isn't included in
        // in the page options
        if (!this.getPageOptions.includes(page)) this.setPageStart();

        if (page > this.page_count || page < 1)
          this.$router.push({ path: "/o0u" });
      },
      immediate: true,
    },
  },

  data() {
    return {
      page_start: 1,
    };
  },

  methods: {
    setPageStart() {
      // set a new page_start value to reflect the current page in
      // the page options

      let current_page = this.currentPage;
      let pref_start = current_page - this.start_index; // sets the preffered page start for the current page
      let start_offset = pref_start - this.page_start;
      // estimate the offset needed to set current page_start to the preffered page start
      // checks if offset is not greater than the allowed offsets [maxPositiveOffset,maxNegativeOffset]

      let offset =
        start_offset < 0
          ? Math.min(this.maxNegativeOffset, Math.abs(start_offset)) *
            Math.sign(start_offset)
          : Math.min(this.maxPositiveOffset, start_offset);

      this.page_start += offset;
    },
  },
};
</script>

<style scoped>
.paginator {
  position: fixed;
  width: 100%;
  top: 100vh;
  transform: translateY(-100%);
}
</style>
