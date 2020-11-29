npm run build
aws --profile webbiscuit s3 sync public s3://webbiscuit-site --delete
aws --profile webbiscuit cloudfront create-invalidation --distribution-id EQJDFPS5CNFHJ --paths "/*"