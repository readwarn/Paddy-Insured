<template>
  <div class="empty-cell space-y-7">
    <img
      class="empty-image"
      src="https://img.freepik.com/free-vector/hand-holding-empty-wallet-with-coin-web-spider-inside-financial-problem-cartoon-illustration-vector_201904-407.jpg?w=740"
      alt="empty"
    />
    <p class="text-lg text-gray-600">No Match Found!!!</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.empty-cell {
  width: 100%;
  height: calc(100% - 55px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.empty-image {
  min-width: 120px;
  max-width: 300px;
  width: 20%;
  aspect-ratio: 1/1;
}
</style>