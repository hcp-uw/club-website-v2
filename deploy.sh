# RUN THIS TO DEPLOY TO VERGIL!
# YOU WILL BE PROMPTED FOR PW, UNLESS YOU SET UP SSH KEYS

npm run build-for-vergil
scp -r ./dist/* hcpuw@vergil.u.washington.edu:public_html
