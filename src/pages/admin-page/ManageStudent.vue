<template>
  <div>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 ">Manage All Student</div>


      </q-card-section>
      <q-separator />
      <q-card-section>
        <div>
          <q-btn color="secondary" label="Add Student" @click="addStudentButton()" />
        </div>

      </q-card-section>

      <q-separator />
      <q-card-section>


        <div class="q-pa-md">
          <q-table class="my-sticky-last-column-table" flat bordered title="Student Details" :rows="rows"
            :columns="columns" row-key="name">
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn dense icon="mode_edit" @click="onEdit(props.row)"></q-btn>
                <q-btn dense icon="delete" @click="onDelete(props.row)"></q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-card-section>
    </q-card>

  </div>


<!-- Add Student -->

  <div>
    <q-dialog v-model="add_new">
      <q-card>

        <q-card-section class="bg-teal-8 text-white">
          <div class="text-h6 ">Add New Student</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-input filled v-model="newStudent.first_name" label="Enter First Name" />
        </q-card-section>
        <q-separator />

        <q-card-section>
          <q-input filled v-model="newStudent.last_name" label="Enter Last Name" />
        </q-card-section>
        <q-separator />

        <q-card-section>
          <q-input filled v-model="newStudent.enrollement_number" label="Enter Enrollement Number" />
        </q-card-section>


        <q-card-actions align="around">
          <q-btn color="negative" label="Cancel" @click="cancelAddStudent" />
          <q-btn color="positive" label="Add" @click="confirmAddStudent" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>



<!-- Edit Student -->

<div>
    <q-dialog v-model="add_new">
      <q-card>

        <q-card-section class="bg-teal-8 text-white">
          <div class="text-h6 ">Add New Student</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-input filled v-model="newStudent.first_name" label="Enter First Name" />
        </q-card-section>
        <q-separator />

        <q-card-section>
          <q-input filled v-model="newStudent.last_name" label="Enter Last Name" />
        </q-card-section>
        <q-separator />

        <q-card-section>
          <q-input filled v-model="newStudent.enrollement_number" label="Enter Enrollement Number" />
        </q-card-section>


        <q-card-actions align="around">
          <q-btn color="negative" label="Cancel" @click="cancelAddStudent" />
          <q-btn color="positive" label="Add" @click="confirmAddStudent" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>








</template>

<script>

import { ref } from 'vue';


export default {

  setup() {
    return {
      newStudent: ref({
        first_name: '',
        last_name: '',
        enrollement_number: ''
      }),

      editStudent: ref({
        first_name: '',
        last_name: '',
        enrollement_number: ''
      }),

      add_new: ref(false),
      columns: ref(
        [
          { name: 'id', required: true, label: 'ID', align: 'left', field: 'id' },
          { name: 'first_name', required: true, label: 'First Name', align: 'left', field: 'first_name' },
          { name: 'last_name', required: true, label: 'Last Name', align: 'left', field: 'last_name' },
          { name: 'enrollement_number', required: true, label: 'Enrollement Number', align: 'left', field: 'enrollement_number' },
          { name: 'actions', label: 'Action', align: 'left' },
        ]
      ),
      rows: ref(
        [
          // { id: 1, first_name: 'A', last_name: "Z", enrollement_number: 112 }]
        ]
      )

      // rows :  ref()
    }
  }, 
  methods: {

    async onEdit(row) {
      this.editStudent.first_name = row.first_name;
      this.editStudent.last_name = row.last_name;
      this.editStudent.enrollement_number= row.enrollement_number;

      alert("OnEdit Clicked")
      console.log(row);


    },
    async onDelete(row) {

      // this.rows = this.rows.filter((emp) => emp.id != row.id);

      try {
        const res = await this.$axios.post('/delete-student', {
          id: row.id,
          first_name: row.first_name,
          last_name: row.last_name,
          enrollement_number: row.enrol
        })

        if (res.data.ok) {
          alert(res.data.msg);
          this.displayStudents()
        }

      }
      catch (err) {
        console.error(err);
      }

    },
    addStudentButton() {
      this.add_new = true;
    },

    async confirmAddStudent() {

      try {
        const res = await this.$axios.post('/add-student', {
          first_name: this.newStudent.first_name,
          last_name: this.newStudent.last_name,
          enrollement_number: this.newStudent.enrollement_number
        })

        if (res.data.ok) {
          alert("Student Add Succesfully!");
          this.displayStudents();
          this.add_new = false;

          this.newStudent.first_name = '',
            this.newStudent.last_name = '',
            this.newStudent.enrollement_number = ''

        }

      }
      catch (err) {
        console.error(err);
      }
    },
    async displayStudents() {

      try {
        const res = await this.$axios.get('/read-student');
        if (res.data.ok) {
          this.rows = res.data.students
        }
      }
      catch (err) {
        console.error(err);
      }
    },


    cancelAddStudent() {
      this.add_new = false;
    }
  },

  mounted() {
    this.displayStudents();
  }


}

</script>