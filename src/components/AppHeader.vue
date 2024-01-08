<template>
  <header>
    <div></div>
    <h1>
      <p>store</p>
      <p>User</p>
    </h1>
  </header>
</template>

<style scoped>
header div:first-child {
  background-color: #d3f4ff;
  height: 18vh;
  width: 100%;
  position: absolute;
}
header p:last-child {
  background: #afebff;
  padding-right: 4rem;
  padding-left: 1rem;
  border-radius: 1rem;
}

header p:first-child {
  z-index: 1;
  text-decoration: underline 2px;
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
}
</style>
