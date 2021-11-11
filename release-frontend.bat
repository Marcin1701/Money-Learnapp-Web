echo "Starting deploy"
echo "Linting"
call tslint -p .
echo "Building" 
call npm run build 
echo "Relocate" 
call cd D:\Repozytoria\money-sandbox\src\main\resources\static
echo "Initialize git" 
call git config user.name "Marcin_Rogoz_Scripts-release-frontend" 
call git config user.email "marcin.rogoz1@outlook.com" 
echo "Switch to heroku branch"
call git stash
call git checkout heroku
echo "Copying"
call xcopy /s/y D:\Repozytoria\money-sandbox-web\dist\money-sandbox-web D:\Repozytoria\money-sandbox\src\main\resources\static
echo "Add changes to git"
call git add .
echo "Commit changes" 
call git commit -m "Release frontend" 
echo "Push changes"
call git push
call git checkout master
call git stash apply
echo "Relocate" 
call cd D:\Repozytoria\money-sandbox-web
echo "Finishing deploy"
