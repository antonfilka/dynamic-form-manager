-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "carName" VARCHAR,
    "carOwnerName" VARCHAR,
    "description" VARCHAR,
    "price" INTEGER,
    "carWeight" INTEGER,
    "carColor" VARCHAR,
    "state" VARCHAR,
    "type" VARCHAR,
    "exchangeName" VARCHAR,
    "priceRange" VARCHAR,

    CONSTRAINT "cars_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "featureId" SERIAL NOT NULL,
    "carsId" INTEGER NOT NULL,
    "name" VARCHAR,
    "quality" VARCHAR,

    CONSTRAINT "features_pk" PRIMARY KEY ("featureId")
);

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_carsId_fkey" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
