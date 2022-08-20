# Create a new episode entry
create-episode episode:
    hugo new episodes/{{ episode }}.md

# Start blog server
start-server:
    hugo server -D

# Get Zen Theme
zen-get:
    git submodule update

# Update Zen Theme
zen-update:
    git submodule update --remote --merge
