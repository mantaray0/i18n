# Contributing to @mantaray0/i18n

Thank you for your interest in contributing to @mantaray0/i18n! We welcome all contributions that help improve the project.

## Code of Conduct

We are committed to providing an open and welcoming environment for everyone. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## How can I contribute?

### Reporting Bugs

- Use the GitHub Issues feature
- Describe the problem as detailed as possible
- Include steps to reproduce
- Provide information about your environment (OS, Node.js version, etc.)

### Feature Requests

- Create an issue with the "enhancement" label
- Clearly describe the desired feature
- Explain why this feature would be useful
- Include usage examples

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Run the tests**: `npm test`
4. **Add tests** for new functionality
5. **Update documentation** if needed
6. **Commit your changes**: `git commit -m 'Add amazing feature'`
7. **Push to the branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

## Setting up the development environment

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/mantaray0/i18n.git
cd i18n

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define types for all public APIs
- Use strict TypeScript configuration

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Use meaningful variable and function names
- Write short and concise comments

### Tests

- Write tests for all new functionality
- Aim for at least 90% test coverage
- Use descriptive test names
- Test both positive and negative scenarios

### Documentation

- Update README.md for API changes
- Add JSDoc comments for public functions
- Update TypeScript definitions

## Pull Request Checklist

Before submitting a pull request, make sure:

- [ ] All tests pass
- [ ] New tests have been added for new functionality
- [ ] Documentation has been updated
- [ ] Code follows the style guide
- [ ] No conflicts with the main branch
- [ ] Commit messages are clear and descriptive

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. **Update version** in `package.json`
2. **Update changelog**
3. **Create tag**: `git tag v1.0.0`
4. **Push tag**: `git push origin v1.0.0`
5. **Create GitHub release**

## Support

If you have questions or need help:

- Open an issue on GitHub
- Read the documentation
- Check existing issues

## Acknowledgments

Thank you to everyone who contributes to this project! Every contribution, no matter how small, is valuable and helps make @mantaray0/i18n a better tool.
