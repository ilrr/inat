<script>
    import { onMount } from "svelte";
    import SpeciesGrid from "./SpeciesGrid.svelte";

    const apiUrl = "https://api.inaturalist.org/v1";

    let nOfSpeciesShown = 500;

    let showShared = false;

    let lParamField = "";
    let rParamField = "";
    let mParamField = "";
    $: lParams = (lParamField + "&" + mParamField)
        .replace(/^[\n&]|[\n&]$/g, "")
        .replace(/[\n&]+/g, "&");
    $: rParams = (rParamField + "&" + mParamField)
        .replace(/^[\n&]|[\n&]$/g, "")
        .replace(/[\n&]+/g, "&");

    let lSpecies = [];
    let rSpecies = [];
    let sharedSpecies = [];

    const getSpecies = async () => {
        lSpecies = [];
        rSpecies = [];
        sharedSpecies = [];
        let ls = await fetchSpecies(lParams);
        let rs = await fetchSpecies(rParams);

        for (const [i1, e1] of ls.entries()) {
            let shared = false;
            for (const [i2, e2] of rs.entries()) {
                if (e1.taxon.id === e2.taxon.id) {
                    rs.splice(i2, 1);
                    sharedSpecies.push(e1);
                    //console.log(sharedSpecies);
                    shared = true;
                    break;
                } else if (isChildTaxonOf(e1, e2)) {
                    rs.splice(i2, 1);
                    sharedSpecies.push(e2);
                    //shared = true;
                    break;
                } else if (isChildTaxonOf(e2, e1)) {
                    sharedSpecies.push(e1);
                    shared = true;
                    break;
                }
            }
            if (!shared) {
                lSpecies.push(e1);
            }
        }

        rSpecies = rs;
        sharedSpecies = sharedSpecies;
        lSpecies = lSpecies;
        //console.log(lSpecies);
    };

    const fetchSpecies = async (params) => {
        let ss = [];
        let page = 1;
        while (page) {
            const res = await fetch(
                `${apiUrl}/observations/species_counts?${params}&page=${page}`
            );
            const data = await res.json();
            ss = ss.concat(data.results);
            // console.log(ls);
            if (data.page * data.per_page >= data.total_results) break;
            page += 1;
            await new Promise((r) => setTimeout(r, 1000));
        }
        return ss;
    };

    const isChildTaxonOf = (t1, t2) =>
        t1.taxon.ancestor_ids.includes(t2.taxon.id);

    const writeLocalStorage = (key, val) => () => {
        localStorage.setItem(key, val);
    };

    onMount(() => {
        lParamField = localStorage.getItem("LField");
        mParamField = localStorage.getItem("MField");
        rParamField = localStorage.getItem("RField");
    });
</script>

<div>
    <div
        style={`display: grid; grid-template-columns: 5fr ${
            showShared ? "4fr" : "100px"
        } 5fr;`}
    >
        <div class="grid-cell"><textarea bind:value={lParamField} on:change={writeLocalStorage("LField", lParamField)}/></div>
        <div class="grid-cell">
            <textarea bind:value={mParamField} on:change={writeLocalStorage("MField", mParamField)} style="max-width: 100%;" />
            <button on:click={getSpecies}>Ö</button>
            <button
                on:click={() => {
                    showShared = !showShared;
                }}>Ä</button
            >
        </div>
        <div class="grid-cell"><textarea bind:value={rParamField} on:change={writeLocalStorage("RField", rParamField)} /></div>
        <div class="grid-cell">
            <SpeciesGrid data={lSpecies.slice(0, nOfSpeciesShown)} />
        </div>
        <div class="grid-cell" style={!showShared ? "width:100px;" : ""}>
            {#if showShared}
                <SpeciesGrid data={sharedSpecies.slice(0, nOfSpeciesShown)} />
            {/if}
        </div>
        <div class="grid-cell">
            <SpeciesGrid data={rSpecies.slice(0, nOfSpeciesShown)} />
        </div>
    </div>
    <button
        on:click={() => {
            nOfSpeciesShown += 500;
        }}>show more</button
    >
</div>

<style>
    .grid-cell {
        margin: 8px;
    }
</style>
