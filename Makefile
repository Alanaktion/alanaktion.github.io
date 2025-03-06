# https://tailwindcss.com/blog/standalone-cli

default:
	tailwindcss -o tailwind.css -m

watch:
	tailwindcss -w -o tailwind.css -m
