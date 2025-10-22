export const HOST = import.meta.env.VITE_SERVER_URL || "http://localhost:8747";

// Debug (keep or remove if noisy)
console.log("HOST from env:", import.meta.env.VITE_SERVER_URL);
console.log("Final HOST:", HOST);

// Auth
export const AUTH_ROUTES = `${HOST}/api/auth`;
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

// Contacts
export const CONTACTS_ROUTES = `${HOST}/api/contacts`;
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/search`;
export const ADD_CONTACT_ROUTE = `${CONTACTS_ROUTES}/add-contact`;
export const GET_DM_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/get-contacts-for-dm`;
// or, if you intended "all contacts":
// export const GET_DM_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/get-all-contacts`;
export const GET_ALL_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/get-all-contacts`;

// Messages
export const MESSAGES_ROUTES = `${HOST}/api/messages`;
export const GET_ALL_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTES}/upload-files`;


export const CHANNEL_ROUTES=`api/channels`;
export const CREATE_CHANNEL_ROUTE=`${CHANNEL_ROUTES}/create-channel`;

export const GET_USER_CHANNELS_ROUTE=`${CHANNEL_ROUTES}/get-user-channels`;
export const GET_CHANNEL_MESSAGES=`${CHANNEL_ROUTES}/get-channel-messages`;