# PDF Demo Project

This project demonstrates uploading and displaying a PDF file.

There is no HTML conversion or hot-spots happening yet, just PDF display with some basic navigation.

CSS Framework is Bootstrap (v5.3)

Redux is used to demonstrate state management (auth and protected routes)

## Notes

### Sign In

The sign in functionality is faked and uses hard coded a `username` and `password`.

To run locally create a `.env.local` file in the root of the project with the following entries:

-   REACT_APP_DEMO_PASSWORD=`<yourPassword>`
-   REACT_APP_DEMO_USERNAME=`<yourUsername>`

Restart the Dev Server for those variables to be made available to the app. 