<template>
  <div class="container has-text-centered  mt-6">
    <h1 class="title"> {{ title }} </h1>
  </div>
  <div class="container is-max-desktop">
    <section class="section has-background-white" id="rcorners">
      <slot />
  </section>
  </div>
</template>

<script>
export default {
  name: 'TheSection',
  props: ['title'],
};
</script>

<style>
  #rcorners {
    box-shadow: 0 4px 8px 0 #6C63FF, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-top: 8%;
    margin-bottom: 12%;
    border-radius: 20px;
    position: relative;
  }
</style>

//rgba(0, 0, 0, 0.2)
