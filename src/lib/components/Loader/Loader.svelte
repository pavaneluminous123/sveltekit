<div class="mt-5 w-full">
  <div class="relative w-full h-2px overflow-hidden">
    <div class="bg absolute w-full h-[1px] t-[1px] " />
    <div class="animation absolute w-full h-2px left-full" />
  </div>
</div>

<style>
  .bg {
    background-color: var(--secondary-color);
  }
  .animation {
    background-color: var(--primary-color);
    animation: loaderAnimation 1.25s ease-in-out infinite;
  }
  @keyframes loaderAnimation {
    0% {
      left: -100%;
    }

    100% {
      left: 100%;
    }
  }
</style>
