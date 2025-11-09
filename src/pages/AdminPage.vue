<template>
    <q-layout view="hHh lpR fFf">

        <q-header bordered class="bg-teal-8 text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer()" />

                <q-toolbar-title>
                    Admin Dashboard
                </q-toolbar-title>

                <div>
                    <q-item-section>
                        <q-btn color="red" label="Logout" @click="onLogout()" />
                    </q-item-section>
                </div>

            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>

            <div>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-btn color="teal-8" label="Manage Courses" @click="onCourse()" />
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-btn color="teal-8" label="Manage Teachers" @click="onTeacher()"/>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-btn color="teal-8" label="Manage Students" @click="onStudent()" />
                    </q-item-section>
                </q-item>
            </div>

        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<script>

import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useLoginStore } from 'src/stores/login-store';

export default {
    setup() {


        return {
            leftDrawerOpen: ref(false),
            router : useRouter(),
            store : useLoginStore()
        }
    },
    methods: {

        toggleLeftDrawer() {
            this.leftDrawerOpen= !this.leftDrawerOpen
        },

        onLogout() {
            alert("You Log out Succcessfully !!");
            this.store.email = '';
            this.store.userType = '';
            this.store.password = '';
            this.router.push('login');
        },

        onTeacher(){
            this.router.push('manage-teacher')
        },
        onStudent(){
            this.router.push('manage-student')
        },
        onCourse(){
            this.router.push('manage-course')
        }
    }
}
</script>