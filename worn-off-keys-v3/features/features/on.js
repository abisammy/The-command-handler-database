module.exports = () => {
    console.log("The client is online!");
    const colors = require("@util/colors.json");
    function consoleLogColor(color, text) {
        console.log(`\x1b[${colors[color]}m%s\x1b[0m`, text);
    }
    consoleLogColor(
        "Red",
        "Warning! There are no utility files, this is the command base only!"
    );
    consoleLogColor(
        "Red",
        "Warning! There are no schema files, this is the command base only!"
    );
};
