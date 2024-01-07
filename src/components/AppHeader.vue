<template>
    <header>
        <h1>
            <p>store</p>
            <p>User</p>
        </h1>
    </header>
</template>

<style scoped>
header p:last-child {
    background: rgb(168, 255, 226);
    padding-right: 4rem;
    padding-left: 1rem;
}

header p:first-child {
    z-index: 1;
    text-decoration: underline;
}

header h1,
header p {
    position: absolute;
    top: 0.5rem;
    left: 1rem;
}

header p:first-child {
    font-weight: 300;
    top: 4rem;
    left: 7.5rem;
    font-size: 2.5rem;
}

header p:last-child {
    font-weight: 700;
    font-size: 4rem;
}</style>
