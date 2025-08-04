<script lang="ts">
  // --- Props ---
  export let currentPage: number;
  export let totalItems: number;
  export let itemsPerPage: number;

  // --- Calculated State ---
  $: totalPages = Math.ceil(totalItems / itemsPerPage);

  // --- Event Handlers ---
  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }
</script>

<div class="pagination-container">
  <button
    class="pagination-button"
    disabled={currentPage === 1}
    on:click={() => goToPage(currentPage - 1)}
  >
    &laquo; Prev
  </button>

  <span class="pagination-info">
    Page {currentPage} of {totalPages}
  </span>

  <button
    class="pagination-button"
    disabled={currentPage === totalPages}
    on:click={() => goToPage(currentPage + 1)}
  >
    Next &raquo;
  </button>
</div>

<style>
  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    user-select: none;
  }
  .pagination-button {
    background-color: #374151; /* bg-gray-700 */
    color: #f9fafb; /* text-gray-50 */
    border: 1px solid #4b5563; /* border-gray-600 */
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border-radius: 0.375rem; /* rounded-md */
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .pagination-button:hover:not(:disabled) {
    background-color: #4b5563; /* bg-gray-600 */
  }
  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .pagination-info {
    color: #d1d5db; /* text-gray-300 */
    margin: 0 1rem;
  }
</style>
