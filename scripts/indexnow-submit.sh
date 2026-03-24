#!/bin/bash
# Submit all sitemap URLs to IndexNow (Bing + Yandex)
# Usage: ./scripts/indexnow-submit.sh

KEY="696458410e624f36b6f69b8e3aaa8d6b"
HOST="whatisthetime.now"
KEY_LOCATION="https://${HOST}/${KEY}.txt"

# Extract URLs from sitemap
URLS=$(curl -s "https://${HOST}/sitemap.xml" | grep -oP '(?<=<loc>)[^<]+')
COUNT=$(echo "$URLS" | wc -l | tr -d ' ')

echo "Submitting $COUNT URLs to IndexNow..."

# Build JSON URL array (max 10,000 per request)
URL_JSON=$(echo "$URLS" | head -10000 | awk '{printf "\"%s\",\n", $0}' | sed '$ s/,$//')

PAYLOAD=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": [
    ${URL_JSON}
  ]
}
EOF
)

# Submit to IndexNow API (Bing endpoint, auto-shared with Yandex + others)
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
  "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

echo "IndexNow response: HTTP $RESPONSE"

if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "202" ]; then
  echo "Success! $COUNT URLs submitted to Bing, Yandex, and other participating engines."
else
  echo "Unexpected response. Check https://www.indexnow.org/faq for status codes."
fi
