export default ({ body, title, initialState }) => (`
    <!DOCTYPE html>
    <html>
        <link rel="stylesheet" href="/assets/index.css" />
        <head>
            <script>window.APP_INITIAL_STATE = ${initialState}</script>
            <title>${title}</title>
        </head>

        <body>
            <div id="root">${body}</div>
        </body>
        <script src="/assets/bundle.js"></script>
    </html>
`);

