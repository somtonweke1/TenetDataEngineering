import { PrismaClient, SupportedPartners, OfferStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const getAnalyticsForPartner = async (partner: SupportedPartners) => {
  return prisma.userAnalytics.findMany({
    where: {
      applicationPartner: partner
    }
  });
};

export const getAnalyticsForOfferStatus = async (status: OfferStatus) => {
  return prisma.userAnalytics.findMany({
    where: {
      offerStatus: status
    }
  });
};
