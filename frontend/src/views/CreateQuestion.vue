<template>
  <TheSection title="Prague College Polls">
      <h1 class="title">Add Question</h1>
      <div class="control">
        <label class="label">Question</label>
          <input
            class="input"
            type="text"
            placeholder="Enter your question"
            v-model="question_title"
          />
      </div>
      <table class="table is-striped mt-2 is-fullwidth">
        <tbody>
          <tr v-for="(option, index) in options" v-bind:key="option.text" class="fruit-table-item">
            <td>
              <div class="container is-flex is-flex-direction-row is-align-items-center">
                <div class="mr-5">
                  <button class="delete is-danger is-small mt-1 mr-1"
                    @click="deleteOption(index)"></button>
                  {{ index + 1 }}
                </div>
              <div class="is-flex-grow-1">
                <label class="label"></label>
                  <input
                    class="input"
                    type="text"
                    placeholder="Option"
                    v-model.lazy="option.text"
                  />
                </div>
              </div>
             </td>
          </tr>
        </tbody>
      </table>
      <span class="icon is-medium add-icon-container" @click="addOption">
        <font-awesome-icon icon="plus" class="fas fa-lg add-icon"/>
      </span>
      <div class="error-container mt-3 has-text-weight-medium has-text-danger">
        <p v-if="!questionValidated">Question cannot be empty!</p>
        <p v-if="!optionsValidatedText">Options cannot be empty!</p>
        <p v-if="!optionsValidatedLenght">
          Minimum options {{ this.options_min }},
          maximum options {{ this.options_max }}
        </p>
      </div>
      <div class="hover-button">
        <label class="label"></label>
        <button
          class="button is-medium is-fullwidth is-rounded is-link"
          :disabled="!validated"
          @click="addQuestion()">
          Create Question
        </button>
      </div>
  </TheSection>
</template>

<script>
// Import Section Component
import TheSection from '@/components/TheSection.vue';

export default {
  name: 'CreateQuestion',
  data() {
    return {
      // Returned when question is created
      question_id: null,
      // v-model holder for Question title input form
      question_title: '',
      // List of all options to add
      options: [],
      // Minumum number of options
      options_min: 2,
      // Maximum number of options
      options_max: 6,
    };
  },
  components: {
    TheSection,
  },
  created() {
    // Add minimum amout of empty options on page load
    for (let i = 0; i < this.options_min; i += 1) {
      this.addOption();
    }
  },
  computed: {
    // Checks if any of options text is empty
    optionsValidatedText() {
      // eslint-disable-next-line
      for (const option of this.options) {
        if (option.text === '') {
          return false;
        }
      }
      return true;
    },
    // Checks if options are within minimum and maximum
    optionsValidatedLenght() {
      if (this.options.length >= this.options_min && this.options.length <= this.options_max) {
        return true;
      }
      return false;
    },
    // Checks if question title is empty
    questionValidated() {
      if (this.question_title.length !== 0) {
        return true;
      }
      return false;
    },
    // Runs all the previous checks in one function
    validated() {
      if (this.questionValidated && this.optionsValidatedLenght && this.optionsValidatedText) {
        return true;
      }
      return false;
    },
  },
  methods: {
    // Add empty option to options array
    addOption() {
      this.options.push({ text: '' });
    },
    // Delete option from the array
    deleteOption(index) {
      this.options.splice(index, 1);
    },
    // Insert the array of options
    async insertOptions(questionId) {
      try {
        // eslint-disable-next-line
        const [err, response] = await this.runFetch(
          `/api/qa/${questionId}/options`,
          {
            method: 'POST',
            body: {
              question_id: questionId,
              options_list: this.options,
            },
          },
        );
        if (err) {
          alert(`Error: ${err}`);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // Insert Question
    async addQuestion() {
      try {
        // eslint-disable-next-line
        const [err, response] = await this.runFetch('/api/qa', { method: 'POST', body: { title: this.question_title } });
        if (err) {
          alert(`Error: ${err}`);
        } else {
          // If the question is inserted, insert its options and redirect to page
          this.question_id = response.insertId;
          this.insertOptions(this.question_id);
          this.$router.push(`/qa/${this.question_id}`);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
  /* Some small style and transition attempts, mostly for + button */
  .error-container {
    height: 4.5em;
  }
  .add-icon-container {
    border: 2px solid #6c63ff;
    color: #6c63ff;
    font: inherit;
    transition: 0.4s all ease-in-out;
    cursor: pointer;
    border-radius: 50%;
  }

  .add-icon-container:hover {
    background: #6c63ff;
    color: #fff;
    transform: scale(1.05);
  }

  .hover-button {
    width: 17em;
    text-align: center;
    position: absolute;
    bottom: -20.5px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
  }

  .hover-button button {
    box-shadow: 0 2px 4px 0 #6c63ff, 0 4px 10px 0 rgba(0, 0, 0, 0.19);
  }
</style>
