export let log = {
    errConsoleColor: 'color: #fff; background-color: #dc3545; border-color: #dc3545;padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem;',
    infoConsoleColor: 'color: #fff; background-color: #007bff; border-color: #007bff;padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem;',
    succConsoleColor: 'color: #fff; background-color: #28a745; border-color: #28a745;padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem;',

    varIn: (msg) => {
        console.log(
            `%c 🔎 (Console Information) => ${msg}  `,
            log.infoConsoleColor
        );
    },
    varOut: (msg) => {
        console.log(
            `%c 🔎 (Console Information) => `,
            log.infoConsoleColor,
            msg
        );
    },
    succIn: (msg) => {
        console.info(
            `%c ✅ (Fetched Response Success) => ${msg}  `,
            `background: #008000; ${log.succConsoleColor}`
        );
    },
    succOut: (msg) => {
        console.info(
            `%c ✅ (Fetched Response Success) => `,
            log.succConsoleColor,
            msg
        );
    },
    errIn: (msg) => {
        console.error(
            `%c 🔥 (Fetched Response Error) => ${msg}  `,
            log.errConsoleColor
        );
    },
    errOut: (msg) => {
        console.error(
            `%c 🔥 (Fetched Response Error) =>  `,
            log.errConsoleColor,
            msg
        );
    },
};