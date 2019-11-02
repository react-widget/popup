module.exports = function() {
    return {
        babelOptions: {
            // runtimeOptions: false,
            plugins: [
                [
                    "babel-plugin-transform-react-remove-prop-types",
                    { mode: "wrap" }
                ]
            ]
        }
    };
};
