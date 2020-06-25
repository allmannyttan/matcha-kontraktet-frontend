echo "$REACT_APP_API_BASE_URL"

for i in /usr/share/nginx/html/static/js/*.js; do
    sed -i "s+http://replace-this-url+http://$REACT_APP_API_BASE_URL+g" $i
done

nginx -g "daemon off;"
