echo "$REACT_APP_API_BASE_URL"
echo "$REACT_APP_LOGO"

for i in /usr/share/nginx/html/static/js/*.js; do
    sed -i "s+http://replace-this-url+$REACT_APP_API_BASE_URL+g" $i
    sed -i "s+replace-this-logo-name+$REACT_APP_LOGO+g" $i
done

nginx -g "daemon off;"
