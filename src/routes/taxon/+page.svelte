<script>
    // @ts-nocheck

    const url = "https://api.inaturalist.org/v1/";
    let parentTaxon = { id: 48460, name: "elämä" };
    let childTaxa = [];
    let seenTaxa = [];
    let seenTaxaCounts = {};
    let seenTaxaCountsTotal = {};

    const toPercentage = (n) => {
        if (n >= 0.1) return Math.round(n * 100);
        if (n >= 0.01) return Math.round(n * 1000) / 10;
        return Math.round(n * 10000) / 100;
    };

    $: seenTaxaCount = childTaxa.filter((e) => e.seen).length;
    $: parentTaxonSeen = seenTaxa.includes(parentTaxon.id);
    $: seenTaxaPercentage = childTaxa.length
        ? toPercentage(seenTaxaCount / childTaxa.length)
        : parentTaxonSeen
        ? 100
        : 0;

    const getChildren = async (parentId) => {
        let page = 1;
        const perPage = 200;
        let children = [];
        while (true) {
            const res = await fetch(
                url +
                    `taxa?parent_id=${parentId}&locale=fi&order=desc&order_by=observations_count&per_page=200&page=${page}`
            );
            const data = await res.json();
            children = children.concat(data.results);
            if (page * perPage > data.total_results) break;
            page += 1;
        }
        //console.log(children)
        return children;
    };

    const setChildren = async () => {
        const res = await getChildren(parentTaxon.id);
        childTaxa = res;
        for (let taxon of childTaxa) {
            if (seenTaxa.includes(taxon.id)) taxon.seen = true;
            else taxon.seen = false;
        }
        childTaxa = childTaxa.sort((a, b) =>
            b.seen && a.seen
                ? seenTaxaCountsTotal[b.id] - seenTaxaCountsTotal[a.id]
                : b.seen - a.seen
        );
        // console.log(childTaxa);
    };

    const setParentTaxa = async (taxon) => {
        parentTaxon = taxon;
        await setChildren();
    };

    const taxonUp = async () => {
        const ancestry = parentTaxon.ancestry.split("/");
        const parentId = ancestry[ancestry.length - 1];
        const res = await fetch(url + `taxa?id=${parentId}&locale=fi`);
        const data = await res.json();
        parentTaxon = data.results[0];
        await setChildren();
    };

    import { onMount } from "svelte";

    onMount(async () => {
        const response = await fetch(
            url + "taxa/lifelist_metadata?observed_by_user_id=ilrr&locale=fi"
        );
        const data = await response.json();
        //  console.log(data.results);
        seenTaxa = data.results.map((e) => e.id);
        const res2 = await fetch(url + `observations/taxonomy?user_id=ilrr`);
        const data2 = await res2.json();
        console.log(data2.results);
        for (let taxon of data2.results) {
            // console.log(taxon)
            seenTaxaCounts[taxon.id] = taxon.direct_obs_count;
            seenTaxaCountsTotal[taxon.id] = taxon.descendant_obs_count;
        }
        seenTaxaCounts = seenTaxaCounts;
        seenTaxaCountsTotal = seenTaxaCountsTotal;
        // console.log(seenTaxaCounts)
        setChildren();
    });
</script>

<span
    on:click={taxonUp}
    style=" margin-right: 1em; font-family:sans-serif; font-size: 12px; user-select: none; height: 6px;">^</span
>
<h1
    style={`margin-top: 0; user-select: none; width: max-content; ${
        seenTaxaCounts[parentTaxon.id]
            ? "color: #050; background-color: #dfd"
            : "color: #444;"
    }`}
>
    <!-- {seenTaxaCountsTotal[parentTaxon.id]} -->
    {parentTaxon.preferred_common_name
        ? parentTaxon.preferred_common_name
        : parentTaxon.name}
    {seenTaxaPercentage}%
</h1>

<!-- <div class="taxa" style={`grid-template-columns: repeat(${childTaxa.length}, auto)`}> -->
<div class="taxa" style="user-select: none;">
    {#each childTaxa as taxon}
        <div
            class={taxon.seen ? "taxon seen" : "taxon unseen"}
            on:click={() => setParentTaxa(taxon)}
        >
            {#if taxon.preferred_common_name}
                {taxon.preferred_common_name}
            {:else}
                {taxon.name}
            {/if}
        </div>
    {/each}
</div>

<style>
    .taxa {
        //display: grid;
        //grid-template-columns: repeat(auto, 300px);
    }
    .taxon {
        display: inline-block;
        text-align: center;
        padding: 24px;
        font-weight: bold;
    }
    .seen {
        background-color: green;
    }
    /* .seen:hover { */
    /*     background-color: lightgreen; */
    /* } */
    .unseen {
        background-color: gray;
    }
    /* .unseen:hover{ */
    /*     background-color: lightgray; */
    /* } */
    .taxon:hover {
        opacity: 0.8;
    }
    .taxon:active {
        opacity: 0.7;
    }
</style>
