module.exports = function (api) {
  api.cache(true);

  const isTest = process.env.NODE_ENV === "test";

  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "react",
        },
      ],
    ],
    plugins: isTest ? [] : ["react-native-worklets/plugin"],
  };
};
