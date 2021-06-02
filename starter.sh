#!/bin/sh

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
forever start -l beacon.log --append -o beaconOut.log -e beaconError.log /www/dominikwilkowski/beacon/src/index.js >> /home/deploy/.forever/beacon-apiRestart.log 2>&1
