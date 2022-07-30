<svelte lang="ts" />

<div />

<style>
  div {
    width: 1em;
    height: 1em;
    border-style: solid;
    border-width: 2px;
    border-radius: 50%;
    border-color: rgba(0 0 0 / 0.5) rgba(0 0 0 / 0.5) rgba(0 0 0 / 0.5)
      rgba(0 0 0);
    animation: rotation 1s ease 0s infinite normal both;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
