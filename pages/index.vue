<template>
  <v-container>
    <v-row align="center">
      <v-col v-for="item in items" :key="item.id" cols="12" md="6">
        <v-card>
          <v-card-title>
            {{ item.serialName }}
          </v-card-title>
          <v-card-text>
            <bar-chart :ref="`${item.id}`" />
            <v-bottom-navigation
              v-model="value[item.id]"
              :input-value="active[item.id]"
              color="primary">
              <v-btn @click="filterDate(item.id, 'Date')">
                <span>Date</span>
                <v-icon>mdi-calendar-range-outline</v-icon>
              </v-btn>

              <v-btn @click="filterDate(item.id, 'Month')">
                <span>Month</span>
                <v-icon>mdi-calendar-range-outline</v-icon>
              </v-btn>

              <v-btn @click="filterDate(item.id, 'Year')">
                <span>Year</span>
                <v-icon>mdi-calendar-range-outline</v-icon>
              </v-btn>
            </v-bottom-navigation>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { formatDate, formatMonth, formatYear } from '@/utils/dayjs';
import BarChart from '@/components/BarChart';
export default {
  name: 'IndexPage',
  components: { BarChart },
  data () {
    return {
      value: {},
      active: {},
      date: {},
      menu: {},
      available: 10,
      items: [],
      formatter: {
        formatDate,
        formatMonth,
        formatYear
      },
      lineData: {},
    };
  },
  created () {
    this.$api.powerSocketService.findAllStatus('ACTIVE', (results) => {
      this.items = results.sort((elA, elB) => Number(elB.createdAt) - Number(elA.createdAt));
      for (const item of this.items) {
        this.active[item.id] = true;
        this.value[item.id] = 0;
        item.charData = {
          labels: Object.keys(item.data).map((key) => this.formatter.formatDate(item.data[key].createdAt)),
          datasets: [
            {
              label: 'Uni',
              data: Object.keys(item.data).map((key) => item.data[key].uni),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)'
              ],
              borderWidth: 1
            },
            {
              label: 'Ampere',
              data: Object.keys(item.data).map((key) => item.data[key].ampere),
              backgroundColor: [
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgb(255, 159, 64)'
              ],
            },
            {
              label: 'Voit',
              data: Object.keys(item.data).map((key) => item.data[key].voit),
              backgroundColor: [
                'rgba(255, 205, 86, 0.2)'
              ],
              borderColor: [
                'rgb(255, 205, 86)'
              ],
            },
            {
              label: 'Wat',
              data: Object.keys(item.data).map((key) => item.data[key].wat),
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgb(75, 192, 192)'
              ],
            },
          ],
        }

        setTimeout(() => {
          this.$refs[item.id][0].chartData = item.charData
        }, 500)
      }
    })
  },
  methods: {
    filterDate (id, type) {
      for (const item of this.items) {
        if (item.id === id && type === 'Date') {
          item.charData.labels = Object.keys(item.data).map((key) => this.formatter.formatDate(item.data[key].createdAt))
          setTimeout(() => {
            this.$refs[item.id][0].chartData = item.charData
          }, 500)
        }

        if (item.id === id && type === 'Month') {
          item.charData.labels = Object.keys(item.data).map((key) => this.formatter.formatMonth(item.data[key].createdAt))
          setTimeout(() => {
            this.$refs[item.id][0].chartData = item.charData
          }, 500)
        }

        if (item.id === id && type === 'Year') {
          item.charData.labels = Object.keys(item.data).map((key) => this.formatter.formatYear(item.data[key].createdAt))
          setTimeout(() => {
            this.$refs[item.id][0].chartData = item.charData
          }, 500)
        }
      }
    }
  }
}
</script>
