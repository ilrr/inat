<script>
    export let visible = false;
    export let hide;
</script>

<!-- {annotations.controlledTerms} -->
<div class="modal-bg" style={visible ? "" : "display: none; height: 0;"}>
    <div class="modal">
        <!-- <button on:click={() => console.log(annotations)}>AAAA</button> -->
        <slot />
        <button on:click={hide}>close</button>
    </div>
</div>

<style>
    .modal {
        background-color: white;
        width: 90%;
        position: absolute;
        margin: 5%;
    }
    .modal-bg {
        z-index: 100;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #000a;
    }
</style>
