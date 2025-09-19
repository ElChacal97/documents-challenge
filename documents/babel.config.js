module.exports = function (api) {
  api.cache(true);
  
  const isTest = process.env.NODE_ENV === 'test';
  
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: isTest ? { node: 'current' } : undefined,
        },
      ],
      [
        '@babel/preset-typescript',
        {
          allowDeclareFields: true,
          isTSX: true,
          allExtensions: true,
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
    ],
    plugins: isTest ? [] : ['react-native-reanimated/plugin'],
  };
};
