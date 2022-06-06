<template>
  <TheSection title="Prague College Polls">
    <h1 class="title">Question List</h1>
    <table class="table is-striped is-hoverable mt-2 is-fullwidth">
      <tbody>
        <tr style = "cursor: pointer;"
          v-for="item in items" :key="item.id">
          <td>#{{ item.id}}</td>
          <td @click="onRowClick(item.id)">
              {{ item.title }}
          </td>
          <td class="has-text-centered">
            <a
              class="button is-danger is-small"
              @click="deleteQuestion(item.id)">
                Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </TheSection>
</template>

<script>
// Import Section Component
import TheSection from '@/components/TheSection.vue';

export default {
  name: 'QuestionList',
  components: {
    TheSection,
  },
  data() {
    return {
      // Question List
      items: [],
    };
  },
  created() {
    // Get all questions on page load
    this.getQuestions();
  },
  methods: {
    // Redirect to question page on row click
    onRowClick(id) {
      this.$router.push({ name: 'DisplayQuestion', params: { id } });
    },
    // Function to get all Questions
    async getQuestions() {
      try {
        const [err, data] = await this.runFetch('/api/qa');
        if (err) {
          alert(`Error: ${err}`);
        }
        this.items = data;
      } catch (err) {
        console.log(err);
      }
    },
    // Deletes question by question id
    async deleteQuestion(id) {
      try {
        await this.runFetch(`/api/qa/${id}`, { method: 'DELETE' });
        this.getQuestions();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
