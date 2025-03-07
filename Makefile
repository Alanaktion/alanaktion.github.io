# https://tailwindcss.com/blog/standalone-cli

default:
	tailwindcss -i input.css -o tailwind.css -m

watch:
	tailwindcss -i input.css -w -o tailwind.css -m
