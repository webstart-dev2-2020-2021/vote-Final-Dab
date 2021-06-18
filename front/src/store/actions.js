import axios from 'axios'
import router from "../router";

export const login = ({ commit, state }, form) => {
    axios.post(
        process.env.VUE_APP_API_URL+'/auth/signin',
        {
            name: form.name,
            password: form.password,
        }
    ).then((response) => {
        commit('token', response.data.jwt)

        const user = {
            name: response.data.pseudo,
            isAdmin: response.data.isAdmin

        }

        commit('data', user)
        state.msg.success = 'you are connected'

        router.push({ name: 'Vote' });

    }).catch(() => {
        state.msg.error = 'Mauvais identifiant'
    });
}

export const voteForId = ({ state }, vote) => {
    axios.post(
        process.env.VUE_APP_API_URL+'/vote/'+vote.id,
        {
            userId: state.user.token,
        },
        {
            headers: {
                'Authorization': 'Bearer ' + state.user.token
            }
        }

    ).then((response) => {

        state.msg.success = response.data.message
        state.msg.status = response.data.success

        if (state.msg.status == true){
            vote.length++;
        }
        console.log(state.msg)

    }).catch(() => {
        state.msg.error = 'Vous avez déjà participer à ce vote !'
    });
}

export const register = ({ state }, form) => {
    axios.post(
        process.env.VUE_APP_API_URL+'/auth/signup',
        {
            name: form.name,
            email: form.email,
            password: form.password
        }
    ).then(() => {
        console.log('Compte enregsitré')
        state.msg.success = 'Compte enregsitré'
        window.location.href="/"
    }).catch(() => {
        state.msg.error = "L'email existe deja"
    });
}

export const createVote = ({ state }, form) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + state.user.token
        }
    }
    const bodyParameters = {
        name: form.name,
    };
    axios.post(
        process.env.VUE_APP_API_URL+'/vote/create',
        bodyParameters,
        config
    ).then(() => {
        console.log('Vote enregsitré')
        state.msg.success = 'Vote enregsitré'

    }).catch(() => {
        state.msg.error = "L'email existe deja"
    });
}

export const logout = ({ commit, state }) => {
    const token = state.user.token;
    if (!token) {
        return;
    }

    commit('token', null);
    commit('data', {});
    window.location.href = "/"
}

export const getAllVote = ({ commit, state }) => {
    axios.get(
        process.env.VUE_APP_API_URL+'/vote', {
            headers: {
                'Authorization': `Bearer ${state.user.token}`
            }}).then((response) => {
        const votes = response.data.votes

        commit('votes', votes)
    }).catch(() => {
        state.msg.error = "Echec du get"
    });
}
