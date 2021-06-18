<template>
    <main class="form-signin m-auto w-25">
        <form @submit.prevent="loginUser(form)" method="post">
            <img class="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input type="text" class="form-control" id="floatingName" placeholder="name" v-model="form.name">
                <label for="floatingName">Name</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="form.password">
                <label for="floatingPassword">Password</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">© 2017–2021</p>
        </form>
    </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "Login",
    data() {
        return {
            form: {}
        };
    },
    computed: {
        ...mapGetters(['msg'])
    },
    methods: {
        ...mapActions(['login']),
        loginUser(form){
            this.login(form)
        }
    },
    mounted(){
        this.msg.success = ''
        this.msg.error = ''
    }
}

</script>
