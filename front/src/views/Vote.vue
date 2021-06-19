<template>

    <div class="w-25 m-auto" v-if="user.data.isAdmin">
        <form @submit.prevent="createNewVote(form)">
            <h1 class="h3 mb-3 fw-normal">Creer un vote</h1>

            <div class="form-floating">
                <input type="text" class="form-control" id="floatingName" placeholder="name" v-model="form.name">
                <label for="floatingName">Name</label>
            </div>


            <button class="w-100 btn btn-lg btn-primary" type="submit">Creer un vote</button>
        </form>
    </div>


    <div v-if="user.token">
        <div v-if="votes">
            <form @submit.prevent="voteFor(vote)" v-for="vote in votes" :key="vote.id">
                <div> Name : {{ vote.name }}</div>
                <div> Vote pour : {{ vote.length }}</div>
                <button class="btn btn-primary">Voter Pour {{ vote.name }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "Vote",
    data() {
        return {
            form: {}
        };
    },
    computed: {
        ...mapGetters(['msg']),
        ...mapGetters(['user']),
        ...mapGetters(['votes']),
    },
    methods: {
        ...mapActions(['createVote']),
        ...mapActions(['getAllVote']),
        ...mapActions(['voteForId']),
        createNewVote(form){
            this.createVote(form)
            this.allVote()
        },
        voteFor(vote){
            this.voteForId(vote)
        },
        allVote(){
            this.getAllVote()
        },

    },
    mounted(){
        this.allVote()
    }
}

</script>
