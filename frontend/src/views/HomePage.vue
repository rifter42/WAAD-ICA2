<template>
  <section  class="hero is-fullheight header-image">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-1">
          Prague College Polls
        </h1>
        <div class="buttons is-centered">
          <router-link
            :to="{ name: 'ListQuestions' }"
            class="button is-medium is-success is-rounded">
            List All Questions
          </router-link>
          <p class="mb-1 ml-3 mr-3 is-size-4 has-text-centered"> or </p>
          <router-link
            :to="{ name: 'CreateQuestion' }"
            class="button is-medium is-link is-rounded">
            Create a Question
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
  .header-image {
    margin-left: 0;
    padding-left: 0;
    background-image: url('../assets/background.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }
</style>
