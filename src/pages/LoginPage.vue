<template>
    <div>
        <q-card class="my-card  fixed-center">
            <q-card-section class="bg-secondary">
                <div class="text-h6 ">Welcome! Now its Time to Login!</div>
            </q-card-section>

            <q-separator />


            <q-card-section>
                <q-input filled v-model="store.email" label="Enter Your Email" />
            </q-card-section>
            <q-separator />

            <q-card-section>
                <q-select filled v-model="store.userType" :options="options" label="Select User Type" />
            </q-card-section>
            <q-separator />

            <q-card-section>
                <q-input filled v-model="store.password" label="Enter Your Password" />
            </q-card-section>
            <q-separator />

            <q-card-actions vertical>
                <q-btn color="primary" @click="onClick()">Login</q-btn>

            </q-card-actions>
        </q-card>

    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoginStore } from 'src/stores/login-store';


export default {
    setup() {
        const store = useLoginStore();
        return {
            options: ['Admin', 'Teacher', 'Student'],
            store,
            router: useRouter()
        }
    },
    methods: {

        async onClick() {
            try {
                const res = await axios({
                    method: 'POST',
                    url: 'http://127.0.0.1:5000/login',
                    data: {
                        email: this.store.email,
                        userType: this.store.userType,
                        password: this.store.password
                    }
                });


                if (res.data.ok) {
                    alert(res.data.msg);
                    console.log("Enters in login")
                    console.log(res.data.user.user_type == 'Admin')

                    if (res.data.user.user_type == 'Admin') { this.$router.push('/admin') }
                    else if (res.data.user.user_type == 'Teacher') { this.$router.push('/teacher') }
                    else if (res.data.user.user_type == 'Student') { this.$router.push('/student') }

                } else {
                    alert("Enter Valid Password or Email !!!")
                    this.router.push('login');
                }

            }
            catch (error) {
                console.error(error)
            }
        }
    }
}

</script>
