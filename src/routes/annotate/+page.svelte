<script>
    // @ts-nocheck

    import jwt_decode from "jwt-decode";
    import { onMount } from "svelte";

    import _ from "lodash";
    const { sortBy } = _;
    const { intersection } = _;

    import ChooseAnnotationFields from "./ChooseAnnotationFields.svelte";
    import MaxImg from "./MaxImg.svelte";

    const api_url = "https://api.inaturalist.org/v1";
    let searchParams = "";
    let observations = [];
    let page = 1;
    let apiToken = "";
    let uid = 0;
    let pages = 1;
    let butStyles = "";
    let maxImgUrl = "";
    let maxImgUrls = [];
    let maxImgIndex = 0;
    let maxedObservation = -1;

    let showChooseAnnotationFields = false;

    let defaultQueryParams = "";
    $: queryParams = (searchParams + "&" + defaultQueryParams)
        .replace(/^[\n&]|[\n&]$/g, "")
        .replace(/[\n&]+/g, "&");
    let savedQueries = {};
    let queryName;

    // let annotationAttributeId = 12;
    // $: annotationOptions = annotations[annotationAttributeId].options;

    let annotations = [];
    $: activeAnnotations = annotations
        .filter((e) => e.active)
        .map((e) => {
            return {
                ...e,
                values: sortBy(
                    e.values.filter((v) => v.active),
                    ["order"]
                ) /* ...e */,
            };
        });

    // let annotations = {
    //     12: {
    //         id: 12,
    //         text: "Plant phenology",
    //         options: [
    //             { id: 14, text: "fR", style: "background-color: lightblue;" },
    //             { id: 13, text: "fL", style: "background-color: pink;" },
    //             {
    //                 id: 15,
    //                 text: "B",
    //                 style: "background-color: white; color: darkgreen;",
    //             },
    //             {
    //                 id: 21,
    //                 text: "N",
    //                 style: "background-color: darkgreen; color: white;",
    //             },
    //         ],
    //     },
    //     1: {
    //         id: 1,
    //         text: "Life stage",
    //         options: [
    //             { id: 3, text: "egg", style: "" },
    //             { id: 6, text: "larva", style: "" },
    //             { id: 4, text: "pupa", style: "" },
    //             { id: 2, text: "adult", style: "" },
    //         ],
    //     },
    //     17: {
    //         id: 17,
    //         text: "Dead or Alive",
    //         options: [
    //             { id: 20, text: "N", style: "" },
    //             { id: 19, text: "dead", style: "" },
    //             { id: 18, text: "alive", style: "" },
    //         ],
    //     },
    // };

    const hasField = (observation, annotationValue, annotationParent) => {
        const parentIntersection = intersection(
            observation.ident_taxon_ids,
            annotationParent.taxon_ids
        );
        if (!parentIntersection.length) return false;

        const parentIntersectionE = intersection(
            observation.ident_taxon_ids,
            annotationParent.excepted_taxon_ids
        );
        if (parentIntersectionE.length) return false;

        const taxonIntersections = intersection(
            observation.ident_taxon_ids,
            annotationValue.taxon_ids
        );
        if (!taxonIntersections.length) return false;

        const taxonExceptionIntersections = intersection(
            observation.ident_taxon_ids,
            annotationValue.excepted_taxon_ids
        );
        // console.log("E",observation.ident_taxon_ids,annotationValue.excepted_taxon_ids,taxonExceptionIntersections)
        // console.log("I",observation.ident_taxon_ids, annotationValue, taxonIntersections)
        return (
            // taxonIntersections.length > 0 &&
            taxonExceptionIntersections.length === 0
        );
    };

    const countPages = (data) => {
        const obsCount = data.total_results;
        const perPage = data.per_page;
        pages = Math.ceil(obsCount / perPage);
    };

    const fetchObservations = async () => {
        observations = [];
        const res = await fetch(
            `${api_url}/observations?${queryParams}&page=${page}`,
            {
                headers: {
                    Authorization: apiToken,
                },
            }
        );
        const data = await res.json();
        countPages(data);
        observations = data.results;
    };

    const annotate = async (
        resource_id,
        controlled_attribute_id,
        controlled_value_id
    ) => {
        const res = await fetch(`${api_url}/annotations`, {
            method: "POST",
            body: JSON.stringify({
                resource_id,
                controlled_value_id,
                controlled_attribute_id,
                resource_type: "Observation",
            }),
            headers: { Authorization: apiToken },
        });
    };

    const setPage = async (p) => {
        if (!observations.length) {
            page = 1;
        } else if (p === 0) return;
        else if (p < 1) {
            page = Math.max(pages - p, 1);
        } else {
            page = Math.min(pages, p);
        }
        fetchObservations();
    };

    const decodeToken = () => {
        if (apiToken === "") {
            uid = 0;
            return;
        }
        const decodedToken = jwt_decode(apiToken);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            uid = 0;
            apiToken = "";
            return;
        }
        // console.log(decodedToken)
        uid = decodedToken.user_id;
    };

    let butStyleChanged = () => {
        localStorage.setItem("inat_annotation_btn_style", butStyles);
    };

    const tokenChanged = () => {
        apiToken = /({*"api_token":)*"*([^"]*)"*}*/.exec(apiToken)[2];
        localStorage.setItem("inat_api_token", apiToken);
        decodeToken();
    };

    const defaultParamsChanges = () => {
        localStorage.setItem("default_query_params", defaultQueryParams);
    };

    const saveQuery = () => {
        if (!queryName) return;
        if (!savedQueries) {
            savedQueries = {};
        }
        savedQueries[queryName] = searchParams;
        localStorage.setItem("saved_queries", JSON.stringify(savedQueries));
        // console.log(savedQueries);
    };

    const loadQuery = (key) => {
        const params = savedQueries[key];
        if (!params) return;
        searchParams = params;
    };

    const scrollImgs = (observation) => (e) => {
        const boundingRect = observation.ref.getBoundingClientRect();

        const maxScrollLeft =
            observation.ref.scrollWidth - observation.ref.clientWidth;
        // console.log(
        //     e.deltaY,
        //     observation.ref.scrollLeft,
        //     observation.ref.scrollLeftMax,
        //     maxScrollLeft
        // );

        e.preventDefault();
        if (
            (e.deltaY > 0 &&
                (observation.ref.scrollLeft === maxScrollLeft ||
                    boundingRect.bottom > window.innerHeight)) ||
            (e.deltaY < 0 &&
                (observation.ref.scrollLeft === 0 || boundingRect.top < 0)) // window.innerHeight))
        ) {
            scrollBy({ top: e.deltaY, left: e.deltaX, behavior: "auto" });
            return;
        }
        // console.log(observation.ref);
        observation.ref.scrollBy({ left: e.deltaY + e.deltaX });
    };

    onMount(() => {
        defaultQueryParams = localStorage.getItem("default_query_params");
        savedQueries = JSON.parse(localStorage.getItem("saved_queries"));
        butStyles = localStorage.getItem("inat_annotation_btn_style");

        const token = localStorage.getItem("inat_api_token");
        if (!token) return;
        apiToken = token;
        decodeToken();
    });
