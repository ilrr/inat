<script>
    export let imgUrls;
    export let close;
    export let imgIndex;

    $: urlsLen = imgUrls.length;
    $: url = imgUrls[imgIndex]

    let translateX = "-50%";
    let translateY = "-50%";
    let imgRef;
    let containerRef;

    const scroll = (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            imgIndex = (imgIndex + 1) % urlsLen;
            return;
        }
        if (e.deltaY < 0) {
            imgIndex = (imgIndex + urlsLen - 1) % urlsLen;
        }
    };

    const move = (e) => {
        const boundingRect = imgRef.getBoundingClientRect();
        const iW = boundingRect.width;
        const iH = boundingRect.height;
        const containerRect = containerRef.getBoundingClientRect();
        const cW = containerRect.width;
        const cH = containerRect.height;
        const wW = window.innerWidth;
        const wH = window.innerHeight;
        const mX = e.clientX;
        const mY = e.clientY;
        // console.log(e.pageX, e.pageY, boundingRect)
        // console.log(mY, wH, mY / wH, wH - iH);
        translateX = wW >= iW ? "-50%" : `${(mX / wW) * (wW - iW)}px`;
        translateY = wH >= iH ? "-50%" : `${(mY / wH) * (wH - iH)}px`;
    };
</script>

<div
    class="max-img-container"
    on:click={close}
    on:wheel={scroll}
    on:mousemove={move}
    bind:this={containerRef}
>
    <img
        src={url}
        style={`position:absolute; transform: translate(${translateX}, ${translateY});${
            translateX === "-50%" ? "left:50%;" : ""
        }${translateY === "-50%" ? "top:50%;" : "top:0px;"}`}
        bind:this={imgRef}
    />
</div>

<style>
    .max-img-container {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
        background: black;
    }
    img{
        cursor: zoom-out;
    }
</style>
