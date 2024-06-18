<script>
    import SpeciesCard from "../../components/SpeciesCard.svelte";

    export let data;
</script>

<div class="species-grid">
    {#each data as species}
        <SpeciesCard data={species} />
    {/each}
</div>

<style>
    .species-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        column-gap: 8px;
        row-gap: 8px;
    }
</style>
