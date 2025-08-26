const apiEndpoint = import.meta.env.VITE_API_BASE_URL;
const socketEndpoint = import.meta.env.VITE_SOCKET_BASE_URL;
const appName = import.meta.env.VITE_APP_NAME;
const defaultState = {
    auth : {
        isLoggedin: false,
        user: null
    },
    sidebar : {
        activeTab: "chats",
    },
    chat : {
        activeChat : { id: null, username: null },
        refreshList: false,
    }, 
};

export {appName, apiEndpoint, socketEndpoint, defaultState};