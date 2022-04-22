/**
 * Do not feel like you have to use this store. Only use it if you want to.
 * The skeleton is here to help you get started in case you want to use it.
 */

import { ref } from "vue";

const audio = ref(null);
const buttonClicked = ref(false);

const state = () => ({});

const getters = {};

const actions = {};

const mutations = {};

export default { state, getters, actions, mutations, namespaced: true, audio };
export { audio, buttonClicked };
