# isc land check

1. launch postgres `docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=isc -p 5432:5432 -d postgres`
2. fill .env DATABASE_URL with postgres url
3. `npx prisma db push` and `npx prisma generate`
4. `npm run dev`
