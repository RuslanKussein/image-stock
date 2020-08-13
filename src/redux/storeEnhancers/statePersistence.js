export const persistStore = next =>
    (reducer, initialState, enhancer) => {
        let store;
        const preloadedState = JSON.parse(localStorage.getItem('persistedState'))

        if (preloadedState) {
            store = next(reducer, preloadedState, enhancer);
        } else {
            store = next(reducer, enhancer);
        }

        store.subscribe(() => localStorage.setItem(
            'persistedState',
            JSON.stringify(store.getState())
        ));

        return store;
    }