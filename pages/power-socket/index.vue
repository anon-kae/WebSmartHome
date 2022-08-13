<template>
  <v-container>
    <!-- Start header -->
    <component-header top-level :title="title" />
    <!-- End header -->

    <!-- Start form create serialName -->
    <v-row justify="center" align="center">
      <v-card width="800">
        <v-card-title>General</v-card-title>
        <v-card-text>
          <component-form-power-socket />
        </v-card-text>
      </v-card>
    </v-row>
    <!-- End form create serialName -->

    <!-- Start line -->
    <v-divider class="mt-10" />
    <!-- End line -->

    <!-- Start wait connection to device -->
    <v-row class="mt-5">
      <v-col cols="12">
        <h1>Wait connection to device</h1>
      </v-col>
      <v-col v-for="item in items" :key="item.id" cols="12" md="4">
        <v-card width="500" height="200" @click="moreDetail(item)">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                <div class="d-flex justify-space-between text-h5">
                  {{ item.serialName }}
                  <v-btn
                    icon
                    @click="deleteItem(item.id)">
                    <v-icon color="red">
                      delete
                    </v-icon>
                  </v-btn>
                </div>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  class="mb-1"
                  :color="colorStatus(item.status)"
                  small
                  outlined
                  text-color="white">
                  {{ item.status }}
                </v-chip>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-tooltip v-if="item.createdAt" top>
                  <template #activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      {{ formatter.formatRelativeDate(item.createdAt) }}
                    </span>
                  </template>
                  {{ formatter.formatFullDate(item.createdAt) }}
                </v-tooltip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-text>
            <div v-if="!item.connection">
              <v-progress-circular
                indeterminate
                color="primary" />
              Connecting to device
            </div>
            <v-alert
              v-else
              outlined
              type="success"
              text>
              Connect to device successfully
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- End wait connection to device -->

    <!-- Start dialog more detail -->
    <v-row>
      <v-dialog
        v-model="dialog"
        max-width="800">
        <v-card>
          <v-card-title class="text-h5">
            {{ detail.serialName }}
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details />
            <v-data-table
              :headers="headers"
              :items="detail.data"
              :search="search">
              <template #[`item.createdAt`]="{ value }">
                <v-tooltip v-if="value" top>
                  <template #activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      {{ formatter.formatRelativeDate(value) }}
                    </span>
                  </template>
                  {{ formatter.formatFullDate(value) }}
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="orange darken-1"
              class="text-none"
              text
              @click="dialog = false">
              CLOSE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- End dialog more detail -->
  </v-container>
</template>

<script>
import ComponentHeader from '@/components/header/Header'
import ComponentFormPowerSocket from '@/components/power-socket/FormPowerSocket'
import { formatFullDate, formatRelativeDate } from '@/utils/dayjs';
export default {
  name: 'PagePowerSocketById',
  components: { ComponentHeader, ComponentFormPowerSocket },
  data () {
    return {
      title: 'Setup power-socket',
      items: [],
      detail: {},
      search: '',
      dialog: false,
      formatter: {
        formatFullDate,
        formatRelativeDate
      },
      headers: [
        {
          text: 'ID',
          value: 'id',
          sortable: 'false'
        },
        {
          text: 'Uni',
          value: 'uni',
          sortable: 'false'
        },
        {
          text: 'Ampere',
          value: 'ampere',
          sortable: 'false',
          width: '25%'
        },
        {
          text: 'Voit',
          value: 'voit',
          sortable: 'false'
        },
        {
          text: 'Wat',
          value: 'wat',
          sortable: 'false'
        },
        {
          text: 'Created at',
          value: 'createdAt'
        }
      ]
    }
  },
  mounted () {
    this.$api.powerSocketService.findAllStatus('ALL', (results) => {
      this.items = results.sort((elA, elB) => Number(elB.createdAt) - Number(elA.createdAt));
    })
  },
  methods: {
    async deleteItem (id) {
      await this.$api.powerSocketService.delete(id)
    },
    moreDetail (item) {
      if (!item?.data) {
        item.data = []
      }

      item.data = Object.keys(item.data).map((key) => ({
        id: key,
        ...item.data[key],
        createdAt: new Date(item.data[key].createdAt)
      })) || []
      this.dialog = true;
      this.detail = item;
    },
    colorStatus (status) {
      const condition = {
        PENDING: 'orange',
        ACTIVE: 'success',
        INACTIVE: 'error',
      }

      return condition[status];
    }
  }
}
</script>
