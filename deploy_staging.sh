export MACHINE="121.196.206.228"
export DIR="/data/staging/coupons/"
export REMOTE_CMD="cd $DIR && npm install && pm2 restart process.yml"

rsync -arv ./ --exclude-from=./.gitignore --exclude=.git root@$MACHINE:$DIR
ssh -t -t root@$MACHINE $REMOTE_CMD
