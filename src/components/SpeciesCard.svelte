<script>
    export let data;
    let common_name = data.taxon.preferred_common_name;
    let scientific_name = data.taxon.name;
    let img_url = data.taxon.default_photo?.medium_url;
</script>

<div class="card">
    <div class="card-img" style={`background-image: url(${img_url});`} />
    <div class="name">
        <a href={`https://www.inaturalist.org/taxa/${data.taxon.id}`}>
            {#if common_name}
                <div class="common-name">
                    {common_name}
                </div>
            {/if}
            <div class="scientific-name">
                {scientific_name}
            </div>
        </a>
    </div>
</div>

<style>
    .card {
        width: 100%;
        background-color: #aaa;
        flex-grow: 1;
    }
    a {
        text-decoration: none;
    }

    .name {
        margin: 4px 6px;
    }

    .common-name {
        font-family: "IBM Plex Sans", sans-serif;
        font-weight: 500;
        color: black;
    }
    .scientific-name {
        font-family: "IBM Plex Serif";
        font-style: italic;
        color: #222;
    }
    .card-img {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: auto;
        width: 100%;
        aspect-ratio: 1;
    }
</style>
