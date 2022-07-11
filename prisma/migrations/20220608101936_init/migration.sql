-- CreateTable
CREATE TABLE "Wallet" (
    "address" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "contact" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Land" (
    "token_address" TEXT NOT NULL,
    "token_id" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "tier" INTEGER NOT NULL,
    "fuels" INTEGER NOT NULL,
    "solon" INTEGER NOT NULL,
    "carbon" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "crypton" INTEGER NOT NULL,
    "silicon" INTEGER NOT NULL,
    "elements" INTEGER NOT NULL,
    "hydrogen" INTEGER NOT NULL,
    "hyperion" INTEGER NOT NULL,
    "landmark" TEXT NOT NULL,
    "coordinate" TEXT NOT NULL,
    "walletAddress" TEXT,
    "wantToSale" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Land_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TotalLands" (
    "id" SERIAL NOT NULL,
    "total" INTEGER NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "t1" INTEGER NOT NULL,
    "t2" INTEGER NOT NULL,
    "t3" INTEGER NOT NULL,
    "t4" INTEGER NOT NULL,

    CONSTRAINT "TotalLands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Land_token_id_key" ON "Land"("token_id");

-- CreateIndex
CREATE UNIQUE INDEX "Land_id_key" ON "Land"("id");

-- AddForeignKey
ALTER TABLE "Land" ADD CONSTRAINT "Land_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "Wallet"("address") ON DELETE SET NULL ON UPDATE CASCADE;
