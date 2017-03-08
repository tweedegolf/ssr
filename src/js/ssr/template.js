// index.html template; properties will be set when rendered on the server
export default ({ body, title, initialState }) => (`
    <!DOCTYPE html>
    <html>
        <head>
            <script>window.APP_INITIAL_STATE = ${initialState}</script>
            <title>${title}</title>
            <link rel="stylesheet" href="/assets/index.css" />
        </head>

        <body>
            <div id="root">${body}</div>
        </body>
        <script src="/assets/bundle.js"></script>
    </html>
`);

