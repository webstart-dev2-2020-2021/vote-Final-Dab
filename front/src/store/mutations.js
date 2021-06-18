export const token = (state, token) => {
    state.user.token = token
}

export const data = (state, data) => {
    state.user.data = data
}

export const votes = (state, votes) => {
    state.votes = votes
}

export const task = (state, task) => {
    state.task = task
}
