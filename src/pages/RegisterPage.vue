<template>
    <div>
        <q-card class="my-card  fixed-center">
            <q-card-section class="bg-secondary">
                <div class="text-h6 ">Welcome! Register Yourself!</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <q-input filled v-model="info.name" label="Enter Your Name" />
            </q-card-section>
            <q-separator />

            <q-card-section>
                <q-input filled v-model="info.email" label="Enter Your Email" />
            </q-card-section>
            <q-separator />

            <q-card-section>
                <q-input filled v-model="info.mobileNo" label="Enter Your Mobile Number" />
            </q-card-section>
            <q-separator />

            <q-card-section>
                <q-select filled v-model="info.userType" :options="options" label="Select User Type" />
            </q-card-section>
            <q-separator />

            <q-card-section>
                <q-input filled v-model="info.password" label="Make Strong Password" />
            </q-card-section>
            <q-separator />

            <q-card-actions vertical>
                <q-btn color="primary" @click="onClick()">Register</q-btn>

            </q-card-actions>
        </q-card>

    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';

export default {
    setup() {

        return {

            info: ref({
                name: '',
                email: '',
                mobileNo: '',
                userType: '',
                password: ''
            }),

            options: ['Admin', 'Teacher', 'Student'],

            router: useRouter()
        }
    },
    methods: {

        async onClick() {
            try {
                const res = await axios({
                    method: 'POST',
                    url: 'http://127.0.0.1:5000/register',
                    data: {
                        name: this.info.name,
                        email: this.info.email,
                        mobileNo: this.info.mobileNo,
                        userType: this.info.userType,
                        password: this.info.password
                    }
                });


                if (res.data.ok) {
                    this.router.push('login');
                    alert("Your Registration Successful !!");
                } else {
                    this.router.push('register');
                }

            }
            catch (error) {
                console.error(error)
            }
        }
    }
}

</script>