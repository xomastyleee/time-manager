SHELL := /bin/bash --login

setup: check-yarn check-jdk set-root-dependencies install-dependencies

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
			corepack enable; \
			corepack prepare yarn@$$yarn_version --activate; \
			yarn set version $$yarn_version; \
			echo "Yarn has been updated to version $$yarn_version. Please reopen your terminal and check the yarn version with 'yarn -v'."; \
			exit 1; \
		fi; \
	}

check-jdk:
	@echo "Checking if Java is installed and meets the required version..."
	@min_version=$$(jq -r '.min' .jdkrc); \
	max_version=$$(jq -r '.max' .jdkrc); \
	current_version=$$(java -version 2>&1 | awk -F '"' '/version/ {print $$2}' | sed 's/^1\.//; s/\..*//'); \
	if [ -z "$$current_version" ]; then \
		echo "Java is not installed. Installing Java $$min_version..."; \
		if [[ "$$(uname)" == "Darwin" ]]; then \
			brew install openjdk@$$min_version; \
			sudo ln -sfn /usr/local/opt/openjdk@$$min_version/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk; \
		elif [[ "$$(uname)" == "Linux" ]]; then \
			sudo apt-get update; \
			sudo apt-get install -y openjdk-$$min_version-jdk; \
		fi; \
	elif [ "$$current_version" -lt "$$min_version" ] || [ "$$current_version" -gt "$$max_version" ]; then \
		echo "Java version $$current_version is not within the required range ($$min_version - $$max_version). Installing Java $$min_version..."; \
		if [[ "$$(uname)" == "Darwin" ]]; then \
			brew install openjdk@$$min_version; \
			sudo ln -sfn /usr/local/opt/openjdk@$$min_version/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk; \
		elif [[ "$$(uname)" == "Linux" ]]; then \
			sudo apt-get update; \
			sudo apt-get install -y openjdk-$$min_version-jdk; \
		fi; \
	else \
		echo "Java version $$current_version is within the required range ($$min_version - $$max_version)."; \
	fi

set-root-dependencies:
	@if [[ "$$(uname)" == "Darwin" ]]; then \
		nvm use; \
		rvm use; \
	elif [[ "$$(uname)" == "Linux" ]]; then \
		source $$HOME/.nvm/nvm.sh && nvm use; \
	elif [[ "$$(uname -o)" == "Msys" || "$$(uname -o)" == "Cygwin" ]]; then \
		echo "Windows is not implemented."; \
	fi

install-dependencies:
	@if [[ "$$(uname)" == "Darwin" ]]; then \
		yarn; \
		bundle install; \
		cd ios && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install; \
	else \
		yarn; \
	fi

resolve-ios:
	cd ios && xcodebuild -resolvePackageDependencies