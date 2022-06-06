<template>
  <TheSection :title="this.question.title">
    <div class="tabs is-centered is-medium is-fullwidth is-boxed">
      <ul>
        <li v-bind:class="{'is-active': toggleVotes}">
          <a @click='toggleVotes = true'>
            <span class="icon is-small">
              <font-awesome-icon icon="check-to-slot" aria-hidden="true"/>
            </span>
            <span>Vote</span>
          </a>
        </li>
        <li v-bind:class="{'is-active': !toggleVotes}">
          <a @click='toggleVotes = false'>
            <span class="icon is-small">
              <font-awesome-icon icon="square-poll-vertical" aria-hidden="true"/>
            </span>
            <span>Results</span>
          </a>
        </li>
      </ul>
    </div>
    <table class="table is-striped is-hoverable mt-2 is-fullwidth" v-if="toggleVotes">
      <tbody>
        <tr v-for="option in options" :key="option.id">
          <td>
            <button
              @click="vote(option.id)"
              :disabled="this.userVoted"
              class="is-fullwidth button is-link is-outlined">
              {{ option.text}}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <div class="container">
        <BarChart :chart-data="this.chartData" />
        <DoughnutChart :chart-data="this.chartData" />
      </div>
    </div>
  </TheSection>
</template>

<script>
// Import Section Component
import TheSection from '@/components/TheSection.vue';
// Import Charts
import BarChart from '@/components/BarChart.vue';
import DoughnutChart from '@/components/DonutChart.vue';

export default {
  name: 'DisplayQuestion',
  data() {
    return {
      // Get question id from route params
      question_id: this.$route.params.id,
      // Question details
      question: {},
      // List of question options
      options: [],
      // Boolean to toggle elements when user voted
      userVoted: false,
      // Boolean to switch between Vote and Result tabs
      toggleVotes: true,
      // Var to hold data for charts
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ['#6C63FF', '#939DAD', '#3A3850', '#DFDEF6', '#555887', '#F4F4F4'],
            data: [],
          },
        ],
      },
    };
  },
  components: {
    TheSection,
    DoughnutChart,
    BarChart,
  },
  created() {
    // Get question and options on page load
    this.getQuestion(this.question_id);
    this.getOptions(this.question_id);
  },
  methods: {
    // Function to collect data for charts into correct struct
    buildChartData() {
      const labels = [];
      const data = [];
      this.options.forEach((option) => {
        labels.push(option.text);
        data.push(option.vote_count);
      });
      return [labels, data];
    },
    // Get Question by id
    async getQuestion(id) {
      try {
        const [err, response] = await this.runFetch(`/api/qa/${id}`);
        if (err) {
          alert(`Error: ${err}`);
        } else {
          this.question = response;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // Get Question Options
    async getOptions(questionId) {
      try {
        const [err, response] = await this.runFetch(`/api/qa/${questionId}/options`);
        if (err) {
          alert(`Error: ${err}`);
        } else {
          // If options are loaded, populate chart data
          this.options = response;
          [this.chartData.labels, this.chartData.datasets[0].data] = this.buildChartData();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // Function for vote button - increase vote by one
    async vote(id) {
      try {
        // eslint-disable-next-line
        const [err, response] = await this.runFetch(
          `/api/qa/${this.question_id}/options/${id}/vote`,
          { method: 'PUT' },
        );
        if (err) {
          alert(`Error: ${err}`);
        } else {
          // Update options with new votes
          this.getOptions(this.question_id);
          // Toggle userVoted boolean to change styles
          this.userVoted = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