</script>

{#if maxImgUrls.length}
    <MaxImg
        imgUrls={maxImgUrls}
        close={() => {
            maxImgUrls = [];
        }}
        imgIndex={maxImgIndex}
    />
{/if}
<!-- <span style="position: absolute; z-index: 200; color: #f0f;">{maxedObservation} {maxImgUrls.length}</span> -->
<!-- <button on:click={() => console.log(annotations)}>AAAA</button> -->
<!-- <button on:click={() => console.log(activeAnnotations)}>BBBB</button> -->
<div>
    <button
        on:click={() => {
            showChooseAnnotationFields = !showChooseAnnotationFields;
        }}>! !</button
    >

    <!-- {#if showChooseAnnotationFields} -->
    <ChooseAnnotationFields
        bind:annotations
        visible={showChooseAnnotationFields}
        hide={() => {
            showChooseAnnotationFields = false;
        }}
    />
    <!-- {/if} -->

    <!-- <div>{queryParams}</div> -->
    <!-- {uid} -->
    <!-- "{apiToken}" -->
    <div style={`display:${!apiToken ? "block" : "none"}`}>
        <a
            href="https://www.inaturalist.org/users/api_token"
            style="color: blue;">Api token:</a
        > <input type="text" on:change={tokenChanged} bind:value={apiToken} />
    </div>

    <div>
        <textarea bind:value={searchParams} />
        <ul>
            {#if savedQueries}
                {#each Object.keys(savedQueries) as k}
                    <li>
                        <button
                            on:click={() => loadQuery(k)}
                            class="saved-query">{k}</button
                        >
                    </li>
                {/each}
            {:else}
                --
            {/if}
        </ul>

        <input type="text" bind:value={queryName} />
        <button on:click={saveQuery}>save query</button>
        <textarea
            bind:value={defaultQueryParams}
            on:change={defaultParamsChanges}
        />
        <input type="text" bind:value={butStyles} on:change={butStyleChanged} />

        <!-- <div style="display: inline-block;" >  -->
        <!-- {#each Object.entries(annotations) as [id, a] } -->
        <!--     <input type="radio" id={`annotation${id}`} value={id} bind:group={annotationAttributeId} /> -->
        <!--     <label for={`annotation${id}`}>{a.text}</label><br/> -->
        <!-- {/each} -->
        <!-- </div> -->
    </div>

    <div>
        <button on:click={() => setPage(page - 1)}>&lt;</button>
        <button on:click={fetchObservations}>load</button>
        <button on:click={() => setPage(page + 1)}>&gt;</button>
    </div>
    <!-- <button on:click={decodeToken}>TOKEN</button> -->
    <div>
        {#each observations as observation}
            <div
                class={`observation${
                    observation.annotated ? " annotated" : ""
                }`}
            >
                <div class={maxImgUrls.length > 0 && observation.id === maxedObservation ? "buts max" : "buts" }>
                    {#each activeAnnotations as annotation}
                        <!-- {console.log(Array.from(annotation.values))} -->
                        <div class="buttons">
                            {#each annotation.values as opt}
                                <!-- {opt.label} . {hasField(observation,opt,annotation) ? "T":"F"} . -->
                                {#if hasField(observation, opt, annotation)}
                                    <button
                                        on:click={() =>
                                            annotate(
                                                observation.id,
                                                annotation.id,
                                                opt.id
                                            ).then(
                                                (observation.annotated = true)
                                            )}
                                        style={butStyles + (opt.butStyle ?? "")}
                                        >{opt.butText || opt.label}</button
                                    >
                                {/if}
                            {/each}
                        </div>
                    {/each}

                    <a
                        href={`https://www.inaturalist.org/observations/${observation.id}`}
                        target="_blank"
                    >
                        <span class="obs-info">
                            {#if observation.taxon.preferred_common_name}
                                {observation.taxon.preferred_common_name}
                                (<span class="scientific"
                                    >{observation.taxon.name}</span
                                >)
                            {:else}
                                <span class="scientific"
                                    >{observation.taxon.name}</span
                                >
                            {/if}
                        </span>
                    </a>
                </div>
                <div
                    class="imgs"
                    bind:this={observation.ref}
                    on:wheel={scrollImgs(observation)}
                >
                    {#each observation.photos as photo, index}
                        <div class="img-container">
                            <div class="img-info">
                                {index + 1}/{observation.photos.length}
                            </div>
                            <img
                                src={photo.url.replace("square", "large")}
                                on:click={() => {
                                    maxImgUrls = observation.photos.map(
                                        ({ url }) =>
                                            url.replace("square", "original")
                                    );
                                    maxImgIndex = index;
                                    maxedObservation = observation.id;
                                }}
                            />
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    {#if observations.length}
        <div>
            <button on:click={() => setPage(page - 1)}>&lt;</button>
            <button on:click={fetchObservations}>load</button>
            <button on:click={() => setPage(page + 1)}>&gt;</button>
        </div>
    {/if}
</div>

<style>
    .observation {
        /* width: 100%; */
        /* overflow: auto; */
        /* white-space: nowrap; */
        padding: 8px 0;
        background-color: lightgray;
        margin: 8px;
    }
    .annotated {
        opacity: 0.5;
    }
    .annotated img {
        height: 100px;
    }
    .imgs {
        /* width: 100%; */
        padding: 0 8px;
        overflow: auto;
        white-space: nowrap;
    }
    img {
        cursor: zoom-in;
    }
    .img-container {
        display: inline-block;
    }
    .buts {
        /* display: flex; */
        /* gap: 8px; */
        display: grid;
        position: sticky;
        top: 8px;
        margin-left: 8px;
    }
    .buts .buttons {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
    }

    .buts.max{
        position: fixed;
        z-index: 150;
    }

    .buts.max .obs-info {
        display: none;
    }

    .buts .buttons:empty {
        margin: 0;
    }
    .buts button {
        /* font-size: 24px; */
        font-size: 16px;
    }
    .buts button:hover {
        filter: saturate(3) brightness(0.8);
    }
    .obs-info {
        font-size: 24px;
    }
    .obs-info .scientific {
        font-style: italic;
    }
    .saved-query {
        display: inline-block;
        background: none;
        cursor: pointer;
        border: none;
    }
</style>
