SHELL := /bin/bash --login

setup: check-yarn set-root-dependencies install-dependencies

# Check if yarn is installed, and install it if not
check-yarn:
	@echo "Checking if yarn is installed and up to date..."
	@command -v yarn >/dev/null || { \
		echo "Yarn not found. Installing yarn via corepack..."; \
		yarn_version=$$(grep '"packageManager": "yarn@' package.json | sed 's/.*"yarn@\(.*\)".*/\1/'); \
		corepack enable; \
		corepack prepare yarn@$$yarn_version --activate; \
		echo "Yarn version $$yarn_version has been installed. Please reopen your terminal and check the yarn version with 'yarn -v'."; \
		exit 1; \
	}
	@{ \
		yarn_version=$$(grep '"packageManager": "yarn@' package.json | sed 's/.*"yarn@\(.*\)".*/\1/'); \
		current_yarn_version=$$(yarn -v); \
		if [ "$$current_yarn_version" != "$$yarn_version" ]; then \
			echo "Yarn version $$current_yarn_version is not $$yarn_version. Installing version $$yarn_version..."; \
			asdf reshim nodejs; \
			corepack enable; \
			corepack prepare yarn@$$yarn_version --activate; \
			yarn set version $$yarn_version; \
			echo "Yarn has been updated to version $$yarn_version. Please reopen your terminal and check the yarn version with 'yarn -v'."; \
			exit 1; \
		fi; \
	}

set-root-dependencies:
	nvm use
	rvm use

install-dependencies:
	yarn
	bundle install
	cd ios && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install

resolve-ios:
	cd ios && xcodebuild -resolvePackageDependencies