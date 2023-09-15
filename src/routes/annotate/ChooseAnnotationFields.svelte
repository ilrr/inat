<script>
    import { onMount } from "svelte";
    import Modal from "../../components/modal.svelte";
    export let annotations;
    export let visible = false;
    export let hide;

    const hide2 = () => {
        localStorage.setItem(
            "controlled_terms",
            JSON.stringify(controlledTerms)
        );
        hide();
    };

    let controlledTerms = [];

    onMount(async () => {
        const terms = localStorage.getItem("controlled_terms");
        console.log(JSON.parse(terms));
        if (terms) {
            controlledTerms = JSON.parse(terms);
            annotations = controlledTerms;
            return;
        }
        const res = await fetch(
            "https://api.inaturalist.org/v1/controlled_terms/"
        );
        const data = await res.json();
        controlledTerms = data.results;
        if (Object.keys(annotations).length === 0) {
            annotations = controlledTerms;
            for (let term of annotations) {
                for (let val of term.values) {
                    val.active = true;
                }
            }
        }
    });
</script>

<Modal hide={hide2} {visible}>
    {#each annotations as controlledTerm}
        <div>
            <input type="checkbox" bind:checked={controlledTerm.active} />
            <span style={controlledTerm.active ? "font-weight: bold;" : ""}
                >{controlledTerm.label}</span
            >
            {#if controlledTerm.active}
                <div
                    style="display: grid;grid-template-columns: auto auto auto auto;width: max-content;column-gap: 16px;"
                >
                    {#each controlledTerm.values as val}
                        <!-- <div style="margin-left: 32px;"> -->
                        <div style="margin-left: 32px;">
                            <input
                                type="checkbox"
                                bind:checked={val.active}
                            />{val.label}
                        </div>
                        <div>
                            <input type="text" bind:value={val.butText} />
                        </div>
                        <div>
                            <input type="text" bind:value={val.butStyle} style="" />
                        </div>
                        <div>
                            <input type="number" bind:value={val.order} style="width: 64px;" />
                        </div>
                        <!-- </div> -->
                    {/each}
                </div>
            {/if}
        </div>
    {/each}
    <!-- <button on:click={hide2}>close</button> -->
</Modal>

<style>
</style>
