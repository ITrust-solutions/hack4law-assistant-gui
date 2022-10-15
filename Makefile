include .env

IMAGE_NAME=hack4law.azurecr.io/hack4law-assistant-gui
IMAGE_VERSION=$(GUI_VERSION)

build:
		npm install
		npm run build

version:
		npm version patch
		npm version | grep 'law-office-assistant' | sed -E "s/.*'([[:digit:].]+)'.*/\1/" | awk '{print "GUI_VERSION="$1}' > .env

docker:
		docker build --pull -t $(IMAGE_NAME):$(IMAGE_VERSION) .
		docker tag $(IMAGE_NAME):$(IMAGE_VERSION) $(IMAGE_NAME):latest

push:
		docker push $(IMAGE_NAME):$(IMAGE_VERSION)
		docker push $(IMAGE_NAME):latest

