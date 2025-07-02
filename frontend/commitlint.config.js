module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'feat!', // New feature (breaking change)
        'fix', // Bug fix
        'fix!', // Bug fix (breaking change)
        'docs', // Documentation changes
        'style', // Code style changes
        'refactor', // Code refactoring
        'test', // Test changes
        'chore', // Other changes
        'revert', // Reverts a previous commit
        'ci', // CI/CD changes
        'init', // Initial commit
        'major', // Major version bump
        'minor', // Minor version bump
      ],
    ],
    'type-case': [2, 'always', 'lower-case'], // Always use lowercase for type
    'type-empty': [2, 'never'], // Type cannot be empty
    'scope-empty': [1, 'never'], // Scope cannot be empty
    'scope-case': [2, 'always', 'lower-case'], // Always use lowercase for scope
    'header-max-length': [2, 'always', 250], // Header cannot be longer than 250 characters
  },
};
