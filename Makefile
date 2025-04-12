# https://tailwindcss.com/blog/standalone-cli

default:
	tailwindcss -i input.css -o tailwind.css -m
  # openssl sha256 -binary tailwind.css | openssl base64

watch:
	tailwindcss -i input.css -w -o tailwind.css -m
